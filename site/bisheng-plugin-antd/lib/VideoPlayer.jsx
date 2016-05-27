import React from 'react';
import SublimeVideo from 'react-sublime-video';

export default function VideoPlayer({ video }) {
  const { alt, description, src } = video;
  const videoClassName = video.class;

  return (
    <div className={`preview-image-box ${videoClassName}`}>
      <div className={'preview-image-wrapper'}>
        <SublimeVideo src={src} type="video/mp4" />
      </div>
      <div className="preview-image-title">{alt}</div>
      <div className="preview-image-description"
        dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}
