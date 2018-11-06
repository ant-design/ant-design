/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import LZString from 'lz-string';
import { Icon, Tooltip } from 'antd';
import EditButton from './EditButton';
import ErrorBoundary from './ErrorBoundary';
import BrowserFrame from '../BrowserFrame';
import { ping } from '../utils';

function compress(string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

export default class Demo extends React.Component {
  static contextTypes = {
    intl: PropTypes.object,
  }

  state = {
    codeExpand: false,
    copied: false,
    copyTooltipVisible: false,
    showRiddleButton: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { codeExpand, copied, copyTooltipVisible } = this.state;
    const { expand } = this.props;
    return (codeExpand || expand) !== (nextState.codeExpand || nextProps.expand)
      || copied !== nextState.copied
      || copyTooltipVisible !== nextState.copyTooltipVisible;
  }

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchor.click();
    }

    this.pingTimer = ping((status) => {
      if (status !== 'timeout' && status !== 'error') {
        this.setState({
          showRiddleButton: true,
        });
      }
    });
  }

  getSourceCode() {
    const { highlightedCode } = this.props;
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = highlightedCode[1].highlighted;
      return div.textContent;
    }
    return '';
  }

  handleCodeExpand = () => {
    const { codeExpand } = this.state;
    this.setState({ codeExpand: !codeExpand });
  }

  saveAnchor = (anchor) => {
    this.anchor = anchor;
  }

  handleCodeCopied = () => {
    this.setState({ copied: true });
  }

  onCopyTooltipVisibleChange = (visible) => {
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
  }

  render() {
    const { state } = this;
    const { props } = this;
    const {
      meta,
      src,
      content,
      preview,
      highlightedCode,
      style,
      highlightedStyle,
      expand,
    } = props;
    const { showRiddleButton, copied } = state;
    if (!this.liveDemo) {
      this.liveDemo = meta.iframe
        ? <BrowserFrame><iframe src={src} height={meta.iframe} title="demo" /></BrowserFrame>
        : preview(React, ReactDOM);
    }
    const codeExpand = state.codeExpand || expand;
    const codeBoxClass = classNames({
      'code-box': true,
      expand: codeExpand,
    });
    const { intl: { locale } } = this.context;
    const localizedTitle = meta.title[locale] || meta.title;
    const localizeIntro = content[locale] || content;
    const introChildren = props.utils
      .toReactComponent(['div'].concat(localizeIntro));

    const highlightClass = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': codeExpand,
    });

    const prefillStyle = `@import 'antd/dist/antd.css';\n\n${style || ''}`.replace(new RegExp(`#${meta.id}\\s*`, 'g'), '');
    const html = `<div id="container" style="padding: 24px"></div>
<script>
  var mountNode = document.getElementById('container');
</script>`;

    const sourceCode = this.getSourceCode();

    const codepenPrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      html,
      js: sourceCode
        .replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'antd';/, 'const { $1 } = antd;')
        .replace("import moment from 'moment';", ''),
      css: prefillStyle,
      editors: '001',
      css_external: 'https://unpkg.com/antd/dist/antd.css',
      js_external: [
        'react@16.x/umd/react.development.js',
        'react-dom@16.x/umd/react-dom.development.js',
        'moment/min/moment-with-locales.js',
        'antd/dist/antd-with-locales.js',
      ].map(url => `https://unpkg.com/${url}`).join(';'),
      js_pre_processor: 'typescript',
    };
    const riddlePrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      js: sourceCode,
      css: prefillStyle,
    };
    const dependencies = sourceCode.split('\n').reduce((acc, line) => {
      const matches = line.match(/import .+? from '(.+)';$/);
      if (matches && matches[1]) {
        acc[matches[1]] = 'latest';
      }
      return acc;
    }, { react: 'latest', 'react-dom': 'latest' });
    const codesanboxPrefillConfig = {
      files: {
        'package.json': {
          content: {
            dependencies,
          },
        },
        'index.css': {
          content: (style || '').replace(new RegExp(`#${meta.id}\\s*`, 'g'), ''),
        },
        'index.js': {
          content: `
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
${sourceCode.replace('mountNode', 'document.getElementById(\'container\')')}
          `,
        },
        'index.html': {
          content: html,
        },
      },
    };
    return (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          <ErrorBoundary>
            {this.liveDemo}
          </ErrorBoundary>
          {
            style
              ? <style dangerouslySetInnerHTML={{ __html: style }} />
              : null
          }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a href={`#${meta.id}`} ref={this.saveAnchor}>
              {localizedTitle}
            </a>
            <EditButton title={<FormattedMessage id="app.content.edit-page" />} filename={meta.filename} />
          </div>
          {introChildren}
          <Tooltip title={codeExpand ? 'Hide Code' : 'Show Code'}>
            <span className="code-expand-icon">
              <img
                alt="expand code"
                src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
                className={codeExpand ? 'code-expand-icon-hide' : 'code-expand-icon-show'}
                onClick={this.handleCodeExpand}
              />
              <img
                alt="expand code"
                src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
                className={codeExpand ? 'code-expand-icon-show' : 'code-expand-icon-hide'}
                onClick={this.handleCodeExpand}
              />
            </span>
          </Tooltip>
        </section>
        <section
          className={highlightClass}
          key="code"
        >
          <div className="highlight">
            <div className="code-box-actions">
              {showRiddleButton ? (
                <form action="//riddle.alibaba-inc.com/riddles/define" method="POST" target="_blank">
                  <input type="hidden" name="data" value={JSON.stringify(riddlePrefillConfig)} />
                  <Tooltip title={<FormattedMessage id="app.demo.riddle" />}>
                    <input type="submit" value="Create New Riddle with Prefilled Data" className="code-box-riddle" />
                  </Tooltip>
                </form>
              ) : null}
              <form action="https://codepen.io/pen/define" method="POST" target="_blank">
                <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
                <Tooltip title={<FormattedMessage id="app.demo.codepen" />}>
                  <input type="submit" value="Create New Pen with Prefilled Data" className="code-box-codepen" />
                </Tooltip>
              </form>
              <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
                <input type="hidden" name="parameters" value={compress(JSON.stringify(codesanboxPrefillConfig))} />
                <Tooltip title={<FormattedMessage id="app.demo.codesandbox" />}>
                  <input type="submit" value="Create New Sandbox with Prefilled Data" className="code-box-codesandbox" />
                </Tooltip>
              </form>
              <CopyToClipboard
                text={sourceCode}
                onCopy={this.handleCodeCopied}
              >
                <Tooltip
                  visible={state.copyTooltipVisible}
                  onVisibleChange={this.onCopyTooltipVisibleChange}
                  title={(
                    <FormattedMessage
                      id={`app.demo.${copied ? 'copied' : 'copy'}`}
                    />
                  )}
                >
                  <Icon
                    type={(state.copied && state.copyTooltipVisible) ? 'check' : 'copy'}
                    className="code-box-code-copy"
                  />
                </Tooltip>
              </CopyToClipboard>
            </div>
            {props.utils.toReactComponent(highlightedCode)}
          </div>
          {
            highlightedStyle
              ? (
                <div key="style" className="highlight">
                  <pre>
                    <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
                  </pre>
                </div>
              ) : null
          }
        </section>
      </section>
    );
  }
}
