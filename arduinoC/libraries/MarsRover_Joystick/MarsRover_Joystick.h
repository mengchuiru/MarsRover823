//MarsRover Joystick_I2C
#ifndef WS_MarsRover_Joystick_H
#define WS_MarsRover_Joystick_H

#include <Arduino.h>
#include <stdint.h>
#include <string.h>
#include <Wire.h>


#define JOYSTICK_I2C_ADDR         0x5a
#define JOYSTICK_LEFT_X_REG       0x10
#define JOYSTICK_LEFT_Y_REG       0x11
#define JOYSTICK_RIGHT_X_REG      0x12
#define JOYSTICK_RIGHT_Y_REG      0x13

#define JOYSTICK_BUTTON_LEFT      0x20
#define JOYSTICK_BUTTON_RIGHT     0x21
#define BUTOON_LEFT_REG           0x22
#define BUTOON_RIGHT_REG          0x23
#define	NONE_PRESS                8


/**
* The user selects the rocker of joystick.
*/
enum Rockers {
  Rocker_Left = 0x1,
  Rocker_Right = 0x2,
};


/**
* The user selects the rocker position of joystick.
*/
enum XYaxis {
  //% blockId="X_axis" block="X_axis"
  X_axis = 0,
  //% blockId="Y_axis" block="Y_axis"
  Y_axis = 1,
};


/**
* The user selects the buttons of joystick.
*/
enum Buttons {
  Button_Left = 0x01,
  Button_Right = 0x02,
  Joystick_Left = 0x03,
  Joystick_Right = 0x04,
};


class MarsRover_Joystick 
{
  public:
    MarsRover_Joystick();
    void begin(uint32_t reg = 0x5a); 
    uint8_t getRockerValue(Rockers index, XYaxis axis);  
    uint8_t getButtonStatus(Buttons index); 
    boolean buttonPressed(Buttons index);    
    boolean buttonReleased(Buttons index);   

  private:
    uint8_t Joystick_Addr;
    uint8_t ReadByte(uint8_t reg);
    boolean WireWriteByte(uint8_t val);
    boolean WireWriteDataArray(uint8_t reg, uint8_t *val, unsigned int len);
    int WireReadDataArray(uint8_t reg, uint8_t *val, unsigned int len);
};

#endif
