import * as React from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import { RightOutlined } from '@ant-design/icons';

import DropdownButton from './dropdown-button';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import { tuple } from '../_util/type';

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
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactElement | OverlayFunc;
  onVisibleChange?: (visible: boolean) => void;
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

export default class Dropdown extends React.Component<DropDownProps, any> {
  static Button: typeof DropdownButton;

  static defaultProps = {
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
  };

  getTransitionName() {
    const { placement = '', transitionName } = this.props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return 'slide-down';
    }
    return 'slide-up';
  }

  renderOverlay = (prefixCls: string) => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const { overlay } = this.props;

    let overlayNode;
    if (typeof overlay === 'function') {
      overlayNode = (overlay as OverlayFunc)();
    } else {
      overlayNode = overlay;
    }
    overlayNode = React.Children.only(overlayNode) as React.ReactElement<any>;

    const overlayProps = overlayNode.props;

    // Warning if use other mode
    warning(
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
        ? overlay
        : React.cloneElement(overlayNode, {
            mode: 'vertical',
            selectable,
            focusable,
            expandIcon,
          });

    return fixedModeOverlay as React.ReactElement;
  };

  getPlacement(direction: string = 'ltr') {
    const { placement } = this.props;
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? ('bottomRight' as Placement) : ('bottomLeft' as Placement);
  }

  renderDropDown = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      children,
      trigger,
      disabled,
      getPopupContainer,
      overlayClassName,
    } = this.props;

    const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
    const child = React.Children.only(children) as React.ReactElement<any>;

    const dropdownTrigger = React.cloneElement(child, {
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
        alignPoint={alignPoint}
        {...this.props}
        overlayClassName={overlayClassNameCustomized}
        prefixCls={prefixCls}
        getPopupContainer={getPopupContainer || getContextPopupContainer}
        transitionName={this.getTransitionName()}
        trigger={triggerActions}
        overlay={() => this.renderOverlay(prefixCls)}
        placement={this.getPlacement(direction)}
      >
        {dropdownTrigger}
      </RcDropdown>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderDropDown}</ConfigConsumer>;
  }
}
