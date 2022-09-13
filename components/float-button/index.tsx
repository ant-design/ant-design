import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import React, { useContext, useMemo } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import BackTop from '../back-top';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import Tooltip from '../tooltip';
import Content from './FloatButtonContent';
import type {
  CompoundedComponent,
  FloatButtonContentProps,
  FloatButtonGroupProps,
  FloatButtonProps,
} from './interface';
import Group from './FloatButtonGroup';
import FloatButtonGroupContext from './context';

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
  const { shape: groupShape } = useContext<FloatButtonGroupProps>(FloatButtonGroupContext);
  const prefixCls = getPrefixCls('float-button', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
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
    <CSSMotion motionName={`${rootPrefixCls}-fade`}>
      {childrenProps => {
        const motionClass = { CSSMotionClassName: childrenProps.className };
        return tooltip ? (
          <Tooltip title={tooltip}>
            <Content {...motionClass} {...contentProps} />
          </Tooltip>
        ) : (
          <Content {...motionClass} {...contentProps} />
        );
      }}
    </CSSMotion>
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
