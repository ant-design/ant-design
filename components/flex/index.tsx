import React from 'react';

import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import createFlexClassNames from './classNames';
import type { FlexProps } from './interface';
import useStyle from './style';
import createContainer from './utils';

const FlexContainer = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
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
    <Container className={mergedCls} style={mergedStyle} ref={ref} {...otherProps}>
      {children}
    </Container>,
  );
});

export default FlexContainer;
