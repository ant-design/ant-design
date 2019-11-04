const eslintrc = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'prettier/react',
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  settings: {
    react: {
      version: '16.9',
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['markdown', 'react', 'babel', 'jest', '@typescript-eslint'],
  // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
  rules: {
    camelcase: 0,
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
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'prefer-destructuring': 0, // TODO: remove later
    'consistent-return': 0, // TODO: remove later
    'no-return-assign': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'react/destructuring-assignment': 0, // TODO: remove later
    'react/no-did-update-set-state': 0, // TODO: remove later
    'react/require-default-props': 0,
    'react/default-props-match-prop-types': 0,
    'import/no-cycle': 0,
    'react/no-find-dom-node': 0,
    'no-underscore-dangle': 0,
    'react/sort-comp': 0,
    // label-has-for has been deprecated
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 0,
    // for (let i = 0; i < len; i++)
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    'react/display-name': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,
    'react/static-property-placement': 0,
    'jest/no-test-callback': 0,
    'jest/expect-expect': 0,
  },
  globals: {
    gtag: true,
  },
};

if (process.env.RUN_ENV === 'DEMO') {
  eslintrc.globals = Object.assign(eslintrc.globals, {
    React: true,
    ReactDOM: true,
    mountNode: true,
  });

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
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'jsx-a11y/control-has-associated-label': 0,
  });
}

module.exports = eslintrc;
