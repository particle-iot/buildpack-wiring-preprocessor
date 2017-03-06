#!/usr/bin/env bats

@test "Does not process file in the lib directory" {
  mkdir /input/lib
  # Copy test data to input
  cp /test/fixtures/example_app/input.ino /input/lib
  # Run buildpack
  /bin/run
  # Assert
  [ ! -f "/output/lib/input.cpp" ]
}
