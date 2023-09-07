import React, { useEffect, useRef } from 'react';
import MutateObserver from '@rc-component/mutate-observer';
import classNames from 'classnames';

import { useToken } from '../theme/internal';
import useClips, { FontGap } from './useClips';
import { getPixelRatio, getStyleStr, reRendering } from './utils';

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
  rootClassName?: string;
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
    rootClassName,
    gap = [100, 100],
    offset,
    children,
  } = props;
  const [, token] = useToken();
  const {
    color = token.colorFill,
    fontSize = token.fontSizeLG,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
  } = font;

  const [gapX, gapY] = gap;
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = offset?.[0] ?? gapXCenter;
  const offsetTop = offset?.[1] ?? gapYCenter;

  const getMarkStyle = () => {
    const markStyle: React.CSSProperties = {
      zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
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
  const stopObservation = useRef(false);

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };

  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      stopObservation.current = true;
      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...getMarkStyle(),
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${Math.floor(markWidth)}px`,
        }),
      );
      containerRef.current?.append(watermarkRef.current);
      // Delayed execution
      setTimeout(() => {
        stopObservation.current = false;
      });
    }
  };

  /**
   * Get the width and height of the watermark. The default values are as follows
   * Image: [120, 64]; Content: It's calculated by content;
   */
  const getMarkSize = (ctx: CanvasRenderingContext2D) => {
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = Array.isArray(content) ? content : [content];
      const sizes = contents.map((item) => {
        const metrics = ctx.measureText(item!);

        return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
      });
      defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
      defaultHeight =
        Math.ceil(Math.max(...sizes.map((size) => size[1]))) * contents.length +
        (contents.length - 1) * FontGap;
    }
    return [width ?? defaultWidth, height ?? defaultHeight] as const;
  };

  const getClips = useClips();

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (!watermarkRef.current) {
        watermarkRef.current = document.createElement('div');
      }

      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx);

      const drawCanvas = (
        drawContent?: NonNullable<WatermarkProps['content']> | HTMLImageElement,
      ) => {
        const [textClips, clipWidth] = getClips(
          drawContent || '',
          rotate,
          ratio,
          markWidth,
          markHeight,
          {
            color,
            fontSize,
            fontStyle,
            fontWeight,
            fontFamily,
          },
          gapX,
          gapY,
        );

        appendWatermark(textClips, clipWidth);
      };

      if (image) {
        const img = new Image();
        img.onload = () => {
          drawCanvas(img);
        };
        img.onerror = () => {
          drawCanvas(content);
        };
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else {
        drawCanvas(content);
      }
    }
  };

  const onMutate = (mutations: MutationRecord[]) => {
    if (stopObservation.current) {
      return;
    }
    mutations.forEach((mutation) => {
      if (reRendering(mutation, watermarkRef.current)) {
        destroyWatermark();
        renderWatermark();
      }
    });
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
    <MutateObserver onMutate={onMutate}>
      <div
        ref={containerRef}
        className={classNames(className, rootClassName)}
        style={{ position: 'relative', ...style }}
      >
        {children}
      </div>
    </MutateObserver>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Watermark.displayName = 'Watermark';
}

export default Watermark;
