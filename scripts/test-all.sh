#!/bin/sh

npm run lint && \
npm run dist && \
node ./tests/dekko/dist.test.js && \
LIB_DIR=dist npm test && \
npm run compile && \
node ./tests/dekko/lib.test.js && \
LIB_DIR=es npm test && \
LIB_DIR=lib npm test && \
npm test && \
npm run test-node
