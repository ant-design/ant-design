import React, { startTransition } from 'react';
import { ConfigProvider } from 'antd';

const getTransformRotateStyle = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  currentTarget: EventTarget & HTMLDivElement,
  multiple: number,
  isRTL: boolean,
): string => {
  const box = currentTarget?.getBoundingClientRect();
  const calcX = -(event.clientY - box.y - box.height / 2) / multiple;
  const calcY = (event.clientX - box.x - box.width / 2) / multiple;
  return isRTL
    ? `rotate3d(${24 + calcX}, ${83 + calcY}, -45, 57deg)`
    : `rotate3d(${24 + calcX}, ${-83 + calcY}, 45, 57deg)`;
};

const useMouseTransform = ({ transitionDuration = 500, multiple = 36 } = {}) => {
  const [componentsBlockStyle, setComponentsBlockStyle] = React.useState<React.CSSProperties>({});

  const { direction } = React.useContext(ConfigProvider.ConfigContext);

  const isRTL = direction === 'rtl';

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const { currentTarget } = event;
    startTransition(() => {
      setComponentsBlockStyle((style) => ({
        ...style,
        transform: getTransformRotateStyle(event, currentTarget, multiple, isRTL),
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
