import React from 'react';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Row, Col, Icon, Affix, Tooltip } from 'antd';
import { getChildren } from 'jsonml.js/lib/utils';
import Demo from './Demo';
import EditButton from './EditButton';
import { ping } from '../utils';

class ComponentDoc extends React.Component {
  state = {
    expandAll: false,
    showRiddleButton: false,
  };

  componentDidMount() {
    this.pingTimer = ping(status => {
      if (status !== 'timeout' && status !== 'error') {
        this.setState({
          showRiddleButton: true,
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { location } = this.props;
    const { location: nextLocation } = nextProps;
    const { expandAll, showRiddleButton } = this.state;
    const { expandAll: nextExpandAll, showRiddleButton: nextShowRiddleButton } = nextState;

    if (
      nextLocation.pathname === location.pathname &&
      expandAll === nextExpandAll &&
      showRiddleButton === nextShowRiddleButton
    ) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
  }

  handleExpandToggle = () => {
    const { expandAll } = this.state;
    this.setState({
      expandAll: !expandAll,
    });
  };

  render() {
    const {
      doc,
      location,
      intl: { locale },
      utils,
      demos,
    } = this.props;
    const { content, meta } = doc;
    const demoValues = Object.keys(demos).map(key => demos[key]);
    const { expandAll, showRiddleButton } = this.state;

    const isSingleCol = meta.cols === 1;
    const leftChildren = [];
    const rightChildren = [];
    const showedDemo = demoValues.some(demo => demo.meta.only)
      ? demoValues.filter(demo => demo.meta.only)
      : demoValues.filter(demo => demo.preview);
    showedDemo
      .sort((a, b) => a.meta.order - b.meta.order)
      .forEach((demoData, index) => {
        const demoElem = (
          <Demo
            {...demoData}
            key={demoData.meta.filename}
            utils={utils}
            expand={expandAll}
            location={location}
          />
        );
        if (index % 2 === 0 || isSingleCol) {
          leftChildren.push(demoElem);
        } else {
          rightChildren.push(demoElem);
        }
      });
    const expandTriggerClass = classNames({
      'code-box-expand-trigger': true,
      'code-box-expand-trigger-active': expandAll,
    });

    const jumper = showedDemo.map(demo => {
      const { title } = demo.meta;
      const localizeTitle = title[locale] || title;
      return (
        <li key={demo.meta.id} title={localizeTitle}>
          <a href={`#${demo.meta.id}`}>{localizeTitle}</a>
        </li>
      );
    });

    const { title, subtitle, filename } = meta;
    const articleClassName = classNames({
      'show-riddle-button': showRiddleButton,
    });
    return (
      <DocumentTitle title={`${subtitle || ''} ${title[locale] || title} - Ant Design`}>
        <article className={articleClassName}>
          <Affix className="toc-affix" offsetTop={16}>
            <ul id="demo-toc" className="toc">
              {jumper}
            </ul>
          </Affix>
          <section className="markdown">
            <h1>
              {title[locale] || title}
              {!subtitle ? null : <span className="subtitle">{subtitle}</span>}
              <EditButton
                title={<FormattedMessage id="app.content.edit-page" />}
                filename={filename}
              />
            </h1>
            {utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content)),
            )}
            <h2>
              <FormattedMessage id="app.component.examples" />
              <Tooltip
                title={
                  <FormattedMessage
                    id={`app.component.examples.${expandAll ? 'collapse' : 'expand'}`}
                  />
                }
              >
                <Icon
                  type={`${expandAll ? 'appstore' : 'appstore-o'}`}
                  className={expandTriggerClass}
                  onClick={this.handleExpandToggle}
                />
              </Tooltip>
            </h2>
          </section>
          <Row gutter={16}>
            <Col
              span={isSingleCol ? 24 : 12}
              className={isSingleCol ? 'code-boxes-col-1-1' : 'code-boxes-col-2-1'}
            >
              {leftChildren}
            </Col>
            {isSingleCol ? null : (
              <Col className="code-boxes-col-2-1" span={12}>
                {rightChildren}
              </Col>
            )}
          </Row>
          {utils.toReactComponent(
            [
              'section',
              {
                className: 'markdown api-container',
              },
            ].concat(getChildren(doc.api || ['placeholder'])),
          )}
        </article>
      </DocumentTitle>
    );
  }
}

export default injectIntl(ComponentDoc);
