import { useEvent } from 'rc-util';

import type { UseResize, UseResizeProps } from '../interface';

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
  basicsState,
  items,
  panelsRef,
  reverse,
  onResize,
  setBasicsState,
}: UseResizeProps): UseResize => {
  const setOffset = useEvent((offset: number, containerSize: number, index: number) => {
    if (panelsRef.current?.[index] && basicsState) {
      const previousElement = panelsRef.current[index];
      const nextElement = panelsRef.current[index + 1]!;

      const percentCount = basicsState[index] + basicsState[index + 1];

      let previousSize = reverse ? basicsState[index] + offset : basicsState[index] - offset;
      let nextSize = reverse ? basicsState[index + 1] - offset : basicsState[index + 1] + offset;

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

      previousElement.style.flexBasis = `${previousSize}%`;
      nextElement.style.flexBasis = `${nextSize}%`;

      const newData = [...basicsState];
      newData[index] = previousSize;
      newData[index + 1] = nextSize;
      setBasicsState(newData);
      onResize?.(newData, index);
    }
  });

  const setSize = useEvent((data: { size: number; index: number }[]) => {
    const newData = [...basicsState];

    data.forEach((item) => {
      newData[item.index] = item.size;
      if (panelsRef.current?.[item.index]) {
        panelsRef.current[item.index]!.style.flexBasis = item.size > 0 ? `${item.size}%` : '0';
      }
    });

    setBasicsState(newData);
  });

  return { setSize, setOffset };
};

export default useResize;
