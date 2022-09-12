import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import pick from 'lodash/pick';
import React, { useContext, useMemo } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import BackTop from '../back-top';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import Tooltip from '../tooltip';
import Content from './FloatButtonContent';
import type { ContentProps, FloatButtonProps } from './interface';
import Group from './FloatButtonGroup';

interface WithGroupAndBackTop {
  Group: typeof Group;
  BackTop: typeof BackTop;
}

const FloatButton: React.FC<FloatButtonProps> & WithGroupAndBackTop = props => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('float-button', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classString = classNames(
    hashId,
    prefixCls,
    className,
    `${prefixCls}-${shape}`,
    `${prefixCls}-${type}`,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  const divProps = pick(props, ['style', 'onClick']);

  const contentProps = useMemo<ContentProps>(
    () => ({ prefixCls, description, icon, shape, type }),
    [prefixCls, description, icon, shape, type],
  );

  return wrapSSR(
    <div {...divProps} className={classString}>
      <CSSMotion motionName={`${rootPrefixCls}-fade`}>
        {childrenProps =>
          tooltip ? (
            <Tooltip title={tooltip}>
              <Content CSSMotionClassName={childrenProps.className} {...contentProps} />
            </Tooltip>
          ) : (
            <Content CSSMotionClassName={childrenProps.className} {...contentProps} />
          )
        }
      </CSSMotion>
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

FloatButton.Group = Group;
FloatButton.BackTop = BackTop;

export default FloatButton;
