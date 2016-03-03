#! /usr/bin/env node

'use strict';

// Ensure that data directory exist.
require('mkdirp').sync('./_site/data');

const fs = require('fs');
const R = require('ramda');
const utils = require('./utils');
const buildComponentsList = require('./build-components-list');
const buildDocsList = require('./build-docs-list');
const buildDemosList = require('./build-demos-list');
const buildCommon = require('./build-common');


// TODO: configurable
const componentPath = './components';
const mds = utils.findMDFile(componentPath);

const indexes = R.filter(utils.isIndex, mds);
buildComponentsList(indexes, './_site/data/components-list.js');
buildDocsList(indexes, './_site/data/component-docs-list.js');

const demos = R.filter(utils.isDemo, mds);
buildDemosList(demos, './_site/data/demos-list.js');

const changelogPath = './CHANGELOG.md';
buildDocsList([changelogPath], './_site/data/changelog.js');

const introducePath = './docs/react/introduce.md';
buildDocsList([introducePath], './_site/data/introduce.js');

const gettingStartedPath = './docs/react/getting-started.md';
buildDocsList([gettingStartedPath], './_site/data/getting-started.js');

const installPath = './docs/react/install.md';
buildDocsList([installPath], './_site/data/install.js');

const upgradeNotesPath = './docs/react/upgrade-notes.md';
buildDocsList([upgradeNotesPath], './_site/data/upgrade-notes.js');

buildCommon('./docs/practice', './_site/data/practice.js');
buildCommon('./docs/pattern', './_site/data/pattern.js');
buildCommon('./docs/spec', './_site/data/spec.js');
buildCommon('./docs/resource', './_site/data/resource.js');
