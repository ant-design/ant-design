import React from 'react';
import { Row, Col } from '../../../';
import Demo from '../Demo';
import * as utils from '../utils';

export default class ComponentDoc extends React.Component {
  render() {
    const { demos = [], doc } = this.props;
    const isSingleCol = doc.meta.cols === '1';

    const leftChildren = [];
    const rightChildren = [];
    demos.forEach((demoData, index) => {
      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(<Demo {...demoData} key={index} />);
      } else {
        rightChildren.push(<Demo {...demoData} key={index} />);
      }
    });

    return (
      <article>
        <section className="markdown">
          <h1>{doc.meta.title}</h1>
          { doc.description.map(utils.objectToComponent) }
          <h2>代码演示</h2>
        </section>
        <Row>
          <Col span={ isSingleCol ? '24' : '12' }>{ leftChildren }</Col>
          { isSingleCol ? null : <Col span="12">{ rightChildren }</Col> }
        </Row>
        <section className="markdown">
          { doc.api.map(utils.objectToComponent) }
        </section>
      </article>
    );
  }
}
