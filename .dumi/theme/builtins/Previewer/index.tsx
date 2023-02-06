import {
  CheckOutlined,
  SnippetsOutlined,
  ThunderboltOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import stackblitzSdk from '@stackblitz/sdk';
import type { Project } from '@stackblitz/sdk';
import { Alert, Badge, Tooltip, Space } from 'antd';
import classNames from 'classnames';
import LZString from 'lz-string';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'dumi';
import ClientOnly from '../../common/ClientOnly';
import BrowserFrame from '../../common/BrowserFrame';
import EditButton from '../../common/EditButton';
import CodePenIcon from '../../common/CodePenIcon';
import CodePreview from '../../common/CodePreview';
import CodeSandboxIcon from '../../common/CodeSandboxIcon';
import RiddleIcon from '../../common/RiddleIcon';
import ExternalLinkIcon from '../../common/ExternalLinkIcon';
import fromDumiProps from './fromDumiProps';
import type { SiteContextProps } from '../../slots/SiteContext';
import SiteContext from '../../slots/SiteContext';
import { version } from '../../../../package.json';

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

interface DemoProps {
  meta: any;
  intl: any;
  utils?: any;
  src: string;
  content: string;
  highlightedCodes: Record<PropertyKey, string>;
  style: string;
  highlightedStyle: string;
  expand: boolean;
  sourceCodes: Record<'jsx' | 'tsx', string>;
  location: Location;
  showRiddleButton: boolean;
  preview: (react: typeof React, reactDOM: typeof ReactDOM) => React.ReactNode;
}

const Demo: React.FC<DemoProps> = (props) => {
  const {
    location,
    sourceCodes,
    meta,
    src,
    utils,
    content,
    highlightedCodes,
    style,
    highlightedStyle,
    expand,
    intl: { locale },
    showRiddleButton,
    preview,
  } = props;

  const liveDemo = useRef<React.ReactNode>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  const riddleIconRef = useRef<HTMLFormElement>(null);
  const codepenIconRef = useRef<HTMLFormElement>(null);
  const [codeExpand, setCodeExpand] = useState<boolean>(false);
  const [copyTooltipOpen, setCopyTooltipOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [codeType, setCodeType] = useState<string>('tsx');
  const { theme } = useContext<SiteContextProps>(SiteContext);

  const { hash, pathname, search } = location;
  const docsOnlineUrl = `https://ant.design${pathname}${search}#${meta.id}`;

  const regexp = /preview-(\d+)-ant-design/; // matching PR preview addresses
  const showOnlineUrl =
    process.env.NODE_ENV === 'development' || regexp.test(window.location.hostname);

  const handleCodeExpand = (demo: string) => {
    setCodeExpand((prev) => !prev);
    track({ type: 'expand', demo });
  };

  const handleCodeCopied = (demo: string) => {
    setCopied(true);
    track({ type: 'copy', demo });
  };

  const onCopyTooltipOpenChange = (open: boolean) => {
    setCopyTooltipOpen(open);
    if (open) {
      setCopied(false);
    }
  };

  useEffect(() => {
    if (meta.id === hash.slice(1)) {
      anchorRef.current?.click();
    }
  }, []);

  useEffect(() => {
    setCodeExpand(expand);
  }, [expand]);

  if (!liveDemo.current) {
    liveDemo.current = meta.iframe ? (
      <BrowserFrame>
        <iframe src={src} height={meta.iframe} title="demo" className="iframe-demo" />
      </BrowserFrame>
    ) : (
      preview(React, ReactDOM)
    );
  }

  const codeBoxClass = classNames('code-box', {
    expand: codeExpand,
    'code-box-debug': meta.originDebug,
  });

  const localizedTitle = meta?.title[locale] || meta?.title;
  const localizeIntro = content[locale] || content;
  const introChildren = <div dangerouslySetInnerHTML={{ __html: localizeIntro }} />;
  const highlightClass = classNames('highlight-wrapper', {
    'highlight-wrapper-expand': codeExpand,
  });

  const html = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
        </head>
        <body>
          <div id="container" style="padding: 24px" />
          <script>const mountNode = document.getElementById('container');</script>
        </body>
      </html>
    `;

  const tsconfig = `
    {
      "compilerOptions": {
        "jsx": "react-jsx",
        "target": "esnext",
        "module": "esnext",
        "esModuleInterop": true,
        "moduleResolution": "node",
      }
    }
  `;

  const suffix = codeType === 'tsx' ? 'tsx' : 'js';

  const dependencies: Record<PropertyKey, string> = sourceCodes?.jsx.split('\n').reduce(
    (acc, line) => {
      const matches = line.match(/import .+? from '(.+)';$/);
      if (matches && matches[1] && !line.includes('antd')) {
        const paths = matches[1].split('/');
        if (paths.length) {
          const dep = paths[0].startsWith('@') ? `${paths[0]}/${paths[1]}` : paths[0];
          acc[dep] = 'latest';
        }
      }
      return acc;
    },
    { antd: version },
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
    js: `const { createRoot } = ReactDOM;\n${sourceCodes?.jsx
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
      `antd@${version}/dist/antd-with-locales.js`,
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
      /import React(\D*)from 'react';/.test(sourceCodes?.jsx) ? '' : `import React from 'react';\n`
    }import { createRoot } from 'react-dom/client';\n${sourceCodes?.jsx.replace(
      /export default/,
      'const ComponentDemo =',
    )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
    css: '',
    json: JSON.stringify({ name: 'antd-demo', dependencies }, null, 2),
  };

  // Reorder source code
  let parsedSourceCode = suffix === 'tsx' ? sourceCodes?.tsx : sourceCodes?.jsx;
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
    .replace(new RegExp(`#${meta.id}\\s*`, 'g'), '')
    .replace('</style>', '')
    .replace('<style>', '');

  const indexJsContent = `
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import Demo from './demo';

    createRoot(document.getElementById('container')).render(<Demo />);
  `;

  const codesandboxPackage = {
    title: `${localizedTitle} - antd@${dependencies.antd}`,
    main: 'index.js',
    dependencies: {
      ...dependencies,
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      'react-scripts': '^4.0.0',
    },
    devDependencies: {
      typescript: '^4.0.5',
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
    stackblitzPrefillConfig.files['tsconfig.json'] = tsconfig;
  }

  const backgroundGrey = theme.includes('dark') ? '#303030' : '#f0f2f5';

  const codeBoxDemoStyle: React.CSSProperties = {
    padding: meta.iframe || meta.compact ? 0 : undefined,
    overflow: meta.iframe || meta.compact ? 'hidden' : undefined,
    backgroundColor: meta.background === 'grey' ? backgroundGrey : undefined,
  };

  const codeBox: React.ReactNode = (
    <section className={codeBoxClass} id={meta.id}>
      <section className="code-box-demo" style={codeBoxDemoStyle}>
        <ErrorBoundary>
          <React.StrictMode>{liveDemo.current}</React.StrictMode>
        </ErrorBoundary>
        {style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
      </section>
      <section className="code-box-meta markdown">
        <div className="code-box-title">
          <Tooltip title={meta.originDebug ? <FormattedMessage id="app.demo.debug" /> : ''}>
            <a href={`#${meta.id}`} ref={anchorRef}>
              {localizedTitle}
            </a>
          </Tooltip>
          <EditButton
            title={<FormattedMessage id="app.content.edit-demo" />}
            filename={meta.filename}
          />
        </div>
        <div className="code-box-description">{introChildren}</div>
        <Space wrap size="middle" className="code-box-actions">
          {showOnlineUrl && (
            <Tooltip title={<FormattedMessage id="app.demo.online" />}>
              <a
                className="code-box-code-action"
                target="_blank"
                rel="noreferrer"
                href={docsOnlineUrl}
              >
                <LinkOutlined className="code-box-online" />
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
                track({ type: 'riddle', demo: meta.id });
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
              track({ type: 'codesandbox', demo: meta.id });
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
              track({ type: 'codepen', demo: meta.id });
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
                track({ type: 'stackblitz', demo: meta.id });
                stackblitzSdk.openProject(stackblitzPrefillConfig, {
                  openFile: [`demo.${suffix}`],
                });
              }}
            >
              <ThunderboltOutlined className="code-box-stackblitz" />
            </span>
          </Tooltip>
          <CopyToClipboard text={sourceCodes?.tsx} onCopy={() => handleCodeCopied(meta.id)}>
            <Tooltip
              open={copyTooltipOpen as boolean}
              onOpenChange={onCopyTooltipOpenChange}
              title={<FormattedMessage id={`app.demo.${copied ? 'copied' : 'copy'}`} />}
            >
              {React.createElement(copied && copyTooltipOpen ? CheckOutlined : SnippetsOutlined, {
                className: 'code-box-code-copy code-box-code-action',
              })}
            </Tooltip>
          </CopyToClipboard>
          <Tooltip title={<FormattedMessage id="app.demo.separate" />}>
            <a className="code-box-code-action" target="_blank" rel="noreferrer" href={src}>
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
                onClick={() => handleCodeExpand(meta.id)}
              />
              <img
                alt="expand code"
                src={
                  theme?.includes('dark')
                    ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                    : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
                }
                className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                onClick={() => handleCodeExpand(meta.id)}
              />
            </div>
          </Tooltip>
        </Space>
      </section>
      <section className={highlightClass} key="code">
        <CodePreview
          codes={highlightedCodes}
          toReactComponent={utils?.toReactComponent}
          onCodeTypeChange={(type) => setCodeType(type)}
        />
        {highlightedStyle ? (
          <div key="style" className="highlight">
            <pre>
              <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
            </pre>
          </div>
        ) : null}
      </section>
    </section>
  );

  if (meta.version) {
    return (
      <Badge.Ribbon text={meta.version} color={meta.version.includes('<') ? 'red' : null}>
        {codeBox}
      </Badge.Ribbon>
    );
  }

  return codeBox;
};

export default fromDumiProps(Demo);
