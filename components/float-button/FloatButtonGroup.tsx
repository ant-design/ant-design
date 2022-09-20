import type { ProviderProps } from 'react';
import React, { useRef, memo, useContext, useMemo } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { floatButtonPrefixCls } from '.';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { FloatButtonGroupProvider } from './context';
import type { FloatButtonGroupProps, FloatButtonShape } from './interface';
import useStyle from './style';

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    shape = 'circle',
    type = 'default',
    icon = <FileTextOutlined />,
    closeIcon = <CloseOutlined />,
    trigger,
    children,
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
    `${prefixCls}-tigger`,
    `${prefixCls}-${type}`,
    `${prefixCls}-${shape}`,
    `${prefixCls}-${shape}-tigger`,
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

  const wrapClsString = classNames(
    hashId,
    `${groupPrefixCls}-wrap`,
    `${groupPrefixCls}-wrap-${shape}`,
  );

  const [open, setOpen] = useMergedState(false, { value: props.open });

  const actionsRef = useRef<React.HTMLAttributes<HTMLDivElement>>({});

  if (trigger === 'click') {
    actionsRef.current = {
      onClick() {
        setOpen(prevState => {
          onOpenChange?.(!prevState);
          return !prevState;
        });
      },
    };
  }

  if (trigger === 'hover') {
    actionsRef.current = {
      onMouseEnter() {
        setOpen(true);
        onOpenChange?.(true);
      },
      onMouseLeave() {
        setOpen(false);
        onOpenChange?.(false);
      },
    };
  }

  // Provider 组件的值用 useMemo 缓存一下，以防止每次渲染影响后续子组件
  const providerValue = useMemo<ProviderProps<FloatButtonShape>['value']>(() => shape, [shape]);

  const tiggerElement = (
    <div className={classStringMenu} {...actionsRef.current}>
      <div className={`${prefixCls}-body`}>
        <div className={classNames(`${prefixCls}-icon`, `${prefixCls}-${type}-icon`)}>
          {open ? closeIcon : icon}
        </div>
      </div>
    </div>
  );

  return wrapSSR(
    <FloatButtonGroupProvider value={providerValue}>
      <div className={classString}>
        {trigger && ['click', 'hover'].includes(trigger) ? (
          <>
            {open && <div className={wrapClsString}>{children}</div>}
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
