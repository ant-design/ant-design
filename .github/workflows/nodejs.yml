name: Node CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@master
    - name: Use Node.js 10.x
      uses: actions/setup-node@v1
      with:
        version: 10.x
    - name: npm install, build, and test
      run: |
        npm install
        npm run build --if-present
        npm test
