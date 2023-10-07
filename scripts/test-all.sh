#!/bin/sh

echo "[TEST ALL] test changelog"
echo "[TEST ALL] test changelog" > ~test-all.txt
tsx ./scripts/check-version-md.ts

echo "[TEST ALL] check-commit"
echo "[TEST ALL] check-commit" > ~test-all.txt
npm run check-commit

echo "[TEST ALL] lint"
echo "[TEST ALL] lint" > ~test-all.txt
npm run lint

if [ "$1" != "--skip-build" ]; then
  echo "[TEST ALL] dist"
  echo "[TEST ALL] dist" > ~test-all.txt
  npm run dist

  echo "[TEST ALL] compile"
  echo "[TEST ALL] compile" > ~test-all.txt
  npm run compile
else
  echo "Skip build..."
fi

echo "[TEST ALL] dekko dist"
echo "[TEST ALL] dekko dist" > ~test-all.txt
node ./tests/dekko/dist.test.js

echo "[TEST ALL] dist test"
echo "[TEST ALL] dist test" > ~test-all.txt
LIB_DIR=dist npm test

echo "[TEST ALL] dekko lib"
echo "[TEST ALL] dekko lib" > ~test-all.txt

echo "[TEST ALL] test es"
echo "[TEST ALL] test es" > ~test-all.txt
LIB_DIR=es npm test

echo "[TEST ALL] test lib"
echo "[TEST ALL] test lib" > ~test-all.txt
LIB_DIR=lib npm test

echo "[TEST ALL] test"
echo "[TEST ALL] test" > ~test-all.txt
npm test

echo "[TEST ALL] test node"
echo "[TEST ALL] test node" > ~test-all.txt
npm run test-node
