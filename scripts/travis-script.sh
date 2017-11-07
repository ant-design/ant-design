#!/bin/bash

set -x
set -e

run_test() {
  if [ "$REACT" != 16 ]; then
    npm test -- -w 2 -u $*
  else
    npm test -- -w 2 $*
  fi
}

run_test_node() {
  if [ "$REACT" != 16 ]; then
    npm run test-node -- -w 2 -u
  else
    npm run test-node -- -w 2
  fi
}

if [ "$TEST_TYPE" = lint ]; then
  npm run lint
elif [ "$TEST_TYPE" = test:dist ]; then
  npm run dist
  node ./tests/dekko/dist.test.js
  LIB_DIR=dist run_test
elif [ "$TEST_TYPE" = test:lib ]; then
  npm run compile
  node ./tests/dekko/lib.test.js
  LIB_DIR=lib run_test
elif [ "$TEST_TYPE" = test:es ]; then
  npm run compile
  LIB_DIR=es run_test
elif [ "$TEST_TYPE" = test:dom ]; then
  run_test --coverage
  if [ "$REACT" = 16 ]; then
    bash <(curl -s https://codecov.io/bash)
  fi
elif [ "$TEST_TYPE" = test:node ]; then
  run_test_node
fi
