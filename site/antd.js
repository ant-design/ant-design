/* eslint no-console:0 */
function pascalCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase());
}

// Import all the component less file.
// This is mostly like index.js but we do not need root `themes/index`
const req = require.context('../components', true, /^\.\/[^_][\w-]+\/style\/index\.less$/);

req.keys().forEach(mod => {
  let v = req(mod);
  if (v && v.default) {
    v = v.default;
  }
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.less$/);
  if (match && match[1]) {
    if (match[1] === 'message' || match[1] === 'notification') {
      // message & notification should not be capitalized
      exports[match[1]] = v;
    } else {
      exports[pascalCase(match[1])] = v;
    }
  }
});

// Need import for the additional core style
exports.styleCore = require('../components/style/core/index.less');

module.exports = require('../components');
