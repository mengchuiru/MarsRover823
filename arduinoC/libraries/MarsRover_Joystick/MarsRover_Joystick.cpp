#include "MarsRover_Joystick.h"
#include "Wire.h"


MarsRover_Joystick::MarsRover_Joystick()
{
    Joystick_Addr = 0x5a;
    Wire.begin();
}

void MarsRover_Joystick::begin(uint32_t reg)
{
    Joystick_Addr = reg;
    Wire.begin();
}


boolean MarsRover_Joystick::WireWriteByte(uint8_t val)
{
    Wire.beginTransmission(Joystick_Addr);
    Wire.write(val);
    if( Wire.endTransmission() != 0 ) {
        return false;
    }
    return true;
}

boolean MarsRover_Joystick::WireWriteDataArray(uint8_t reg, uint8_t *val, unsigned int len)
{
    unsigned int i;
    Wire.beginTransmission(Joystick_Addr);
    Wire.write(reg);
    for(i = 0; i < len; i++) {
        Wire.write(val[i]);
    }
    if( Wire.endTransmission() != 0 ) {
        return false;
    }
    return true;
}

int MarsRover_Joystick::WireReadDataArray(uint8_t reg, uint8_t *val, unsigned int len)
{
    unsigned char i = 0;  
    /* Indicate which register we want to read from */
    if (!WireWriteByte(reg)) {
        return -1;
    }
    Wire.requestFrom(Joystick_Addr, len);
    while (Wire.available()) {
        if (i >= len) {
            return -1;
        }
        val[i] = Wire.read();
        i++;
    }
    /* Read block data */    
    return i;
}

uint8_t MarsRover_Joystick::ReadByte(uint8_t reg)
{
    byte d[1];
    WireReadDataArray(reg, d, 1);
    return d[0];
}


uint8_t MarsRover_Joystick::getRockerValue(Rockers index, XYaxis axis)
{
    if (index == 1){
        if (axis == 0){
            return ReadByte(JOYSTICK_LEFT_X_REG);
        }else{
            return ReadByte(JOYSTICK_LEFT_Y_REG);
        }
    }
    else{
        if (axis == 0){
            return ReadByte(JOYSTICK_RIGHT_X_REG);
        }else{
            return ReadByte(JOYSTICK_RIGHT_Y_REG);
        }
    }
}


uint8_t MarsRover_Joystick::getButtonStatus(Buttons index)
{
    switch(index) {
        case 1: 
            return ReadByte(BUTOON_LEFT_REG);
        case 2: 
            return ReadByte(BUTOON_RIGHT_REG);
        case 3: 
            return ReadByte(JOYSTICK_BUTTON_LEFT);
        case 4: 
            return ReadByte(JOYSTICK_BUTTON_RIGHT);
        default:
            return 0xff;
    }
}

boolean MarsRover_Joystick::buttonPressed(Buttons index)
{
    if(getButtonStatus(index) != NONE_PRESS && getButtonStatus(index) != 0xff)
    {
        return true;
    }
    return false;    
}

boolean MarsRover_Joystick::buttonReleased(Buttons index) 
{
    if(getButtonStatus(index) == NONE_PRESS)
    {
        return true;
    }
    return false;   
}
