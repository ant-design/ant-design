import React from 'react';
import { Row, Col } from '../../../';
import Demo from '../Demo';
import * as utils from '../utils';

export default class ComponentDoc extends React.Component {
  render() {
    const { demos = [], doc } = this.props;

    const leftChildren = [];
    const rightChildren = [];
    demos.forEach((demoData, index) => {
      if (index % 2 === 0) {
        leftChildren.push(<Demo {...demoData} key={index} />);
      } else {
        rightChildren.push(<Demo {...demoData} key={index} />);
      }
    });

    return (
      <section className="markdown">
        <h1>{doc.meta.title}</h1>
        { doc.description.map(utils.objectToComponent) }
        <h2>代码演示</h2>
        <Row>
          <Col span="12">{ leftChildren }</Col>
          <Col span="12">{ rightChildren }</Col>
        </Row>
        { doc.api.map(utils.objectToComponent) }
      </section>
    );
  }
}
