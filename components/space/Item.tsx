import * as React from 'react';
import { SpaceContext } from '.';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  direction?: 'horizontal' | 'vertical';
  marginDirection: 'marginLeft' | 'marginRight';
  split?: string | React.ReactNode;
  splitForceRender?: boolean;
  wrap?: boolean;
}

export default function Item({
  className,
  direction,
  index,
  marginDirection,
  children,
  split,
  wrap,
  splitForceRender,
}: ItemProps) {
  const [hidden, setHidden] = React.useState(false);
  const { horizontalSize, verticalSize, latestIndex } = React.useContext(SpaceContext);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (split && !splitForceRender && wrapperRef.current) {
      const { clientHeight, clientWidth } = wrapperRef.current;
      if (!clientHeight && !clientWidth) {
        setHidden(true);
      }
    }
  }, []);

  let style: React.CSSProperties = {};

  if (direction === 'vertical') {
    if (index < latestIndex) {
      style = { marginBottom: horizontalSize / (split ? 2 : 1) };
    }
  } else {
    style = {
      ...(index < latestIndex && { [marginDirection]: horizontalSize / (split ? 2 : 1) }),
      ...(wrap && { paddingBottom: verticalSize }),
    };
  }

  if (children === null || children === undefined || hidden) {
    return null;
  }

  return (
    <>
      <div ref={wrapperRef} className={className} style={style}>
        {children}
      </div>
      {index < latestIndex && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  );
}
