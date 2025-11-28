const antd = require('./components');

const req = require.context('./components', true, /^\.\/locale\/[A-Za-z]+_[A-Za-z]+\.tsx?$/);

const antdWithLocales = { ...antd };

antdWithLocales.locales = {};

req.keys().forEach((mod) => {
  const matches = mod.match(/\/([^/]+).tsx?$/);
  antdWithLocales.locales[matches[1]] = req(mod).default;
});

module.exports = antdWithLocales;
