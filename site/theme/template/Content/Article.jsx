import React, { PropTypes, Children, cloneElement } from 'react';
import { FormattedMessage } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';
import { Timeline } from 'antd';
import EditButton from './EditButton';
import * as utils from '../utils';

export default class Article extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const links = [...document.querySelectorAll('.outside-link.internal')];
    if (links.length === 0) {
      return;
    }
    // eslint-disable-next-line
    const checkImgUrl = 'https://g-assets.daily.taob' + 'ao.net/seajs/seajs/2.2.0/sea.js';
    this.pingTimer = utils.ping(checkImgUrl, (status) => {
      if (status !== 'timeout') {
        links.forEach(link => (link.style.display = 'block'));
      } else {
        links.forEach(link => link.parentNode.removeChild(link));
      }
    });
  }
  componentWillUnmount() {
    clearTimeout(this.pingTimer);
  }
  getArticle(article) {
    const { content } = this.props;
    const { meta } = content;
    if (!meta.timeline) {
      return article;
    }
    const timelineItems = [];
    let temp = [];
    let i = 1;
    Children.forEach(article.props.children, (child) => {
      if (child.type === 'h2' && temp.length > 0) {
        timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
        temp = [];
        i += 1;
      }
      temp.push(child);
    });
    if (temp.length > 0) {
      timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
    }
    return cloneElement(article, {
      children: <Timeline>{timelineItems}</Timeline>,
    });
  }
  render() {
    const props = this.props;
    const content = props.content;

    const { meta, description } = content;
    const { title, subtitle, filename } = meta;
    const locale = this.context.intl.locale;
    return (
      <DocumentTitle title={`${title[locale] || title} - Ant Design`}>
        <article className="markdown">
          <h1>
            {title[locale] || title}
            {
              !subtitle || locale === 'en-US' ? null :
                <span className="subtitle">{subtitle}</span>
            }
            <EditButton title={<FormattedMessage id="app.content.edit-page" />} filename={filename} />
          </h1>
          {
            !description ? null :
              props.utils.toReactComponent(
                ['section', { className: 'markdown' }].concat(getChildren(description))
              )
          }
          {
            (!content.toc || content.toc.length <= 1 || meta.toc === false) ? null :
              <section className="toc">{props.utils.toReactComponent(content.toc)}</section>
          }
          {
            this.getArticle(props.utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content.content))
            ))
          }
        </article>
      </DocumentTitle>
    );
  }
}
