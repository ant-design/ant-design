/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import { CheckOutlined, SnippetsOutlined, ThunderboltOutlined } from '@ant-design/icons';
import stackblitzSdk from '@stackblitz/sdk';
import type { Project } from '@stackblitz/sdk';
import { Alert, Badge, Tooltip, Space } from 'antd';
import classNames from 'classnames';
import LZString from 'lz-string';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'dumi';
import BrowserFrame from '../../common/BrowserFrame';
import EditButton from '../../common/EditButton';
import CodePenIcon from '../../common/CodePenIcon';
import CodePreview from '../../common/CodePreview';
import CodeSandboxIcon from '../../common/CodeSandboxIcon';
import RiddleIcon from '../../common/RiddleIcon';
import ExternalLinkIcon from '../../common/ExternalLinkIcon';
import fromDumiProps from './fromDumiProps';
import { version } from '../../../../package.json';

const { ErrorBoundary } = Alert;

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

interface DemoProps {
  meta: any;
  src: string;
  content: string;
  preview: (react: typeof React, reactDOM: typeof ReactDOM) => React.ReactNode;
  highlightedCodes: Record<PropertyKey, string>;
  style: string;
  highlightedStyle: string;
  expand: boolean;
  intl: any;
  theme: string;
  sourceCodes: Record<'jsx' | 'tsx', string>;
  location: Location;
  showRiddleButton: boolean;
  utils?: any;
}

interface DemoState {
  codeType?: string;
  copied?: boolean;
  codeExpand?: boolean;
  copyTooltipOpen?: boolean | string;
}

class Demo extends React.Component<DemoProps, DemoState> {
  liveDemo: any;

  iframeRef = React.createRef<HTMLIFrameElement>();

  anchorRef = React.createRef<HTMLAnchorElement>();

  codeSandboxIconRef = React.createRef<HTMLFormElement>();

  riddleIconRef = React.createRef<HTMLFormElement>();

  codepenIconRef = React.createRef<HTMLFormElement>();

  state: DemoState = {
    codeExpand: false,
    copied: false,
    copyTooltipOpen: false,
    codeType: 'tsx',
  };

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchorRef.current?.click();
    }
  }

  shouldComponentUpdate(nextProps: DemoProps, nextState: DemoState) {
    const { codeExpand, copied, copyTooltipOpen, codeType } = this.state;
    const { expand, theme, showRiddleButton } = this.props;
    return (
      (codeExpand || expand) !== (nextState.codeExpand || nextProps.expand) ||
      copied !== nextState.copied ||
      copyTooltipOpen !== nextState.copyTooltipOpen ||
      codeType !== nextState.copyTooltipOpen ||
      nextProps.theme !== theme ||
      nextProps.showRiddleButton !== showRiddleButton
    );
  }

  getSourceCode = (): [string, string] => {
    const { sourceCodes } = this.props;
    return [sourceCodes.jsx, sourceCodes.tsx];
  };

  handleCodeExpand = (demo: string) => {
    const { codeExpand } = this.state;
    this.setState({ codeExpand: !codeExpand });
    this.track({ type: 'expand', demo });
  };

  handleCodeCopied = (demo: string) => {
    this.setState({ copied: true });
    this.track({ type: 'copy', demo });
  };

  onCopyTooltipOpenChange = (open: boolean) => {
    if (open) {
      this.setState({ copyTooltipOpen: open, copied: false });
      return;
    }
    this.setState({ copyTooltipOpen: open });
  };

  track = ({ type, demo }: { type: string; demo: string }) => {
    if (!window.gtag) {
      return;
    }
    window.gtag('event', 'demo', {
      event_category: type,
      event_label: demo,
    });
  };

  render() {
    const { state } = this;
    const { props } = this;
    const {
      meta,
      src,
      content,
      preview,
      highlightedCodes,
      style,
      highlightedStyle,
      expand,
      intl: { locale },
      theme,
      showRiddleButton,
    } = props;
    const { copied, copyTooltipOpen, codeType } = state;
    if (!this.liveDemo) {
      this.liveDemo = meta.iframe ? (
        <BrowserFrame>
          <iframe
            ref={this.iframeRef}
            src={src}
            height={meta.iframe}
            title="demo"
            className="iframe-demo"
          />
        </BrowserFrame>
      ) : (
        preview(React, ReactDOM)
      );
    }
    const codeExpand = this.state.codeExpand || expand;
    const codeBoxClass = classNames('code-box', {
      expand: codeExpand,
      'code-box-debug': meta.debug,
    });
    const localizedTitle = meta?.title[locale] || meta?.title;
    const localizeIntro = content[locale] || content;
    const introChildren = <div dangerouslySetInnerHTML={{ __html: localizeIntro }} />;

    const highlightClass = classNames('highlight-wrapper', {
      'highlight-wrapper-expand': codeExpand,
    });
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
  </head>
  <body>
    <div id="container" style="padding: 24px" />
    <script>var mountNode = document.getElementById('container');</script>
  </body>
</html>`;

    const tsconfig = `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "target": "esnext",
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "node",
  }
}`;

    const [sourceCode, sourceCodeTyped] = this.getSourceCode();
    const suffix = codeType === 'tsx' ? 'tsx' : 'js';

    const dependencies: Record<PropertyKey, string> = sourceCode.split('\n').reduce(
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
      js: `${'const { createRoot } = ReactDOM;\n'}${sourceCode
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
        `antd@${version}/dist/antd-with-locales.js`,
        `@ant-design/icons/dist/index.umd.js`,
        'react-router-dom/umd/react-router-dom.min.js',
        'react-router@3.x/umd/ReactRouter.min.js',
      ]
        .map((url) => `https://unpkg.com/${url}`)
        .join(';'),
      js_pre_processor: 'typescript',
    };

    const riddlePrefillConfig = {
      title: `${localizedTitle} - antd@${dependencies.antd}`,
      js: `${
        /import React(\D*)from 'react';/.test(sourceCode) ? '' : `import React from 'react';\n`
      }import { createRoot } from 'react-dom/client';\n${sourceCode.replace(
        /export default/,
        'const ComponentDemo =',
      )}\n\ncreateRoot(mountNode).render(<ComponentDemo />);\n`,
      css: '',
      json: JSON.stringify(
        {
          name: 'antd-demo',
          dependencies,
        },
        null,
        2,
      ),
    };

    // Reorder source code
    let parsedSourceCode = suffix === 'tsx' ? sourceCodeTyped : sourceCode;
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
      browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
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

    let codeBox = (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          <ErrorBoundary>
            <React.StrictMode>{this.liveDemo}</React.StrictMode>
          </ErrorBoundary>
          {style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Tooltip title={meta.debug ? <FormattedMessage id="app.demo.debug" /> : ''}>
              <a href={`#${meta.id}`} ref={this.anchorRef}>
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
            {showRiddleButton ? (
              <form
                className="code-box-code-action"
                action="//riddle.alibaba-inc.com/riddles/define"
                method="POST"
                target="_blank"
                ref={this.riddleIconRef}
                onClick={() => {
                  this.track({ type: 'riddle', demo: meta.id });
                  this.riddleIconRef.current.submit();
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
              ref={this.codeSandboxIconRef}
              onClick={() => {
                this.track({ type: 'codesandbox', demo: meta.id });
                this.codeSandboxIconRef.current.submit();
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
              ref={this.codepenIconRef}
              onClick={() => {
                this.track({ type: 'codepen', demo: meta.id });
                this.codepenIconRef.current?.submit();
              }}
            >
              <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
              <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
                <CodePenIcon className="code-box-codepen" />
              </Tooltip>
            </form>
            <Tooltip title={<FormattedMessage id="app.demo.stackblitz" />}>
              <span
                className="code-box-code-action"
                onClick={() => {
                  this.track({ type: 'stackblitz', demo: meta.id });
                  stackblitzSdk.openProject(stackblitzPrefillConfig, {
                    openFile: [`demo.${suffix}`],
                  });
                }}
              >
                <ThunderboltOutlined className="code-box-stackblitz" />
              </span>
            </Tooltip>
            <CopyToClipboard text={sourceCodeTyped} onCopy={() => this.handleCodeCopied(meta.id)}>
              <Tooltip
                open={copyTooltipOpen as boolean}
                onOpenChange={this.onCopyTooltipOpenChange}
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
                    theme === 'dark'
                      ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                      : 'https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg'
                  }
                  className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                  onClick={() => this.handleCodeExpand(meta.id)}
                />
                <img
                  alt="expand code"
                  src={
                    theme === 'dark'
                      ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                      : 'https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg'
                  }
                  className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                  onClick={() => this.handleCodeExpand(meta.id)}
                />
              </div>
            </Tooltip>
          </Space>
        </section>
        <section className={highlightClass} key="code">
          <CodePreview
            codes={highlightedCodes}
            toReactComponent={props.utils?.toReactComponent}
            onCodeTypeChange={(type) => this.setState({ codeType: type })}
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
      codeBox = (
        <Badge.Ribbon text={meta.version} color={meta.version.includes('<') ? 'red' : null}>
          {codeBox}
        </Badge.Ribbon>
      );
    }

    return codeBox;
  }
}

export default fromDumiProps(Demo);
