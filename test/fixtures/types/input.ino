class ABC
{
   int abc;
};

struct Point {
    float x;
    float y;
};

enum Units { METERS, MILES };

void doSomethingWithABC(const ABC& abc)
{
}

float pointDistance(const Point &a, const Point &b, Units u) {

}

void setup() {
    ABC abc;
    doSomethingWithABC(abc);
}

void loop() {
    Point a, b;
    Units u = METERS;
    float distance = pointDistance(a, b, u);
}
