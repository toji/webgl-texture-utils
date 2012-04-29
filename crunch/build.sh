#!/bin/bash

rm ../texture-util/crn_decomp.js

emcc \
  -s EXPORTED_FUNCTIONS="['allocate', '_malloc', '_free', '_crn_get_width', '_crn_get_height', '_crn_get_levels', '_crn_get_dxt_format', '_crn_get_uncompressed_size', '_crn_decompress']" \
  -O2 \
  -o ../texture-util/crn_decomp.js \
  crn.cpp && \
chmod -R a+rX .
