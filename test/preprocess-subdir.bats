#!/usr/bin/env bats

@test "Process file in a directory" {
  mkdir /input/src
  # Copy test data to input
  cp /test/fixtures/in_directory/input.ino /input/src
  # Run buildpack
  /bin/run
  # Compare expected output
  diff --unified /output/src/input.cpp /test/fixtures/in_directory/output.cpp
  # Assert
  [ "$?" -eq 0 ]
}
