const config = {
  plugins: [
    'remark-preset-lint-recommended',
    ['remark-lint-list-item-indent', 'space'],
    ['remark-lint-no-literal-urls', false],
    ['remark-lint-no-undefined-references', false],
  ],
};

module.exports = config;
