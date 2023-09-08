import { useState, startTransition, type CSSProperties } from 'react';

function getTransformRotateStyle(event, currentTarget, multiple): string {
  const box = currentTarget.getBoundingClientRect();
  const calcX = -(event.clientY - box.y - box.height / 2) / multiple;
  const calcY = (event.clientX - box.x - box.width / 2) / multiple;
  return `rotate3d(${24 + calcX}, ${-83 + calcY}, 45, 57deg)`;
}

const useMouseTransform = ({ transitionDuration = 500, multiple = 36 } = {}) => {
  const [componentsBlockStyle, setComponentsBlockStyle] = useState<CSSProperties>({});

  const onMouseMove = (event) => {
    const { currentTarget } = event;
    startTransition(() => {
      setComponentsBlockStyle((style) => ({
        ...style,
        transform: getTransformRotateStyle(event, currentTarget, multiple),
      }));
    });
  };

  const onMouseEnter = () => {
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

  const onMouseLeave = () => {
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
  ];
};

export default useMouseTransform;
