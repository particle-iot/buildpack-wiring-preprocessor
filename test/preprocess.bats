#!/usr/bin/env bats

process_file () {
  # Copy test data to input
  cp /test/fixtures/$1/input.* /input
  # Run buildpack
  /bin/run
  # Compare expected output
  diff --unified /output/input.cpp /test/fixtures/$1/output.cpp
  # Assert
  [ "$?" -eq 0 ]
}

@test "Process example app" {
  process_file example_app
}

@test "Process single if else" {
  process_file ifelse
}

@test "Process functions with custom types" {
  process_file custom_types
}

@test "Process file with other includes" {
  process_file other_includes
}

@test "Process file with other includes and comments" {
  process_file commented_includes
}

@test "Process file with other includes and application.h" {
  process_file application_h_after_includes
}

@test "Process file with application.h" {
  process_file includes_application_h
}

@test "Process file with Particle.h" {
  process_file includes_particle_h
}

@test "Process long INO file" {
  process_file long_ino
}

@test "Process file with ifdefs at the top" {
  process_file ifdef
}

@test "Does not preprocess files with the spark magic pragma" {
  process_file spark_no_preprocessor
}

@test "Does not preprocess files with the particle magic pragma" {
  process_file particle_no_preprocessor
}

@test "Process file with a commented out magic pragma" {
  process_file commented_no_preprocessor
}

# FIXME: add new tests here

@test "Process PDE file" {
  process_file pde_format
}
# FIXME: adding more tests fails here because the PDE file is not cleaned up properly
