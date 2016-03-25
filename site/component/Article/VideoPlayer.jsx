import React from 'react';
import SublimeVideo from 'react-sublime-video';

export default class VideoPlayer extends React.Component {
  render() {
    const video = this.props.video;
    const span = document.createElement('span');
    span.innerHTML = video;
    const attributes = span.children[0].attributes;
    const { alt, description, src } = attributes;
    const videoClassName = attributes.class.nodeValue;

    return (
      <div className={`preview-image-box ${videoClassName}`}>
        <div className={'preview-image-wrapper'}>
          <SublimeVideo src={src && src.nodeValue} type="video/mp4" />
        </div>
        <div className="preview-image-title">{alt && alt.nodeValue}</div>
        <div className="preview-image-description"
          dangerouslySetInnerHTML={{ __html: description && description.nodeValue }} />
      </div>
    );
  }
}
