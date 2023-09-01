'use client';

import React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import createFlexClassNames from './classNames';
import type { FlexProps } from './interface';
import useStyle from './style';
import createContainer from './utils';

const FlexBox = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    flex,
    gap,
    children,
    component = 'div',
    ...otherProps
  } = props;

  const {
    flex: ctxFlex,
    direction,
    getPrefixCls,
  } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('flex', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const Container = createContainer(component);

  const customGap = ['small', 'middle', 'large'].includes(gap as string);

  const mergedCls = classNames(
    className,
    rootClassName,
    ctxFlex?.className,
    prefixCls,
    hashId,
    createFlexClassNames(prefixCls, props),
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-gap-${gap}`]: gap && customGap,
    },
  );

  const mergedStyle: React.CSSProperties = { ...ctxFlex?.style, ...style };

  if (flex) {
    mergedStyle.flex = flex;
  }

  if (gap && !customGap) {
    mergedStyle.gap = gap;
  }

  return wrapSSR(
    <Container
      ref={ref}
      className={mergedCls}
      style={mergedStyle}
      {...omit(otherProps, ['direction', 'justify', 'wrap', 'align'])}
    >
      {children}
    </Container>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  FlexBox.displayName = 'Flex';
}

export default FlexBox;
