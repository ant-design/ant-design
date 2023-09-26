import React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { Image } from 'antd';

interface ImagePreviewProps {
  children: React.ReactNode[];
  className?: string;
  /** Do not show padding & background */
  pure?: boolean;
}

function isGood(className: string): boolean {
  return /\bgood\b/i.test(className);
}

function isBad(className: string): boolean {
  return /\bbad\b/i.test(className);
}

function isInline(className: string): boolean {
  return /\binline\b/i.test(className);
}

function isGoodBadImg(imgMeta: any): boolean {
  return imgMeta.isGood || imgMeta.isBad;
}

function isCompareImg(imgMeta: any): boolean {
  return isGoodBadImg(imgMeta) || imgMeta.inline;
}
const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
  const { children, className: rootClassName, pure } = props;
  const imgs = toArray(children).filter((ele) => ele.type === 'img');

  const imgsMeta = imgs.map((img) => {
    const { alt, description, src, className } = img.props;
    return {
      className,
      alt,
      description,
      src,
      isGood: isGood(className),
      isBad: isBad(className),
      inline: isInline(className),
    };
  });

  const imagesList = imgsMeta.map<React.ReactNode>((meta, index) => {
    const metaCopy = { ...meta };
    delete metaCopy.description;
    delete metaCopy.isGood;
    delete metaCopy.isBad;
    return (
      <div key={index}>
        <div className="image-modal-container">
          <img {...metaCopy} src={meta.src} alt={meta.alt} />
        </div>
      </div>
    );
  });

  const comparable =
    (imgs.length === 2 && imgsMeta.every(isCompareImg)) ||
    (imgs.length >= 2 && imgsMeta.every(isGoodBadImg));

  const style: React.CSSProperties = comparable
    ? { width: `${(100 / imgs.length).toFixed(3)}%` }
    : {};

  const hasCarousel = imgs.length > 1 && !comparable;

  const previewClassName = classNames(rootClassName, 'clearfix', 'preview-image-boxes', {
    'preview-image-boxes-compare': comparable,
    'preview-image-boxes-with-carousel': hasCarousel,
  });

  // ===================== Render =====================
  const imgWrapperCls = 'preview-image-wrapper';

  return (
    <div className={previewClassName}>
      {!imgs.length && (
        <div
          className={imgWrapperCls}
          style={pure ? { background: 'transparent', padding: 0 } : {}}
        >
          {children}
        </div>
      )}

      {imagesList.map((_, index) => {
        if (!comparable && index !== 0) {
          return null;
        }
        const coverMeta = imgsMeta[index];
        const imageWrapperClassName = classNames(imgWrapperCls, {
          good: coverMeta.isGood,
          bad: coverMeta.isBad,
        });

        return (
          <div className="preview-image-box" style={style} key={index}>
            <div className={imageWrapperClassName}>
              <Image className={coverMeta.className} src={coverMeta.src} alt={coverMeta.alt} />
            </div>
            <div className="preview-image-title">{coverMeta.alt}</div>
            <div
              className="preview-image-description"
              dangerouslySetInnerHTML={{ __html: coverMeta.description }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreview;
