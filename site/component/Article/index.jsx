import React from 'react';
import { Link } from 'react-router';
import ImagePreview from './ImagePreview';
import VideoPlayer from './VideoPlayer';
import * as utils from '../utils';

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.imgToPreview = this.imgToPreview.bind(this);
    this.enhanceVideo = this.enhanceVideo.bind(this);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { chinese, english } = this.props.content.meta;
    utils.setTitle(`${chinese || english} - Ant Design`);
  }

  isPreviewImg(string) {
    return /^<img\s/i.test(string) && /preview-img/gi.test(string);
  }

  imgToPreview(node) {
    if (node[0] === 'p' &&
        node[1][0] === 'innerHTML' &&
        this.isPreviewImg(node[1][1])) {
      const imgs = node.slice(1)
              .map((n) => n[1])
              .filter((img) => img);
      return <ImagePreview imgs={imgs} />;
    }
    return node;
  }

  isVideo(string) {
    return /^<video\s/i.test(string);
  }

  enhanceVideo(node) {
    if (node[0] === 'innerHTML' && this.isVideo(node[1])) {
      return <VideoPlayer video={node[1]} />;
    }
    return node;
  }

  render() {
    const { content, location } = this.props;
    const jumper = content.description.filter((node) => {
      return node[0] === 'h2';
    }).map((node) => {
      return (
        <li key={node[1]}>
          <Link to={{ pathname: location.pathname, query: { scrollTo: node[1] } }}
            dangerouslySetInnerHTML={{ __html: node[1] }} />
        </li>
      );
    });

    const { meta, intro } = content;
    const description = content.description
            .map(this.imgToPreview)
            .map(this.enhanceVideo);

    return (
      <article className="markdown">
        <h1>
          { meta.chinese || meta.english }
          {
            !meta.subtitle ? null :
              <span className="subtitle">{ meta.subtitle }</span>
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
          jumper.length > 0 ?
            <section className="toc"><ul>{ jumper }</ul></section> :
            null
        }
        {
          utils.jsonmlToComponent(
            location.pathname,
            ['section', { className: 'markdown' }].concat(description)
          )
        }
      </article>
    );
  }
}
