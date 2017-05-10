typedef struct {
    float x;
    float y;
} Point;

typedef enum { METERS, MILES } Units;

float pointDistance(const Point &a, const Point &b, Units u) {

}

void setup() {
}

void loop() {
    Point a, b;
    Units u = METERS;
    float distance = pointDistance(a, b, u);
}
