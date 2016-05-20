import React, { Children, cloneElement } from 'react';
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';
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
    const props = this.props;
    const content = props.content;
    const jumper = (content.toc || []).map((node, index) => {
      const headingText = getChildren(node)[0];
      return (
        <li key={index}>
          <a href={`#${headingText}`}>
          {props.utils.toReactComponent(headingText)}
          </a>
        </li>
      );
    });

    const { meta, description } = content;
    const { title, subtitle, chinese, english } = meta;
    return (
      <DocumentTitle title={`${title || chinese || english} - Ant Design`}>
        <article className="markdown">
          <h1>
            {title || english}
            {
              (!subtitle && !chinese) ? null :
                <span className="subtitle">{subtitle || chinese}</span>
            }
          </h1>
          {
            !description ? null :
              props.utils.toReactComponent(
                ['section', { className: 'markdown' }].concat(getChildren(description))
              )
          }
          {
            (jumper.length > 0 && meta.toc !== false) ?
              <section className="toc"><ul>{jumper}</ul></section> :
              null
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
