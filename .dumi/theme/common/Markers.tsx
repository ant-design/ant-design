import * as React from 'react';
import isVisible from 'rc-util/lib/Dom/isVisible';

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
    const targetElements = targetClassName
      ? Array.from(containerRef.current?.querySelectorAll<HTMLElement>(`.${targetClassName}`) || [])
      : [];

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
