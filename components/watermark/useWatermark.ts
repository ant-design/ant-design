import * as React from 'react';
import { useEvent } from '@rc-component/util';

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

function useWatermark(
  markStyle: React.CSSProperties,
  onRemove?: () => void,
): [
  appendWatermark: AppendWatermark,
  removeWatermark: (container: HTMLElement) => void,
  isWatermarkEle: (ele: Node, index?: number) => boolean,
] {
  const watermarkMapRef = React.useRef(new Map<HTMLElement, HTMLDivElement>());
  const onRemoveEvent = useEvent(onRemove);

  const appendWatermark = (base64Url: string, markWidth: number, container: HTMLElement) => {
    if (container) {
      const exist = watermarkMapRef.current.get(container);

      if (!exist) {
        const newWatermarkEle = document.createElement('div');
        watermarkMapRef.current.set(container, newWatermarkEle);
      }

      const watermarkEle = watermarkMapRef.current.get(container)!;

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
        if (exist && onRemove) {
          onRemoveEvent();
        }
        container.append(watermarkEle);
      }
    }

    return watermarkMapRef.current.get(container);
  };

  const removeWatermark = (container: HTMLElement) => {
    const watermarkEle = watermarkMapRef.current.get(container);

    if (watermarkEle && container) {
      container.removeChild(watermarkEle);
    }

    watermarkMapRef.current.delete(container);
  };

  const isWatermarkEle = (ele: any) => Array.from(watermarkMapRef.current.values()).includes(ele);

  return [appendWatermark, removeWatermark, isWatermarkEle] as const;
}

export default useWatermark;
