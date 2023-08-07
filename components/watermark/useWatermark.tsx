import * as React from 'react';
import { getStyleStr } from './utils';

/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
export const BaseSize = 2;
export const FontGap = 3;

export type AppendWatermark = (
  base64Url: string,
  markWidth: number,
  container: HTMLElement,
) => void;

export default function useWatermark(
  markStyle: React.CSSProperties,
  gapX: number,
): [appendWatermark: AppendWatermark, watermarkRef: React.RefObject<HTMLDivElement | undefined>] {
  const watermarkRef = React.useRef<HTMLDivElement>();

  const appendWatermark = (base64Url: string, markWidth: number, container: HTMLElement) => {
    if (!watermarkRef.current) {
      watermarkRef.current = document.createElement('div');
    }

    if (container) {
      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...markStyle,
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${(gapX + markWidth) * BaseSize}px`,
        }),
      );
      container.append(watermarkRef.current);
    }
  };

  return [appendWatermark, watermarkRef];
}
