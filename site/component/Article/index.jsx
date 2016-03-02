import React from 'react';
import classNames from 'classnames';
import ImagePreview from './ImagePreview';
import * as utils from '../utils';

function isPreviewImg(string) {
  return /^<img\s/i.test(string) && /preview-img/gi.test(string);
}

function imgToPreview(node) {
  if (!isPreviewImg(node.children)) {
    return node;
  }

  const imgs = node.children.split(/\r|\n/);
  const hasPopup = imgs.length > 1;
  const previewClassName = classNames({
    'preview-image-boxes': true,
    clearfix: true,
    'preview-image-boxes-with-popup': hasPopup,
  });
  return <ImagePreview className={previewClassName} imgs={imgs} />;
}

export default class Article extends React.Component {
  render() {
    const content = this.props.content;
    const jumper = content.description.filter((node) => {
      return node.type === 'h2';
    }).map((node) => {
      return <li key={node.children}><a href={`#${node.children}`}>{ node.children }</a></li>;
    });

    content.description = content.description.map(imgToPreview);

    return (
      <article className="markdown">
        <h1>{ content.meta.chinese }</h1>
        {
          jumper.length > 0 ?
            <section className="toc"><ul>{ jumper }</ul></section> :
            null
        }
        { content.description.map(utils.objectToComponent) }
      </article>
    );
  }
}
