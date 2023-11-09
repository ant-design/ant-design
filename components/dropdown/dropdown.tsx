import * as React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';
import type { AlignType } from '@rc-component/trigger';
import classNames from 'classnames';
import RcDropdown from 'rc-dropdown';
import { useEvent } from 'rc-util';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';

import { useZIndex } from '../_util/hooks/useZIndex';
import type { AdjustOverflow } from '../_util/placements';
import getPlacements from '../_util/placements';
import genPurePanel from '../_util/PurePanel';
import { cloneElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import type { MenuProps } from '../menu';
import Menu from '../menu';
import { OverrideProvider } from '../menu/OverrideContext';
import { useToken } from '../theme/internal';
import useStyle from './style';

const Placements = [
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'top',
  'bottom',
] as const;

type Placement = typeof Placements[number];
type DropdownPlacement = Exclude<Placement, 'topCenter' | 'bottomCenter'>;

type OverlayFunc = () => React.ReactElement;

export type DropdownArrowOptions = {
  pointAtCenter?: boolean;
};

export interface DropdownProps {
  menu?: MenuProps;
  autoFocus?: boolean;
  arrow?: boolean | DropdownArrowOptions;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  dropdownRender?: (originNode: React.ReactNode) => React.ReactNode;
  onOpenChange?: (open: boolean, info: { source: 'trigger' | 'menu' }) => void;
  open?: boolean;
  disabled?: boolean;
  destroyPopupOnHide?: boolean;
  align?: AlignType;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  transitionName?: string;
  placement?: Placement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  openClassName?: string;
  children?: React.ReactNode;
  autoAdjustOverflow?: boolean | AdjustOverflow;

  // Deprecated
  /** @deprecated Please use `menu` instead */
  overlay?: React.ReactElement | OverlayFunc;
  /** @deprecated Please use `open` instead */
  visible?: boolean;
  /** @deprecated Please use `onOpenChange` instead */
  onVisibleChange?: (open: boolean) => void;
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
    getPopupContainer,
    overlayClassName,
    rootClassName,
    overlayStyle,
    open,
    onOpenChange,
    // Deprecated
    visible,
    onVisibleChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true,
    placement = '',
    overlay,
    transitionName,
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    dropdown,
  } = React.useContext(ConfigContext);

  // Warning for deprecated usage
  const warning = devUseWarning('Dropdown');

  if (process.env.NODE_ENV !== 'production') {
    [
      ['visible', 'open'],
      ['onVisibleChange', 'onOpenChange'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });

    warning.deprecated(!('overlay' in props), 'overlay', 'menu');
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

  if (process.env.NODE_ENV !== 'production') {
    if (placement.includes('Center')) {
      const newPlacement = placement.slice(0, placement.indexOf('Center')) as DropdownPlacement;
      warning(
        !placement.includes('Center'),
        'deprecated',
        `You are using '${placement}' placement in Dropdown, which is deprecated. Try to use '${newPlacement}' instead.`,
      );
    }

    [
      ['visible', 'open'],
      ['onVisibleChange', 'onOpenChange'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const [, token] = useToken();

  const child = React.Children.only(children) as React.ReactElement<any>;

  const dropdownTrigger = cloneElement(child, {
    className: classNames(
      `${prefixCls}-trigger`,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      child.props.className,
    ),
    disabled,
  });

  const triggerActions = disabled ? [] : trigger;
  let alignPoint: boolean;
  if (triggerActions && triggerActions.includes('contextMenu')) {
    alignPoint = true;
  }

  // =========================== Open ============================
  const [mergedOpen, setOpen] = useMergedState(false, {
    value: open ?? visible,
  });

  const onInnerOpenChange = useEvent((nextOpen: boolean) => {
    onOpenChange?.(nextOpen, { source: 'trigger' });
    onVisibleChange?.(nextOpen);
    setOpen(nextOpen);
  });

  // =========================== Overlay ============================
  const overlayClassNameCustomized = classNames(
    overlayClassName,
    rootClassName,
    hashId,
    dropdown?.className,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
  );

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius,
  });

  const onMenuClick = React.useCallback(() => {
    if (menu?.selectable && menu?.multiple) {
      return;
    }
    onOpenChange?.(false, { source: 'menu' });
    setOpen(false);
  }, [menu?.selectable, menu?.multiple]);

  const renderOverlay = () => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.

    let overlayNode: React.ReactNode;
    if (menu?.items) {
      overlayNode = <Menu {...menu} />;
    } else if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (dropdownRender) {
      overlayNode = dropdownRender(overlayNode);
    }
    overlayNode = React.Children.only(
      typeof overlayNode === 'string' ? <span>{overlayNode}</span> : overlayNode,
    );

    return (
      <OverrideProvider
        prefixCls={`${prefixCls}-menu`}
        expandIcon={
          <span className={`${prefixCls}-menu-submenu-arrow`}>
            <RightOutlined className={`${prefixCls}-menu-submenu-arrow-icon`} />
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
  const [zIndex, contextZIndex] = useZIndex('Dropdown', overlayStyle?.zIndex as number);

  // ============================ Render ============================
  let renderNode = (
    <RcDropdown
      alignPoint={alignPoint!}
      {...omit(props, ['rootClassName'])}
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
      overlayStyle={{ ...dropdown?.style, ...overlayStyle, zIndex }}
    >
      {dropdownTrigger}
    </RcDropdown>
  );

  if (zIndex) {
    renderNode = (
      <zIndexContext.Provider value={contextZIndex}>{renderNode}</zIndexContext.Provider>
    );
  }

  return wrapSSR(renderNode);
};

function postPureProps(props: DropdownProps) {
  return {
    ...props,
    align: {
      overflow: {
        adjustX: false,
        adjustY: false,
      },
    },
  };
}

// We don't care debug panel
const PurePanel = genPurePanel(Dropdown, 'dropdown', (prefixCls) => prefixCls, postPureProps);

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
