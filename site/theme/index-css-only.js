/**
 * ZombieJ: This file is used for generate site theme css only. Which only provides dark.css and
 * compact.css for theme switcher.
 */
const config = require('./index');

const homeTmpl = './template/Home/index';

const cloneConfig = {
  ...config,
};

cloneConfig.routes = {
  path: '/',
  component: './template/Layout/index',
  indexRoute: { component: homeTmpl },
};

module.exports = cloneConfig;
