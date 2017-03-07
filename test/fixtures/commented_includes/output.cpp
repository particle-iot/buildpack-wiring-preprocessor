#include "application.h"
#line 1
/* GPS Processing
 */
#include "GPS.h"
// #include "wip.h"
#include "utility.h"

void processGPS(const GPS& gps);
void loop();
#line 7
GPS theGPS;

void processGPS(const GPS& gps)
{
}

void loop() {
    processGPS(theGPS);
}
