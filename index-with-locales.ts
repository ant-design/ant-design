const antd: typeof import('./components') = require('./components');

const localeContext = require.context<{ default: import('./components/locale').Locale }>(
  './components',
  true,
  /^\.\/locale\/[A-Za-z]+_[A-Za-z]+\.tsx?$/,
);

const antdWithLocales = {
  ...antd,
  locales: {} as Record<string, import('./components/locale').Locale>,
};

localeContext.keys().forEach((mod) => {
  const matches = mod.match(/\/([^/]+).tsx?$/)!;
  antdWithLocales.locales[matches[1]] = localeContext(mod).default;
});

module.exports = antdWithLocales;
