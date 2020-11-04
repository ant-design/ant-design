/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import LZString from 'lz-string';
import { Tooltip, Alert } from 'antd';
import { SnippetsOutlined, CheckOutlined, ThunderboltOutlined } from '@ant-design/icons';
import stackblitzSdk from '@stackblitz/sdk';
import CodePreview from './CodePreview';
import EditButton from '../EditButton';
import BrowserFrame from '../../BrowserFrame';
import CodeSandboxIcon from './CodeSandboxIcon';
import CodePenIcon from './CodePenIcon';
import RiddleIcon from './RiddleIcon';

const { ErrorBoundary } = Alert;

function compress(string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

class Demo extends React.Component {
  iframeRef = React.createRef();

  codeSandboxIconRef = React.createRef();

  riddleIconRef = React.createRef();

  codepenIconRef = React.createRef();

  state = {
    codeExpand: false,
    copied: false,
    copyTooltipVisible: false,
  };

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchor.click();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { codeExpand, copied, copyTooltipVisible } = this.state;
    const { expand, theme, showRiddleButton } = this.props;
    return (
      (codeExpand || expand) !== (nextState.codeExpand || nextProps.expand) ||
      copied !== nextState.copied ||
      copyTooltipVisible !== nextState.copyTooltipVisible ||
      nextProps.theme !== theme ||
      nextProps.showRiddleButton !== showRiddleButton
    );
  }

  getSourceCode() {
    const { highlightedCodes } = this.props;
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = highlightedCodes.jsx;
      return div.textContent;
    }
    return '';
  }

  handleCodeExpand = demo => {
    const { codeExpand } = this.state;
    this.setState({ codeExpand: !codeExpand });
    this.track({
      type: 'expand',
      demo,
    });
  };

  saveAnchor = anchor => {
    this.anchor = anchor;
  };

  handleCodeCopied = demo => {
    this.setState({ copied: true });
    this.track({
      type: 'copy',
      demo,
    });
  };

  onCopyTooltipVisibleChange = visible => {
    if (visible) {
      this.setState({
        copyTooltipVisible: visible,
        copied: false,
      });
      return;
    }
    this.setState({
      copyTooltipVisible: visible,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  track({ type, demo }) {
    if (!window.gtag) {
      return;
    }
    window.gtag('event', 'demo', {
      event_category: type,
      event_label: demo,
    });
  }

  handleIframeReady = () => {
    const { theme, setIframeTheme } = this.props;
    if (this.iframeRef.current) {
      setIframeTheme(this.iframeRef.current, theme);
    }
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
      utils,
      intl: { locale },
      theme,
      showRiddleButton,
    } = props;
    const { copied, copyTooltipVisible } = state;
    if (!this.liveDemo) {
      this.liveDemo = meta.iframe ? (
        <BrowserFrame>
          <iframe
            ref={this.iframeRef}
            onLoad={this.handleIframeReady}
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
    const localizedTitle = meta.title[locale] || meta.title;
    const localizeIntro = content[locale] || content;
    const introChildren = utils.toReactComponent(['div'].concat(localizeIntro));

    const highlightClass = classNames('highlight-wrapper', {
      'highlight-wrapper-expand': codeExpand,
    });

    const prefillStyle = `@import '~antd/dist/antd.css';\n\n${style || ''}`.replace(
      new RegExp(`#${meta.id}\\s*`, 'g'),
      '',
    );
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

    const sourceCode = this.getSourceCode();

    const dependencies = sourceCode.split('\n').reduce(
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
      // eslint-disable-next-line no-undef
      { antd: antdReproduceVersion },
    );

    dependencies['@ant-design/icons'] = 'latest';

    const codepenPrefillConfig = {
      title: `${localizedTitle} - antd@${dependencies.antd}`,
      html,
      js: sourceCode
        .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'antd';/, 'const { $1 } = antd;')
        .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'@ant-design\/icons';/, 'const { $1 } = icons;')
        .replace("import moment from 'moment';", '')
        .replace(/import\s+{\s+(.*)\s+}\s+from\s+'react-router';/, 'const { $1 } = ReactRouter;')
        .replace(
          /import\s+{\s+(.*)\s+}\s+from\s+'react-router-dom';/,
          'const { $1 } = ReactRouterDOM;',
        )
        .replace(/([A-Za-z]*)\s+as\s+([A-Za-z]*)/, '$1:$2'),
      css: prefillStyle,
      editors: '001',
      // eslint-disable-next-line no-undef
      css_external: `https://unpkg.com/antd@${antdReproduceVersion}/dist/antd.css`,
      js_external: [
        'react@16.x/umd/react.development.js',
        'react-dom@16.x/umd/react-dom.development.js',
        'moment/min/moment-with-locales.js',
        // eslint-disable-next-line no-undef
        `antd@${antdReproduceVersion}/dist/antd-with-locales.js`,
        `@ant-design/icons/dist/index.umd.js`,
        'react-router-dom/umd/react-router-dom.min.js',
        'react-router@3.x/umd/ReactRouter.min.js',
      ]
        .map(url => `https://unpkg.com/${url}`)
        .join(';'),
      js_pre_processor: 'typescript',
    };

    const riddlePrefillConfig = {
      title: `${localizedTitle} - antd@${dependencies.antd}`,
      js: sourceCode,
      css: prefillStyle,
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
    let parsedSourceCode = sourceCode;
    let importReactContent = "import React from 'react';";

    const importReactReg = /import(\D*)from 'react';/;
    const matchImportReact = parsedSourceCode.match(importReactReg);
    if (matchImportReact) {
      [importReactContent] = matchImportReact;
      parsedSourceCode = parsedSourceCode.replace(importReactReg, '').trim();
    }

    const indexJsContent = `
${importReactContent}
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
${parsedSourceCode.replace('mountNode', "document.getElementById('container')")}
`.trim();
    const indexCssContent = (style || '')
      .trim()
      .replace(new RegExp(`#${meta.id}\\s*`, 'g'), '')
      .replace('</style>', '')
      .replace('<style>', '');

    const codesandboxPackage = {
      title: `${localizedTitle} - antd@${dependencies.antd}`,
      main: 'index.js',
      dependencies: {
        ...dependencies,
        react: '^16.14.0',
        'react-dom': '^16.14.0',
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
        'index.js': { content: indexJsContent },
        'index.html': {
          content: html,
        },
      },
    };
    const stackblitzPrefillConfig = {
      title: `${localizedTitle} - antd@${dependencies.antd}`,
      template: 'create-react-app',
      dependencies,
      files: {
        'index.css': indexCssContent,
        'index.js': indexJsContent,
        'index.html': html,
      },
    };
    return (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          <ErrorBoundary>{this.liveDemo}</ErrorBoundary>
          {style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <Tooltip title={meta.debug ? <FormattedMessage id="app.demo.debug" /> : ''}>
              <a href={`#${meta.id}`} ref={this.saveAnchor}>
                {localizedTitle}
              </a>
            </Tooltip>
            <EditButton
              title={<FormattedMessage id="app.content.edit-demo" />}
              filename={meta.filename}
            />
          </div>
          <div className="code-box-description">{introChildren}</div>
          <div className="code-box-actions">
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
                this.codepenIconRef.current.submit();
              }}
              style={{
                display: sourceCode ? '' : 'none',
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
                  stackblitzSdk.openProject(stackblitzPrefillConfig);
                }}
              >
                <ThunderboltOutlined className="code-box-stackblitz" />
              </span>
            </Tooltip>
            <CopyToClipboard text={sourceCode} onCopy={() => this.handleCodeCopied(meta.id)}>
              <Tooltip
                visible={copyTooltipVisible}
                onVisibleChange={this.onCopyTooltipVisibleChange}
                title={<FormattedMessage id={`app.demo.${copied ? 'copied' : 'copy'}`} />}
              >
                {React.createElement(
                  copied && copyTooltipVisible ? CheckOutlined : SnippetsOutlined,
                  {
                    className: 'code-box-code-copy code-box-code-action',
                  },
                )}
              </Tooltip>
            </CopyToClipboard>
            <Tooltip
              title={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}
            >
              <span className="code-expand-icon code-box-code-action">
                <img
                  alt="expand code"
                  src={
                    theme === 'dark'
                      ? 'https://gw.alipayobjects.com/zos/antfincdn/btT3qDZn1U/wSAkBuJFbdxsosKKpqyq.svg'
                      : 'https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg'
                  }
                  className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                  onClick={() => this.handleCodeExpand(meta.id)}
                />
                <img
                  alt="expand code"
                  src={
                    theme === 'dark'
                      ? 'https://gw.alipayobjects.com/zos/antfincdn/CjZPwcKUG3/OpROPHYqWmrMDBFMZtKF.svg'
                      : 'https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg'
                  }
                  className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                  onClick={() => this.handleCodeExpand(meta.id)}
                />
              </span>
            </Tooltip>
          </div>
        </section>
        <section className={highlightClass} key="code">
          <CodePreview toReactComponent={props.utils.toReactComponent} codes={highlightedCodes} />
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
  }
}

export default injectIntl(Demo);
