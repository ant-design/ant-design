#!/bin/sh

npm run lint && \
npm run dist && \
node ./tests/dekko/dist.test.js && \
npm run compile && \
node ./tests/dekko/lib.test.js && \
npm test -- --coverage -w $MAX_WORKERS && \
npm test -- --config .jest.node.json -w $MAX_WORKERS
