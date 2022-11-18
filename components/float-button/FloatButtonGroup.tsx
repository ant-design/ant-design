import React, { useRef, memo, useContext } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { FloatButtonGroupProvider } from './context';
import type { FloatButtonGroupProps } from './interface';
import useStyle from './style';

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    shape = 'circle',
    type = 'default',
    icon = <FileTextOutlined />,
    closeIcon = <CloseOutlined />,
    description,
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

  const [open, setOpen] = useMergedState(false, { value: props.open });

  const clickAction = useRef<React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>>({});

  const hoverAction = useRef<React.HTMLAttributes<HTMLDivElement>>({});

  if (trigger === 'click') {
    clickAction.current = {
      onClick() {
        setOpen((prevState) => {
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
            <FloatButton
              type={type}
              shape={shape}
              icon={open ? closeIcon : icon}
              description={description}
              {...clickAction.current}
            />
          </>
        ) : (
          children
        )}
      </div>
    </FloatButtonGroupProvider>,
  );
};

export default memo(FloatButtonGroup);
