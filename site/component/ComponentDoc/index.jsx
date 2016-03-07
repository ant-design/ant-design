import React from 'react';
import classNames from 'classnames';
import { Row, Col, Icon } from '../../../';
import Demo from '../Demo';
import * as utils from '../utils';
import demosList from '../../../_site/data/demos-list';

export default class ComponentDoc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandAll: false,
    };
  }

  handleExpandToggle() {
    this.setState({
      expandAll: !this.state.expandAll,
    });
  }

  render() {
    const { doc } = this.props;
    const demos = demosList[doc.meta.fileName] || [];
    const expand = this.state.expandAll;
    const isSingleCol = doc.meta.cols === '1';

    const leftChildren = [];
    const rightChildren = [];
    demos.sort((a, b) => {
      return a.order - b.order;
    }).forEach((demoData, index) => {
      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(<Demo {...demoData} expand={expand} key={index} />);
      } else {
        rightChildren.push(<Demo {...demoData} expand={expand} key={index} />);
      }
    });
    const expandTriggerClass = classNames({
      'code-box-expand-trigger': true,
      'code-box-expand-trigger-active': expand,
    });

    return (
      <article>
        <section className="markdown">
          <h1>{doc.meta.chinese || doc.meta.english}</h1>
          { doc.description.map(utils.objectToComponent) }
          <h2>
            代码演示
            <Icon type="appstore" className={expandTriggerClass}
              title="展开全部代码" onClick={this.handleExpandToggle.bind(this)} />
          </h2>
        </section>
        <Row>
          <Col span={ isSingleCol ? '24' : '12' } className={ isSingleCol ? '' : 'demo-list-left'}>
            { leftChildren }
          </Col>
          { isSingleCol ? null : <Col className="demo-list-right" span="12">{ rightChildren }</Col> }
        </Row>
        <section className="markdown">
          { (doc.api || []).map(utils.objectToComponent) }
        </section>
      </article>
    );
  }
}
