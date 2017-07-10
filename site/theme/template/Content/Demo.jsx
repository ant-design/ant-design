import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { Icon, Tooltip } from 'antd';
import EditButton from './EditButton';
import BrowserFrame from '../BrowserFrame';
import { ping } from '../utils';

export default class Demo extends React.Component {
  static contextTypes = {
    intl: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
      sourceCode: '',
      copied: false,
      copyTooltipVisible: false,
      showRiddleButton: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { highlightedCode } = nextProps;
    const div = document.createElement('div');
    div.innerHTML = highlightedCode[1].highlighted;
    this.setState({ sourceCode: div.textContent });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.codeExpand || this.props.expand) !== (nextState.codeExpand || nextProps.expand)
     || this.state.copied !== nextState.copied
     || this.state.copyTooltipVisible !== nextState.copyTooltipVisible;
  }

  componentDidMount() {
    const { meta, location } = this.props;
    if (meta.id === location.hash.slice(1)) {
      this.anchor.click();
    }
    this.componentWillReceiveProps(this.props);

    this.pingTimer = ping((status) => {
      if (status !== 'timeout' && status !== 'error') {
        this.setState({
          showRiddleButton: true,
        });
      }
    });
  }

  handleCodeExapnd = () => {
    this.setState({ codeExpand: !this.state.codeExpand });
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
    const state = this.state;
    const props = this.props;
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

    const locale = this.context.intl.locale;
    const localizedTitle = meta.title[locale] || meta.title;
    const localizeIntro = content[locale] || content;
    const introChildren = props.utils
      .toReactComponent(['div'].concat(localizeIntro));

    const highlightClass = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': codeExpand,
    });

    const prefillStyle = `@import 'antd/dist/antd.css';\n\n${style || ''}`.replace(new RegExp(`#${meta.id}\\s*`, 'g'), '');

    const codepenPrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      html: `<div id="container" style="padding: 24px"></div>
<script>
  var mountNode = document.getElementById('container');
</script>`,
      js: state.sourceCode.replace(/import\s+\{\s+(.*)\s+\}\s+from\s+'antd';/, 'const { $1 } = antd;'),
      css: prefillStyle,
      editors: '001',
      css_external: 'https://unpkg.com/antd/dist/antd.css',
      js_external: [
        'react/dist/react.js',
        'react-dom/dist/react-dom.js',
        'moment/min/moment-with-locales.js',
        'antd/dist/antd-with-locales.js',
      ].map(url => `https://unpkg.com/${url}`).join(';'),
      js_pre_processor: 'typescript',
    };
    const riddlePrefillConfig = {
      title: `${localizedTitle} - Ant Design Demo`,
      js: state.sourceCode,
      css: prefillStyle,
    };
    return (
      <section className={codeBoxClass} id={meta.id}>
        <section className="code-box-demo">
          {this.liveDemo}
          {
            style ?
              <style dangerouslySetInnerHTML={{ __html: style }} /> :
              null
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
          <Icon type="down-circle-o" title="Show Code" className="collapse" onClick={this.handleCodeExapnd} />
        </section>
        <section className={highlightClass}
          key="code"
        >
          <div className="highlight">
            <div className="code-box-actions">
              {this.state.showRiddleButton ? (
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
              <CopyToClipboard
                text={state.sourceCode}
                onCopy={this.handleCodeCopied}
              >
                <Tooltip
                  visible={state.copyTooltipVisible}
                  onVisibleChange={this.onCopyTooltipVisibleChange}
                  title={
                    <FormattedMessage
                      id={`app.demo.${state.copied ? 'copied' : 'copy'}`}
                    />
                  }
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
            highlightedStyle ?
              <div key="style" className="highlight">
                <pre>
                  <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
                </pre>
              </div> :
              null
          }
        </section>
      </section>
    );
  }
}
