import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import warning from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
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

  const floatButtonGroupRef = useRef<HTMLDivElement>(null);
  const floatButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const hoverAction = useMemo<React.DOMAttributes<HTMLDivElement>>(() => {
    const hoverTypeAction = {
      onMouseEnter() {
        setOpen(true);
        onOpenChange?.(true);
      },
      onMouseLeave() {
        setOpen(false);
        onOpenChange?.(false);
      },
    };
    return trigger === 'hover' ? hoverTypeAction : {};
  }, [trigger]);

  const handleOpenChange = () => {
    setOpen((prevState) => {
      onOpenChange?.(!prevState);
      return !prevState;
    });
  };

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (floatButtonGroupRef.current?.contains(e.target as Node)) {
        if (floatButtonRef.current?.contains(e.target as Node)) {
          handleOpenChange();
        }
        return;
      }
      setOpen(false);
      onOpenChange?.(false);
    },
    [trigger],
  );

  useEffect(() => {
    if (trigger === 'click') {
      document.addEventListener('click', onClick);
      return () => {
        document.removeEventListener('click', onClick);
      };
    }
  }, [trigger]);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(
      typeof props.open !== 'boolean' || !!trigger,
      'FloatButton.Group',
      '`open` need to be used together with `trigger`',
    );
  }

  return wrapSSR(
    <FloatButtonGroupProvider value={shape}>
      <div ref={floatButtonGroupRef} className={groupCls} style={style} {...hoverAction}>
        {trigger && ['click', 'hover'].includes(trigger) ? (
          <>
            <CSSMotion visible={open} motionName={`${groupPrefixCls}-wrap`}>
              {({ className: motionClassName }) => (
                <div className={classNames(motionClassName, wrapperCls)}>{children}</div>
              )}
            </CSSMotion>
            <FloatButton
              ref={floatButtonRef}
              type={type}
              shape={shape}
              icon={open ? closeIcon : icon}
              description={description}
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
