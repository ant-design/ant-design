import React from 'react';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import { isPresetSize } from '../_util/gapSize';
import { useOrientation } from '../_util/hooks';
import isNonNullable from '../_util/isNonNullable';
import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import type { FlexProps } from './interface';
import useStyle from './style';
import createFlexClassNames from './utils';

const Flex = React.forwardRef<HTMLElement, React.PropsWithChildren<FlexProps>>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    flex,
    gap,
    childrenFlex,
    vertical,
    orientation,
    component: Component = 'div',
    children,
    ...othersProps
  } = props;

  const {
    flex: ctxFlex,
    direction: ctxDirection,
    getPrefixCls,
  } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('flex', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const [, mergedVertical] = useOrientation(orientation, vertical ?? ctxFlex?.vertical);

  const mergedCls = clsx(
    className,
    rootClassName,
    ctxFlex?.className,
    prefixCls,
    hashId,
    cssVarCls,
    createFlexClassNames(prefixCls, { ...props, vertical: mergedVertical }),
    {
      [`${prefixCls}-rtl`]: ctxDirection === 'rtl',
      [`${prefixCls}-gap-${gap}`]: isPresetSize(gap),
      [`${prefixCls}-vertical`]: mergedVertical,
      [`${prefixCls}-children-flex`]: isNonNullable(childrenFlex),
    },
  );

  const mergedStyle: React.CSSProperties = { ...ctxFlex?.style, ...style };

  if (isNonNullable(flex)) {
    mergedStyle.flex = flex;
  }

  if (isNonNullable(gap) && !isPresetSize(gap)) {
    mergedStyle.gap = gap;
  }

  if (isNonNullable(childrenFlex)) {
    (mergedStyle as Record<string, unknown>)['--ant-flex-children-flex'] = childrenFlex;
  }

  return (
    <Component
      ref={ref}
      className={mergedCls}
      style={mergedStyle}
      {...omit(othersProps, ['justify', 'wrap', 'align'])}
    >
      {children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Flex.displayName = 'Flex';
}

export default Flex;
