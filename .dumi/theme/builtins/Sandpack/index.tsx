import type { FC, ReactNode } from 'react';
import React, { Suspense } from 'react';
import { useSearchParams } from 'dumi';
import { createStyles } from 'antd-style';
import { Skeleton } from 'antd';

const OriginSandpack = React.lazy(() => import('./Sandpack'));

const indexContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
`;

const useStyle = createStyles(({ token, css }) => ({
  fallback: css`
    width: 100%;
    > * {
      width: 100% !important;
      border-radius: 8px;
    }
  `,
  placeholder: css`
    color: ${token.colorTextDescription};
    font-size: 16px;
  `,
}));

const SandpackFallback = () => {
  const { styles } = useStyle();

  return (
    <div className={styles.fallback}>
      <Skeleton.Node active style={{ height: 500, width: '100%' }}>
        <span className={styles.placeholder}>Loading Demo...</span>
      </Skeleton.Node>
    </div>
  );
};

type SandpackProps = {
  children?: ReactNode;
  dark?: boolean;
  autorun?: boolean;
  dependencies?: string;
};

const Sandpack: FC<SandpackProps> = ({
  children,
  dark,
  dependencies: extraDeps,
  autorun = false,
}) => {
  const [searchParams] = useSearchParams();
  const dependencies = extraDeps && JSON.parse(extraDeps);

  const setup = {
    dependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      antd: '^5.0.0',
      ...dependencies,
    },
    devDependencies: {
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
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
        options={options}
        files={{
          'index.tsx': indexContent,
          'index.css': `html, body {
  padding: 0;
  margin: 0;
  background: ${dark ? '#000' : '#fff'};
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
