import React, { Suspense } from 'react';
import type { SandpackSetup } from '@codesandbox/sandpack-react';
import { Skeleton } from 'antd';
import { createStaticStyles } from 'antd-style';
import { useSearchParams } from 'dumi';

import { version } from '../../../../package.json';

const OriginSandpack = React.lazy(() => import('./Sandpack'));

const indexContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
`;

const styles = createStaticStyles(({ css, cssVar }) => ({
  fallback: css`
    width: 100%;
    > * {
      width: 100% !important;
      border-radius: ${cssVar.borderRadiusLG};
    }
  `,
  placeholder: css`
    color: ${cssVar.colorTextDescription};
    font-size: ${cssVar.fontSizeLG};
  `,
}));

const SandpackFallback: React.FC = () => {
  return (
    <div className={styles.fallback}>
      <Skeleton.Node active style={{ height: 500, width: '100%' }}>
        <span className={styles.placeholder}>Loading Demo...</span>
      </Skeleton.Node>
    </div>
  );
};

interface SandpackProps {
  dark?: boolean;
  autorun?: boolean;
  dependencies?: string;
}

const Sandpack: React.FC<React.PropsWithChildren<SandpackProps>> = (props) => {
  const { children, dark, dependencies, autorun = false } = props;

  const [searchParams] = useSearchParams();

  const extraDependencies = dependencies ? JSON.parse(dependencies) : {};

  const setup: SandpackSetup = {
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      antd: version,
      ...extraDependencies,
    },
    devDependencies: {
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      typescript: '^5',
    },
    entry: 'index.tsx',
  };

  const options = {
    activeFile: 'app.tsx' as never,
    visibleFiles: ['index.tsx', 'app.tsx', 'package.json', 'index.css'] as any,
    showLineNumbers: true,
    editorHeight: '500px',
    autorun,
  };

  return (
    <Suspense fallback={<SandpackFallback />}>
      <OriginSandpack
        theme={searchParams.getAll('theme').includes('dark') ? 'dark' : undefined}
        customSetup={setup}
        template="vite-react-ts"
        options={options}
        files={{
          'index.tsx': indexContent,
          'index.css': `html, body {
  padding: 0;
  margin: 0;
  background-color: ${dark ? '#000' : '#fff'};
}

#root {
  padding: 24px;
}`,
          'app.tsx': children,
        }}
      />
    </Suspense>
  );
};

export default Sandpack;
