import React from 'react';
import classNames from 'classnames';
const isLocal = location.port;

export default class Demo extends React.Component {
  static contextTypes = {
    intl: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expand === undefined) return;

    this.setState({
      codeExpand: nextProps.expand,
    });
  }

  handleCodeExapnd = () => {
    this.setState({ codeExpand: !this.state.codeExpand });
  }

  render() {
    const props = this.props;
    const {
      meta,
      src,
      preview,
      content,
      code,
      style,
      highlightedStyle,
    } = props;

    const codeExpand = this.state.codeExpand;
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
          {
            meta.iframe ?
              <iframe src={isLocal ? src : src.replace('./_site', '')} /> :
              preview
          }
          {
            !!style ?
              <style dangerouslySetInnerHTML={{ __html: style }} /> :
              null
          }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a href={`#${meta.id}`}>
              {localizedTitle}
            </a>
          </div>
          {introChildren}
          <span className="collapse anticon anticon-circle-o-right"
            onClick={this.handleCodeExapnd}
            unselectable="none" />
        </section>
        <section className={highlightClass}
          key="code">
          <div className="highlight">
            {props.utils.toReactComponent(code)}
          </div>
          {
            highlightedStyle ?
              <div key="style" className="highlight">
                <pre>
                  <code className="css" dangerouslySetInnerHTML={{
                    __html: highlightedStyle,
                  }} />
                </pre>
              </div> :
              null
          }
        </section>
      </section>
    );
  }
}
