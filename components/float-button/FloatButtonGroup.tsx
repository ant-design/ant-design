import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import CSSMotion from '@rc-component/motion';
import { useControlledState, useEvent } from '@rc-component/util';
import { clsx } from 'clsx';

import type { SemanticType } from '../_util/hooks';
import { useMergeSemantic, useZIndex } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Flex from '../flex';
import Space from '../space';
import { GroupContext } from './context';
import type { GroupContextProps } from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { FloatButtonGroupTrigger, FloatButtonProps } from './FloatButton';
import useStyle from './style';

export type FloatButtonGroupSemanticType = {
  classNames?: {
    root?: string;
    list?: string;
    item?: string;
    itemIcon?: string;
    itemContent?: string;
    trigger?: string;
    triggerIcon?: string;
    triggerContent?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    list?: React.CSSProperties;
    item?: React.CSSProperties;
    itemIcon?: React.CSSProperties;
    itemContent?: React.CSSProperties;
    trigger?: React.CSSProperties;
    triggerIcon?: React.CSSProperties;
    triggerContent?: React.CSSProperties;
  };
};

export type FloatButtonGroupClassNamesType = SemanticType<
  FloatButtonGroupProps,
  FloatButtonGroupSemanticType['classNames']
>;

export type FloatButtonGroupStylesType = SemanticType<
  FloatButtonGroupProps,
  FloatButtonGroupSemanticType['styles']
>;

export interface FloatButtonGroupProps extends Omit<FloatButtonProps, 'classNames' | 'styles'> {
  // Styles
  classNames?: FloatButtonGroupClassNamesType;
  styles?: FloatButtonGroupStylesType;

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
    classNames,
    styles,
    rootClassName,

    shape = 'circle',
    type = 'default',
    placement,
    icon = <FileTextOutlined />,
    closeIcon,
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
    classNames: contextClassNames,
    styles: contextStyles,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('floatButtonGroup');

  const mergedCloseIcon = closeIcon ?? contextCloseIcon ?? <CloseOutlined />;

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const groupPrefixCls = `${prefixCls}-group`;

  const isMenuMode = trigger && ['click', 'hover'].includes(trigger);

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('FloatButton', style?.zIndex as number);

  // ============================= Refs =============================
  const floatButtonGroupRef = React.useRef<HTMLDivElement>(null);

  // ========================== Placement ==========================
  const mergedPlacement = ['top', 'left', 'right', 'bottom'].includes(placement!)
    ? placement
    : 'top';

  // ========================== Open ==========================
  const [open, setOpen] = useControlledState(false, customOpen);

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

  // =========== Merged Props for Semantic ==========
  const mergedProps: FloatButtonGroupProps = {
    ...props,
    shape,
    type,
    placement: mergedPlacement,
  };

  // ============================ Styles ============================
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
  );

  const listContext = React.useMemo<GroupContextProps>(
    () => ({
      shape,
      individual,
      classNames: {
        root: mergedClassNames.item,
        icon: mergedClassNames.itemIcon,
        content: mergedClassNames.itemContent,
      },
      styles: {
        root: mergedStyles.item,
        icon: mergedStyles.itemIcon,
        content: mergedStyles.itemContent,
      },
    }),
    [shape, individual, mergedClassNames, mergedStyles],
  );

  const triggerContext = React.useMemo<GroupContextProps>(
    () => ({
      ...listContext,
      individual: true,
      classNames: {
        root: mergedClassNames.trigger,
        icon: mergedClassNames.triggerIcon,
        content: mergedClassNames.triggerContent,
      },
      styles: {
        root: mergedStyles.trigger,
        icon: mergedStyles.triggerIcon,
        content: mergedStyles.triggerContent,
      },
    }),
    [listContext, mergedClassNames, mergedStyles],
  );

  // ========================= Render =========================
  // >>> List
  let listNode: React.ReactNode;
  const listCls = `${groupPrefixCls}-list`;

  const renderList = (motionClassName?: string) => {
    const vertical = mergedPlacement === 'top' || mergedPlacement === 'bottom';

    const sharedProps = {
      className: clsx(listCls, mergedClassNames.list, motionClassName),
      style: mergedStyles.list,
    };

    if (individual) {
      listNode = (
        <Flex vertical={vertical} {...sharedProps}>
          {children}
        </Flex>
      );
    } else {
      listNode = (
        <Space.Compact vertical={vertical} {...sharedProps}>
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
        className={clsx(
          groupPrefixCls,
          hashId,
          cssVarCls,
          rootCls,
          contextClassName,
          mergedClassNames.root,
          className,
          rootClassName,
          {
            [`${groupPrefixCls}-rtl`]: direction === 'rtl',
            [`${groupPrefixCls}-individual`]: individual,
            [`${groupPrefixCls}-${mergedPlacement}`]: isMenuMode,
            [`${groupPrefixCls}-menu-mode`]: isMenuMode,
          },
        )}
        style={{ ...contextStyle, zIndex, ...mergedStyles.root, ...style }}
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
              aria-label={props['aria-label']}
              className={`${groupPrefixCls}-trigger`}
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
