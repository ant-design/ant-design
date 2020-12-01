#!/bin/sh

set -x

if [ "$REACT" = 16 ]; then
  npm i --no-save react@16 react-dom@16 react-test-renderer@16 enzyme-adapter-react-16
fi
