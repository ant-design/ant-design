const antd = require('./components');

const req = require.context('./components', true, /^\.\/locale\/[A-Za-z]+_[A-Za-z]+\.tsx?$/);

antd.locales = {};

req.keys().forEach((mod) => {
  const matches = mod.match(/\/([^/]+).tsx?$/);
  antd.locales[matches[1]] = req(mod).default;
});

module.exports = antd;
