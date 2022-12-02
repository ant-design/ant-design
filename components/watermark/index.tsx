import React, { useEffect, useMemo, useRef } from 'react';
import useMutationObserver from './useMutationObserver';

const getStyleStr = (style: Record<string, string | number>): string => {
  let styleStr = '';
  Object.keys(style).forEach((item) => {
    const key = item.replace(/([A-Z])/g, '-$1').toLowerCase();
    styleStr += `${key}: ${style[item]}; `;
  });
  return styleStr;
};

export interface WatermarkProps {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  image?: string;
  content?: string | string[];
  font?: {
    color?: string;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
  };
  style?: React.CSSProperties;
  className?: string;
  gap?: [number, number];
  offset?: [number, number];
  children?: React.ReactNode;
}

const Watermark: React.FC<WatermarkProps> = (props) => {
  const {
    /**
     * The antd content layer zIndex is basically below 10
     * https://github.com/ant-design/ant-design/blob/6192403b2ce517c017f9e58a32d58774921c10cd/components/style/themes/default.less#L335
     */
    zIndex = 9,
    rotate = -22,
    width = 120,
    height = 64,
    image,
    content,
    font = {},
    style,
    className,
    gap = [200, 200],
    offset,
    children,
  } = props;

  const {
    color = 'rgba(0,0,0,.15)',
    fontSize = 16,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
  } = font;

  const [gapX, gapY] = gap;

  /** Calculate the style of the offset */
  const offsetStyle = useMemo(() => {
    const gapXCenter = gapX / 2;
    const gapYCenter = gapY / 2;
    const offsetLeft = offset?.[0] ?? gapXCenter;
    const offsetTop = offset?.[1] ?? gapYCenter;
    const mergedOffsetStyle: React.CSSProperties = {};
    let mergedOffsetLeft = offsetLeft - gapXCenter;
    let mergedOffsetTop = offsetTop - gapYCenter;

    if (mergedOffsetLeft > 0) {
      mergedOffsetStyle.left = `${mergedOffsetLeft}px`;
      mergedOffsetStyle.width = `calc(100% - ${mergedOffsetLeft}px)`;
      mergedOffsetLeft = 0;
    }
    if (mergedOffsetTop > 0) {
      mergedOffsetStyle.top = `${mergedOffsetTop}px`;
      mergedOffsetStyle.height = `calc(100% - ${mergedOffsetTop}px)`;
      mergedOffsetTop = 0;
    }

    return {
      ...mergedOffsetStyle,
      backgroundPosition: `${mergedOffsetLeft}px ${mergedOffsetTop}px`,
    };
  }, [offset, gap]);

  const markStyle: React.CSSProperties = {
    zIndex,
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundSize: `${gapX + width}px`,
    pointerEvents: 'none',
    backgroundRepeat: 'repeat',
    ...offsetStyle,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkDom = useRef<HTMLDivElement>();
  const { WATERMARK_ID_NAME, watermarkId, createObserver, destroyObserver } = useMutationObserver();

  const destroyWatermark = () => {
    if (watermarkDom.current) {
      watermarkDom.current.remove();
      watermarkDom.current = undefined;
    }
  };

  const reRendering = (mutation: MutationRecord) => {
    let flag = false;
    // Whether to delete the watermark node
    if (mutation.removedNodes.length) {
      mutation.removedNodes.forEach((node) => {
        if ((node as HTMLDivElement).getAttribute?.(WATERMARK_ID_NAME) === watermarkId) {
          flag = true;
        }
      });
    }
    // Whether the watermark dom property value has been modified
    if (
      mutation.type === 'attributes' &&
      ((mutation.target as HTMLDivElement).getAttribute?.(WATERMARK_ID_NAME) === watermarkId ||
        mutation.attributeName === WATERMARK_ID_NAME)
    ) {
      flag = true;
    }
    return flag;
  };

  const appendWatermark = (base64Url: string) => {
    if (containerRef.current && watermarkDom.current) {
      destroyObserver();
      watermarkDom.current.setAttribute(WATERMARK_ID_NAME, watermarkId);
      watermarkDom.current.setAttribute(
        'style',
        getStyleStr({
          ...markStyle,
          backgroundImage: `url('${base64Url}')`,
        }),
      );
      containerRef.current?.append(watermarkDom.current);
      createObserver(containerRef.current, (mutations) => {
        mutations.forEach((mutation) => {
          if (reRendering(mutation)) {
            destroyWatermark();
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            renderWatermark();
          }
        });
      });
    }
  };

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkDom.current) {
        watermarkDom.current = document.createElement('div');
      }

      const ratio = window.devicePixelRatio;
      const canvasWidth = `${(gapX + width) * ratio}px`;
      const canvasHeight = `${(gapY + height) * ratio}px`;

      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      const markWidth = width * ratio;
      const markHeight = height * ratio;
      const gapXCenter = (gapX * ratio) / 2;
      const gapYCenter = (gapY * ratio) / 2;

      /** Rotate with the canvas as the center point */
      const centerX = (markWidth + gapX * ratio) / 2;
      const centerY = (markHeight + gapY * ratio) / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((Math.PI / 180) * Number(rotate));
      ctx.translate(-centerX, -centerY);

      if (image) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, gapXCenter, gapYCenter, markWidth, markHeight);
          appendWatermark(canvas.toDataURL());
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else if (content) {
        const markSize = Number(fontSize) * ratio;
        const fontGap = ratio * 3;
        ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.translate(markWidth / 2, markSize);
        if (Array.isArray(content)) {
          content?.forEach((item: string, index: number) =>
            ctx.fillText(item, gapXCenter, gapYCenter + index * (markSize + fontGap)),
          );
        } else {
          ctx.fillText(content, gapXCenter, gapYCenter);
        }
        appendWatermark(canvas.toDataURL());
      }
    }
  };

  useEffect(() => {
    renderWatermark();
  }, [rotate, zIndex, width, height, image, content, font, style, className, gap]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Watermark;
