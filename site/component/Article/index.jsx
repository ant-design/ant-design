import React from 'react';
import { Link } from 'react-router';
import toReactComponent from 'jsonml-to-react-component';
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

  imgToPreview(node) {
    if (node[0] === 'p' &&
        node[1][0] === 'img' &&
        /preview-img/gi.test(node[1][1].class)) {
      const imgs = node.slice(1)
              .filter((img) => img[1])
              .map((n) => n[1]);
      return <ImagePreview imgs={imgs} />;
    }
    return node;
  }

  enhanceVideo(node) {
    if (node[0] === 'video') {
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
          <Link to={{ pathname: location.pathname, query: { scrollTo: node[1] } }}>
            {toReactComponent(node[1])}
          </Link>
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
