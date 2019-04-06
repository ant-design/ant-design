const eslintrc = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jest/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  plugins: [
    'markdown',
    'react',
    'babel',
    'jest',
  ],
  rules: {
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'site/**',
          'tests/**',
          'scripts/**',
          '**/*.test.js',
          '**/__tests__/*',
          '*.config.js',
          '**/*.md',
        ],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.md'] }],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'comma-dangle': ['error', 'always-multiline'],
  },
};

if (process.env.RUN_ENV === 'DEMO') {
  eslintrc.globals = {
    React: true,
    ReactDOM: true,
    mountNode: true,
  };

  Object.assign(eslintrc.rules, {
    indent: 0,
    'no-console': 0,
    'no-plusplus': 0,
    'eol-last': 0,
    'no-script-url': 0,
    'prefer-rest-params': 0,
    'react/no-access-state-in-setstate': 0,
    'react/destructuring-assignment': 0,
    'react/no-multi-comp': 0,
    'jsx-a11y/href-no-hash': 0,
    'prefer-destructuring': 0, // TODO: remove later
    'max-len': 0, // TODO: remove later
    'consistent-return': 0, // TODO: remove later
    'no-return-assign': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'import/no-extraneous-dependencies': 0,
  });
}

module.exports = eslintrc;
