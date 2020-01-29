const config = require('../.eslintrc');

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'import/no-extraneous-dependencies': 0,
    'react/no-danger': 0,
    'no-param-reassign': 0,
  },
};
