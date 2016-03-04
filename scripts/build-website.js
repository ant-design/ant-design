#! /usr/bin/env node

'use strict';

// Ensure that data directory exist.
require('mkdirp').sync('./_site/data');

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const utils = require('./utils');
const buildDemosList = require('./build-demos-list');
const buildCommon = require('./build-common');

const mds = utils.findMDFile(['./components', './docs']);
const isDemo = R.compose(R.test(/\/demo$/i), path.dirname);
const demos = R.filter(isDemo, mds);
buildDemosList(demos, './_site/data/demos-list.js');

buildCommon([
  './components',
  './docs/react',
  './CHANGELOG.md',
], './_site/data/react-components.js');

buildCommon('./docs/practice', './_site/data/practice.js');
buildCommon('./docs/pattern', './_site/data/pattern.js');
buildCommon('./docs/spec', './_site/data/spec.js');
buildCommon('./docs/resource', './_site/data/resource.js');
