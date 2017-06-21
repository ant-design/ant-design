import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { Icon, Tooltip } from 'antd';
import EditButton from './EditButton';
import BrowserFrame from '../BrowserFrame';

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
