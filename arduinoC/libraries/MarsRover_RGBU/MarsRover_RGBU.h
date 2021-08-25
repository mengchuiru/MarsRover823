#ifndef WS_MarsRover_RGBU_H_
#define WS_MarsRover_RGBU_H_
#include <Arduino.h>


class MarsRover_RGBU
{
  public:
  MarsRover_RGBU();
  void  begin(int signal_pin);
  uint32_t  getDistanceCM();

  private:
  int SignalPin;
  uint64_t rgbuPulseIn(uint32_t pin, uint32_t value, long maxDuration = 100000);

};
#endif
