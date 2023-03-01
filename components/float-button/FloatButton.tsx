import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import Tooltip from '../tooltip';
import warning from '../_util/warning';
import FloatButtonGroupContext from './context';
import Content from './FloatButtonContent';
import type {
  CompoundedComponent,
  FloatButtonContentProps,
  FloatButtonProps,
  FloatButtonShape,
} from './interface';
import useStyle from './style';

export const floatButtonPrefixCls = 'float-btn';

const FloatButton: React.ForwardRefRenderFunction<
  HTMLAnchorElement | HTMLButtonElement,
  FloatButtonProps
> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergeShape = groupShape || shape;

  const classString = classNames(
    hashId,
    prefixCls,
    className,
    rootClassName,
    `${prefixCls}-${type}`,
    `${prefixCls}-${mergeShape}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  const contentProps = useMemo<FloatButtonContentProps>(
    () => ({ prefixCls, description, icon, type }),
    [prefixCls, description, icon, type],
  );

  const buttonNode = (
    <Tooltip title={tooltip} placement={direction === 'rtl' ? 'right' : 'left'}>
      <div className={`${prefixCls}-body`}>
        <Content {...contentProps} />
      </div>
    </Tooltip>
  );

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(shape === 'circle' && description),
      'FloatButton',
      'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );
  }

  return wrapSSR(
    props.href ? (
      <a ref={ref as React.LegacyRef<HTMLAnchorElement>} {...restProps} className={classString}>
        {buttonNode}
      </a>
    ) : (
      <button
        ref={ref as React.LegacyRef<HTMLButtonElement>}
        {...restProps}
        className={classString}
        type="button"
      >
        {buttonNode}
      </button>
    ),
  );
};

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

const ForwardFloatButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  FloatButtonProps
>(FloatButton) as CompoundedComponent;

export default ForwardFloatButton;
