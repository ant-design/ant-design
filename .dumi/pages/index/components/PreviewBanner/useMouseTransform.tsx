import React, { startTransition } from 'react';

const getTransformRotateStyle = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  multiple: number,
): string => {
  const { x = 0, y = 0, width = 0, height = 0 } = e.currentTarget?.getBoundingClientRect() || {};
  const calcX = -(e.clientY - y - height / 2) / multiple;
  const calcY = (e.clientX - x - width / 2) / multiple;
  return `rotate3d(${24 + calcX}, ${-83 + calcY}, 45, 57deg)`;
};

const useMouseTransform = ({ transitionDuration = 500, multiple = 36 } = {}) => {
  const [componentsBlockStyle, setComponentsBlockStyle] = React.useState<React.CSSProperties>({});

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    startTransition(() => {
      setComponentsBlockStyle((style) => ({
        ...style,
        transform: getTransformRotateStyle(event, multiple),
      }));
    });
  };

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    startTransition(() => {
      setComponentsBlockStyle((style) => ({
        ...style,
        transition: `transform ${transitionDuration / 1000}s`,
      }));
    });

    setTimeout(() => {
      startTransition(() => {
        setComponentsBlockStyle((style) => ({
          ...style,
          transition: '',
        }));
      });
    }, transitionDuration);
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    startTransition(() => {
      setComponentsBlockStyle((style) => ({
        ...style,
        transition: `transform ${transitionDuration / 1000}s`,
        transform: '',
      }));
    });
  };

  return [
    componentsBlockStyle,
    {
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
    },
  ] as const;
};

export default useMouseTransform;
