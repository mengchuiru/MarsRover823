#include "MarsRover_Motor.h"
#include "Arduino.h"
#include "Wire.h"


MarsRover_Motor::MarsRover_Motor(): initialized(false) {}

MarsRover_Motor::~MarsRover_Motor() 
{
  this->initialized = false;
}


void MarsRover_Motor::motorSpeed(Motors index,  int speed)
{
  if (!initialized) {
    this->initPCA9685();
  }
  
  speed = speed * 16; // map 255 to 4096
  if (speed >= 4096) {
    speed = 4095;
  }
  if (speed <= -4096) {
    speed = -4095;
  }
  if (index > 9 || index <= 0)
    return;
  
  int pp, pn;
  for(int i = (index == 9? 1 : index); i <= (index == 9? index - 1 : index); i++)
  {
    pp = (i - 1) * 2;
    pn = (i - 1) * 2 + 1;

    if (i != 5 && i != 6){
      if (i == 4 || i == 2 || i == 8) {
        int speed_temp = -speed;
        if (speed_temp >= 0) {
          this->setPwm(pp, 0, speed_temp);
          this->setPwm(pn, 0, 0);
        } else {
            this->setPwm(pp, 0, 0);
            this->setPwm(pn, 0, -speed_temp);
        }
      } else {
        int speed_temp = speed;
        if (speed_temp >= 0) {
          this->setPwm(pp, 0, speed_temp);
          this->setPwm(pn, 0, 0);
        } else {
            this->setPwm(pp, 0, 0);
            this->setPwm(pn, 0, -speed_temp);
        }
      } 
    }   
  }
}

void MarsRover_Motor::motorSpeedDual(Motors index_left, int speed_left, Motors index_right, int speed_right)
{
  motorSpeed(index_left, speed_left);
  motorSpeed(index_right, speed_right);
}

void MarsRover_Motor::motorStop(Motors index)
{
  motorSpeed(index, 0);
}
  
void MarsRover_Motor::motorRun(Motors index, int speed, Dir direction)
{
  if (!initialized) {
    this->initPCA9685();
  }

  speed = speed * 16 * direction; // map 255 to 4096
  if (speed >= 4096) {
    speed = 4095;
  }
  if (speed <= -4096) {
    speed = -4095;
  }
  if (index > 9 || index <= 0)
    return;

  int pp, pn;
  for(int i = (index == 9? 1 : index); i <= (index == 9? index - 1 : index); i++)
  {
    pp = (i - 1) * 2;
    pn = (i - 1) * 2 + 1;

    if (i != 5 && i != 6){
      if (i == 4 || i == 2 || i == 8) {
        int speed_temp = -speed;
        if (speed_temp >= 0) {
          this->setPwm(pp, 0, speed_temp);
          this->setPwm(pn, 0, 0);
        } else {
            this->setPwm(pp, 0, 0);
            this->setPwm(pn, 0, -speed_temp);
        }
      } else {
        int speed_temp = speed;
        if (speed_temp >= 0) {
          this->setPwm(pp, 0, speed_temp);
          this->setPwm(pn, 0, 0);
        } else {
            this->setPwm(pp, 0, 0);
            this->setPwm(pn, 0, -speed_temp);
        }
      } 
    }   
  }
}


void MarsRover_Motor::clawMotorSpeed(Claw_Motor index,  int speed)
{
  if (!initialized) {
    this->initPCA9685();
  }
  
  speed = speed * 16; // map 255 to 4096
  if (speed >= 4096) {
    speed = 4095;
  }
  if (speed <= -4096) {
    speed = -4095;
  }
  if (index != 6)
    return;
  
  int pp = (index - 1) * 2;
  int pn = (index - 1) * 2 + 1;

  if (speed >= 0) {
    this->setPwm(pp, 0, speed);
    this->setPwm(pn, 0, 0);
  } else {
      this->setPwm(pp, 0, 0);
      this->setPwm(pn, 0, -speed);
  }
}

void MarsRover_Motor::clawMotorStop(Claw_Motor index)
{
  clawMotorSpeed(index, 0);
}


void MarsRover_Motor::servoAngle(Servos index, int degree)
{
  if (!initialized) {
    this->initPCA9685();
  }
  // 100hz
  uint32_t v_us = (degree * 1800 / 180 + 600); // 0.6ms ~ 2.4ms
  uint32_t value = v_us * 4096 / (1000000 / 50);

  if (index > 3 || index <= 0){
    return;
  }

  for(int i = (index == 3? 1 : index); i <= (index == 3? index - 1 : index); i++)
  {
    this->setPwm(i + 7, 0, value);
  }
}

void MarsRover_Motor::servoSpeed(Servos index, int degree_start, int degree_end, int speed)
{
  if (!initialized) {
    this->initPCA9685();
  }

  if (index > 3 || index <= 0){
    return;
  }
    
  // 100hz
  for(int i = (index == 3? 1 : index); i <= (index == 3? index - 1 : index); i++)
  {
    if (degree_start <= degree_end) {
      for (int j = degree_start; j <= degree_end; j++){
        uint32_t v_us = (j * 1800 / 180 + 600); // 0.6ms ~ 2.4ms
        uint32_t value = v_us * 4096 / (1000000 / 50);
        delay(3 * (10 - speed));
        this->setPwm(index + 7, 0, value);
      }
    }
    else{
      for (int j = degree_start; j >= degree_end; j--){
        uint32_t v_us = (j * 1800 / 180 + 600); // 0.6ms ~ 2.4ms
        uint32_t value = v_us * 4096 / (1000000 / 50);
        delay(3 * (10 - speed));
        this->setPwm(index + 7, 0, value);
      }
    }
  }
}


void MarsRover_Motor::i2cWriteBuffer(int addr, unsigned char *p, int len)
{
  Wire.beginTransmission(addr);
  for(int i=0; i<len; i++)
    Wire.write((uint8_t)p[i]);
  Wire.endTransmission();
}

void MarsRover_Motor::i2cWrite(int addr, int reg, int value)
{
  Wire.beginTransmission(addr);
  Wire.write(reg);
  Wire.write(value);
  Wire.endTransmission();
}

int MarsRover_Motor::i2cRead(int addr, int reg)
{
  uint8_t data;
  Wire.beginTransmission(addr);
  Wire.write(reg);
  Wire.endTransmission();
  Wire.requestFrom(addr, 1);
  data = Wire.read();
  return data;
}

void MarsRover_Motor::initPCA9685()
{
  Wire.begin();
  this->i2cWrite(PCA9685_ADDRESS, MODE1, 0x00);
  this->setFreq(50);
  this->initialized = true;//Serial.println("ss");
  
}

void MarsRover_Motor::setFreq(int freq)
{
  uint32_t prescaleval = 25000000;
  prescaleval /= 4096;
  prescaleval /= freq;
  prescaleval -= 1;

  uint32_t prescale = prescaleval;//Math.floor(prescaleval + 0.5);
  uint8_t oldmode = this->i2cRead(PCA9685_ADDRESS, MODE1);
  uint8_t newmode = (oldmode & 0x7F) | 0x10; // sleep
  this->i2cWrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
  this->i2cWrite(PCA9685_ADDRESS, PRESCALE, 0x84); // set the prescaler
  this->i2cWrite(PCA9685_ADDRESS, MODE1, oldmode);
  delayMicroseconds(5000);
  this->i2cWrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
}

void MarsRover_Motor::setPwm(int channel, int on, int off)
{
  if (channel < 0 || channel > 15)
    return;

  unsigned char buf[5];
  buf[0] = LED0_ON_L + 4 * channel;
  buf[1] = on & 0xff;
  buf[2] = (on >> 8) & 0xff;
  buf[3] = off & 0xff;
  buf[4] = (off >> 8) & 0xff;
  this->i2cWriteBuffer(PCA9685_ADDRESS, buf, 5);
}