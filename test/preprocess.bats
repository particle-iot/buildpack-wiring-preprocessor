#!/usr/bin/env bats

@test "Process file" {
  # Copy test data to input
  cp /test/data/input.ino /input
  # Run buildpack
  /bin/run
  # Compare expeted output
  diff /output/input.cpp /test/data/output.cpp
  # Assert
  [ "$?" -eq 0 ]
}
