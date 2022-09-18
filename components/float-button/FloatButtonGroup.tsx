import React, { useRef, memo, useContext, useState, useMemo } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import { floatButtonPrefixCls } from '.';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { FloatButtonGroupProvider } from './context';
import type { FloatButtonGroupProps } from './interface';
import useStyle from './style';

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    shape = 'circle',
    type = 'default',
    open = false,
    trigger,
    icon,
    children,
    closeIcon,
    onOpenChange,
  } = props;
  const { direction, getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const groupPrefixCls = `${prefixCls}-group`;

  const classStringMenu = classNames(
    hashId,
    prefixCls,
    className,
    `${prefixCls}-${type}`,
    `${prefixCls}-${shape}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  const classString = classNames(
    groupPrefixCls,
    hashId,
    {
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
      [`${groupPrefixCls}-${shape}`]: shape,
    },
    className,
  );

  const [visible, setVisible] = useState<boolean>(false);

  const actionsRef = useRef<React.HTMLAttributes<HTMLDivElement>>({});

  if (trigger === 'click') {
    actionsRef.current = {
      onClick() {
        setVisible(prevState => {
          onOpenChange?.(prevState);
          return !prevState;
        });
      },
    };
  }

  if (trigger === 'hover') {
    actionsRef.current = {
      onMouseEnter() {
        setVisible(true);
        onOpenChange?.(true);
      },
      onMouseLeave() {
        setVisible(false);
        onOpenChange?.(false);
      },
    };
  }

  const tiggerElement = (
    <div className={classStringMenu} {...actionsRef.current}>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>
          {visible ? closeIcon || <CloseOutlined /> : icon || <FileTextOutlined />}
        </div>
      </div>
    </div>
  );

  // 如果用户传了 open，则为受控组件，用 open 控制
  // 如果用户没传 open，则为非受控组件，用 visible 控制
  const showMenu = useMemo<boolean>(() => ('open' in props ? open : visible), [open, visible]);

  return wrapSSR(
    <FloatButtonGroupProvider value={{ shape }}>
      <div className={classString}>
        {trigger && ['click', 'hover'].includes(trigger) ? (
          <>
            {showMenu ? children : null}
            {tiggerElement}
          </>
        ) : (
          children
        )}
      </div>
    </FloatButtonGroupProvider>,
  );
};

export default memo(FloatButtonGroup);
