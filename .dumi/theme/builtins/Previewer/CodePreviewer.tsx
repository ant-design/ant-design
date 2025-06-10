/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import React, { useEffect, useRef, useState } from 'react';
import { UpOutlined } from '@ant-design/icons';
import type { Project } from '@stackblitz/sdk';
import { Badge, Tooltip } from 'antd';
import { createStyles, css } from 'antd-style';
import classNames from 'classnames';
import { FormattedMessage, useLiveDemo, useSiteData } from 'dumi';

import useLocation from '../../../hooks/useLocation';
import BrowserFrame from '../../common/BrowserFrame';
import ClientOnly from '../../common/ClientOnly';
import CodePreview from '../../common/CodePreview';
import EditButton from '../../common/EditButton';
import DemoContext from '../../slots/DemoContext';
import SiteContext from '../../slots/SiteContext';
import type { AntdPreviewerProps } from '.';
import Actions from './Actions';

const useStyle = createStyles(({ token }) => {
  const { borderRadius } = token;
  return {
    codeHideBtn: css`
      position: sticky;
      bottom: 0;
      z-index: 1;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0 0 ${borderRadius}px ${borderRadius}px;
      border-top: 1px solid ${token.colorSplit};
      color: ${token.colorTextSecondary};
      transition: all ${token.motionDurationMid} ease-in-out;
      background-color: ${token.colorBgElevated};
      cursor: pointer;
      &:hover {
        color: ${token.colorPrimary};
      }
      span {
        margin-inline-end: ${token.marginXXS}px;
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
    jsx = '',
    style,
    compact,
    background,
    filename,
    version,
    simplify,
    clientOnly,
    pkgDependencyList,
  } = props;
  const { codeType } = React.use(DemoContext);

  const { pkg } = useSiteData();
  const location = useLocation();

  const { styles } = useStyle();

  const entryName = 'index.tsx';
  const entryCode = asset.dependencies[entryName].value;

  const previewDemo = useRef<React.ReactNode>(null);
  const demoContainer = useRef<HTMLElement>(null);
  const {
    node: liveDemoNode,
    error: liveDemoError,
    setSource: setLiveDemoSource,
  } = useLiveDemo(asset.id, {
    iframe: Boolean(iframe),
    containerRef: demoContainer as React.RefObject<HTMLElement>,
  });
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [codeExpand, setCodeExpand] = useState<boolean>(false);
  const { theme } = React.use(SiteContext);

  const { hash, pathname, search } = location;
  const docsOnlineUrl = `https://ant.design${pathname ?? ''}${search ?? ''}#${asset.id}`;

  const [showOnlineUrl, setShowOnlineUrl] = useState<boolean>(false);

  useEffect(() => {
    const regexp = /preview-(\d+)-ant-design/; // matching PR preview addresses
    setShowOnlineUrl(
      process.env.NODE_ENV === 'development' || regexp.test(window.location.hostname),
    );
  }, []);

  useEffect(() => {
    if (asset.id === hash.slice(1)) {
      anchorRef.current?.click();
    }
  }, []);

  useEffect(() => {
    setCodeExpand(expand);
  }, [expand]);

  const mergedChildren = !iframe && clientOnly ? <ClientOnly>{children}</ClientOnly> : children;
  const demoUrlWithTheme = `${demoUrl}${theme.includes('dark') ? '?theme=dark' : ''}`;

  if (!previewDemo.current) {
    previewDemo.current = iframe ? (
      <BrowserFrame>
        <iframe
          src={demoUrlWithTheme}
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
    'code-box-simplify': simplify,
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
import './index.css';
${parsedSourceCode}
    `.trim();
  const indexCssContent = (style || '')
    .trim()
    .replace(new RegExp(`#${asset.id}\\s*`, 'g'), '')
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
    dependencies: {
      ...dependencies,
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      '@types/react': '^19.0.0',
      '@types/react-dom': '^19.0.0',
      '@ant-design/v5-patch-for-react-19': '^1.0.3',
    },
    description: '',
    files: {
      'index.css': indexCssContent,
      [`index.${suffix}`]: `import '@ant-design/v5-patch-for-react-19';\n${indexJsContent}`,
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
      <section className="code-box-demo" style={codeBoxDemoStyle} ref={demoContainer}>
        {liveDemoNode || <React.StrictMode>{previewDemo.current}</React.StrictMode>}
      </section>
      {!simplify && (
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Tooltip title={originDebug ? <FormattedMessage id="app.demo.debug" /> : ''}>
              <a href={`#${asset.id}`} ref={anchorRef}>
                {localizedTitle}
              </a>
            </Tooltip>
            <EditButton
              title={<FormattedMessage id="app.content.edit-demo" />}
              filename={filename}
            />
          </div>
          {description && (
            <div
              className="code-box-description"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: it's for markdown
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <Actions
            showOnlineUrl={showOnlineUrl}
            docsOnlineUrl={docsOnlineUrl}
            codesanboxPrefillConfig={codesanboxPrefillConfig}
            codepenPrefillConfig={codepenPrefillConfig}
            stackblitzPrefillConfig={stackblitzPrefillConfig}
            assetId={asset.id}
            localizedTitle={localizedTitle}
            dependencies={dependencies}
            jsx={jsx}
            suffix={String(suffix)}
            demoUrlWithTheme={demoUrlWithTheme}
            theme={theme}
            codeExpand={codeExpand}
            onCodeExpand={() => setCodeExpand((prev) => !prev)}
          />
        </section>
      )}
      {codeExpand && (
        <section className={highlightClass} key="code">
          <CodePreview
            sourceCode={entryCode}
            jsxCode={jsx}
            styleCode={style}
            error={liveDemoError}
            entryName={entryName}
            onSourceChange={setLiveDemoSource}
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
    (styleTag as any)['data-demo-url'] = demoUrlWithTheme;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [style, demoUrlWithTheme]);

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
