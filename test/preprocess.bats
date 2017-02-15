#!/usr/bin/env bats

process_file () {
  # Copy test data to input
  cp /test/fixtures/$1/input.ino /input
  # Run buildpack
  /bin/run
  # Compare expected output
  diff /output/input.cpp /test/fixtures/$1/output.cpp
  # Assert
  [ "$?" -eq 0 ]
}

@test "Process file" {
  process_file script
}

@test "Process single if else" {
  process_file ifelse
}

@test "Process functions with custom types" {
  process_file types
}

@test "Process file with other includes" {
  process_file include
}

@test "Process long file" {
  process_file long
}
