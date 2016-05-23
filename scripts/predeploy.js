#!/usr/bin/env node

/* eslint-disable */
'use strict';

// Copy CNAME and components into _site before site deploy
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

if(fs.existsSync(path.join(process.cwd(), '_site'))) {
  execSync('cp CNAME _site');
  execSync('rsync -R components/**/*.json _site');
}
