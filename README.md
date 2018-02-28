# Buildpack for Arduino based projects

[![Build Status](https://travis-ci.org/spark/buildpack-wiring-preprocessor.svg?branch=master)](https://travis-ci.org/spark/buildpack-wiring-preprocessor) [![](https://imagelayers.io/badge/particle/buildpack-wiring-preprocessor:latest.svg)](https://imagelayers.io/?images=particle/buildpack-wiring-preprocessor:latest 'Get your own badge on imagelayers.io')


This buildpack preprocesses `.ino` files into `.cpp`.
It inherits [base buildpack](https://github.com/particle-iot/buildpack-base).

This behavior can be disabled adding `#pragma SPARK_NO_PREPROCESSOR` to Arduino file.

## Building image

**Before building this image, build or fetch [buildpack-base](https://github.com/particle-iot/buildpack-base).**

```bash
$ docker-compose build
```

## Running

This buildpack requires two volumes to be mounted: `/input` and `/output`. To preprocess code simply run the container:

```bash
$ docker run --rm \
  -v ~/tmp/input:/input \
  -v ~/tmp/output:/output \
  particle/buildpack-wiring-preprocessor
```

Where `~/tmp/input` is location of Wiring code and `~/tmp/output` is where preprocessed code will be stored.

## Tests

```
$ docker build -t particle/buildpack-wiring-preprocessor .
$ docker run --rm particle/buildpack-wiring-preprocessor /bin/run-tests
```

See `.travis.yml` for the most up to date instructions.
