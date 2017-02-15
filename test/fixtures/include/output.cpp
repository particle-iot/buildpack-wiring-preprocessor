/* GPS Processing
 */
#include "GPS.h"
#include "utility.h"


#include "Particle.h"
void processGPS(const GPS& gps);
void loop();
#line 6
GPS theGPS;

void processGPS(const GPS& gps)
{
}

void loop() {
    processGPS(theGPS);
}
