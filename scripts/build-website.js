#! /usr/bin/env node

'use strict';

// Ensure that data directory exist.
require('mkdirp').sync('./_site/data');

const buildDemosList = require('./build-demos-list');
buildDemosList(['./components', './docs'], './_site/data/demos-list.js');

const buildCommon = require('./build-common');
buildCommon([
  './components',
  './docs/react',
  './CHANGELOG.md',
], './_site/data/react-components.js');
buildCommon('./docs/practice', './_site/data/practice.js');
buildCommon('./docs/pattern', './_site/data/pattern.js');
buildCommon('./docs/spec', './_site/data/spec.js');
buildCommon('./docs/resource', './_site/data/resource.js');
