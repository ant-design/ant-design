import MutateObserver from '@rc-component/mutate-observer';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { getPixelRatio, reRendering, rotateWatermark } from './utils';
import theme from '../theme';
import useWatermark, { BaseSize, FontGap } from './useWatermark';
import useRafDebounce from './useRafDebounce';

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
  const { token } = theme.useToken();
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

  const markStyle = React.useMemo(() => {
    const mergedStyle: React.CSSProperties = {
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
      mergedStyle.left = `${positionLeft}px`;
      mergedStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      mergedStyle.top = `${positionTop}px`;
      mergedStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    mergedStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

    return mergedStyle;
  }, [zIndex, offsetLeft, gapXCenter, offsetTop, gapYCenter]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [appendWatermark, watermarkRef] = useWatermark(markStyle, gapX, containerRef);

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
      const widths = contents.map((item) => ctx.measureText(item!).width);
      defaultWidth = Math.ceil(Math.max(...widths));
      defaultHeight = Number(fontSize) * contents.length + (contents.length - 1) * FontGap;
    }
    return [width ?? defaultWidth, height ?? defaultHeight] as const;
  };

  const fillTexts = (
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
  ) => {
    const ratio = getPixelRatio();
    const mergedFontSize = Number(fontSize) * ratio;
    ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${drawHeight}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.translate(drawWidth / 2, 0);
    const contents = Array.isArray(content) ? content : [content];
    contents?.forEach((item, index) => {
      ctx.fillText(item ?? '', drawX, drawY + index * (mergedFontSize + FontGap * ratio));
    });
  };

  const drawText = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    alternateRotateX: number,
    alternateRotateY: number,
    alternateDrawX: number,
    alternateDrawY: number,
    markWidth: number,
  ) => {
    fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);
    /** Fill the interleaved text after rotation */
    ctx.restore();
    rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
    fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
    appendWatermark(canvas.toDataURL(), markWidth);
  };

  const renderWatermark = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx);
      const canvasWidth = (gapX + markWidth) * ratio;
      const canvasHeight = (gapY + markHeight) * ratio;
      canvas.setAttribute('width', `${canvasWidth * BaseSize}px`);
      canvas.setAttribute('height', `${canvasHeight * BaseSize}px`);

      const drawX = (gapX * ratio) / 2;
      const drawY = (gapY * ratio) / 2;
      const drawWidth = markWidth * ratio;
      const drawHeight = markHeight * ratio;
      const rotateX = (drawWidth + gapX * ratio) / 2;
      const rotateY = (drawHeight + gapY * ratio) / 2;
      /** Alternate drawing parameters */
      const alternateDrawX = drawX + canvasWidth;
      const alternateDrawY = drawY + canvasHeight;
      const alternateRotateX = rotateX + canvasWidth;
      const alternateRotateY = rotateY + canvasHeight;

      ctx.save();
      rotateWatermark(ctx, rotateX, rotateY, rotate);

      if (image) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          /** Draw interleaved pictures after rotation */
          ctx.restore();
          rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
          ctx.drawImage(img, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
          appendWatermark(canvas.toDataURL(), markWidth);
        };
        img.onerror = () =>
          drawText(
            canvas,
            ctx,
            drawX,
            drawY,
            drawWidth,
            drawHeight,
            alternateRotateX,
            alternateRotateY,
            alternateDrawX,
            alternateDrawY,
            markWidth,
          );
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
      } else {
        drawText(
          canvas,
          ctx,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
          alternateRotateX,
          alternateRotateY,
          alternateDrawX,
          alternateDrawY,
          markWidth,
        );
      }
    }
  };

  // ============================= Drawer =============================
  const syncWatermark = useRafDebounce(renderWatermark);

  // ============================= Update =============================
  const onMutate = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      if (reRendering(mutation, watermarkRef.current)) {
        syncWatermark();
      }
    });
  };

  useEffect(syncWatermark, [
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

  // ============================= Render =============================
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
