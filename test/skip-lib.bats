#!/usr/bin/env bats

@test "Process file in a directory" {
  mkdir /input/lib
  # Copy test data to input
  cp /test/fixtures/script/input.ino /input/lib
  # Run buildpack
  /bin/run
  # Assert
  [ ! -f "/output/lib/input.cpp" ]
}
