/* This blinks the LED */
#define PIN D7
#define RATE 10

// My includes
  #include "Particle.h"

void setup() {
  pinMode(PIN, OUTPUT);
}

void loop() {
  static int state = LOW;
  digitalWrite(PIN, state);
  state = !state;
  delay((int)(1000 / RATE));
}
