const antd = require('./components');

const req = require.context('./components', true, /^\.\/locale\/.+_.+\.ts$/);

antd.locales = {};

req.keys().forEach((mod) => {
  const matches = mod.match(/\/([^/]+).ts$/);
  antd.locales[matches[1]] = req(mod).default;
});

module.exports = antd;
