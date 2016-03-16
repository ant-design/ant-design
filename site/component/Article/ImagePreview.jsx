import React from 'react';
import { Modal, Carousel } from '../../../';

function isGood(className) {
  return /\bgood\b/i.test(className);
}
function isBad(className) {
  return /\bbad\b/i.test(className);
}

function PreviewImageBox({ cover, coverMeta, imgs, style, previewVisible,
                           comparable, onClick, onCancel }) {
  return (
    <div className="preview-image-box"
      style={style}
      onClick={onClick}>
      <div className={`preview-image-wrapper ${coverMeta.isGood && 'good'} ${coverMeta.isBad && 'bad'}`}>
        <img className={coverMeta.className} src={coverMeta.src} alt="Sample Picture" />
      </div>
      <div className="preview-image-title">{coverMeta.alt}</div>
      <div className="preview-image-description">
        {coverMeta.description}
      </div>

      <Modal className="image-modal" visible={previewVisible} title={null} footer={null}
        onCancel={onCancel}>
        <Carousel>
          { comparable ? cover : imgs }
        </Carousel>
        <div className="preview-image-title">{coverMeta.alt}</div>
      </Modal>
    </div>
  );
}

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftVisible: false,
      rightVisible: false,
    };
  }

  handleClick(side) {
    this.setState({ [`${side}Visible`]: true });
  }

  handleCancel() {
    this.setState({
      leftVisible: false,
      rightVisible: false,
    });
  }

  render() {
    const { className, imgs } = this.props;
    const imgsMeta = imgs.map((img) => {
      const span = document.createElement('span');
      span.innerHTML = img;
      const imgNode = span.children[0];
      const attributes = imgNode.attributes;
      const { alt, description, src } = attributes;
      const imgClassName = attributes.class.nodeValue;
      return {
        className: imgClassName,
        alt: alt && alt.nodeValue,
        description: description && description.nodeValue,
        src: src.nodeValue,
        isGood: isGood(imgClassName),
        isBad: isBad(imgClassName),
      };
    });

    const imagesList = imgsMeta.map((meta, index) => {
      return <img {...meta} key={index} />;
    });
    const comparable = imgs.length === 2 &&
            (imgsMeta[0].isGood || imgsMeta[0].isBad) &&
            (imgsMeta[1].isGood || imgsMeta[1].isBad);
    const style = comparable ? { width: '50%' } : null;
    return (
      <div className={className}>
        <PreviewImageBox style={style}
          comparable={comparable}
          previewVisible={this.state.leftVisible}
          cover={imagesList[0]}
          coverMeta={imgsMeta[0]}
          imgs={imagesList}
          onClick={this.handleClick.bind(this, 'left')}
          onCancel={this.handleCancel.bind(this)}
        />
        {
          comparable ?
            <PreviewImageBox style={style}
              comparable
              previewVisible={this.state.rightVisible}
              cover={imagesList[1]}
              coverMeta={imgsMeta[1]}
              imgs={imagesList}
              onClick={this.handleClick.bind(this, 'right')}
              onCancel={this.handleCancel.bind(this)}
            /> : null
        }
      </div>
    );
  }
}
