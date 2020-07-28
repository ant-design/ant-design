import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import RightOutlined from '@ant-design/icons/RightOutlined';

import DropdownButton from './dropdown-button';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';
import { tuple } from '../_util/type';
import { cloneElement } from '../_util/reactNode';

const Placements = tuple(
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
);
type Placement = typeof Placements[number];

type OverlayFunc = () => React.ReactElement;

type Align = {
  points?: [string, string];
  offset?: [number, number];
  targetOffset?: [number, number];
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
};

export interface DropDownProps {
  arrow?: boolean;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactElement | OverlayFunc;
  onVisibleChange?: (visible: boolean) => void;
  onClick?: (e: MouseEvent) => void;
  visible?: boolean;
  disabled?: boolean;
  align?: Align;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  className?: string;
  transitionName?: string;
  placement?: Placement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  forceRender?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  openClassName?: string;
}

interface DropdownInterface extends React.FC<DropDownProps> {
  Button: typeof DropdownButton;
}

const Dropdown: DropdownInterface = props => {
  const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction } = React.useContext(
    ConfigContext,
  );

  const getTransitionName = () => {
    const { placement = '', transitionName } = props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  };

  const renderOverlay = (prefixCls: string) => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const { overlay } = props;

    let overlayNode;
    if (typeof overlay === 'function') {
      overlayNode = (overlay as OverlayFunc)();
    } else {
      overlayNode = overlay;
    }
    overlayNode = React.Children.only(
      typeof overlayNode === 'string' ? <span>overlayNode</span> : overlayNode,
    );

    const overlayProps = overlayNode.props;

    // Warning if use other mode
    devWarning(
      !overlayProps.mode || overlayProps.mode === 'vertical',
      'Dropdown',
      `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`,
    );

    // menu cannot be selectable in dropdown defaultly
    // menu should be focusable in dropdown defaultly
    const { selectable = false, focusable = true } = overlayProps;

    const expandIcon = (
      <span className={`${prefixCls}-menu-submenu-arrow`}>
        <RightOutlined className={`${prefixCls}-menu-submenu-arrow-icon`} />
      </span>
    );

    const fixedModeOverlay =
      typeof overlayNode.type === 'string'
        ? overlayNode
        : cloneElement(overlayNode, {
            mode: 'vertical',
            selectable,
            focusable,
            expandIcon,
          });

    return fixedModeOverlay as React.ReactElement;
  };

  const getPlacement = () => {
    const { placement } = props;
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? ('bottomRight' as Placement) : ('bottomLeft' as Placement);
  };

  const {
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    getPopupContainer,
    overlayClassName,
  } = props;

  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const child = React.Children.only(children) as React.ReactElement<any>;

  const dropdownTrigger = cloneElement(child, {
    className: classNames(child.props.className, `${prefixCls}-trigger`, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    }),
    disabled,
  });

  const overlayClassNameCustomized = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  const triggerActions = disabled ? [] : trigger;
  let alignPoint;
  if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
    alignPoint = true;
  }

  return (
    <RcDropdown
      arrow={arrow}
      alignPoint={alignPoint}
      {...props}
      overlayClassName={overlayClassNameCustomized}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      transitionName={getTransitionName()}
      trigger={triggerActions}
      overlay={() => renderOverlay(prefixCls)}
      placement={getPlacement()}
    >
      {dropdownTrigger}
    </RcDropdown>
  );
};

Dropdown.Button = DropdownButton;

Dropdown.defaultProps = {
  mouseEnterDelay: 0.15,
  mouseLeaveDelay: 0.1,
};

export default Dropdown;
