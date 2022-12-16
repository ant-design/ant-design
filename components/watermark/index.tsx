import React, { useEffect, useRef } from 'react';
import useMutationObserver from './useMutationObserver';

const FontGap = 3;

const getStyleStr = (style: React.CSSProperties): string => {
  const styleArr = Object.keys(style).map((item: keyof React.CSSProperties) => {
    const key = item.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${key}: ${style[item]};`;
  });
  return styleArr.join(' ');
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
    width,
    height,
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
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  const getMarkStyle = (markWidth: number) => {
    const markStyle: React.CSSProperties = {
      zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundSize: `${gapX + markWidth}px`,
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
    };

    /** Calculate the style of the offset */
    let positionLeft = offsetLeft - gapXCenter;
    let positionTop = offsetTop - gapYCenter;
    if (positionLeft > 0) {
      markStyle.left = `${positionLeft}px`;
      markStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      markStyle.top = `${positionTop}px`;
      markStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

    return markStyle;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>();
  const { createObserver, destroyObserver } = useMutationObserver();

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };

  const reRendering = (mutation: MutationRecord) => {
    let flag = false;
    // Whether to delete the watermark node
    if (mutation.removedNodes.length) {
      flag = Array.from(mutation.removedNodes).some((node) => node === watermarkRef.current);
    }
    // Whether the watermark dom property value has been modified
    if (mutation.type === 'attributes' && mutation.target === watermarkRef.current) {
      flag = true;
    }
    return flag;
  };

  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      destroyObserver();
      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...getMarkStyle(markWidth),
          backgroundImage: `url('${base64Url}')`,
        }),
      );
      containerRef.current?.append(watermarkRef.current);
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

  /**
   * Get the width and height of the watermark. The default values are as follows
   * Image: [120, 64]; Content: It's calculated by content;
   */
  const getMarkSize = (ctx: CanvasRenderingContext2D): readonly [number, number] => {
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = Array.isArray(content) ? content : [content];
      const widths = contents.map((item) => ctx.measureText(item!).width);
      defaultWidth = Math.ceil(Math.max(...widths));
      defaultHeight = Number(fontSize) * contents.length + (contents.length - 1) * FontGap;
    }
    return [width ?? defaultWidth, height ?? defaultHeight] as const;
  };

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkRef.current) {
        watermarkRef.current = document.createElement('div');
      }

      const ratio = window.devicePixelRatio || 1;
      const [markWidth, markHeight] = getMarkSize(ctx);
      const canvasWidth = `${(gapX + markWidth) * ratio}px`;
      const canvasHeight = `${(gapY + markHeight) * ratio}px`;
      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      const mergedMarkWidth = markWidth * ratio;
      const mergedMarkHeight = markHeight * ratio;
      const mergedGapXCenter = (gapX * ratio) / 2;
      const mergedGapYCenter = (gapY * ratio) / 2;

      /** Rotate with the canvas as the center point */
      const centerX = (mergedMarkWidth + gapX * ratio) / 2;
      const centerY = (mergedMarkHeight + gapY * ratio) / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((Math.PI / 180) * Number(rotate));
      ctx.translate(-centerX, -centerY);

      if (image) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, mergedGapXCenter, mergedGapYCenter, mergedMarkWidth, mergedMarkHeight);
          appendWatermark(canvas.toDataURL(), markWidth);
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else {
        const mergedFontSize = Number(fontSize) * ratio;
        ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${mergedMarkHeight}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.translate(mergedMarkWidth / 2, 0);
        const contents = Array.isArray(content) ? content : [content];
        contents?.forEach((item, index) => {
          ctx.fillText(
            item ?? '',
            mergedGapXCenter,
            mergedGapYCenter + index * (mergedFontSize + FontGap * ratio),
          );
        });
        appendWatermark(canvas.toDataURL(), markWidth);
      }
    }
  };

  useEffect(renderWatermark, [
    rotate,
    zIndex,
    width,
    height,
    image,
    content,
    color,
    fontSize,
    fontWeight,
    fontStyle,
    fontFamily,
    gapX,
    gapY,
    offsetLeft,
    offsetTop,
  ]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', ...style }}>
      {children}
    </div>
  );
};

export default Watermark;
