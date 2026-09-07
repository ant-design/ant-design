import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export interface CardGridRef {
  nativeElement: HTMLDivElement;
}

const CardGrid = React.forwardRef<CardGridRef, CardGridProps>((props, ref) => {
  const { prefixCls, className, hoverable = true, ...rest } = props;
  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const prefix = getPrefixCls('card', prefixCls);
  const classString = clsx(`${prefix}-grid`, className, {
    [`${prefix}-grid-hoverable`]: hoverable,
  });
  const nativeElementRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: nativeElementRef.current!,
  }));

  return <div ref={nativeElementRef} {...rest} className={classString} />;
});

if (process.env.NODE_ENV !== 'production') {
  CardGrid.displayName = 'CardGrid';
}

export default CardGrid;
