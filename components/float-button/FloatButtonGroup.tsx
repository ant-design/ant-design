import React, { useRef, memo, useContext, useEffect, useState } from 'react';
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
    clickOutAutoClose,
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

  const floatButtonGroupRef = useRef(null);
  const floatButtonRef = useRef(null);

  const [clickAction, setClickAction] = useState({});

  const [hoverAction, setHoverAction] = useState({});

  const openChange = () => {
    setOpen((prevState) => {
      onOpenChange?.(!prevState);
      return !prevState;
    });
  };

  const clickTypeAction = {
    onClick() {
      openChange();
    },
  };

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

  useEffect(() => {
    if (trigger === 'click') {
      if (clickOutAutoClose) {
        const BigestEl = document;
        const clickFn = (e: MouseEvent) => {
          let clickTarget = e.target as Node;
          let clickWhich = null;
          // Distinguish between clicking a button and expanding it in a group
          const clickMap: Record<string, any> = {
            clickButton: openChange,
            clickOther: () => {},
          };
          while (clickTarget) {
            if (clickTarget === floatButtonRef.current) {
              clickWhich = 'clickButton';
              break;
            }
            if (clickTarget === floatButtonGroupRef.current) {
              clickWhich = 'clickOther';
            }
            clickTarget = clickTarget.parentNode!;
          }
          if (clickWhich) {
            clickMap[clickWhich]();
            return;
          }
          setOpen(false);
        };
        BigestEl?.addEventListener('click', clickFn);
      } else {
        setClickAction(clickTypeAction);
      }
    }
    if (trigger === 'hover') {
      setHoverAction(hoverTypeAction);
    }
    //  非严格模式下 会在组件卸载时自动 remove ，在合并前取消注释
    // return (
    //   BigestEl?.removeEventListener('click', clickFn)
    // )
  }, []);

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
              {...clickAction}
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
