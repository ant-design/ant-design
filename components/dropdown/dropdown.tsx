import * as React from 'react';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RcDropdown from '@rc-component/dropdown';
import type { MenuProps as RcMenuProps } from '@rc-component/menu';
import type { AlignType } from '@rc-component/trigger';
import { omit, useControlledState, useEvent } from '@rc-component/util';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { useZIndex } from '../_util/hooks/useZIndex';
import isPrimitive from '../_util/isPrimitive';
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
] as const;

type Placement = (typeof _Placements)[number];

type DropdownPlacement = Exclude<Placement, 'topCenter' | 'bottomCenter'>;

export type DropdownArrowOptions = {
  pointAtCenter?: boolean;
};

type SemanticName = 'root' | 'item' | 'itemTitle' | 'itemIcon' | 'itemContent';

export type DropdownClassNamesType = SemanticClassNamesType<DropdownProps, SemanticName>;
export type DropdownStylesType = SemanticStylesType<DropdownProps, SemanticName>;
export interface DropdownProps {
  classNames?: DropdownClassNamesType;
  styles?: DropdownStylesType;
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

type CompoundedComponent = React.FC<DropdownProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof WrapPurePanel;
};

const Dropdown: CompoundedComponent = (props) => {
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
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DropdownClassNamesType,
    DropdownStylesType,
    DropdownProps
  >([contextClassNames, classNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  const mergedRootStyles = {
    ...contextStyle,
    ...overlayStyle,
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
    if (placement.includes('top')) {
      return `${rootPrefixCls}-slide-down`;
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
  ) as React.ReactElement<{
    className?: string;
    disabled?: boolean;
  }>;

  const popupTrigger = cloneElement(child, {
    className: clsx(
      `${prefixCls}-trigger`,
      { [`${prefixCls}-rtl`]: direction === 'rtl' },
      child.props.className,
    ),
    disabled: child.props.disabled ?? disabled,
  });
  const triggerActions = disabled ? [] : trigger;
  const alignPoint = !!triggerActions?.includes('contextMenu');

  // =========================== Open ============================
  const [mergedOpen, setOpen] = useControlledState(false, open);

  const onInnerOpenChange = useEvent((nextOpen: boolean) => {
    onOpenChange?.(nextOpen, { source: 'trigger' });
    setOpen(nextOpen);
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
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
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
    overlayNode = React.Children.only(
      typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode,
    );
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
      overlay={renderOverlay}
      placement={memoPlacement}
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
};

// We don't care debug panel
const PurePanel = genPurePanel(Dropdown, 'align', undefined, 'dropdown', (prefixCls) => prefixCls);

/* istanbul ignore next */
const WrapPurePanel: React.FC<DropdownProps> = (props) => (
  <PurePanel {...props}>
    <span />
  </PurePanel>
);

Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;

if (process.env.NODE_ENV !== 'production') {
  Dropdown.displayName = 'Dropdown';
}

export default Dropdown;
