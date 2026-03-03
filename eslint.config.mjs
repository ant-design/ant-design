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
      'react/jsx-key-before-spread': 'off',
      'node/prefer-global/process': 'off', // TODO: remove this
      'node/prefer-global/buffer': 'off', // TODO: remove this
      'jsdoc/empty-tags': 'off',
      'ts/no-require-imports': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/ban-ts-comment': 'off', // TODO: remove this
      'ts/consistent-type-definitions': 'off',
      'ts/no-non-null-asserted-optional-chain': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-string-starts-ends-with': 'off', // TODO: remove this
      'regexp/no-unused-capturing-group': 'off',
      'regexp/no-misleading-capturing-group': 'off',
      'regexp/no-super-linear-backtracking': 'off', // TODO: remove this
      'regexp/optimal-quantifier-concatenation': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off', // TODO: remove this
      'react/no-clone-element': 'off',
      'react/no-children-for-each': 'off',
      'react/no-children-map': 'off',
      'react/no-children-only': 'off',
      'react/prefer-namespace-import': 'off',
      'react/no-create-ref': 'off', // TODO: remove this
      'perfectionist/sort-imports': 'off',
      'regexp/strict': 'off',
      /* turn off React 19 only rules */
      'react/no-forward-ref': 'off',
      'react/no-context-provider': 'off',
      'react/no-use-context': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      /* turn off 升级 @antfu/eslint-config@6 带来的 warning */
      'react/no-unnecessary-use-prefix': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react/no-implicit-key': 'off',
    },
  },
  {
    ...compat.configs['flat/recommended'],
    rules: {
      ...compat.configs['flat/recommended'].rules,
      'compat/compat': 'off', // Disabled due to incompatibility with ESLint 10.0.0
    },
  },
  jest.configs['flat/recommended'],
  {
    ...jsxA11y.flatConfigs.recommended,
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/anchor-is-valid': 'off', // TODO: remove this
    },
  },
  {
    // tests
    files: ['**/*.test.ts', 'tests/**/*', '**/__tests__/**/*', 'scripts/**/*', '**/*.test.tsx'],
    rules: {
      'react-hooks/immutability': 'off',
      'test/prefer-lowercase-title': 'off',
      'react/no-create-ref': 'off',
      'react/no-nested-component-definitions': 'off',
      'react/no-nested-components': 'off',
      'react/no-useless-fragment': 'off',
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
      'prefer-promise-reject-errors': 'off',
    },
  },
  {
    // demos
    files: ['components/*/demo/*.tsx'],
    rules: {
      'react-naming-convention/ref-name': 'off',
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
      'react-dom/no-dangerously-set-innerhtml': 'off', // TODO: remove this
      'react/no-array-index-key': 'off',
      'react-dom/no-missing-iframe-sandbox': 'off',
      'no-restricted-globals': 'off',
      'react/no-use-context': 'warn',
    },
    settings: {
      polyfills: ['Promise', 'URL', 'fetch', 'URLSearchParams'],
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
