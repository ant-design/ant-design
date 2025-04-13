const config = {
  plugins: [
    'remark-preset-lint-recommended',
    ['remark-lint-no-undefined-references', { allow: [' ', /RFC/] }],
  ],
};

module.exports = config;
