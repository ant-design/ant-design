const config = {
  plugins: [
    'remark-preset-lint-recommended',
    ['remark-lint-list-item-indent', 'space'],
    ['remark-lint-no-literal-urls', false],
  ],
};

module.exports = config;
