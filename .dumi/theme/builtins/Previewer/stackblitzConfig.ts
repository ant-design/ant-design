import { Project, ProjectFiles } from '@stackblitz/sdk';

const getStackblitzConfig = ({
  title = '',
  dependencies,
  indexCssContent = '',
  demoJsContent = '',
  suffix = '',
  isZhCN = false,
}: {
  title?: string;
  dependencies: Record<string, string>;
  indexCssContent?: string;
  demoJsContent?: string;
  suffix?: string;
  isZhCN?: boolean;
}) => {
  const _suffix = suffix === 'tsx' ? suffix : 'jsx';
  const packageJSON = {
    name: 'vite-react-typescript-starter',
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc -b && vite build',
      lint: 'eslint .',
      preview: 'vite preview',
    },
    dependencies,
    devDependencies: {
      '@eslint/js': '^9.32.0',
      '@types/react': '^19.1.9',
      '@types/react-dom': '^19.1.7',
      '@vitejs/plugin-react': '^4.7.0',
      eslint: '^9.32.0',
      'eslint-plugin-react-hooks': '^5.2.0',
      'eslint-plugin-react-refresh': '^0.4.20',
      globals: '^16.3.0',
      typescript: '~5.8.3',
      'typescript-eslint': '^8.39.0',
      vite: '^7.0.6',
    },
  };

  const tsconfigAppJSON = {
    compilerOptions: {
      tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
      target: 'ES2022',
      useDefineForClassFields: true,
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,

      /* Bundler mode */
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      verbatimModuleSyntax: true,
      moduleDetection: 'force',
      noEmit: true,
      jsx: 'react-jsx',

      /* Linting */
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      erasableSyntaxOnly: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
    },
    include: ['src'],
  };
  const tsconfigNodeJSON = {
    compilerOptions: {
      tsBuildInfoFile: './node_modules/.tmp/tsconfig.node.tsbuildinfo',
      target: 'ES2023',
      lib: ['ES2023'],
      module: 'ESNext',
      skipLibCheck: true,

      /* Bundler mode */
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      verbatimModuleSyntax: true,
      moduleDetection: 'force',
      noEmit: true,

      /* Linting */
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      erasableSyntaxOnly: true,
      noFallthroughCasesInSwitch: true,
      noUncheckedSideEffectImports: true,
    },
    include: ['vite.config.ts'],
  };

  const tsconfigJSON = {
    files: [],
    references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
  };

  let files: ProjectFiles = {
    // demo.tsx
    [`src/demo.${_suffix}`]: demoJsContent,
    // package.json
    'package.json': JSON.stringify(packageJSON, null, 4),
    // index.html
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width">
    <meta name="theme-color" content="#000000">
  </head>
  <body>
    <div id="container" style="padding: 24px" />
    <script type="module" src="/src/main.${_suffix}"></script>
  </body>
</html>`,
    // main.tsx
    [`src/main.${_suffix}`]: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import Demo from './demo';

createRoot(document.getElementById('container')${suffix === 'tsx' ? '!' : ''}).render(
  <StrictMode>
    <Demo />
  </StrictMode>
);`,
    // vite.config.ts
    'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})`,
    // .stackblitzrc
    '.stackblitzrc': `{
  "installDependencies": false,
  "startCommand": "pnpm i & pnpm dev",
  "env": {
    "NODE_ENV": "development"
  }
}`,
    // .gitignore
    '.gitignore': `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local`,
    // eslint.config.js
    'eslint.config.js': `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
`,
  };

  if (suffix === 'tsx') {
    files = {
      ...files,
      'tsconfig.json': JSON.stringify(tsconfigJSON, null, 4),
      'tsconfig.app.json': JSON.stringify(tsconfigAppJSON, null, 4),
      'tsconfig.node.json': JSON.stringify(tsconfigNodeJSON, null, 4),
    };
  }
  if (indexCssContent) {
    files = { ...files, 'src/index.css': indexCssContent };
  }
  if (isZhCN) {
    files = { ...files, '.npmrc': `registry=https://registry.npmmirror.com/` };
  }

  const project: Project = { title, description: '', template: 'node', files };
  return project;
};

export default getStackblitzConfig;
