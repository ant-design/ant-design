import { Project, ProjectFiles } from '@stackblitz/sdk';

const getStackblitzConfig = ({
  title = '',
  dependencies,
  indexCssContent = '',
  demoJsContent = '',
  suffix = '',
}: {
  title?: string;
  dependencies: Record<string, string>;
  indexCssContent?: string;
  demoJsContent?: string;
  suffix?: string;
}) => {
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

  const files: ProjectFiles = {
    // demo 文件
    'src/index.css': indexCssContent,
    [`src/demo.${suffix}`]: demoJsContent,
    // 项目文件
    'package.json': JSON.stringify(packageJSON, null, 4),

    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${suffix}"></script>
  </body>
</html>`,

    [`src/main.${suffix}`]: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import Demo from './demo.${suffix}';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>
);`,

    'tsconfig.app.json': `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}`,

    'tsconfig.json': `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`,

    'tsconfig.node.json': `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}`,

    'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})`,

    '.stackblitzrc': `{
  "installDependencies": false,
  "startCommand": "pnpm i & pnpm dev",
  "env": {
    "NODE_ENV": "development"
  }
}`,
  };

  const project: Project = {
    title,
    description: '',
    template: 'node',
    files,
  };
  return project;
};

export default getStackblitzConfig;
