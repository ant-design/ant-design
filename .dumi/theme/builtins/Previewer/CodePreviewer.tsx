import React, { useContext, useEffect, useRef, useState } from 'react';
import { LinkOutlined, ThunderboltOutlined, UpOutlined } from '@ant-design/icons';
import type { Project } from '@stackblitz/sdk';
import stackblitzSdk from '@stackblitz/sdk';
import { Alert, Badge, Space, Tooltip } from 'antd';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';
import { FormattedMessage, useSiteData, LiveContext } from 'dumi';
import LZString from 'lz-string';

import type { AntdPreviewerProps } from './Previewer';
import useLocation from '../../../hooks/useLocation';
import BrowserFrame from '../../common/BrowserFrame';
import ClientOnly from '../../common/ClientOnly';
import CodePenIcon from '../../common/CodePenIcon';
import CodePreview from '../../common/CodePreview';
import CodeSandboxIcon from '../../common/CodeSandboxIcon';
import EditButton from '../../common/EditButton';
import ExternalLinkIcon from '../../common/ExternalLinkIcon';
import RiddleIcon from '../../common/RiddleIcon';
import type { SiteContextProps } from '../../slots/SiteContext';
import SiteContext from '../../slots/SiteContext';
import { ping } from '../../utils';
import LiveDemo from 'dumi/theme-default/slots/LiveDemo';

const { ErrorBoundary } = Alert;

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

const track = ({ type, demo }: { type: string; demo: string }) => {
  if (!window.gtag) {
    return;
  }
  window.gtag('event', 'demo', { event_category: type, event_label: demo });
};

let pingDeferrer: PromiseLike<boolean>;

function useShowRiddleButton() {
  const [showRiddleButton, setShowRiddleButton] = useState(false);

  useEffect(() => {
    pingDeferrer ??= new Promise<boolean>((resolve) => {
      ping((status) => {
        if (status !== 'timeout' && status !== 'error') {
          return resolve(true);
        }

        return resolve(false);
      });
    });
    pingDeferrer.then(setShowRiddleButton);
  }, []);

  return showRiddleButton;
}

const useStyle = createStyles(({ token }) => {
  const { borderRadius } = token;
  return {
    codeHideBtn: css`
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 ${borderRadius}px ${borderRadius}px;
      border-top: 1px solid ${token.colorSplit};
      color: ${token.colorTextSecondary};
      transition: all 0.2s ease-in-out;
      background-color: ${token.colorBgElevated};
      cursor: pointer;
      &:hover {
        color: ${token.colorPrimary};
      }
      span {
        margin-right: ${token.marginXXS}px;
      }
    `,
  };
});

const CodePreviewer: React.FC<AntdPreviewerProps> = (props) => {
  const {
    asset,
    expand,
    iframe,
    demoUrl,
    children,
    title,
    description,
    originDebug,
    jsx,
    style,
    compact,
    background,
    filename,
    version,
    clientOnly,
    pkgDependencyList,
  } = props;

  const { pkg } = useSiteData();
  const location = useLocation();

  const { enabled: liveEnabled } = useContext(LiveContext);

  const { styles } = useStyle();

  const entryCode = asset.dependencies['index.tsx'].value;
  const showRiddleButton = useShowRiddleButton();

  const liveDemo = useRef<React.ReactNode>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  const riddleIconRef = useRef<HTMLFormElement>(null);
  const codepenIconRef = useRef<HTMLFormElement>(null);
  const [codeExpand, setCodeExpand] = useState<boolean>(false);
  const [codeType, setCodeType] = useState<string>('tsx');
  const { theme } = useContext<SiteContextProps>(SiteContext);

  const { hash, pathname, search } = location;
  const docsOnlineUrl = `https://ant.design${pathname}${search}#${asset.id}`;

  const [showOnlineUrl, setShowOnlineUrl] = useState<boolean>(false);

  useEffect(() => {
    const regexp = /preview-(\d+)-ant-design/; // matching PR preview addresses
    setShowOnlineUrl(
      process.env.NODE_ENV === 'development' || regexp.test(window.location.hostname),
    );
  }, []);

  const handleCodeExpand = (demo: string) => {
    setCodeExpand((prev) => !prev);
    track({ type: 'expand', demo });
  };

  useEffect(() => {
    if (asset.id === hash.slice(1)) {
      anchorRef.current?.click();
    }
  }, []);

  useEffect(() => {
    setCodeExpand(expand);
  }, [expand]);

  const mergedChildren = !iframe && clientOnly ? <ClientOnly>{children}</ClientOnly> : children;

  if (!liveDemo.current) {
    liveDemo.current = iframe ? (
      <BrowserFrame>
        <iframe
          src={demoUrl}
          height={iframe === true ? undefined : iframe}
          title="demo"
          className="iframe-demo"
        />
      </BrowserFrame>
    ) : (
      mergedChildren
    );
  }

  const codeBoxClass = classNames('code-box', {
    expand: codeExpand,
    'code-box-debug': originDebug,
  });

  const localizedTitle = title;
  const highlightClass = classNames('highlight-wrapper', {
    'highlight-wrapper-expand': codeExpand,
  });

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

  const tsconfig = {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      esModuleInterop: true,
      moduleResolution: 'node',
      jsx: 'react',
      jsxFactory: 'React.createElement',
      jsxFragmentFactory: 'React.Fragment',
    },
  };

  const suffix = codeType === 'tsx' ? 'tsx' : 'js';

  const dependencies = (jsx as string).split('\n').reduce<Record<PropertyKey, string>>(
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

  dependencies['@ant-design/icons'] = 'latest';

  if (suffix === 'tsx') {
    dependencies['@types/react'] = '^18.0.0';
    dependencies['@types/react-dom'] = '^18.0.0';
  }

  dependencies.react = '^18.0.0';
  dependencies['react-dom'] = '^18.0.0';

  const codepenPrefillConfig = {
    title: `${localizedTitle} - antd@${dependencies.antd}`,
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
      'react@18/umd/react.development.js',
      'react-dom@18/umd/react-dom.development.js',
      'dayjs@1/dayjs.min.js',
      `antd@${pkg.version}/dist/antd-with-locales.js`,
      `@ant-design/icons/dist/index.umd.js`,
      'react-router-dom/dist/umd/react-router-dom.production.min.js',
      'react-router/dist/umd/react-router.production.min.js',
    ]
      .map((url) => `https://unpkg.com/${url}`)
      .join(';'),
    js_pre_processor: 'typescript',
  };

  const riddlePrefillConfig = {
    title: `${localizedTitle} - antd@${dependencies.antd}`,
    js: `${
      /import React(\D*)from 'react';/.test(jsx) ? '' : `import React from 'react';\n`
    }import { createRoot } from 'react-dom/client';\n${jsx.replace(
      /export default/,
      'const ComponentDemo =',
    )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
    css: '',
    json: JSON.stringify({ name: 'antd-demo', dependencies }, null, 2),
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
import './index.css';
${parsedSourceCode}
    `.trim();
  const indexCssContent = (style || '')
    .trim()
    .replace(new RegExp(`#${asset.id}\\s*`, 'g'), '')
    .replace('</style>', '')
    .replace('<style>', '');

  const indexJsContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './demo';

createRoot(document.getElementById('container')).render(<Demo />);
  `;

  const codesandboxPackage = {
    title: `${localizedTitle} - antd@${dependencies.antd}`,
    main: 'index.js',
    dependencies: {
      ...dependencies,
      'rc-util': pkgDependencyList['rc-util'],
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      'react-scripts': '^5.0.0',
    },
    devDependencies: {
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

  const stackblitzPrefillConfig: Project = {
    title: `${localizedTitle} - antd@${dependencies.antd}`,
    template: 'create-react-app',
    dependencies,
    description: '',
    files: {
      'index.css': indexCssContent,
      [`index.${suffix}`]: indexJsContent,
      [`demo.${suffix}`]: demoJsContent,
      'index.html': html,
    },
  };

  if (suffix === 'tsx') {
    stackblitzPrefillConfig.files['tsconfig.json'] = JSON.stringify(tsconfig, null, 2);
  }

  const backgroundGrey = theme.includes('dark') ? '#303030' : '#f0f2f5';

  const codeBoxDemoStyle: React.CSSProperties = {
    padding: iframe || compact ? 0 : undefined,
    overflow: iframe || compact ? 'hidden' : undefined,
    backgroundColor: background === 'grey' ? backgroundGrey : undefined,
  };

  const codeBox: React.ReactNode = (
    <section className={codeBoxClass} id={asset.id}>
      <section className="code-box-demo" style={codeBoxDemoStyle}>
        {!liveEnabled ? (
          <ErrorBoundary>
            <React.StrictMode>{liveDemo.current}</React.StrictMode>
          </ErrorBoundary>
        ) : (
          <LiveDemo />
        )}
      </section>
      <section className="code-box-meta markdown">
        <div className="code-box-title">
          <Tooltip title={originDebug ? <FormattedMessage id="app.demo.debug" /> : ''}>
            <a href={`#${asset.id}`} ref={anchorRef}>
              {localizedTitle}
            </a>
          </Tooltip>
          <EditButton title={<FormattedMessage id="app.content.edit-demo" />} filename={filename} />
        </div>
        {description && (
          <div className="code-box-description" dangerouslySetInnerHTML={{ __html: description }} />
        )}
        <Space wrap size="middle" className="code-box-actions">
          {showOnlineUrl && (
            <Tooltip title={<FormattedMessage id="app.demo.online" />}>
              <a
                className="code-box-code-action"
                target="_blank"
                rel="noreferrer"
                href={docsOnlineUrl}
              >
                <LinkOutlined aria-label="open in new tab" className="code-box-online" />
              </a>
            </Tooltip>
          )}
          {showRiddleButton ? (
            <form
              className="code-box-code-action"
              action="//riddle.alibaba-inc.com/riddles/define"
              method="POST"
              target="_blank"
              ref={riddleIconRef}
              onClick={() => {
                track({ type: 'riddle', demo: asset.id });
                riddleIconRef.current?.submit();
              }}
            >
              <input type="hidden" name="data" value={JSON.stringify(riddlePrefillConfig)} />
              <Tooltip title={<FormattedMessage id="app.demo.riddle" />}>
                <RiddleIcon className="code-box-riddle" />
              </Tooltip>
            </form>
          ) : null}
          <form
            className="code-box-code-action"
            action="https://codesandbox.io/api/v1/sandboxes/define"
            method="POST"
            target="_blank"
            ref={codeSandboxIconRef}
            onClick={() => {
              track({ type: 'codesandbox', demo: asset.id });
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
          <form
            className="code-box-code-action"
            action="https://codepen.io/pen/define"
            method="POST"
            target="_blank"
            ref={codepenIconRef}
            onClick={() => {
              track({ type: 'codepen', demo: asset.id });
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
          <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
            <span
              className="code-box-code-action"
              onClick={() => {
                track({ type: 'stackblitz', demo: asset.id });
                stackblitzSdk.openProject(stackblitzPrefillConfig, {
                  openFile: [`demo.${suffix}`],
                });
              }}
            >
              <ThunderboltOutlined className="code-box-stackblitz" />
            </span>
          </Tooltip>
          <Tooltip title={<FormattedMessage id="app.demo.separate" />}>
            <a
              className="code-box-code-action"
              aria-label="open in new tab"
              target="_blank"
              rel="noreferrer"
              href={demoUrl}
            >
              <ExternalLinkIcon className="code-box-separate" />
            </a>
          </Tooltip>
          <Tooltip
            title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}
          >
            <div className="code-expand-icon code-box-code-action">
              <img
                alt="expand code"
                src={
                  theme?.includes('dark')
                    ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                    : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
                }
                className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                onClick={() => handleCodeExpand(asset.id)}
              />
              <img
                alt="expand code"
                src={
                  theme?.includes('dark')
                    ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                    : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
                }
                className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                onClick={() => handleCodeExpand(asset.id)}
              />
            </div>
          </Tooltip>
        </Space>
      </section>
      {codeExpand && (
        <section className={highlightClass} key="code">
          <CodePreview
            sourceCode={entryCode}
            jsxCode={jsx}
            styleCode={style}
            onCodeTypeChange={setCodeType}
          />
          <div
            tabIndex={0}
            role="button"
            className={styles.codeHideBtn}
            onClick={() => setCodeExpand(false)}
          >
            <UpOutlined />
            <FormattedMessage id="app.demo.code.hide.simplify" />
          </div>
        </section>
      )}
    </section>
  );

  useEffect(() => {
    // In Safari, if style tag be inserted into non-head tag,
    // it will affect the rendering ability of the browser,
    // resulting in some response delays like following issue:
    // https://github.com/ant-design/ant-design/issues/39995
    // So we insert style tag into head tag.
    if (!style) {
      return;
    }
    const styleTag = document.createElement('style') as HTMLStyleElement;
    styleTag.type = 'text/css';
    styleTag.innerHTML = style;
    (styleTag as any)['data-demo-url'] = demoUrl;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [style, demoUrl]);

  if (version) {
    return (
      <Badge.Ribbon text={version} color={version.includes('<') ? 'red' : undefined}>
        {codeBox}
      </Badge.Ribbon>
    );
  }

  return codeBox;
};

export default CodePreviewer;
