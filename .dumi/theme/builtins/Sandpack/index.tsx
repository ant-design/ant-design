import type { ReactNode } from 'react';
import React, { Suspense } from 'react';
import { useSearchParams, useServerInsertedHTML } from 'dumi';
import { createStyles } from 'antd-style';
import { getSandpackCssText } from '@codesandbox/sandpack-react';
import { Skeleton } from 'antd';

const OriginSandpack = React.lazy(() => import('./Sandpack'));

const setup = {
  dependencies: {
    react: '^18.0.0',
    'react-dom': '^18.0.0',
    antd: '^5.0.0',
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
  visibleFiles: ['index.tsx', 'app.tsx', 'package.json'] as any,
  showLineNumbers: true,
  editorHeight: '500px',
};

const indexContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

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

const Sandpack = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();

  useServerInsertedHTML(() => (
    <style
      data-sandpack="true"
      id="sandpack"
      dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
    />
  ));

  return (
    <Suspense fallback={<SandpackFallback />}>
      <OriginSandpack
        theme={searchParams.getAll('theme').includes('dark') ? 'dark' : undefined}
        customSetup={setup}
        options={options}
        files={{
          'index.tsx': indexContent,
          'app.tsx': children,
        }}
      />
    </Suspense>
  );
};

export default Sandpack;
