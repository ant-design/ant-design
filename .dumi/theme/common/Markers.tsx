import * as React from 'react';
import isVisible from '@rc-component/util/lib/Dom/isVisible';

import Marker from './Marker';

export interface MarkersProps {
  targetClassName: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface RectType {
  left: number;
  top: number;
  width: number;
  height: number;
  visible: boolean;
}

const Markers: React.FC<MarkersProps> = (props) => {
  const { targetClassName, containerRef } = props;

  const [rectList, setRectList] = React.useState<RectType[]>([]);

  // ======================== Effect =========================
  React.useEffect(() => {
    const allElements = targetClassName
      ? Array.from(containerRef.current?.querySelectorAll<HTMLElement>(`.${targetClassName}`) || [])
      : [];

    const targetElements = allElements.filter((element) => {
      let currentElement: HTMLElement | null = element;
      let count = 0;

      while (currentElement && count <= 5) {
        const computedStyle = window.getComputedStyle(currentElement);
        const opacity = Number.parseFloat(computedStyle.opacity);

        if (opacity === 0) {
          return false;
        }

        currentElement = currentElement.parentElement;
        count++;
      }

      return true;
    });

    const containerRect = containerRef.current?.getBoundingClientRect() || ({} as DOMRect);

    const targetRectList = targetElements.map<RectType>((targetElement) => {
      const rect = targetElement.getBoundingClientRect();

      return {
        left: rect.left - (containerRect.left || 0),
        top: rect.top - (containerRect.top || 0),
        width: rect.width,
        height: rect.height,
        visible: isVisible(targetElement),
      };
    });

    setRectList((prev) => {
      return Array.from({ length: Math.max(prev.length, targetRectList.length) }).map<RectType>(
        (_, index) => {
          const prevRect = prev[index] || {};
          const nextRect = targetRectList[index] || {};
          return {
            left: nextRect.left ?? prevRect.left ?? 0,
            top: nextRect.top ?? prevRect.top ?? 0,
            width: nextRect.width ?? prevRect.width ?? 0,
            height: nextRect.height ?? prevRect.height ?? 0,
            visible: !!nextRect.visible,
          };
        },
      );
    });
  }, [containerRef, targetClassName]);

  // ======================== Render =========================
  return (
    <>
      {rectList.map((rect, index) => {
        const key = `key-${index}`;
        return <Marker rect={rect} key={key} data-id={key} primary={index === 0} />;
      })}
    </>
  );
};

export default Markers;
