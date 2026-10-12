import * as React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RcDropdown from '@rc-component/dropdown';
import type { MenuProps as RcMenuProps } from '@rc-component/menu';
import type { AlignType } from '@rc-component/trigger';
import {
  getNodeRef,
  isNonNullable,
  omit,
  pickAttrs,
  useComposeRef,
  useControlledState,
  useEvent,
} from '@rc-component/util';
import { clsx } from 'clsx';

import { useZIndex } from '../_util/hooks';
import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isPlainObject, isPrimitive, isString } from '../_util/is';
import type { AdjustOverflow } from '../_util/placements';
import getPlacements from '../_util/placements';
import genPurePanel from '../_util/PurePanel';
import { cloneElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { MenuProps } from '../menu';
import Menu from '../menu';
import { OverrideProvider } from '../menu/OverrideContext';
import { useToken } from '../theme/internal';
import useStyle from './style';

const _Placements = [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'top',
  'bottom',
  'left',
  'leftTop',
  'leftBottom',
  'right',
  'rightTop',
  'rightBottom',
] as const;

type Placement = (typeof _Placements)[number];

type DropdownPlacement = Exclude<Placement, 'topCenter' | 'bottomCenter'>;

export type DropdownArrowOptions = {
  pointAtCenter?: boolean;
};
export type DropdownSemanticType = {
  classNames?: {
    root?: string;
    item?: string;
    itemTitle?: string;
    itemIcon?: string;
    itemContent?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    item?: React.CSSProperties;
    itemTitle?: React.CSSProperties;
    itemIcon?: React.CSSProperties;
    itemContent?: React.CSSProperties;
  };
};

export type DropdownSemanticAllType = GenerateSemantic<DropdownSemanticType, DropdownProps>;

export interface DropdownProps extends React.AriaAttributes {
  classNames?: DropdownSemanticAllType['classNamesAndFn'];
  styles?: DropdownSemanticAllType['stylesAndFn'];
  menu?: MenuProps & { activeKey?: RcMenuProps['activeKey'] };
  autoFocus?: boolean;
  arrow?: boolean | DropdownArrowOptions;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  /** @deprecated Please use `popupRender` instead */
  dropdownRender?: (originNode: React.ReactNode) => React.ReactNode;
  popupRender?: (originNode: React.ReactNode) => React.ReactNode;
  onOpenChange?: (open: boolean, info: { source: 'trigger' | 'menu' }) => void;
  open?: boolean;
  disabled?: boolean;
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyPopupOnHide?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
  align?: AlignType;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  transitionName?: string;
  placement?: Placement;
  /** @deprecated please use `classNames.root` instead.*/
  overlayClassName?: string;
  /** @deprecated please use `styles.root` instead.*/
  overlayStyle?: React.CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  openClassName?: string;
  children?: React.ReactNode;
  autoAdjustOverflow?: boolean | AdjustOverflow;
}

type CompoundedComponent = React.ForwardRefExoticComponent<
  DropdownProps & React.RefAttributes<HTMLElement>
> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof WrapPurePanel;
};

const Dropdown: CompoundedComponent = React.forwardRef<HTMLElement, DropdownProps>((props, ref) => {
  const {
    menu,
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    dropdownRender,
    popupRender,
    getPopupContainer,
    overlayClassName,
    rootClassName,
    overlayStyle,
    open,
    onOpenChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true,
    placement = '',
    transitionName,
    classNames,
    styles,
    destroyPopupOnHide,
    destroyOnHidden,
  } = props;

  const {
    getPrefixCls,
    direction,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('dropdown');

  const mergedProps: DropdownProps = {
    ...props,
    mouseEnterDelay,
    mouseLeaveDelay,
    autoAdjustOverflow,
  };
  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const overlayStyleRoot = useSemanticRootStyle(overlayStyle);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DropdownSemanticAllType['classNames'],
    DropdownSemanticAllType['styles'],
    DropdownProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, overlayStyleRoot], {
    props: mergedProps,
  });

  const mergedRootStyles: React.CSSProperties = {
    ...mergedStyles.root,
  };

  const mergedPopupRender = popupRender || dropdownRender;

  // =================== Warning =====================
  const warning = devUseWarning('Dropdown');
  if (process.env.NODE_ENV !== 'production') {
    const deprecatedProps = {
      dropdownRender: 'popupRender',
      destroyPopupOnHide: 'destroyOnHidden',
      overlayClassName: 'classNames.root',
      overlayStyle: 'styles.root',
    };

    Object.entries(deprecatedProps).forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });

    if (placement.includes('Center')) {
      warning.deprecated(
        !placement.includes('Center'),
        `placement: ${placement}`,
        `placement: ${placement.slice(0, placement.indexOf('Center'))}`,
      );
    }
  }

  const memoTransitionName = React.useMemo<string>(() => {
    const rootPrefixCls = getPrefixCls();

    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.startsWith('top')) {
      return `${rootPrefixCls}-slide-down`;
    }
    if (placement.startsWith('left')) {
      return `${rootPrefixCls}-slide-right`;
    }
    if (placement.startsWith('right')) {
      return `${rootPrefixCls}-slide-left`;
    }
    return `${rootPrefixCls}-slide-up`;
  }, [getPrefixCls, placement, transitionName]);

  const memoPlacement = React.useMemo<DropdownPlacement>(() => {
    if (!placement) {
      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }

    if (placement.includes('Center')) {
      return placement.slice(0, placement.indexOf('Center')) as DropdownPlacement;
    }

    return placement as DropdownPlacement;
  }, [placement, direction]);

  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const [, token] = useToken();

  const child = React.Children.only(
    isPrimitive(children) ? <span>{children}</span> : children,
  ) as React.ReactElement<React.HTMLAttributes<HTMLElement> & { disabled?: boolean }>;

  const composedRef = useComposeRef(ref, getNodeRef(child));

  // =========================== Open ============================
  const [mergedOpen, setOpen] = useControlledState(false, open);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const keyboardTriggerRef = React.useRef(false);

  React.useEffect(() => {
    if (!mergedOpen) {
      setKeyboardOpen(false);
    }
  }, [mergedOpen]);

  const triggerAriaProps: React.AriaAttributes & { role?: React.AriaRole } = {
    ...pickAttrs(props, true),
    ...pickAttrs(child.props, true),
  };
  const isNativeInteractive =
    isString(child.type) &&
    (['button', 'input', 'select', 'textarea'].includes(child.type) ||
      (child.type === 'a' && 'href' in child.props && isNonNullable(child.props.href)));

  if (menu?.items) {
    if (!isNativeInteractive) {
      triggerAriaProps.role ??= 'button';
    }
    triggerAriaProps['aria-haspopup'] ??= 'menu';
    triggerAriaProps['aria-expanded'] = mergedOpen;
  }

  const onInnerOpenChange = useEvent((nextOpen: boolean) => {
    setKeyboardOpen(nextOpen && keyboardTriggerRef.current);
    onOpenChange?.(nextOpen, { source: 'trigger' });
    setOpen(nextOpen);
  });

  const triggerActions = disabled ? [] : trigger;
  const alignPoint = !!triggerActions?.includes('contextMenu');
  const mergedDisabled = child.props.disabled ?? disabled;
  if (menu?.items && !isNativeInteractive) {
    triggerAriaProps['aria-disabled'] ??= disabled || mergedDisabled;
  }
  const onTriggerKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    child.props.onKeyDown?.(event);
    const target = event.target as HTMLElement;
    const isEditableTarget =
      target.isContentEditable ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      (target.tagName === 'INPUT' &&
        !['button', 'submit', 'reset', 'image'].includes(
          target.getAttribute('type')?.toLowerCase() ?? 'text',
        ));
    if (
      menu?.items &&
      !isEditableTarget &&
      !disabled &&
      !mergedDisabled &&
      !event.defaultPrevented &&
      !event.repeat &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      keyboardTriggerRef.current = true;
      try {
        if (triggerActions?.includes('click')) {
          event.currentTarget.click();
        } else {
          onInnerOpenChange(!mergedOpen);
        }
      } finally {
        keyboardTriggerRef.current = false;
      }
    }
  };

  const popupTrigger = cloneElement(child, {
    ...triggerAriaProps,
    className: clsx(
      `${prefixCls}-trigger`,
      { [`${prefixCls}-rtl`]: direction === 'rtl' },
      child.props.className,
    ),
    disabled: mergedDisabled,
    tabIndex: child.props.tabIndex ?? (menu?.items ? (mergedDisabled ? -1 : 0) : undefined),
    onKeyDown: onTriggerKeyDown,
    ref: composedRef,
  });
  // =========================== Overlay ============================
  const overlayClassNameCustomized = clsx(
    overlayClassName,
    rootClassName,
    hashId,
    cssVarCls,
    rootCls,
    contextClassName,
    mergedClassNames.root,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: isPlainObject(arrow) && arrow.pointAtCenter,
    autoAdjustOverflow,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius,
  });

  const onMenuClick = useEvent(() => {
    if (menu?.selectable && menu?.multiple) {
      return;
    }
    onOpenChange?.(false, { source: 'menu' });
    setOpen(false);
  });

  const renderOverlay = () => {
    // @rc-component/dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to @rc-component/dropdown.
    const menuClassNames = omit(mergedClassNames, ['root']);
    const menuStyles = omit(mergedStyles, ['root']);
    let overlayNode: React.ReactNode;
    if (menu?.items) {
      overlayNode = (
        <Menu
          {...menu}
          classNames={{
            ...menuClassNames,
            subMenu: {
              ...menuClassNames,
            },
          }}
          styles={{
            ...menuStyles,
            subMenu: {
              ...menuStyles,
            },
          }}
        />
      );
    }
    if (mergedPopupRender) {
      overlayNode = mergedPopupRender(overlayNode);
    }
    if (isString(overlayNode)) {
      overlayNode = <span>{overlayNode}</span>;
    } else if (!React.isValidElement(overlayNode)) {
      overlayNode = <>{overlayNode}</>;
    }
    return (
      <OverrideProvider
        prefixCls={`${prefixCls}-menu`}
        rootClassName={clsx(cssVarCls, rootCls)}
        expandIcon={
          <span className={`${prefixCls}-menu-submenu-arrow`}>
            {direction === 'rtl' ? (
              <LeftOutlined className={`${prefixCls}-menu-submenu-arrow-icon`} />
            ) : (
              <RightOutlined className={`${prefixCls}-menu-submenu-arrow-icon`} />
            )}
          </span>
        }
        mode="vertical"
        selectable={false}
        onClick={onMenuClick}
        validator={({ mode }) => {
          // Warning if use other mode
          warning(
            !mode || mode === 'vertical',
            'usage',
            `mode="${mode}" is not supported for Dropdown's Menu.`,
          );
        }}
      >
        {overlayNode}
      </OverrideProvider>
    );
  };

  // =========================== zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Dropdown', mergedRootStyles.zIndex as number);

  // ============================ Render ============================
  let renderNode = (
    <RcDropdown
      alignPoint={alignPoint}
      {...omit(props, ['rootClassName', 'onOpenChange'])}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      visible={mergedOpen}
      builtinPlacements={builtinPlacements}
      arrow={!!arrow}
      overlayClassName={overlayClassNameCustomized}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      transitionName={memoTransitionName}
      trigger={triggerActions}
      autoFocus={props.autoFocus ?? keyboardOpen}
      overlay={renderOverlay}
      placement={memoPlacement as React.ComponentProps<typeof RcDropdown>['placement']}
      onVisibleChange={onInnerOpenChange}
      overlayStyle={{ ...mergedRootStyles, zIndex }}
      autoDestroy={destroyOnHidden ?? destroyPopupOnHide}
    >
      {popupTrigger}
    </RcDropdown>
  );

  if (zIndex) {
    renderNode = (
      <zIndexContext.Provider value={contextZIndex}>{renderNode}</zIndexContext.Provider>
    );
  }

  return renderNode;
}) as CompoundedComponent;

// We don't care debug panel
const PurePanel = genPurePanel(Dropdown, 'align', undefined, 'dropdown', (prefixCls) => prefixCls);

/* istanbul ignore next */
const WrapPurePanel: React.FC<DropdownProps> = (props) => (
  <PurePanel {...props}>
    <span aria-hidden tabIndex={-1} />
  </PurePanel>
);

Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;

if (process.env.NODE_ENV !== 'production') {
  Dropdown.displayName = 'Dropdown';
}

export default Dropdown;
