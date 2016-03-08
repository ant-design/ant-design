import React from 'react';
import { Link } from 'react-router';
import { Collapse } from '../../../';
import * as utils from '../utils';
import hljs from 'highlight.js';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: '',
    };
  }

  handleChange(activeKey) {
    this.setState({
      activeKey: this.state.activeKey === activeKey ?
        '' : activeKey
    });
  }

  render() {
    const { id, meta, intro, code, preview, style, src,
            expand, pathname } = this.props;
    const introChildren = intro.map(utils.objectToComponent.bind(null, pathname));
    const highlightedCode = hljs.highlight('javascript', code).value;

    return (
      <section className="code-box" id={id}>
        <section className="code-box-demo">
          {
            meta.iframe === 'true' ?
              <iframe src={src} /> :
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
            <Link to={{ pathname, query: { scrollTo: id } }}>
              { meta.chinese || meta.english }
            </Link>
          </div>
          <Collapse activeKey={expand ? 'code' : this.state.activeKey}
            onChange={this.handleChange.bind(this)}>
            <Collapse.Panel key="code" header={introChildren}>
              <div className="highlight">
                <pre>
                  <code className="javascript" dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }} />
                </pre>
              </div>
              {
                !!style ?
                  <div className="highlight">
                    <pre>
                      <code className="css" dangerouslySetInnerHTML={{
                        __html: hljs.highlight('css', style).value,
                      }} />
                    </pre>
                  </div> :
                  null
              }
            </Collapse.Panel>
          </Collapse>
        </section>
      </section>
    );
  }
}
