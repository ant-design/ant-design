import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { Row, Col, Icon, Affix } from '../../../';
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
    const { doc, location } = this.props;
    const { description, meta } = doc;
    const demos = demosList[meta.fileName] || [];
    const expand = this.state.expandAll;

    const isSingleCol = meta.cols === '1';
    const leftChildren = [];
    const rightChildren = [];
    demos.sort((a, b) => {
      return parseInt(a.meta.order, 10) - parseInt(b.meta.order, 10);
    }).forEach((demoData, index) => {
      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(
            <Demo {...demoData} key={index}
              expand={expand} pathname={location.pathname} />
        );
      } else {
        rightChildren.push(
            <Demo {...demoData} key={index}
              expand={expand} pathname={location.pathname} />
        );
      }
    });
    const expandTriggerClass = classNames({
      'code-box-expand-trigger': true,
      'code-box-expand-trigger-active': expand,
    });

    const jumper = demos.map((demo) => {
      return (
        <li key={demo.id}>
          <Link to={{ pathname: location.pathname, query: { scrollTo: `${demo.id}` } }}>
            { demo.meta.chinese || demo.meta.english }
          </Link>
        </li>
      );
    });

    return (
      <article>
        <Affix className="toc-affix">
          <ul className="toc demos-anchor">
            { jumper }
          </ul>
        </Affix>
        <section className="markdown">
          <h1>{meta.chinese || meta.english}</h1>
          { description.map(utils.objectToComponent.bind(null, location.pathname)) }
          <h2>
            代码演示
            <Icon type="appstore" className={expandTriggerClass}
              title="展开全部代码" onClick={this.handleExpandToggle.bind(this)} />
          </h2>
        </section>
        <Row>
          <Col span={ isSingleCol ? '24' : '12' }
            className={ isSingleCol ?
              'code-boxes-col-1-1' :
              'code-boxes-col-2-1'
            }
          >
            { leftChildren }
          </Col>
          {
            isSingleCol ? null :
            <Col className="code-boxes-col-2-1" span="12">{ rightChildren }</Col>
          }
        </Row>
        <section className="markdown">
          { (doc.api || []).map(utils.objectToComponent.bind(null, location.pathname)) }
        </section>
      </article>
    );
  }
}
