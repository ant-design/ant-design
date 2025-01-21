#!/bin/bash

# Full skip argms
# npm run test-all -- --skip-changelog --skip-commit --skip-lint --skip-build --skip-dekko --skip-dist --skip-es --skip-lib --skip-test --skip-node

# Check exist argument
has_arg() {
  local term="$1"
  local start=0

  for arg in "$@"; do
    if [ $start -gt 0 ] && [ "$arg" == "$term" ]; then
      return 0 # Return 0 if argument exist
    fi

    start=$((start+1))
  done

  return 1 # Return 1 if argument not exist
}

if ! has_arg '--skip-changelog' "$@"; then
  echo "[TEST ALL] test changelog"
  echo "[TEST ALL] test changelog" > ~test-all.txt
  tsx ./scripts/check-version-md.ts
else
  echo "[TEST ALL] test changelog...skip"
fi

if ! has_arg '--skip-commit' "$@"; then
  echo "[TEST ALL] check-commit"
  echo "[TEST ALL] check-commit" > ~test-all.txt
  npm run check-commit
else
  echo "[TEST ALL] check-commit...skip"
fi

if ! has_arg '--skip-lint' "$@"; then
  echo "[TEST ALL] lint"
  echo "[TEST ALL] lint" > ~test-all.txt
  npm run lint
else
  echo "[TEST ALL] lint...skip"
fi

if ! has_arg '--skip-build' "$@"; then
  echo "[TEST ALL] dist"
  echo "[TEST ALL] dist" > ~test-all.txt
  npm run dist

  echo "[TEST ALL] compile"
  echo "[TEST ALL] compile" > ~test-all.txt
  npm run compile
else
  echo "[TEST ALL] build...skip"
fi

if ! has_arg '--skip-dekko' "$@"; then
  echo "[TEST ALL] dekko dist"
  echo "[TEST ALL] dekko dist" > ~test-all.txt
  tsx ./tests/dekko/dist.test.ts

  echo "[TEST ALL] dekko lib and es"
  echo "[TEST ALL] dekko lib and es" > ~test-all.txt
  tsx ./tests/dekko/lib-es.test.ts
else
  echo "[TEST ALL] dekko test...skip"
fi

if ! has_arg '--skip-dist' "$@"; then
  echo "[TEST ALL] dist test"
  echo "[TEST ALL] dist test" > ~test-all.txt
  LIB_DIR=dist npm test -- --bail
else
  echo "[TEST ALL] dist test...skip"
fi

if ! has_arg '--skip-dist' "$@"; then
  echo "[TEST ALL] dist-min test"
  echo "[TEST ALL] dist-min test" > ~test-all.txt
  LIB_DIR=dist-min npm test -- --bail
else
  echo "[TEST ALL] dist test...skip"
fi

if ! has_arg '--skip-es' "$@"; then
  echo "[TEST ALL] test es"
  echo "[TEST ALL] test es" > ~test-all.txt
  LIB_DIR=es npm test -- --bail
else
  echo "[TEST ALL] test es...skip"
fi

if ! has_arg '--skip-lib' "$@"; then
  echo "[TEST ALL] test lib"
  echo "[TEST ALL] test lib" > ~test-all.txt
  LIB_DIR=lib npm test -- --bail
else
  echo "[TEST ALL] test lib...skip"
fi

if ! has_arg '--skip-test' "$@"; then
  echo "[TEST ALL] test"
  echo "[TEST ALL] test" > ~test-all.txt
  npm test -- --bail
else
  echo "[TEST ALL] test...skip"
fi

if ! has_arg '--skip-node' "$@"; then
  echo "[TEST ALL] test node"
  echo "[TEST ALL] test node" > ~test-all.txt
  npm run test:node -- --bail
else
  echo "[TEST ALL] test node...skip"
fi
