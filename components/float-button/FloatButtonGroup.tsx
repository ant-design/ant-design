import React, { useRef, memo, useContext } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
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
    style,
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

  const groupCls = classNames(groupPrefixCls, hashId, className, {
    [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    [`${groupPrefixCls}-${shape}`]: shape,
    [`${groupPrefixCls}-${shape}-shadow`]: !trigger,
  });

  const wrapperCls = classNames(hashId, `${groupPrefixCls}-wrap`);

  const tiggerCls = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-tigger`,
    `${prefixCls}-${type}`,
    `${prefixCls}-${shape}`,
  );

  const [open, setOpen] = useMergedState(false, { value: props.open });

  const clickAction = useRef<React.HTMLAttributes<HTMLDivElement>>({});

  const hoverAction = useRef<React.HTMLAttributes<HTMLDivElement>>({});

  if (trigger === 'click') {
    clickAction.current = {
      onClick() {
        setOpen(prevState => {
          onOpenChange?.(!prevState);
          return !prevState;
        });
      },
    };
  }

  if (trigger === 'hover') {
    hoverAction.current = {
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

  const tiggerElement = (
    <div className={tiggerCls} {...clickAction.current}>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-icon`}>{open ? closeIcon : icon}</div>
      </div>
    </div>
  );

  return wrapSSR(
    <FloatButtonGroupProvider value={shape}>
      <div className={groupCls} style={style} {...hoverAction.current}>
        {trigger && ['click', 'hover'].includes(trigger) ? (
          <>
            <CSSMotion visible={open} motionName={`${groupPrefixCls}-wrap`}>
              {({ className: motionClassName }) => (
                <div className={classNames(motionClassName, wrapperCls)}>{children}</div>
              )}
            </CSSMotion>
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
