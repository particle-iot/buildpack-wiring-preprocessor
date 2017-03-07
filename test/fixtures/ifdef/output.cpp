#include "application.h"
#line 1
void setup();
void loop();
#line 1
#ifdef ARDUINO
  #error "ARDUINO is defined"
#else
  #error "ARDUINO is NOT defined"
#endif

#define PIN D7
#define RATE 10

void setup() {
  pinMode(PIN, OUTPUT);
}

void loop() {
  static int state = LOW;
  digitalWrite(PIN, state);
  state = !state;
  delay((int)(1000 / RATE));
}
