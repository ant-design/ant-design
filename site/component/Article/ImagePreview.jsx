import React from 'react';
import { Modal, Carousel } from '../../../';

function isGood(className) {
  return /\bgood\b/i.test(className);
}
function isBad(className) {
  return /\bbad\b/i.test(className);
}

const parser = new DOMParser();
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
      const xml = parser.parseFromString(img, 'application/xml');
      const attributes = xml.firstChild.attributes;
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

    const cover = imgsMeta[0];
    const imagesList = imgsMeta.map((meta, index) => {
      return <img {...meta} key={index} />;
    });
    const comparable = imgs.length === 2 &&
            (imgsMeta[0].isGood || imgsMeta[0].isBad) &&
            (imgsMeta[1].isGood || imgsMeta[1].isBad);
    const style = comparable ? { width: '50%' } : null;
    return (
      <div className={className}>
        <div className="preview-image-box"
          style={style}
          onClick={this.handleClick.bind(this, 'left')}>
          <div className={`preview-image-wrapper ${cover.isGood && 'good'} ${cover.isBad && 'bad'}`}>
            <img className={cover.className} src={cover.src} alt="Sample Picture" />
          </div>
          <div className="preview-image-title">{cover.alt}</div>
          <div className="preview-image-description">
            {cover.description}
          </div>

          <Modal className="image-modal" visible={this.state.leftVisible} title={null} footer={null}
            onCancel={this.handleCancel.bind(this)}>
            <Carousel>
              { comparable ? imagesList[0] : imagesList }
            </Carousel>
            {
              comparable || imagesList.length === 1 ?
                <div className="preview-image-title">{cover.alt}</div> :
                null
            }
          </Modal>
        </div>
        {
          comparable ?
            <div className="preview-image-box"
              style={style}
              onClick={this.handleClick.bind(this, 'right')}>
              <div className={`preview-image-wrapper ${imgsMeta[1].isGood && 'good'} ${imgsMeta[1].isBad && 'bad'}`}>
                <img className={imgsMeta[1].className} src={imgsMeta[1].src} alt="Sample Picture" />
              </div>
              <div className="preview-image-title">{imgsMeta[1].alt}</div>
              <div className="preview-image-description">
                {imgsMeta[1].description}
              </div>

              <Modal className="image-modal" visible={this.state.rightVisible} title={null} footer={null}
                onCancel={this.handleCancel.bind(this)}>
                <Carousel>
                  { comparable ? imagesList[1] : imagesList }
                </Carousel>
                <div className="preview-image-title">{imagesList[1].alt}</div>
              </Modal>
            </div> : null
        }
      </div>
    );
  }
}
