import React, { Suspense, useRef } from 'react';
import { BugOutlined, ThunderboltOutlined } from '@ant-design/icons';
import stackblitzSdk from '@stackblitz/sdk';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex, Tooltip } from 'antd';
import { FormattedMessage, useSiteData } from 'dumi';
import LZString from 'lz-string';

import { dependencies, devDependencies } from '../../../../package.json';
import useLocale from '../../../hooks/useLocale';
import ClientOnly from '../../common/ClientOnly';
import CodePenIcon from '../../icons/CodePenIcon';
import CodeSandboxIcon from '../../icons/CodeSandboxIcon';
import ExpandIcon from '../../icons/ExpandIcon';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import DemoContext from '../../slots/DemoContext';
import CodeBlockButton from './CodeBlockButton';
import getStackblitzConfig from './stackblitzConfig';

const track = ({ type, demo }: { type: string; demo: string }) => {
  window.gtag?.('event', 'demo', { event_category: type, event_label: demo });
};

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

interface ActionsProps {
  assetId: string;
  title?: string;
  pkgDependencyList: Record<PropertyKey, string>;
  jsx: string;
  demoUrlWithTheme: string;
  codeExpand: boolean;
  onCodeExpand: () => void;
  entryCode: string;
  styleCode: string;
  debugOptions?: MenuProps['items'];
}

const Actions: React.FC<ActionsProps> = ({
  assetId,
  title,
  jsx,
  demoUrlWithTheme,
  codeExpand,
  onCodeExpand,
  pkgDependencyList,
  entryCode,
  styleCode,
  debugOptions,
}) => {
  const [, lang] = useLocale();
  const isZhCN = lang === 'cn';
  const { pkg } = useSiteData();
  const { codeType } = React.use(DemoContext);
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  const codepenIconRef = useRef<HTMLFormElement>(null);
  const handleCodeExpand = () => {
    track({ type: 'expand', demo: assetId });
    onCodeExpand();
  };

  const html = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <meta name="theme-color" content="#000000">
      </head>
      <body>
        <div id="container" style="padding: 24px" />
        <script>const mountNode = document.getElementById('container');</script>
      </body>
    </html>
  `;

  const suffix = codeType === 'tsx' ? 'tsx' : 'js';

  const runtimeDependencies = (jsx as string).split('\n').reduce<Record<PropertyKey, string>>(
    (acc, line) => {
      const matches = line.match(/import .+? from '(.+)';$/);
      if (matches?.[1]) {
        const paths = matches[1].split('/');
        const dep = paths[0].startsWith('@') ? `${paths[0]}/${paths[1]}` : paths[0];
        acc[dep] ??= pkgDependencyList[dep] ?? 'latest';
      }
      return acc;
    },
    { antd: pkg.version },
  );

  runtimeDependencies.react = '^19.0.0';
  runtimeDependencies['react-dom'] = '^19.0.0';
  runtimeDependencies['@ant-design/icons'] = dependencies['@ant-design/icons'] || 'latest';

  const runtimeDevDependencies: Record<PropertyKey, string> = {};

  if (suffix === 'tsx') {
    runtimeDevDependencies['@types/react'] = devDependencies['@types/react'] || '^19.0.0';
    runtimeDevDependencies['@types/react-dom'] = devDependencies['@types/react-dom'] || '^19.0.0';
  }

  const codepenPrefillConfig = {
    title: `${title} - antd@${runtimeDependencies.antd}`,
    html,
    js: `const { createRoot } = ReactDOM;\n${jsx
      .replace(/import\s+(?:React,\s+)?{(\s+[^}]*\s+)}\s+from\s+'react'/, `const { $1 } = React;`)
      .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'antd';/, 'const { $1 } = antd;')
      .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'@ant-design\/icons';/, 'const { $1 } = icons;')
      .replace("import moment from 'moment';", '')
      .replace("import React from 'react';", '')
      .replace(/import\s+{\s+(.*)\s+}\s+from\s+'react-router';/, 'const { $1 } = ReactRouter;')
      .replace(
        /import\s+{\s+(.*)\s+}\s+from\s+'react-router-dom';/,
        'const { $1 } = ReactRouterDOM;',
      )
      .replace(/([A-Za-z]*)\s+as\s+([A-Za-z]*)/, '$1:$2')
      .replace(
        /export default/,
        'const ComponentDemo =',
      )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
    editors: '001',
    css: '',
    js_external: [
      'react@19/cjs/react.development.js',
      'react-dom@19/cjs/react-dom.development.js',
      'dayjs@1/dayjs.min.js',
      `antd@${pkg.version}/dist/antd-with-locales.min.js`,
      `@ant-design/icons/dist/index.umd.js`,
      'react-router-dom/dist/umd/react-router-dom.production.min.js',
      'react-router/dist/umd/react-router.production.min.js',
    ]
      .map((url) => `https://unpkg.com/${url}`)
      .join(';'),
    js_pre_processor: 'typescript',
  };

  // Reorder source code
  let parsedSourceCode = suffix === 'tsx' ? entryCode : jsx;
  let importReactContent = "import React from 'react';";
  const importReactReg = /import React(\D*)from 'react';/;
  const matchImportReact = parsedSourceCode.match(importReactReg);
  if (matchImportReact) {
    [importReactContent] = matchImportReact;
    parsedSourceCode = parsedSourceCode.replace(importReactReg, '').trim();
  }
  const demoJsContent = `
${importReactContent}
${styleCode ? `import './index.css';` : ''}
${parsedSourceCode}
    `.trim();
  const indexCssContent = (styleCode || '')
    .trim()
    .replace(new RegExp(`#${assetId}\\s*`, 'g'), '')
    .replace('</style>', '')
    .replace('<style>', '')
    .replace('```css', '')
    .replace('```', '');

  const indexJsContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';

createRoot(document.getElementById('container')).render(<Demo />);
  `;

  const codesandboxPackage = {
    title: `${title} - antd@${runtimeDependencies.antd}`,
    main: 'index.js',
    dependencies: {
      ...runtimeDependencies,
    },
    devDependencies: {
      ...runtimeDevDependencies,
      '@types/node': '^24.0.0',
      typescript: '^5.0.2',
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test --env=jsdom',
      eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead'],
  };

  const codesanboxPrefillConfig = {
    files: {
      'package.json': { content: codesandboxPackage },
      'index.css': { content: indexCssContent },
      [`index.${suffix}`]: { content: indexJsContent },
      [`demo.${suffix}`]: { content: demoJsContent },
      'index.html': {
        content: html,
      },
    },
  };

  const stackblitzPrefillConfig = getStackblitzConfig({
    title: `${title} - antd@${runtimeDependencies.antd}`,
    dependencies: runtimeDependencies,
    devDependencies: runtimeDevDependencies,
    demoJsContent,
    indexCssContent,
    suffix,
    isZhCN,
  });

  const handleDebug: MenuProps['onClick'] = ({ key }) => {
    const option: any = debugOptions?.find((opt) => opt?.key === key);

    if (typeof option?.url === 'string') {
      window.open(option.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Flex wrap gap="middle" className="code-box-actions" align="center">
      {
        // 调试选项
        debugOptions?.length ? (
          <Dropdown menu={{ items: debugOptions, onClick: handleDebug }}>
            <Button icon={<BugOutlined />} color="orange" variant="filled" size="small">
              Debug
            </Button>
          </Dropdown>
        ) : null
      }
      {/* CodeSandbox 按钮 */}
      <form
        className="code-box-code-action"
        action="https://codesandbox.io/api/v1/sandboxes/define"
        method="POST"
        target="_blank"
        rel="noreferrer"
        ref={codeSandboxIconRef}
        onClick={() => {
          track({ type: 'codesandbox', demo: assetId });
          codeSandboxIconRef.current?.submit();
        }}
      >
        <input
          type="hidden"
          name="parameters"
          value={compress(JSON.stringify(codesanboxPrefillConfig))}
        />
        <Tooltip title={<FormattedMessage id="app.demo.codesandbox" />}>
          <CodeSandboxIcon className="code-box-codesandbox" />
        </Tooltip>
      </form>
      {/* 代码块复制按钮 */}
      <CodeBlockButton title={title} dependencies={runtimeDependencies} jsx={jsx} />
      {/* StackBlitz 按钮 */}
      <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
        <span
          className="code-box-code-action"
          aria-label="open in new tab"
          tabIndex={0}
          role="button"
          onClick={() => {
            track({ type: 'stackblitz', demo: assetId });
            stackblitzSdk.openProject(stackblitzPrefillConfig, {
              openFile: [`src/demo.${suffix === 'tsx' ? 'tsx' : 'jsx'}`],
            });
          }}
        >
          <ThunderboltOutlined
            className="code-box-stackblitz"
            style={{ transform: 'scale(1.2)' }}
          />
        </span>
      </Tooltip>
      {/* CodePen 按钮 */}
      <form
        className="code-box-code-action"
        action="https://codepen.io/pen/define"
        method="POST"
        target="_blank"
        rel="noreferrer"
        ref={codepenIconRef}
        onClick={() => {
          track({ type: 'codepen', demo: assetId });
          codepenIconRef.current?.submit();
        }}
      >
        <ClientOnly>
          <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
        </ClientOnly>
        <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
          <CodePenIcon className="code-box-codepen" />
        </Tooltip>
      </form>
      {/* 分离窗口按钮 */}
      <Tooltip title={<FormattedMessage id="app.demo.separate" />}>
        <a
          className="code-box-code-action"
          aria-label="open in new tab"
          target="_blank"
          rel="noreferrer"
          href={demoUrlWithTheme}
        >
          <ExternalLinkIcon className="code-box-separate" />
        </a>
      </Tooltip>
      {/* 展开/收起代码按钮 */}
      <Tooltip title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}>
        <div
          className="code-expand-icon code-box-code-action"
          tabIndex={0}
          role="button"
          onClick={handleCodeExpand}
        >
          <ExpandIcon expanded={codeExpand} />
        </div>
      </Tooltip>
    </Flex>
  );
};

const SuspenseActions: React.FC<React.ComponentProps<typeof Actions>> = (props) => (
  <Suspense fallback={null}>
    <Actions {...props} />
  </Suspense>
);

export default SuspenseActions;
