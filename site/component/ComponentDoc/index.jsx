import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { Row, Col, Icon, Affix } from 'antd';
import Demo from '../Demo';
import * as utils from '../utils';
import demosList from '../../../_data/demos-list';

export default class ComponentDoc extends React.Component {
  static contextTypes = {
    intl: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      expandAll: false,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { chinese, english } = this.props.doc.meta;
    utils.setTitle(`${chinese} ${english} - Ant Design`);
  }

  handleExpandToggle = () => {
    this.setState({
      expandAll: !this.state.expandAll,
    });
  }

  render() {
    const { doc, location } = this.props;
    const scrollTo = location.query.scrollTo;
    const { description, meta } = doc;
    const locale = this.context.intl.locale;
    const demos = (demosList[meta.fileName.replace(`.${locale}`, '')] || [])
            .filter((demoData) => !demoData.meta.hidden);
    const expand = this.state.expandAll;

    const isSingleCol = meta.cols === 1;
    const leftChildren = [];
    const rightChildren = [];
    demos.sort((a, b) => {
      return parseInt(a.meta.order, 10) - parseInt(b.meta.order, 10);
    }).forEach((demoData, index) => {
      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(
          <Demo {...demoData} className={scrollTo === demoData.id ? 'code-box-target' : ''}
            key={index}
            expand={expand} pathname={location.pathname} />
        );
      } else {
        rightChildren.push(
          <Demo {...demoData} className={scrollTo === demoData.id ? 'code-box-target' : ''}
            key={index}
            expand={expand} pathname={location.pathname} />
        );
      }
    });
    const expandTriggerClass = classNames({
      'code-box-expand-trigger': true,
      'code-box-expand-trigger-active': expand,
    });

    const jumper = demos.map((demo) => {
      const title = demo.meta.title;
      const localizeTitle = typeof title === 'object' ?
              title[locale] : title;
      return (
        <li key={demo.id}>
          <Link className={demo.id === scrollTo ? 'current' : ''}
            to={{ pathname: location.pathname, query: { scrollTo: `${demo.id}` } }}>
            { localizeTitle }
          </Link>
        </li>
      );
    });

    return (
      <article>
        <Affix className="toc-affix" offsetTop={16}>
          <ul className="toc demos-anchor">
            {jumper}
          </ul>
        </Affix>
        <section className="markdown">
          <h1>{meta.english} {meta.chinese}</h1>
          {
            utils.jsonmlToComponent(
              location.pathname,
              ['section', { className: 'markdown' }]
                .concat(description)
            )
          }
          <h2>
            代码演示
            <Icon type="appstore" className={expandTriggerClass}
              title="展开全部代码" onClick={this.handleExpandToggle} />
          </h2>
        </section>
        <Row gutter={16}>
          <Col span={isSingleCol ? '24' : '12'}
            className={isSingleCol ?
              'code-boxes-col-1-1' :
              'code-boxes-col-2-1'
            }
          >
            {leftChildren}
          </Col>
          {
            isSingleCol ? null :
              <Col className="code-boxes-col-2-1" span="12">{rightChildren}</Col>
          }
        </Row>
        {
          utils.jsonmlToComponent(
            location.pathname,
            ['section', {
              className: 'markdown api-container',
            }].concat(doc.api || [])
          )
        }
      </article>
    );
  }
}
