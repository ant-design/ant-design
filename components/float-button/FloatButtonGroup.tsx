import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import CSSMotion from '@rc-component/motion';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import useMergedState from '@rc-component/util/lib/hooks/useMergedState';
import cls from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Flex from '../flex';
import Space from '../space';
import { GroupContext, GroupContextProps } from './context';
import FloatButton from './FloatButton';
import { FloatButtonGroupTrigger, floatButtonPrefixCls, FloatButtonProps } from './FloatButton';
import useStyle from './style';

export type FloatButtonGroupSemanticName = 'root' | 'list' | 'item' | 'trigger';

export interface FloatButtonGroupProps extends FloatButtonProps {
  // Styles
  classNames?: Partial<Record<FloatButtonGroupSemanticName, string>>;
  styles?: Partial<Record<FloatButtonGroupSemanticName, React.CSSProperties>>;

  // Control
  trigger?: FloatButtonGroupTrigger;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // UI
  closeIcon?: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'left' | 'right' | 'bottom';
}

const FloatButtonGroup: React.FC<Readonly<FloatButtonGroupProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    classNames = {},
    styles = {},

    shape = 'circle',
    type = 'default',
    placement,
    icon = <FileTextOutlined />,
    closeIcon,
    description,
    trigger,
    children,
    onOpenChange,
    open: customOpen,
    onClick: onTriggerButtonClick,
    ...floatButtonProps
  } = props;

  const {
    direction,
    getPrefixCls,
    closeIcon: contextCloseIcon,
  } = useComponentConfig('floatButtonGroup');

  const mergedCloseIcon = closeIcon ?? contextCloseIcon ?? <CloseOutlined />;

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const groupPrefixCls = `${prefixCls}-group`;

  const isMenuMode = trigger && ['click', 'hover'].includes(trigger);
  // const isValidPlacement = placement && ['top', 'left', 'right', 'bottom'].includes(placement);

  // const groupCls = classNames(groupPrefixCls, hashId, cssVarCls, rootCls, className, {
  //   [`${groupPrefixCls}-rtl`]: direction === 'rtl',
  //   [`${groupPrefixCls}-${shape}`]: shape,
  //   [`${groupPrefixCls}-${shape}-shadow`]: !isMenuMode,
  //   [`${groupPrefixCls}-${placement}`]: isMenuMode && isValidPlacement, // 只有菜单模式才支持弹出方向
  // });

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('FloatButton', style?.zIndex as number);

  const [open, setOpen] = useMergedState(false, { value: customOpen });

  const floatButtonGroupRef = React.useRef<HTMLDivElement>(null);

  // ========================== Placement ==========================
  const mergedPlacement = ['top', 'left', 'right', 'bottom'].includes(placement!)
    ? placement
    : 'top';

  // ========================== Open ==========================
  const hoverTrigger = trigger === 'hover';
  const clickTrigger = trigger === 'click';

  const triggerOpen = useEvent((nextOpen: boolean) => {
    if (open !== nextOpen) {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    }
  });

  // ===================== Trigger: Hover =====================
  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    if (hoverTrigger) {
      triggerOpen(true);
    }
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (hoverTrigger) {
      triggerOpen(false);
    }
  };

  // ===================== Trigger: Click =====================
  const onInternalTriggerButtonClick: FloatButtonGroupProps['onClick'] = (e) => {
    if (clickTrigger) {
      triggerOpen(!open);
    }
    onTriggerButtonClick?.(e);
  };

  React.useEffect(() => {
    if (clickTrigger) {
      const onDocClick = (e: MouseEvent) => {
        // Skip if click on the group
        if (floatButtonGroupRef.current?.contains(e.target as Node)) {
          return;
        }
        triggerOpen(false);
      };
      document.addEventListener('click', onDocClick, { capture: true });
      return () => document.removeEventListener('click', onDocClick, { capture: true });
    }
  }, [clickTrigger]);

  // ======================== Warning =========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('FloatButton.Group');

    warning(
      !('open' in props) || !!trigger,
      'usage',
      '`open` need to be used together with `trigger`',
    );
  }

  // ======================== Contexts ========================
  const individual = shape === 'circle';

  const listContext = React.useMemo<GroupContextProps>(
    () => ({ shape, individual }),
    [shape, individual],
  );

  const triggerContext = React.useMemo<GroupContextProps>(
    () => ({ shape, individual: true }),
    [shape],
  );

  // ========================= Render =========================
  // >>> List
  let listNode: React.ReactNode;
  const listCls = `${groupPrefixCls}-list`;

  const renderList = (motionClassName?: string) => {
    const vertical = mergedPlacement === 'top' || mergedPlacement === 'bottom';
    const listClassName = cls(listCls, classNames.list, motionClassName);

    if (individual) {
      listNode = (
        <Flex vertical={vertical} className={listClassName}>
          {children}
        </Flex>
      );
    } else {
      listNode = (
        <Space.Compact vertical={vertical} className={listClassName}>
          {children}
        </Space.Compact>
      );
    }

    return listNode;
  };

  // >>> Render
  return (
    <GroupContext.Provider value={listContext}>
      <div
        className={cls(groupPrefixCls, hashId, cssVarCls, rootCls, className, {
          [`${groupPrefixCls}-rtl`]: direction === 'rtl',
          [`${groupPrefixCls}-individual`]: individual,
          [`${groupPrefixCls}-${mergedPlacement}`]: isMenuMode,
          [`${groupPrefixCls}-menu-mode`]: isMenuMode,
        })}
        style={{ zIndex, ...style }}
        // ref
        ref={floatButtonGroupRef}
        // Hover trigger
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isMenuMode ? (
          <CSSMotion visible={open} motionName={`${listCls}-motion`}>
            {({ className: motionClassName }) => renderList(motionClassName)}
          </CSSMotion>
        ) : (
          renderList()
        )}

        {/* If is menu mode, we have additional trigger button */}
        {isMenuMode && (
          <GroupContext.Provider value={triggerContext}>
            <FloatButton
              type={type}
              icon={open ? mergedCloseIcon : icon}
              description={description}
              aria-label={props['aria-label']}
              className={cls(`${groupPrefixCls}-trigger`, classNames.trigger)}
              style={styles.trigger}
              onClick={onInternalTriggerButtonClick}
              {...floatButtonProps}
            />
          </GroupContext.Provider>
        )}
      </div>
    </GroupContext.Provider>
  );
};

export default FloatButtonGroup;
