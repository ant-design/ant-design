import * as React from 'react';

import { getStyleStr } from './utils';

/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
export const BaseSize = 2;
export const FontGap = 3;

// Prevent external hidden elements from adding accent styles
const emphasizedStyle: React.CSSProperties = {
  visibility: 'visible !important',
} as unknown as React.CSSProperties;

export type AppendWatermark = (
  base64Url: string,
  markWidth: number,
  container: HTMLElement,
) => void;

export default function useWatermark(
  markStyle: React.CSSProperties,
): [
  appendWatermark: AppendWatermark,
  removeWatermark: (container: HTMLElement) => void,
  isWatermarkEle: (ele: Node) => boolean,
] {
  const watermarkMap = React.useRef(new Map<HTMLElement, HTMLDivElement>());

  const appendWatermark = (base64Url: string, markWidth: number, container: HTMLElement) => {
    if (container) {
      if (!watermarkMap.current.get(container)) {
        const newWatermarkEle = document.createElement('div');
        watermarkMap.current.set(container, newWatermarkEle);
      }

      const watermarkEle = watermarkMap.current.get(container)!;

      watermarkEle.setAttribute(
        'style',
        getStyleStr({
          ...markStyle,
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${Math.floor(markWidth)}px`,
          ...emphasizedStyle,
        }),
      );
      // Prevents using the browser `Hide Element` to hide watermarks
      watermarkEle.removeAttribute('class');
      watermarkEle.removeAttribute('hidden');

      if (watermarkEle.parentElement !== container) {
        container.append(watermarkEle);
      }
    }

    return watermarkMap.current.get(container);
  };

  const removeWatermark = (container: HTMLElement) => {
    const watermarkEle = watermarkMap.current.get(container);

    if (watermarkEle && container) {
      container.removeChild(watermarkEle);
    }

    watermarkMap.current.delete(container);
  };

  const isWatermarkEle = (ele: any) => Array.from(watermarkMap.current.values()).includes(ele);

  return [appendWatermark, removeWatermark, isWatermarkEle];
}
