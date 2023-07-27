import React, { Suspense, ReactNode } from 'react';

const OriginSandpack = React.lazy(() => import('./Sandpack'));

const Sandpack = ({ children }: { children: ReactNode }) => {
  console.log(children);

  return (
    <Suspense fallback="loading">
      <OriginSandpack
        customSetup={{
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
        }}
        options={{
          activeFile: 'app.tsx' as never,
          visibleFiles: ['index.tsx', 'app.tsx', 'package.json'] as any,
          showLineNumbers: true,
          editorHeight: '400px',
        }}
        files={{
          'index.tsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
        `,
          'app.tsx': children,
        }}
      />
    </Suspense>
  );
};

export default Sandpack;
