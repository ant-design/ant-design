#! /usr/bin/env node

/* eslint strict: 0 */
'use strict';

// Ensure that data directory exist.
require('mkdirp').sync('./_data');

const buildDemosList = require('./build-demos-list');
buildDemosList(['./components', './docs'], './_data/demos-list.js');

const buildCommon = require('./build-common');
buildCommon([
  './components',
  './docs/react',
  './docs/pattern',
  './CHANGELOG.md',
], './_data/react-components.js');
buildCommon('./docs/practice', './_data/practice.js');
buildCommon('./docs/pattern', './_data/pattern.js');
buildCommon('./docs/spec', './_data/spec.js');
buildCommon('./docs/resource', './_data/resource.js');
