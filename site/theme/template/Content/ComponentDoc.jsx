import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { Row, Col, Icon, Affix } from 'antd';
import { getChildren } from 'jsonml.js/lib/utils';
import Demo from './Demo';

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

  handleExpandToggle = () => {
    this.setState({
      expandAll: !this.state.expandAll,
    });
  }

  render() {
    const props = this.props;
    const { doc, location } = props;
    const scrollTo = location.query.scrollTo;
    const { content, meta } = doc;
    const locale = this.context.intl.locale;
    const demos = Object.keys(props.demos).map((key) => props.demos[key])
            .filter((demoData) => !demoData.meta.hidden);
    const expand = this.state.expandAll;

    const isSingleCol = meta.cols === 1;
    const leftChildren = [];
    const rightChildren = [];
    demos.sort((a, b) => a.meta.order - b.meta.order)
      .forEach((demoData, index) => {
        if (index % 2 === 0 || isSingleCol) {
          leftChildren.push(
            <Demo {...demoData} className={scrollTo === demoData.meta.id ? 'code-box-target' : ''}
              key={index} utils={props.utils}
              expand={expand} pathname={location.pathname} />
          );
        } else {
          rightChildren.push(
            <Demo {...demoData} className={scrollTo === demoData.meta.id ? 'code-box-target' : ''}
              key={index} utils={props.utils}
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
        <li key={demo.meta.id}>
          <Link className={demo.meta.id === scrollTo ? 'current' : ''}
            to={{ pathname: location.pathname, query: { scrollTo: `${demo.meta.id}` } }}>
            {localizeTitle}
          </Link>
        </li>
      );
    });

    const { title, subtitle, chinese, english } = meta;
    return (
      <DocumentTitle title={`${subtitle || chinese || ''} ${title || english} - Ant Design`}>
        <article>
          <Affix className="toc-affix" offsetTop={16}>
            <ul className="toc demos-anchor">
              {jumper}
            </ul>
          </Affix>
          <section className="markdown">
            <h1>{meta.title || meta.english} {meta.subtitle || meta.chinese}</h1>
            {
              props.utils.toReactComponent(
                ['section', { className: 'markdown' }]
                  .concat(getChildren(content))
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
            props.utils.toReactComponent(
              ['section', {
                className: 'markdown api-container',
              }].concat(doc.api || [])
            )
          }
        </article>
      </DocumentTitle>
    );
  }
}
