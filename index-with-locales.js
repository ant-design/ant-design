const antd = require('./components');
const req = require.context('./components', true, /^\.\/locale-provider\/.+_.+\.tsx$/);

antd.locales = {};

req.keys().forEach((mod) => {
  const match = mod.match(/\/([^/]+).tsx$/);
  antd.locales[match[1]] = req(mod);
});

module.exports = antd;
