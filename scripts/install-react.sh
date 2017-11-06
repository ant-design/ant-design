#!/bin/bash

set -x

if [ "$REACT" = 15 ]; then
  npm i --no-save react@15 react-dom@15 react-test-renderer@15 enzyme-adapter-react-15
fi
