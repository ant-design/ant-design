import React from 'react';
import { Link } from 'react-router';
import ImagePreview from './ImagePreview';
import VideoPlayer from './VideoPlayer';
import * as utils from '../utils';
import { getTagName, getAttributes, getChildren, isElement } from 'jsonml.js/lib/utils';

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
    if (getTagName(node) === 'p' &&
        getTagName(getChildren(node)[0]) === 'img' &&
        /preview-img/gi.test(getAttributes(getChildren(node)[0]).class)) {
      const imgs = getChildren(node)
              .filter((img) => isElement(img) && Object.keys(getAttributes(img)).length > 0)
              .map((img) => getAttributes(img));
      return <ImagePreview imgs={imgs} />;
    }
    return node;
  }

  enhanceVideo(node) {
    if (getTagName(node) === 'video') {
      return <VideoPlayer video={getAttributes(node)} />;
    }
    return node;
  }

  render() {
    const { content, location } = this.props;
    const jumper = content.description.filter((node) => {
      return getTagName(node) === 'h2';
    }).map((node) => {
      return (
        <li key={getChildren(node)[0]}>
          <Link to={{ pathname: location.pathname, query: { scrollTo: getChildren(node)[0] } }}>
          { utils.jsonmlToComponent(location.pathname, getChildren(node)[0]) }
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
