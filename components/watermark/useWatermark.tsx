import * as React from 'react';
import { getStyleStr } from './utils';

/**
 * Base size of the canvas, 1 for parallel layout and 2 for alternate layout
 * Only alternate layout is currently supported
 */
export const BaseSize = 2;
export const FontGap = 3;

export type AppendWatermark = (base64Url: string, markWidth: number) => void;

export default function useWatermark(
  markStyle: React.CSSProperties,
  gapX: number,
  containerRef: React.RefObject<HTMLDivElement>,
): [appendWatermark: AppendWatermark, destroyWatermark: VoidFunction] {
  const watermarkRef = React.useRef<HTMLDivElement>();

  const destroyWatermark = () => {
    if (watermarkRef.current) {
      watermarkRef.current.remove();
      watermarkRef.current = undefined;
    }
  };

  const appendWatermark = (base64Url: string, markWidth: number) => {
    if (containerRef.current && watermarkRef.current) {
      // stopObservation.current = true;
      watermarkRef.current.setAttribute(
        'style',
        getStyleStr({
          ...markStyle,
          backgroundImage: `url('${base64Url}')`,
          backgroundSize: `${(gapX + markWidth) * BaseSize}px`,
        }),
      );
      containerRef.current?.append(watermarkRef.current);
      // // Delayed execution
      // setTimeout(() => {
      //   stopObservation.current = false;
      // });
    }
  };

  return [appendWatermark, destroyWatermark];
}
