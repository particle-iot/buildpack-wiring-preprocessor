#include "Arduino.h"


#include "application.h"
void setup();
#line 3
void setup() {
  Serial.begin(9600);
  Serial.println("Hello, Arduino!");
}
