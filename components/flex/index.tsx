import React from 'react';

import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import createFlexClassNames from './classNames';
import type { FlexProps } from './interface';
import useStyle from './style';
import createContainer from './utils';

const flexSize = {
  small: 8,
  middle: 16,
  large: 24,
} as const;

const getGapSize = (gap: FlexProps['gap']) => {
  if (!gap) {
    return 0;
  }
  if (typeof gap === 'number') {
    return gap;
  }
  return ['small', 'middle', 'large'].includes(gap) ? flexSize[gap as keyof typeof flexSize] : gap;
};

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

  const { direction, getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('flex', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const Container = createContainer(component);

  const mergedCls = classNames(
    className,
    rootClassName,
    prefixCls,
    hashId,
    createFlexClassNames(prefixCls, props),
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  const mergedStyle: React.CSSProperties = { ...style };

  if (flex) {
    mergedStyle.flex = flex;
  }

  if (gap) {
    mergedStyle.gap = getGapSize(gap);
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
