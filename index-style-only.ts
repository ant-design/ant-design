function pascalCase(name: string) {
  return (
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-(\w)/g, (_m, n: string) => n.toUpperCase())
  );
}

// Just import style for https://github.com/ant-design/ant-design/issues/3745
const styleContext = require.context<{ default?: unknown }>(
  './components',
  true,
  /^\.\/[^_][\w-]+\/style\/index\.tsx?$/,
);

styleContext.keys().forEach((mod) => {
  const styleModule = styleContext(mod);
  const v = styleModule?.default || styleModule;
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);
  if (match?.[1]) {
    if (match[1] === 'message' || match[1] === 'notification') {
      // message & notification should not be capitalized
      exports[match[1]] = v;
    } else {
      exports[pascalCase(match[1])] = v;
    }
  }
});

module.exports = exports;
