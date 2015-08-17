# Buildpack for Arduino based projects

[![Build Status](https://magnum.travis-ci.com/spark/buildpack-wiring-preprocessor.svg?token=M4rP8W5QPGszZyem6TGE&branch=master)](https://magnum.travis-ci.com/spark/buildpack-wiring-preprocessor)

| |
|---|
|  [Particle firmware](https://github.com/spark/firmware-buildpack-builder)  |
| [HAL](https://github.com/spark/buildpack-hal) / [Legacy](https://github.com/spark/buildpack-0.3.x)   |
| **Wiring preprocessor (you are here)** |
| [Base](https://github.com/spark/buildpack-base) |

This overlay buildpack provides a `preprocess-ino` function which preprocesses `.ino` files into `.cpp`.

This behavior can be disabled adding `#pragma SPARK_NO_PREPROCESSOR` to Arduino file.

## Building image

**Before building this image, build or fetch [buildpack-base](https://github.com/spark/buildpack-base).**

```bash
$ export BUILDPACK_IMAGE=wiring-preprocessor
$ git clone "git@github.com:spark/buildpack-${BUILDPACK_IMAGE}.git"
$ cd buildpack-$BUILDPACK_IMAGE
$ docker build -t particle/buildpack-$BUILDPACK_IMAGE .
```

## Running

This buildpack is designed to be inherited using `FROM` clause in `Dockerfile`.
Then before compilation run:

```bash
$ preprocess-ino DIR_WITH_INO_FILES
```
