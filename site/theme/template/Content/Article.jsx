import React, { Children, cloneElement } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import { getTagName, getChildren } from 'jsonml.js/lib/utils';
import { Timeline } from 'antd';
import * as utils from '../utils';

export default class Article extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const links = Array.apply(null, document.querySelectorAll('.outside-link.internal'));
    if (links.length === 0) {
      return;
    }
    const checkImgUrl = 'http://alipay-rmsdeploy-dev-image.oss-cn-hangzhou-zmf.aliyuncs.com/rmsportal/JdVaTbZzPxEldUi.png';
    utils.ping(checkImgUrl, status => {
      if (status === 'responded') {
        links.forEach(link => (link.style.display = 'block'));
      }
    });
  }
  getArticle(article) {
    const { content } = this.props;
    const { meta } = content;
    if (!meta.timeline) {
      return article;
    }
    const timelineItems = [];
    let temp = [];
    Children.forEach(article.props.children, (child, i) => {
      if (child.type === 'h2' && temp.length > 0) {
        timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
        temp = [];
      }
      temp.push(child);
    });
    return cloneElement(article, {
      children: <Timeline>{timelineItems}</Timeline>,
    });
  }
  render() {
    const { content, location } = this.props;
    const jumper = content.content.filter((node) => {
      return getTagName(node) === 'h2';
    }).map((node) => {
      return (
        <li key={getChildren(node)[0]}>
          <Link to={{ pathname: location.pathname, query: { scrollTo: getChildren(node)[0] } }}>
          {this.props.utils.toReactComponent(getChildren(node)[0])}
          </Link>
        </li>
      );
    });

    const { meta, intro } = content;
    const { title, chinese, english } = meta;
    return (
      <DocumentTitle title={`${title || chinese || english} - Ant Design`}>
        <article className="markdown">
          <h1>
            {meta.title || meta.english} {meta.subtitle || meta.chinese}
            {
              !meta.subtitle ? null :
                <span className="subtitle">{meta.subtitle}</span>
            }
          </h1>
          {
            !intro ? null :
              utils.jsonmlToComponent(
              location.pathname,
              ['section', { className: 'markdown' }].concat(intro)
            )
          }
          {
            (jumper.length > 0 && meta.toc !== false) ?
              <section className="toc"><ul>{jumper}</ul></section> :
              null
          }
          {
            this.getArticle(this.props.utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content.content))
            ))
          }
        </article>
      </DocumentTitle>
    );
  }
}
