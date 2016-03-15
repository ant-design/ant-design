import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import ImagePreview from './ImagePreview';
import * as utils from '../utils';

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.imgToPreview = this.imgToPreview.bind(this);
  }

  isPreviewImg(string) {
    return /^<img\s/i.test(string) && /preview-img/gi.test(string);
  }

  imgToPreview(node) {
    if (!this.isPreviewImg(node.children)) {
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

  render() {
    const { content, location } = this.props;
    const jumper = content.description.filter((node) => {
      return node.type === 'h2';
    }).map((node) => {
      return (
        <li key={node.children}>
          <Link to={{ pathname: location.pathname, query: { scrollTo: node.children } }}
            dangerouslySetInnerHTML={{ __html: node.children }} />
        </li>
      );
    });

    content.description = content.description.map(this.imgToPreview);

    return (
      <article className="markdown">
        <h1>
          { content.meta.chinese || content.meta.english }
          {
            !content.meta.subtitle ? null :
              <span className="subtitle">{ content.meta.subtitle }</span>
          }
        </h1>
        {
          !content.intro ? null :
            content.intro.map(utils.objectToComponent.bind(null, location.pathname))
        }
        {
          jumper.length > 0 ?
            <section className="toc"><ul>{ jumper }</ul></section> :
            null
        }
        { content.description.map(utils.objectToComponent.bind(null, location.pathname)) }
      </article>
    );
  }
}
