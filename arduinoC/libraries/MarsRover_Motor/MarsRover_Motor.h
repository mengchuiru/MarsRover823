#ifndef WS_MarsRover_Motor_H
#define WS_MarsRover_Motor_H
#include <Arduino.h>
#include <Wire.h>


#define PCA9685_ADDRESS   0x40
#define MODE1   0x00
#define MODE2   0x01
#define SUBADR1   0x02
#define SUBADR2   0x03
#define SUBADR3   0x04
#define PRESCALE   0xFE
#define LED0_ON_L   0x06
#define LED0_ON_H   0x07
#define LED0_OFF_L   0x08
#define LED0_OFF_H   0x09
#define ALL_LED_ON_L   0xFA
#define ALL_LED_ON_H   0xFB
#define ALL_LED_OFF_L   0xFC
#define ALL_LED_OFF_H   0xFD

#define STP_CHA_L   2047
#define STP_CHA_H   4095

#define STP_CHB_L   1
#define STP_CHB_H   2047

#define STP_CHC_L   1023
#define STP_CHC_H   3071

#define STP_CHD_L   3071
#define STP_CHD_H   1023


/**
* The user selects the 6-way dc motor.
*/
enum Motors {
  M1 = 0x3,
  M2 = 0x1,
  M3 = 0x7,
  M4 = 0x4,
  M5 = 0x2,
  M6 = 0x8,
  ALL_MOTORS = 0x9,
};


/**
* The user defines the motor rotation direction.
*/
enum Dir {
  //% blockId="CW" block="CW"
  CW = 1,
  //% blockId="CCW" block="CCW"
  CCW = -1,
};


/**
* The user selects the 1-way dc motor for claw or other expanded applications.
*/
enum Claw_Motor {
  M7 = 0x6,
};


/**
* The user can select the 4 steering gear controller.
*/
enum Servos {
  S1 = 0x01,
  S2 = 0x02,
  ALL_SERVOS = 0x03,
};


class MarsRover_Motor
{
  public:
 
  MarsRover_Motor();
  ~MarsRover_Motor();
  
  void    motorSpeed(Motors index,  int speed),
          motorSpeedDual(Motors index_left, int speed_left, Motors index_right, int speed_right),
          motorRun(Motors index,  int speed, Dir direction),
          motorStop(Motors index),
          clawMotorSpeed(Claw_Motor index,  int speed),
          clawMotorStop(Claw_Motor index),
          servoAngle(Servos index, int degree),
          servoSpeed(Servos index, int degree_start, int degree_end, int speed);

  private:
  
  int    i2cRead(int addr, int reg);
  
  void   i2cWrite(int addr, int reg, int value),
         i2cWriteBuffer(int addr, unsigned char *p, int len),
         initPCA9685(),
         setFreq(int freq),
         setPwm(int channel, int on, int off);

  bool initialized;

};

#endif
