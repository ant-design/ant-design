import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import { devUseWarning } from '../_util/warning';
import Badge from '../badge';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Tooltip from '../tooltip';
import FloatButtonGroupContext from './context';
import Content from './FloatButtonContent';
import type {
  CompoundedComponent,
  FloatButtonBadgeProps,
  FloatButtonContentProps,
  FloatButtonElement,
  FloatButtonProps,
  FloatButtonShape,
} from './interface';
import useStyle from './style';

export const floatButtonPrefixCls = 'float-btn';

const FloatButton = React.forwardRef<FloatButtonElement, FloatButtonProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
    badge = {},
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedShape = groupShape || shape;

  const classString = classNames(
    hashId,
    cssVarCls,
    rootCls,
    prefixCls,
    className,
    rootClassName,
    `${prefixCls}-${type}`,
    `${prefixCls}-${mergedShape}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  // 虽然在 ts 中已经 omit 过了，但是为了防止多余的属性被透传进来，这里再 omit 一遍，以防万一
  const badgeProps = useMemo<FloatButtonBadgeProps>(
    () => omit(badge, ['title', 'children', 'status', 'text'] as any[]),
    [badge],
  );

  const contentProps = useMemo<FloatButtonContentProps>(
    () => ({ prefixCls, description, icon, type }),
    [prefixCls, description, icon, type],
  );

  let buttonNode = (
    <div className={`${prefixCls}-body`}>
      <Content {...contentProps} />
    </div>
  );

  if ('badge' in props) {
    buttonNode = <Badge {...badgeProps}>{buttonNode}</Badge>;
  }

  if ('tooltip' in props) {
    buttonNode = (
      <Tooltip title={tooltip} placement={direction === 'rtl' ? 'right' : 'left'}>
        {buttonNode}
      </Tooltip>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('FloatButton');

    warning(
      !(shape === 'circle' && description),
      'usage',
      'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );
  }

  return wrapCSSVar(
    props.href ? (
      <a ref={ref} {...restProps} className={classString}>
        {buttonNode}
      </a>
    ) : (
      <button ref={ref} {...restProps} className={classString} type="button">
        {buttonNode}
      </button>
    ),
  );
}) as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

export default FloatButton;
