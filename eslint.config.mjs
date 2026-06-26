// eslint.config.mjs
import antfu from '@antfu/eslint-config';
import eslintReact from '@eslint-react/eslint-plugin';
import compat from 'eslint-plugin-compat';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

const restrictedRcPackageDirectoryImports = [
  '@rc-component/*/es',
  '@rc-component/*/es/**',
  '@rc-component/*/lib',
  '@rc-component/*/lib/**',
  'rc-*/es',
  'rc-*/es/**',
  'rc-*/lib',
  'rc-*/lib/**',
];

export default antfu(
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-dom': {
        rules: {
          'no-flush-sync': eslintReact.rules['dom-no-flush-sync'],
        },
      },
      'react-web-api': {
        rules: {
          'no-leaked-event-listener': eslintReact.rules['web-api-no-leaked-event-listener'],
        },
      },
    },
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
      /* turn off 升级 @antfu/eslint-config@6 带来的 warning */
      'react/no-unnecessary-use-prefix': 'off',
      'react/no-implicit-key': 'off',
      /* e18e rules */
      'e18e/prefer-spread-syntax': 'off',
      'e18e/prefer-static-regex': 'off',
      'e18e/prefer-array-at': 'off',
      'e18e/prefer-timer-args': 'off',
      'e18e/prefer-array-fill': 'off',
      'e18e/prefer-array-to-reversed': 'off',
      'e18e/prefer-array-to-spliced': 'off',
      'e18e/prefer-array-to-sorted': 'off',
      'e18e/prefer-array-from-map': 'off',
      'e18e/prefer-date-now': 'off',
      'e18e/prefer-object-has-own': 'off',
      // 升级 @eslint-react/eslint-plugin@3 带来的 warning
      'react/dom-no-dangerously-set-innerhtml': 'off',
      'react/dom-no-flush-sync': 'off',
      'react-dom/no-flush-sync': 'warn',
      'react/component-hook-factories': 'off',
      'react/rules-of-hooks': 'off',
      'react/set-state-in-effect': 'off',
      'react/exhaustive-deps': 'off',
      // 升级 @eslint-react/eslint-plugin@5 带来的 warning
      'react/jsx-no-key-after-spread': 'off',
      'react/jsx-no-children-prop': 'off',
      'react/naming-convention-id-name': 'off',
      'react/naming-convention-ref-name': 'off',
      'react/static-components': 'off',
      'react/use-memo': 'off',
      'react-naming-convention/id-name': 'off', // Do not turn on — it would break the original semantics.
    },
  },
  {
    files: ['components/**/*.{ts,tsx}'],
    ignores: ['components/*/demo/**/*', 'components/**/__tests__/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: restrictedRcPackageDirectoryImports,
              message: 'Do not import package internals from es/lib. Import from the package root.',
            },
          ],
        },
      ],
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
    // commonjs, build entry, and script files
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', 'scripts/**/*.ts', 'scripts/**/*.tsx'],
    rules: {
      'ts/no-require-imports': 'off',
    },
  },
  {
    // tests
    files: [
      '**/*.test.ts',
      'tests/**/*',
      '**/__tests__/**/*',
      'scripts/**/*',
      '**/*.test.tsx',
      'vitest.config.ts',
      'vitest.setup.ts',
    ],
    rules: {
      'react/use-state': 'off',
      'react/error-boundaries': 'off',
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
      'react/purity': 'off',
      'react-naming-convention/ref-name': 'off',
      'react/naming-convention-ref-name': 'off',
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
