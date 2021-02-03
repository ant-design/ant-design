#!/bin/sh

echo "[CLEAN] clean"
npm run clean

echo "[TEST ALL] test changlog"
node ./scripts/check-version-md.js

echo "[TEST ALL] check-commit"
npm run check-commit

echo "[TEST ALL] lint"
npm run lint

echo "[TEST ALL] dist"
npm run dist

echo "[TEST ALL] compile"
npm run compile


echo "[TEST ALL] dekko dist"
node ./tests/dekko/dist.test.js

echo "[TEST ALL] dist test"
LIB_DIR=dist npm test

echo "[TEST ALL] dekko lib"

echo "[TEST ALL] test es"
LIB_DIR=es npm test

echo "[TEST ALL] test lib"
LIB_DIR=lib npm test

echo "[TEST ALL] test"
npm test

echo "[TEST ALL] test node"
npm run test-node
