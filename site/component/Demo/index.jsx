import React from 'react';
import { Collapse } from '../../../';
import * as utils from '../utils';
import hljs from 'highlight.js';

export default class Demo extends React.Component {
  render() {
    const { id, preview, title, intro, code } = this.props;
    const introChildren = intro.map(utils.objectToComponent);
    const highlightedCode = hljs.highlight('javascript', code).value;
    return (
      <section className="code-box" id={id}>
        <section className="code-box-demo">
          { preview() }
        </section>
        <section className="code-box-meta markdown">
          <div className="code-box-title">
            <a>{ title }</a>
          </div>
          <Collapse>
            <Collapse.Panel header={introChildren}>
              <div className="highlight">
                <pre>
                  <code className="javascript" dangerouslySetInnerHTML={{
                    __html: highlightedCode,
                  }} />
                  </pre>
                </div>
              </Collapse.Panel>
            </Collapse>
        </section>
      </section>
    );
  }
}
