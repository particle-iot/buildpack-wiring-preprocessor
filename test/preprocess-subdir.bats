#!/usr/bin/env bats

@test "Process file in a directory" {
  mkdir /input/src
  # Copy test data to input
  cp /test/fixtures/script/input.ino /input/src
  # Run buildpack
  /bin/run
  # Compare expected output
  diff /output/src/input.cpp /test/fixtures/script/output.cpp
  # Assert
  [ "$?" -eq 0 ]
}
