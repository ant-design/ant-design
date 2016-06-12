/* eslint no-console:0 */
// this file is not used if use https://github.com/ant-design/babel-plugin-antd

function camelCase(name) {
  return name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-(\w)/g, (m, n) => {
      return n.toUpperCase();
    });
}

const req = require.context('./components', true, /^\.\/[^_][\w-]+\/(style\/)?index\.jsx?$/);

req.keys().forEach((mod) => {
  const v = req(mod);
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.jsx?$/);
  if (match && match[1]) {
    if (match[1] === 'message' || match[1] === 'notification') {
      // message & notification should not be capitalized
      exports[match[1]] = v;
    } else {
      exports[camelCase(match[1])] = v;
    }
  }
});

if (process.env.NODE_ENV !== 'production') {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(`You are using prebuilt antd,
please use https://github.com/ant-design/babel-plugin-antd to reduce app bundle size.`);
  }
}
