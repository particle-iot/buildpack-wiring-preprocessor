#ifdef ARDUINO
#error "ARDUINO is defined"
#else
#error "ARDUINO is NOT defined"
#endif


#include "application.h"
void setup();
#line 7
int foo = 42;
void setup() {
  Particle.variable("foo", foo);
}
