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
    flex = '0 1 auto',
    gap = 8,
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

  const mergedStyle: React.CSSProperties = { flex, gap, ...style };

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
