import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import BackTop from './back-top';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import Tooltip from '../tooltip';
import Content from './FloatButtonContent';
import type {
  CompoundedComponent,
  FloatButtonContentProps,
  FloatButtonProps,
  FloatButtonShape,
} from './interface';
import Group from './FloatButtonGroup';
import FloatButtonGroupContext from './context';

export const floatButtonPrefixCls = 'float-btn';

const FloatButton: React.FC<FloatButtonProps> & CompoundedComponent = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const groupShape = useContext<FloatButtonShape | null>(FloatButtonGroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergeShape = groupShape || shape;

  const classString = classNames(
    hashId,
    prefixCls,
    className,
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
    <div className={`${prefixCls}-body`}>
      {tooltip ? (
        <Tooltip title={tooltip} placement="left">
          <Content {...contentProps} />
        </Tooltip>
      ) : (
        <Content {...contentProps} />
      )}
    </div>
  );

  return wrapSSR(
    props.href ? (
      <a {...restProps} className={classString}>
        {buttonNode}
      </a>
    ) : (
      <button {...restProps} className={classString} type="button">
        {buttonNode}
      </button>
    ),
  );
};

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

FloatButton.Group = Group;
FloatButton.BackTop = BackTop;

export default FloatButton;
