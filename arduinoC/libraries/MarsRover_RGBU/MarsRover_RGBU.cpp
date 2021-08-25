#include "MarsRover_RGBU.h"
#include <Arduino.h>

#if defined(ESP_PLATFORM)
#include "pins_arduino.h"
#endif

MarsRover_RGBU::MarsRover_RGBU()
{

}

void MarsRover_RGBU::begin(int signal_pin)
{
    SignalPin = signal_pin;
}

uint32_t MarsRover_RGBU::getDistanceCM()
{
    float distance;
    long duration;
    pinMode(SignalPin, OUTPUT);
    digitalWrite(SignalPin, LOW);
    delayMicroseconds(2);
    digitalWrite(SignalPin, HIGH);
    delayMicroseconds(20);
    digitalWrite(SignalPin, LOW);
    pinMode(SignalPin, INPUT);
    //duration = PulseIn(SignalPin, HIGH);
    duration = rgbuPulseIn(SignalPin, HIGH);

    if ((duration < 60000) && (duration > 1)) {
        distance = duration / 58.00;
    }
    return distance;
}

uint64_t MarsRover_RGBU::rgbuPulseIn(uint32_t pin, uint32_t value, long maxDuration)
{
    int pulse = value == HIGH ? 1 : 0;
    uint64_t tick = micros();
    uint64_t maxd = (uint64_t)maxDuration;
    while (digitalRead(pin) != pulse)
    {
        if (micros() - tick > maxd)
        return 0;
    }
    uint64_t start = micros();
    while (digitalRead(pin) == pulse)
    {
        if (micros() - tick > maxd)
            return 0;
    }
    uint64_t end = micros();
    return end - start;
}
