#include "application.h"
#line 1 "/workspace/input.ino"
/* GPS Processing
 */
#include "GPS.h"
#include "utility.h"

void processGPS(const GPS& gps);
void loop();
#line 6 "/workspace/input.ino"
GPS theGPS;

void processGPS(const GPS& gps)
{
}

void loop() {
    processGPS(theGPS);
}
