// Joystick Handle
enum ROCKER_PIN{
    //% block="left"
    Rocker_Left,
    //% block="right" 
    Rocker_Right
}

enum XY_AXIS{
    //% block="X-axis"
    X_axis,
    //% block="Y-axis"
    Y_axis
}

enum BUTTON_PIN{
    //% block="left"
    Button_Left,
    //% block="right" 
    Button_Right,
    //% block="left rocker"
    Joystick_Left,
    //% block="right rocker" 
    Joystick_Right
}

enum BUTTON_STATE{
    //% block="pressed"
    0,
    //% block="released" 
    1
}



// RGBs On MarsRover
enum RGBS_SN {
    //% block="1"
    0,
    //% block="2"
    1,
    //% block="3"
    2,
    //% block="4"
    3,
    //% block="all"
    4 
}

enum RGBS_SPECIAL_EFFECT {
    //% block="Rotating rainbow"
    1,
    //% block="None"
    0
}


// LCD1602 Screen
enum LCD_BACKLIGHT {
    //% block="Open"
    0,
    //% block="Close"
    1 
}

enum LCD_SCREEN {
    //% block="Clear"
    0,
    //% block="Open"
    1,
    //% block="Close"
    2 
}

enum LCD_SPECIAL_EFFECT {
    //% block="scroll left"
    0,
    //% block="scroll right"
    1 
}


// DC Motors
enum MOTOR_PIN {
    //% block="M1"
    M1 
    //% block="M2"
    M2 
    //% block="M3"
    M3 
    //% block="M4"
    M4 
    //% block="M5"
    M5 
    //% block="M6"
    M6
    //% block="all"
    ALL_MOTORS
}

enum MOTOR_PIN_LEFT {
    //% block="M1"
    M1 
    //% block="M2"
    M2 
    //% block="M3"
    M3
}

enum MOTOR_PIN_RIGHT {
    //% block="M4"
    M4
    //% block="M5"
    M5 
    //% block="M6"
    M6
     
}

enum MOTOR_LF {
    //% block="M1"
    M1 
}

enum MOTOR_LM {
    //% block="M2"
    M2 
}

enum MOTOR_LR{
    //% block="M3"
    M3 
}

enum MOTOR_RF{
    //% block="M4"
    M4 
}

enum MOTOR_RM{
    //% block="M5"
    M5 
}

enum MOTOR_RR{
    //% block="M6"
    M6 
}

enum MOTOR_DIRECTION {
    //% block="CW"
    CW 
    //% block="CCW"
    CCW 
}


// Claw Motor
enum CLAW_MOTOR_PIN {
    //% block="M7"
    M7
}


// Servos
enum SERVO_PIN {
    //% block="S1"
    S1 
    //% block="S2"
    S2 
    //% block="all"
    ALL_SERVOS 
}


// RGB Ultrasonic
enum RGBU_COLORS {
    //% block=red
    0xFF0000,
    //% block=orange
    0xFFA500,
    //% block=yellow
    0xFFFF00,
    //% block=green
    0x00FF00,
    //% block=blue
    0x0000FF,
    //% block=indigo
    0x4b0082,
    //% block=Purple
    0xFF00FF,
    //% block=white
    0xFFFFFF,
    //% block=black
    0x000000
}

enum RGBU_INDEX {
    //% block=all
    0,
    //% block=left
    1,
    //% block=right
    2
}

enum RGBU_SPECIAL_EFFECT {
    //% block=Blink
    1,
    //% block=None
    0
}


// DHT Sensor
enum DHT_MODE {
    //% block=DHT11
    0,
    //% block=DHT22
    1
}

enum DHT_VALUES {
    //% block=temperature(℃)
    0,
    //% block=humidity(%rh)
    1
}


// Soil_Moisture


// Human_Pyroelectric_Infrared


// Rotary_Potentiometer



//% color="#FF3333" iconWidth=50 iconHeight=40
namespace Mars_Rover {

    // Joystick Handle----------

    //% block="Initialize joystick handle IIC address [JOYSTICK_ADDRESS]" blockType="command"
    //% JOYSTICK_ADDRESS.shadow="number"  JOYSTICK_ADDRESS.defl="0x5a" 

    export function setJoystickAddress(parameter: any, block: any) {
        let joystickAddress = parameter.JOYSTICK_ADDRESS.code;
        Generator.addInclude("MarsRover_Joystick", '#include "MarsRover_Joystick.h"');
        Generator.addObject( `MarsRover_Joystick`,`MarsRover_Joystick`, `joystick;`);
        Generator.addSetup( `mrJoystickBegin`,`joystick.begin(${joystickAddress});`);
    }

    //% block="Set buzzer on joystick handle pin [BUZZER_PIN]" blockType="command"
    //% BUZZER_PIN.shadow="dropdown" BUZZER_PIN.options="PIN_BUZZER_MUSIC" 

    export function setBuzzerPin(parameter: any, block: any) {
        let buzzerPin = parameter.BUZZER_PIN.code;
        //Generator.addInclude("Microbit_Sound", '#include <Microbit_Sound.h>');
        //Generator.addObject(`Microbit_Sound`,`Microbit_Sound`, `MSound;`);
        Generator.addSetup(`buzzerPinMode`,`pinMode(${buzzerPin},OUTPUT);`);
    }

    //% block="Set micro-motor on joystick handle pin [MICROMOTOR_PIN] vibration frequency [VIBRATION_FREQUENCY]" blockType="command"
    //% MICROMOTOR_PIN.shadow="dropdown" MICROMOTOR_PIN.options="PIN_VIBRATION_MOTOR" 
    //% VIBRATION_FREQUENCY.shadow="range" VIBRATION_FREQUENCY.params.min=0  VIBRATION_FREQUENCY.params.max=1023  VIBRATION_FREQUENCY.defl=666
    
    export function setMicroMotorFrequency(parameter: any, block: any) {
        let microMotorPin = parameter.MICROMOTOR_PIN.code;
        let vibrationFrequency = parameter.VIBRATION_FREQUENCY.code;
        Generator.addSetup(`vibrationPinMode`,`pinMode(${microMotorPin},OUTPUT);`);
        Generator.addCode(`analogWrite(${microMotorPin},${vibrationFrequency});`);
    }

    //% block="Read joystick handle [ROCKER_PIN] rocker [XY_AXIS] analog value" blockType="reporter"
    //% ROCKER_PIN.shadow="dropdown" ROCKER_PIN.options="ROCKER_PIN" 
    //% XY_AXIS.shadow="dropdown" XY_AXIS.options="XY_AXIS" 

    export function setRockerAnalogValue(parameter: any, block: any) {
        let rockerPin = parameter.ROCKER_PIN.code;
        let xyAxis = parameter.XY_AXIS.code;
        Generator.addCode(`joystick.getRockerValue(${rockerPin},${xyAxis})`);
    }

    //% block="Joystick handle [BUTTON_PIN] button is [BUTTON_STATE]" blockType="boolean"
    //% BUTTON_PIN.shadow="dropdown" BUTTON_PIN.options="BUTTON_PIN" 
    //% BUTTON_STATE.shadow="dropdown" BUTTON_STATE.options="BUTTON_STATE" 

    export function setButtonState(parameter: any, block: any) {
        let buttonPin = parameter.BUTTON_PIN.code;
        let buttonState = parameter.BUTTON_STATE.code;
        if (buttonState == 0){
            Generator.addCode(`joystick.buttonPressed(${buttonPin})`);
        }else {
            Generator.addCode(`joystick.buttonReleased(${buttonPin})`);
        }
        
    }


    //% block="---"
    export function setSpace1() {

    }


    // // RGBs On MarsRover----------

    //% block="Initialize RGBs on MarsRover board pin [RGBS_PIN]" blockType="command"
    //% RGBS_PIN.shadow="dropdown" RGBS_PIN.options="PIN_RGBS_ONBOARD" 

    export function setRgbsPin(parameter: any, block: any) {
        let rgbsPin = parameter.RGBS_PIN.code;
        Generator.addInclude("DFRobot_NeoPixel", "#include <DFRobot_NeoPixel.h>");
        Generator.addObject( `DFRobot_NeoPixel_11`,`DFRobot_NeoPixel`, `neopixel_11;`);
        Generator.addSetup( `rgbOnboardBegin`,`neopixel_11.begin(11, 4, 255);`);
    }

    //% block="Set RGBs onboard brightness [RGBS_BRIGHTNESS]" blockType="command"
    //% RGBS_BRIGHTNESS.shadow="range"  RGBS_BRIGHTNESS.params.min=0  RGBS_BRIGHTNESS.params.max=255  RGBS_BRIGHTNESS.defl=255
    
    export function setRgbsBrightness(parameter: any, block: any) {
        let rgbsBrightness = parameter.RGBS_BRIGHTNESS.code;
        Generator.addCode(`neopixel_11.setBrightness(${rgbsBrightness});`);
    }

    //% block="RGBs onboard display special effect [RGBS_SPECIAL_EFFECT]" blockType="command"
    //% RGBS_SPECIAL_EFFECT.shadow="dropdown"  RGBS_SPECIAL_EFFECT.options="RGBS_SPECIAL_EFFECT"

    export function setRgbsSpecialEffect(parameter: any, block: any) {
        let rgbsSpecialEffect = parameter.RGBS_SPECIAL_EFFECT.code;
        if  (rgbsSpecialEffect == 1) {
            Generator.addInclude("int_timer", "#define timer 300");

            Generator.addCode(`neopixel_11.setRangeColor(0, 0, 0xFFFFFF);`);
            Generator.addCode(`delay(timer+1000);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(1, 1, 0xFF0000);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(2, 2, 0xFF7D00);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(3, 3, 0xFFFF00);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(0, 0, 0x00FF00);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(1, 1, 0x0000FF);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(2, 2, 0x00FFFF);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`neopixel_11.setRangeColor(3, 3, 0xFF00FF);`);
            Generator.addCode(`delay(timer);`);

            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`delay(timer+500);`);

            Generator.addCode(`neopixel_11.setRangeColor(0, 0, 0xFFFFFF);`);
            Generator.addCode(`neopixel_11.setRangeColor(1, 1, 0xFF0000);`);
            Generator.addCode(`neopixel_11.setRangeColor(2, 2, 0x00FF00);`);
            Generator.addCode(`neopixel_11.setRangeColor(3, 3, 0x0000FF);`);
            Generator.addCode(`delay(timer+1000);`);
            
            Generator.addCode(`neopixel_11.clear();`);
            Generator.addCode(`delay(timer+500);`);
        }
    }

    //% block="RGB[RGBS_SN] onboard show color [RGBS_COLOR]" blockType="command"
    //% RGBS_SN.shadow="dropdownRound" RGBS_SN.options="RGBS_SN" RGBS_SN.defl="0"
    //% RGBS_COLOR.shadow="colorPalette" 

    export function setRgbsColor(parameter: any, block: any) {
        let rgbsSN = parameter.RGBS_SN.code;
        let rgbsColor = parameter.RGBS_COLOR.code;
        if  (rgbsSN == 4) {
            Generator.addCode(`neopixel_11.setRangeColor(0, 3, ${rgbsColor});`);
        }
        else{
            Generator.addCode(`neopixel_11.setRangeColor(${rgbsSN}, ${rgbsSN}, ${rgbsColor});`);
        }
    }

    //% block="red [RED_VALUE] green [GREEN_VALUE] blue [BLUE_VALUE]" blockType="reporter"
    //% RED_VALUE.shadow="range"  RED_VALUE.params.min=0  RED_VALUE.params.max=255  RED_VALUE.defl=255
    //% GREEN_VALUE.shadow="range"  GREEN_VALUE.params.min=0  GREEN_VALUE.params.max=255  GREEN_VALUE.defl=255
    //% BLUE_VALUE.shadow="range"  BLUE_VALUE.params.min=0 BLUE_VALUE.params.max=255 BLUE_VALUE.defl=255

    export function setRgbsValue(parameter: any, block: any) {
        let redValue = parameter.RED_VALUE.code;
        let greenValue = parameter.GREEN_VALUE.code;
        let blueValue = parameter.BLUE_VALUE.code;
        Generator.addCode(`neopixel_11.rgbToColor(round(${redValue}), round(${greenValue}), round(${blueValue}))`);
    }

    
    //% block="RGBs onboard shift pixels by [SHIFT_VALUE]" blockType="command"
    //% SHIFT_VALUE.shadow="range"  SHIFT_VALUE.params.min=0  SHIFT_VALUE.params.max=3  SHIFT_VALUE.defl=1

    export function setRgbsShiftValue(parameter: any, block: any) {
        let shiftValue = parameter.SHIFT_VALUE.code;
        Generator.addCode(`neopixel_11.shift(${shiftValue});`);
    }

    //% block="RGBs onboard rotate pixels by [ROTATE_VALUE]" blockType="command"
    //% ROTATE_VALUE.shadow="range"  ROTATE_VALUE.params.min=0  ROTATE_VALUE.params.max=3  ROTATE_VALUE.defl=1

    export function setRgbsRotateValue(parameter: any, block: any) {
        let rotateValue = parameter.ROTATE_VALUE.code;
        Generator.addCode(`neopixel_11.rotate(${rotateValue});`);
    }

    //% block="Turn off RGBs onboard" blockType="command"

    export function setRgbsClearEffect(parameter: any, block: any) {
        Generator.addCode(`neopixel_11.clear();`);
    }


    //% block="---"
    export function setSpace2() {

    }


    // LCD1602 Screen----------

    //% block="Initialize LCD1602 screen IIC address [LCD_ADDRESS]" blockType="command"
    //% LCD_ADDRESS.shadow="number"  LCD_ADDRESS.defl="0x27" 

    export function setLcdAddress(parameter: any, block: any) {
        let lcdAddress = parameter.LCD_ADDRESS.code;
        Generator.addInclude("MarsRover_LCD1602", '#include "MarsRover_LCD1602.h"');
        Generator.addObject( `MarsRover_LCD1602`,`MarsRover_LCD1602`, `lcd1602;`);
        Generator.addSetup( `mrLcd1602Begin`,`lcd1602.begin(${lcdAddress});`);
    }

    //% block="[LCD_BACKLIGHT] LCD1602 back light" blockType="command"
    //% LCD_BACKLIGHT.shadow="dropdown" LCD_BACKLIGHT.options="LCD_BACKLIGHT" LCD_BACKLIGHT.defl="0"

    export function setLcdBackLight(parameter: any, block: any) {
        let lcdBackLight = parameter.LCD_BACKLIGHT.code;
        if (lcdBackLight == 0){
            Generator.addCode( `lcd1602.backlight();`);
        }else{
            Generator.addCode( `lcd1602.noBacklight();`);
        }
    }

    //% block="[LCD_SCREEN] LCD1602 screen" blockType="command"
    //% LCD_SCREEN.shadow="dropdown" LCD_SCREEN.options="LCD_SCREEN" LCD_SCREEN.defl="0"

    export function setLcdScreen(parameter: any, block: any) {
        let lcdScreen = parameter.LCD_SCREEN.code;
        if (lcdScreen == 0){
            Generator.addCode( `lcd1602.clear();`);
        } else if (lcdScreen == 1){
            Generator.addCode( `lcd1602.display();`);
          
        } else{
            Generator.addCode( `lcd1602.noDisplay();`);
        }
    }

    //% block="Set LCD1602 cursor column [LCD_COLUMN] row [LCD_ROW] display [LCD_STRING]" blockType="command"
    //% LCD_COLUMN.shadow="range"  LCD_COLUMN.params.min=0  LCD_COLUMN.params.max=15  LCD_COLUMN.defl=0
    //% LCD_ROW.shadow="range"  LCD_ROW.params.min=0  LCD_ROW.params.max=1  LCD_ROW.defl=0
    //% LCD_STRING.shadow="string"  LCD_STRING.defl="Mars Lab"
    
    export function setLcdString(parameter: any, block: any) {
        let lcdRow = parameter.LCD_ROW.code;
        let lcdColumn = parameter.LCD_COLUMN.code;
        let lcdString = parameter.LCD_STRING.code;
        Generator.addCode( `lcd1602.setCursor(${lcdColumn},${lcdRow});`);
        Generator.addCode( `lcd1602.print(${lcdString});`);
    } 

    //% block="Set LCD1602 display [LCD_SPECIAL_EFFECT]" blockType="command"
    //% LCD_SPECIAL_EFFECT.shadow="dropdown" LCD_SPECIAL_EFFECT.options="LCD_SPECIAL_EFFECT" LCD_SPECIAL_EFFECT.defl="0"

    export function setLcdSpecialEffect(parameter: any, block: any) {
        let lcdSpecialEffect = parameter.LCD_SPECIAL_EFFECT.code;
        if (lcdSpecialEffect == 0){
            Generator.addCode( `lcd1602.scrollDisplayLeft();`);
        } else {
            Generator.addCode( `lcd1602.scrollDisplayRight();`);
        }
    }


    //% block="---"
    export function setSpace3() {

    }


    // DC Motors----------

    //% block="Initialize motor pins LF[MOTOR_LF] LM[MOTOR_LM] LR[MOTOR_LR] RF[MOTOR_RF] RM[MOTOR_RM] RR[MOTOR_RR]" blockType="command"
    //% MOTOR_LF.shadow="dropdown" MOTOR_LF.options="MOTOR_LF" 
    //% MOTOR_LM.shadow="dropdown" MOTOR_LM.options="MOTOR_LM" 
    //% MOTOR_LR.shadow="dropdown" MOTOR_LR.options="MOTOR_LR" 
    //% MOTOR_RF.shadow="dropdown" MOTOR_RF.options="MOTOR_RF"
    //% MOTOR_RM.shadow="dropdown" MOTOR_RM.options="MOTOR_RM" 
    //% MOTOR_RR.shadow="dropdown" MOTOR_RR.options="MOTOR_RR"
    
    export function setMotorPins(parameter: any, block: any) {
        Generator.addInclude("MarsRover_Motor", '#include "MarsRover_Motor.h"');
        Generator.addObject( `MarsRover_Motor`,`MarsRover_Motor`, `motor;`);
    }

    //% block="Motor[MOTOR_PIN] rotate[DIRECTION] at speed[SPEED]" blockType="command"
    //% MOTOR_PIN.shadow="dropdown" MOTOR_PIN.options="MOTOR_PIN" 
    //% DIRECTION.shadow="dropdown" DIRECTION.options="MOTOR_DIRECTION"
    //% SPEED.shadow="range"  SPEED.params.min=0  SPEED.params.max=255  SPEED.defl=100
    
    export function setMotorRun(parameter: any, block: any) {
        let motorPin = parameter.MOTOR_PIN.code;
        let speed = parameter.SPEED.code;
        let direction = parameter.DIRECTION.code;
        Generator.addCode( `motor.motorRun(${motorPin}, ${speed}, ${direction});`);
    }

    //% block="Motor[MOTOR_PIN] speed[SPEED]" blockType="command"
    //% MOTOR_PIN.shadow="dropdown" MOTOR_PIN.options="MOTOR_PIN" 
    //% SPEED.shadow="range"  SPEED.params.min=-255  SPEED.params.max=255  SPEED.defl=100
    
    export function setMotorSpeed(parameter: any, block: any) {
        let motorPin = parameter.MOTOR_PIN.code;
        let speed = parameter.SPEED.code;
        Generator.addCode( `motor.motorSpeed(${motorPin}, ${speed});`);
    }

    //% block="Motor[MOTOR_PIN_LEFT] speed[SPEED_LEFT]  [MOTOR_PIN_RIGHT] speed[SPEED_RIGHT]"  blockType="command"
    //% MOTOR_PIN_LEFT.shadow="dropdown" MOTOR_PIN_LEFT.options="MOTOR_PIN_LEFT" 
    //% SPEED_LEFT.shadow="range"  SPEED_LEFT.params.min=-255  SPEED_LEFT.params.max=255  SPEED_LEFT.defl=100
    //% MOTOR_PIN_RIGHT.shadow="dropdown" MOTOR_PIN_RIGHT.options="MOTOR_PIN_RIGHT"
    //% SPEED_RIGHT.shadow="range"  SPEED_RIGHT.params.min=-255  SPEED_RIGHT.params.max=255  SPEED_RIGHT.defl=100
    
    export function setMotorSpeedDual(parameter: any, block: any) {
        let motorPinLeft = parameter.MOTOR_PIN_LEFT.code;
        let speed_left = parameter.SPEED_LEFT.code;
        let motorPinRight = parameter.MOTOR_PIN_RIGHT.code;
        let speed_right = parameter.SPEED_RIGHT.code;
        Generator.addCode( `motor.motorSpeedDual(${motorPinLeft}, ${speed_left}, ${motorPinRight}, ${speed_right});`);
    }

    //% block="Motor[MOTOR_PIN] stop" blockType="command"
    //% MOTOR_PIN.shadow="dropdown" MOTOR_PIN.options="MOTOR_PIN"  MOTOR_PIN.defl="ALL"
    
    export function setMotorStop(parameter: any, block: any) {
        let motorPin = parameter.MOTOR_PIN.code;
        Generator.addCode( `motor.motorStop(${motorPin});`);
    }
    

    //% block="---"
    export function setSpace4() {

    }


    // Claw Motor----------

    //% block="Claw motor[CLAW_MOTOR_PIN] speed[SPEED] wait [TIME] seconds" blockType="command"
    //% CLAW_MOTOR_PIN.shadow="dropdown" CLAW_MOTOR_PIN.options="CLAW_MOTOR_PIN" 
    //% SPEED.shadow="range"  SPEED.params.min=-255  SPEED.params.max=255  SPEED.defl=100
    //% TIME.shadow="number" TIME.defl="1" 
    
    export function setClawMotorSpeed(parameter: any, block: any) {
        let clawMotorPin = parameter.CLAW_MOTOR_PIN.code;
        let speed = parameter.SPEED.code;
        let time = parameter.TIME.code * 1000;
        Generator.addInclude("MarsRover_Motor", '#include "MarsRover_Motor.h"');
        Generator.addObject( `MarsRover_Motor`,`MarsRover_Motor`, `motor;`);
        Generator.addCode(`motor.clawMotorSpeed(${clawMotorPin}, ${speed});`);
        Generator.addCode(`delay(${time});`);
    }

    //% block="Claw motor[CLAW_MOTOR_PIN] stop" blockType="command"
    //% CLAW_MOTOR_PIN.shadow="dropdown" CLAW_MOTOR_PIN.options="CLAW_MOTOR_PIN"  
    
    export function setClawMotorStop(parameter: any, block: any) {
        let clawMotorPin = parameter.CLAW_MOTOR_PIN.code;
        Generator.addInclude("MarsRover_Motor", '#include "MarsRover_Motor.h"');
        Generator.addObject( `MarsRover_Motor`,`MarsRover_Motor`, `motor;`);
        Generator.addCode( `motor.clawMotorStop(${clawMotorPin});`);
    }


    //% block="---"
    export function setSpace5() {

    }


    // Servos----------

    //% block="Set servo[SERVO_PIN] to angle[DEGREE]" blockType="command"
    //% SERVO_PIN.shadow="dropdown" SERVO_PIN.options="SERVO_PIN" 
    //% DEGREE.shadow="angle" DEGREE.params.edge=1
    
    export function setServoAngle(parameter: any, block: any) {
        let servoPin = parameter.SERVO_PIN.code;
        let degree = parameter.DEGREE.code;
        Generator.addInclude("MarsRover_Motor", '#include "MarsRover_Motor.h"');
        Generator.addObject( `MarsRover_Motor`,`MarsRover_Motor`, `motor;`);
        Generator.addCode( `motor.servoAngle(${servoPin}, ${degree});`);
    }

    //% block="Set servo[SERVO_PIN] from angle[STAR_DEGREE] to angle[END_DEGREE] at speed[SERVO_SPEED]" blockType="command"
    //% SERVO_PIN.shadow="dropdown" SERVO_PIN.options="SERVO_PIN" 
    //% STAR_DEGREE.shadow="angle" STAR_DEGREE.params.edge=1  STAR_DEGREE.defl=0
    //% END_DEGREE.shadow="angle" END_DEGREE.params.edge=1  END_DEGREE.defl=180
    //% SERVO_SPEED.shadow="range"  SERVO_SPEED.params.min=1  SERVO_SPEED.params.max=10  SERVO_SPEED.defl=5
    
    export function setServoAngleSpeed(parameter: any, block: any) {
        let servoPin = parameter.SERVO_PIN.code;
        let starDegree = parameter.STAR_DEGREE.code;
        let endDegree = parameter.END_DEGREE.code;
        let servoSpeed = parameter.SERVO_SPEED.code;
        Generator.addInclude("MarsRover_Motor", '#include "MarsRover_Motor.h"');
        Generator.addObject( `MarsRover_Motor`,`MarsRover_Motor`, `motor;`);
        Generator.addCode( `motor.servoSpeed(${servoPin}, ${starDegree}, ${endDegree}, ${servoSpeed});`);
    }


    //% block="---"
    export function setSpace6() {

    }


    // RGB Ultrasonic----------

    //% block="Ultrasonic [RGBU_INDEX] RGBs show color [RGBU_COLORS] special effect [RGBU_SPECIAL_EFFECT]" blockType="command"
    //% RGBU_INDEX.shadow="dropdown" RGBU_INDEX.options="RGBU_INDEX" 
    //% RGBU_COLORS.shadow="dropdown" RGBU_COLORS.options="RGBU_COLORS" 
    //% RGBU_SPECIAL_EFFECT.shadow="dropdown" RGBU_SPECIAL_EFFECT.options="RGBU_SPECIAL_EFFECT" 

    export function setRgbuColorsEffect(parameter: any, block: any) {
        let rgbuIndex = parameter.RGBU_INDEX.code;
        let rgbuColors = parameter.RGBU_COLORS.code;
        let rgbuSpecialEffect = parameter.RGBU_SPECIAL_EFFECT.code;

        Generator.addInclude("DFRobot_NeoPixel", "#include <DFRobot_NeoPixel.h>");
        Generator.addObject(`DFRobot_NeoPixel_11`,`DFRobot_NeoPixel`, `neopixel_11;`);
        Generator.addSetup(`rgbuBegin`,`neopixel_11.begin(11, 10, 255);`);

        if (rgbuSpecialEffect == 1) {
            Generator.addCode(`for (int i = 0; i < 5; i++) {`);
            if (rgbuIndex == 0) {
                Generator.addCode(`  neopixel_11.setRangeColor(4, 9, ${rgbuColors});`);
                Generator.addCode(`  delay(200);`);
                Generator.addCode(`  neopixel_11.setRangeColor(4, 9, 0x000000);`);
                Generator.addCode(`  delay(200);`);
            }
            else if (rgbuIndex == 1) {
                Generator.addCode(`  neopixel_11.setRangeColor(4, 6, ${rgbuColors});`);
                Generator.addCode(`  delay(200);`);
                Generator.addCode(`  neopixel_11.setRangeColor(4, 6, 0x000000);`);
                Generator.addCode(`  delay(200);`);
            }
            else {
                Generator.addCode(`  neopixel_11.setRangeColor(7, 9, ${rgbuColors});`);
                Generator.addCode(`  delay(200);`);
                Generator.addCode(`  neopixel_11.setRangeColor(7, 9, 0x000000);`);
                Generator.addCode(`  delay(200);`);
            }
            Generator.addCode(`}`);
        }
        else {
            if (rgbuIndex == 0) {
                Generator.addCode(`neopixel_11.setRangeColor(4, 9, ${rgbuColors});`);
            }
            else if (rgbuIndex == 1) {
                Generator.addCode(`neopixel_11.setRangeColor(4, 6, ${rgbuColors});`);
            }
            else {
                Generator.addCode(`neopixel_11.setRangeColor(7, 9, ${rgbuColors});`);
            }
        }
    }

    //% block="Read pin [RGBU_PIN] rgb ultrasonic disrance (cm)" blockType="reporter"
    //% RGBU_PIN.shadow="dropdown" RGBU_PIN.options="PIN_RGB_ULTRASONIC" 

    export function readRgbuDistance(parameter: any, block: any) {
        let rgbuPin = parameter.RGBU_PIN.code;
        Generator.addInclude("MarsRover_RGBU", '#include "MarsRover_RGBU.h"');
        Generator.addObject( `MarsRover_RGBU`,`MarsRover_RGBU`, `rgbu;`);
        Generator.addSetup( `mrRgbuBegin`,`rgbu.begin(${rgbuPin});`);
        Generator.addCode( `rgbu.getDistanceCM()`);
    }


    //% block="---"
    export function setSpace7() {

    }


    // DHT Sensor----------

    //% block="Read pin [DHT_PIN] [DHT_MODE] [DHT_VALUES]" blockType="reporter"
    //% DHT_PIN.shadow="dropdown" DHT_PIN.options="PIN_DigitalWrite" 
    //% DHT_MODE.shadow="dropdown" DHT_MODE.options="DHT_MODE" 
    //% DHT_VALUES.shadow="dropdown" DHT_VALUES.options="DHT_VALUES" 

    export function readDhtValues(parameter: any, block: any) {
        let dhtPin = parameter.DHT_PIN.code;
        let dhtMode = parameter.DHT_MODE.code;
        let dhtValues = parameter.DHT_VALUES.code;
        Generator.addInclude("DFRobot_DHT", '#include <DFRobot_DHT.h>');

        if (dhtMode == 0) {
            Generator.addObject( `DFRobot_DHT`,`DFRobot_DHT`, `dht11_${dhtPin};`);
            Generator.addSetup( `dhtBegin`,`dht11_${dhtPin}.begin(${dhtPin}, DHT11);;`);
            if (dhtValues == 0) {
                Generator.addCode( `dht11_${dhtPin}.getTemperature()`);
            }
            else{
                Generator.addCode( `dht11_${dhtPin}.getHumidity()`);
            }
        }
        else {
            Generator.addObject( `DFRobot_DHT`,`DFRobot_DHT`, `dht22_${dhtPin};`);
            Generator.addSetup( `dhtBegin`,`dht22_${dhtPin}.begin(${dhtPin}, DHT22);;`);
            if (dhtValues == 0) {
                Generator.addCode( `dht22_${dhtPin}.getTemperature()`);
            }
            else{
                Generator.addCode( `dht22_${dhtPin}.getHumidity()`);
            }
        }
    }


    //% block="---"
    export function setSpace8() {

    }


    // Soil_Moisture

    //% block="Read pin [SOIL_PIN] soil moisture analog value" blockType="reporter"
    //% SOIL_PIN.shadow="dropdown" SOIL_PIN.options="PIN_AnalogWrite" 

    export function readSoilMoisture(parameter: any, block: any) {
        let soilPin = parameter.SOIL_PIN.code;
        Generator.addSetup(`soilPinMode_Analog`,`pinMode(${soilPin},INPUT);`);
        Generator.addCode(`analogRead(${soilPin})`);
    }


    //% block="---"
    export function setSpace9() {

    }


    // Rotary_Potentiometer

    //% block="Read pin [ROTARY_PIN] potentiometer rotary anlog value" blockType="reporter"
    //% ROTARY_PIN.shadow="dropdown" ROTARY_PIN.options="PIN_AnalogWrite" 

    export function readRotaryValue(parameter: any, block: any) {
        let rotaryPin = parameter.ROTARY_PIN.code;
        Generator.addSetup(`rotaryPinMode_Analog`,`pinMode(${rotaryPin},INPUT);`);
        Generator.addCode(`analogRead(${rotaryPin})`);
    }
 

    //% block="---"
    export function setSpace10() {

    }


    // Human_Pyroelectric_Infrared

    //% block="Pin [HUMAN_PIN] read human pyroelectric infrared" blockType="boolean"
    //% HUMAN_PIN.shadow="dropdown" HUMAN_PIN.options="PIN_DigitalWrite" 

    export function readHumanInfrared(parameter: any, block: any) {
        let humanPin = parameter.HUMAN_PIN.code;
        Generator.addSetup(`humanPinMode_Digital`,`pinMode(${humanPin},INPUT);`);
        Generator.addCode(`digitalRead(${humanPin})`);
    }

}   