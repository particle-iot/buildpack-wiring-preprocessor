#!/usr/bin/env bats

@test "Process file in a directory" {
  mkdir /input/src
  # Copy test data to input
  cp /test/data/input.ino /input/src
  # Run buildpack
  /bin/run
  # Compare expected output
  diff /output/src/input.cpp /test/data/output.cpp
  # Assert
  [ "$?" -eq 0 ]
}
