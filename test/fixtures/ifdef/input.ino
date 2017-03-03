#ifdef ARDUINO
#error "ARDUINO is defined"
#else
#error "ARDUINO is NOT defined"
#endif

int foo = 42;
void setup() {
  Particle.variable("foo", foo);
}
