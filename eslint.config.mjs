// eslint.config.mjs
import antfu from '@antfu/eslint-config';
import compat from 'eslint-plugin-compat';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default antfu(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/_site/**',
      '**/es/**',
      '**/lib/**',
      '**/.dumi/tmp/**',
      '**/.dumi/tmp-production/**',
      '**/*.snap',
      '**/*.md',
      '.dumi/scripts/clarity.js',
    ],
    settings: {
      polyfills: ['Promise', 'URL'],
    },
    type: 'lib',
    stylistic: false,
    typescript: true,
    react: true,
    rules: {
      'node/prefer-global/process': 'off',
      'jsdoc/empty-tags': 'off',
      'ts/no-require-imports': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/ban-ts-comment': 'off', // TODO: remove this
      'unicorn/prefer-number-properties': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-misleading-capturing-group': 'off',
      'test/prefer-lowercase-title': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/prefer-destructuring-assignment': 'off', // TODO: remove this
      'react-refresh/only-export-components': 'off', // TODO: remove this
      'react/no-clone-element': 'off',
      'react/no-children-for-each': 'off',
      'react/no-children-count': 'off',
      'react/no-children-map': 'off',
      'react/no-children-only': 'off',
      'react/no-unstable-default-props': 'off',
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-named-exports': 'off',
    },
  },
  compat.configs['flat/recommended'],
  jest.configs['flat/recommended'],
  {
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-autofocus': 'off',
    },
  },
  {
    // tests
    files: ['**/*.test.ts', 'tests/**/*', '**/__tests__/**/*', '**/*.test.tsx'],
    rules: {
      'react/no-create-ref': 'off',
      'react/no-nested-components': 'off',
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'ts/no-non-null-asserted-optional-chain': 'off',
      'compat/compat': 'off',
      'jest/no-test-callback': 'off',
      'jest/expect-expect': 'off',
      'jest/no-done-callback': 'off',
      'jest/valid-title': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/no-standalone-expect': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/anchor-has-content': 'off',
    },
  },
  {
    // demos
    files: ['components/*/demo/*.tsx'],
    rules: {
      'react/no-create-ref': 'off',
      'no-console': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/anchor-has-content': 'off',
    },
    settings: {
      polyfills: ['Promise', 'URL', 'fetch', 'requestAnimationFrame'],
    },
  },
  {
    // dumi site
    files: ['.dumi/**/*'],
    rules: {
      'react-refresh/only-export-components': 'off', // TODO: remove this
      'react-dom/no-dangerously-set-inner-html': 'off', // TODO: remove this
      'react/no-array-index-key': 'off',
    },
    settings: {
      polyfills: ['Promise', 'URL', 'URLSearchParams'],
    },
  },
  {
    // locales
    files: ['components/locale/*.ts', 'components/form/demo/*.tsx'],
    rules: {
      'no-template-curly-in-string': 'off',
    },
  },
);
