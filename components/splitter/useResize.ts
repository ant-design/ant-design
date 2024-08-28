import type React from 'react';
import { useRef } from 'react';
import { useEvent } from 'rc-util';

import type { PanelProps } from './Panel';
import type { SplitterProps } from './Splitter';

interface UseResizeProps extends Pick<SplitterProps, 'layout' | 'onResize'> {
  panelsRef: React.RefObject<(HTMLDivElement | null)[]>;
  gutter: number;
  gutterCount: number;
  items: PanelProps[];
  isRTL: boolean;
  basicsData: number[];
  setBasicsState: React.Dispatch<React.SetStateAction<number[]>>;
}
export interface UseResize {
  setSize: (size: number, index: number) => void;
  setOffset: (offset: number, containerSize: number, index: number) => void;
}

export const sizeTransform = (size: number | string, sizeCount: number) => {
  let currentSize = 0;
  if (typeof size === 'number') {
    return size;
  }

  if (size.includes('%')) {
    currentSize = Number(size.replace('%', ''));
  } else if (size.includes('px')) {
    currentSize = (Number(size.replace('px', '')) / sizeCount) * 100;
  }

  return currentSize;
};

const useResize = ({
  basicsData,
  items,
  isRTL,
  layout,
  gutter,
  panelsRef,
  onResize,
  setBasicsState,
}: UseResizeProps): UseResize => {
  const basicsRef = useRef<number[]>(basicsData);

  const setOffset = useEvent((offset: number, containerSize: number, index: number) => {
    const reverse = layout === 'horizontal' && isRTL;

    if (panelsRef.current?.[index] && basicsRef.current) {
      const previousElement = panelsRef.current[index];
      const nextElement = panelsRef.current[index + 1]!;

      const percentCount = basicsRef.current[index] + basicsRef.current[index + 1];

      let previousSize = reverse
        ? basicsRef.current[index] + offset
        : basicsRef.current[index] - offset;
      let nextSize = reverse
        ? basicsRef.current[index + 1] - offset
        : basicsRef.current[index + 1] + offset;

      const { max: previousMax = percentCount, min: previousMin = 0 } = items[index];
      const { max: nextMax = percentCount, min: nextMin = 0 } = items[index + 1];

      const previousMaxNumber = sizeTransform(previousMax, containerSize);
      const previousMinNumber = sizeTransform(previousMin, containerSize);
      const nextMaxNumber = sizeTransform(nextMax, containerSize);
      const nextMinNumber = sizeTransform(nextMin, containerSize);

      // size limit
      let skipNext = false;
      if (previousSize < previousMinNumber) {
        previousSize = previousMinNumber;
        nextSize = percentCount - previousSize;
        skipNext = true;
      } else if (previousSize > previousMaxNumber) {
        previousSize = previousMaxNumber;
        nextSize = percentCount - previousSize;
        skipNext = true;
      }

      if (!skipNext) {
        if (nextSize < nextMinNumber) {
          nextSize = nextMinNumber;
          previousSize = percentCount - nextSize;
        } else if (nextSize > nextMaxNumber) {
          nextSize = nextMaxNumber;
          previousSize = percentCount - nextSize;
        }
      }

      previousElement.style.flexBasis = `calc(${previousSize}% - ${gutter}px)`;
      nextElement.style.flexBasis = `calc(${nextSize}% - ${gutter}px)`;

      basicsRef.current[index] = previousSize;
      basicsRef.current[index + 1] = nextSize;

      setBasicsState([...basicsRef.current]);
      onResize?.(basicsRef.current, index);
    }
  });

  const setSize = (size: number, index: number) => {
    if (basicsRef.current && panelsRef.current?.[index]) {
      basicsRef.current[index] = size;
      setBasicsState([...basicsRef.current]);
      panelsRef.current[index].style.flexBasis = size > 0 ? `calc(${size}% - ${gutter}px)` : '0';
    }
  };

  basicsRef.current = basicsData;

  return { setSize, setOffset };
};

export default useResize;
