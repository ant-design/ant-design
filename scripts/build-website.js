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

const downloadPath = './docs/resource/download.md';
buildDocsList([downloadPath], './_site/data/download.js')

const referencePath =
        './docs/resource/reference.md';
buildDocsList([referencePath], './_site/data/reference.js')

const specIntroPath =
        './docs/spec/introduce.md'
buildDocsList([specIntroPath], './_site/data/specIntro.js');

const fontPath =
        './docs/spec/font.md'
buildDocsList([fontPath], './_site/data/font.js');

const typographyPath =
        './docs/spec/typography.md'
buildDocsList([typographyPath], './_site/data/typography.js');

const easingPath =
        './docs/spec/easing.md'
buildDocsList([easingPath], './_site/data/easing.js');
const pageTransitionPath =
        './docs/spec/page-transition.md'
buildDocsList([pageTransitionPath], './_site/data/page-transition.js');
const motionPath =
        './docs/spec/motion.md'
buildDocsList([motionPath], './_site/data/motion.js');
