'use client';

import React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { isPresetSize } from '../_util/gapSize';
import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import type { FlexProps } from './interface';
import useStyle from './style';
import createFlexClassNames from './utils';

const FlexBox = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    flex,
    gap,
    children,
    vertical = false,
    component: Component = 'div',
    ...otherProps
  } = props;

  const {
    flex: ctxFlex,
    direction: ctxDirection,
    getPrefixCls,
  } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('flex', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedVertical = vertical || ctxFlex?.vertical;

  const mergedCls = classNames(
    className,
    rootClassName,
    ctxFlex?.className,
    prefixCls,
    hashId,
    createFlexClassNames(prefixCls, props),
    {
      [`${prefixCls}-rtl`]: ctxDirection === 'rtl',
      [`${prefixCls}-gap-${gap}`]: isPresetSize(gap),
      [`${prefixCls}-vertical`]: mergedVertical,
    },
  );

  const mergedStyle: React.CSSProperties = { ...ctxFlex?.style, ...style };

  if (flex) {
    mergedStyle.flex = flex;
  }

  if (gap && !isPresetSize(gap)) {
    mergedStyle.gap = gap;
  }

  return wrapSSR(
    <Component
      ref={ref}
      className={mergedCls}
      style={mergedStyle}
      {...omit(otherProps, ['justify', 'wrap', 'align'])}
    >
      {children}
    </Component>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  FlexBox.displayName = 'Flex';
}

export default FlexBox;
