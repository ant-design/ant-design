/* eslint no-console:0 */
// this file is not used if use https://github.com/ant-design/babel-plugin-import

function camelCase(name) {
  return name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-(\w)/g, (m, n) => {
      return n.toUpperCase();
    });
}

const req = require.context('./components', true, /^\.\/[^_][\w-]+\/(style\/)?index\.tsx?$/);

req.keys().forEach((mod) => {
  let v = req(mod);
  if (v && v.default) {
    v = v.default;
  }
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);
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
please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.`);
  }
}
