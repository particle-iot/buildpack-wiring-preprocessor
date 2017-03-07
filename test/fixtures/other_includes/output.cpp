#include "application.h"
#line 1
/* GPS Processing
 */
#include "GPS.h"
#include "utility.h"

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
