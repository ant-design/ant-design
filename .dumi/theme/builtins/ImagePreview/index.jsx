import React from 'react';
import classNames from 'classnames';
import { Modal, Carousel } from 'antd';

function isGood(className) {
  return /\bgood\b/i.test(className);
}

function isBad(className) {
  return /\bbad\b/i.test(className);
}

function isInline(className) {
  return /\binline\b/i.test(className);
}

function PreviewImageBox({
   cover,
   coverMeta,
   imgs,
   style,
   previewVisible,
   comparable,
   onClick,
   onCancel,
}) {
  const onlyOneImg = comparable || imgs.length === 1;
  const imageWrapperClassName = classNames('preview-image-wrapper', {
    good: coverMeta.isGood,
    bad: coverMeta.isBad,
  });
  return (
    <div className="preview-image-box" style={style}>
      <div onClick={onClick} className={imageWrapperClassName}>
        <img className={coverMeta.className} src={coverMeta.src} alt={coverMeta.alt} />
      </div>
      <div className="preview-image-title">{coverMeta.alt}</div>
      <div
        className="preview-image-description"
        dangerouslySetInnerHTML={{ __html: coverMeta.description }}
      />
      <Modal
        className="image-modal"
        width={960}
        visible={previewVisible}
        title={null}
        footer={null}
        onCancel={onCancel}
      >
        <Carousel
          className={`${onlyOneImg ? 'image-modal-single' : ''}`}
          draggable={!onlyOneImg}
          adaptiveHeight
        >
          {comparable ? cover : imgs}
        </Carousel>
        <div className="preview-image-title">{coverMeta.alt}</div>
      </Modal>
    </div>
  );
}

function isGoodBadImg(imgMeta) {
  return imgMeta.isGood || imgMeta.isBad;
}

function isCompareImg(imgMeta) {
  return isGoodBadImg(imgMeta) || imgMeta.inline;
}

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewVisible: {},
    };
  }

  handleClick = index => {
    this.setState({
      previewVisible: {
        [index]: true,
      },
    });
  };

  handleCancel = () => {
    this.setState({
      previewVisible: {},
    });
  };

  render() {
    const { imgs } = this.props;
    const imgsMeta = imgs.map(img => {
      const { alt, description, src } = img;
      const imgClassName = img.class;
      return {
        className: imgClassName,
        alt,
        description,
        src,
        isGood: isGood(imgClassName),
        isBad: isBad(imgClassName),
        inline: isInline(imgClassName),
      };
    });

    const imagesList = imgsMeta.map((meta, index) => {
      const metaCopy = { ...meta };
      delete metaCopy.description;
      delete metaCopy.isGood;
      delete metaCopy.isBad;
      return (
        <div key={index}>
          <div className="image-modal-container">
            <img {...metaCopy} alt={meta.alt} />
          </div>
        </div>
      );
    });

    const comparable =
      (imgs.length === 2 && imgsMeta.every(isCompareImg)) ||
      (imgs.length >= 2 && imgsMeta.every(isGoodBadImg));

    const style = comparable ? { width: `${(100 / imgs.length).toFixed(3)}%` } : null;

    const hasCarousel = imgs.length > 1 && !comparable;
    const previewClassName = classNames({
      'preview-image-boxes': true,
      clearfix: true,
      'preview-image-boxes-compare': comparable,
      'preview-image-boxes-with-carousel': hasCarousel,
    });
    return (
      <div className={previewClassName}>
        {imagesList.map((_, index) => {
          if (!comparable && index !== 0) {
            return null;
          }

          return (
            <PreviewImageBox
              key={index}
              style={style}
              comparable={comparable}
              previewVisible={!!this.state.previewVisible[index]}
              cover={imagesList[index]}
              coverMeta={imgsMeta[index]}
              imgs={imagesList}
              onClick={() => {
                this.handleClick(index);
              }}
              onCancel={this.handleCancel}
            />
          );
        })}
      </div>
    );
  }
}
