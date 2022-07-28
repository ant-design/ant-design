import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import RcDropdown from 'rc-dropdown';
import useEvent from 'rc-util/lib/hooks/useEvent';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { OverrideProvider } from '../menu/OverrideContext';
import getPlacements from '../_util/placements';
import { cloneElement } from '../_util/reactNode';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import DropdownButton from './dropdown-button';

const Placements = tuple(
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'top',
  'bottom',
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

export type DropdownArrowOptions = {
  pointAtCenter?: boolean;
};

export interface DropdownProps {
  autoFocus?: boolean;
  arrow?: boolean | DropdownArrowOptions;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlay: React.ReactElement | OverlayFunc;
  onVisibleChange?: (visible: boolean) => void;
  visible?: boolean;
  disabled?: boolean;
  destroyPopupOnHide?: boolean;
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
  children?: React.ReactNode;
}

interface DropdownInterface extends React.FC<DropdownProps> {
  Button: typeof DropdownButton;
}

const Dropdown: DropdownInterface = props => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  } = React.useContext(ConfigContext);

  const getTransitionName = () => {
    const rootPrefixCls = getPrefixCls();
    const { placement = '', transitionName } = props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.indexOf('top') >= 0) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  };

  const getPlacement = () => {
    const { placement } = props;
    if (!placement) {
      return direction === 'rtl' ? ('bottomRight' as Placement) : ('bottomLeft' as Placement);
    }

    if (placement.includes('Center')) {
      const newPlacement = placement.slice(0, placement.indexOf('Center'));
      warning(
        !placement.includes('Center'),
        'Dropdown',
        `You are using '${placement}' placement in Dropdown, which is deprecated. Try to use '${newPlacement}' instead.`,
      );
      return newPlacement;
    }

    return placement;
  };

  const {
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    getPopupContainer,
    overlayClassName,
    visible,
    onVisibleChange,
  } = props;

  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
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
  let alignPoint;
  if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
    alignPoint = true;
  }

  // =========================== Visible ============================
  const [mergedVisible, setVisible] = useMergedState(false, {
    value: visible,
  });

  const onInnerVisibleChange = useEvent((nextVisible: boolean) => {
    onVisibleChange?.(nextVisible);
    setVisible(nextVisible);
  });

  // =========================== Overlay ============================
  const overlayClassNameCustomized = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow: true,
  });

  const onMenuClick = React.useCallback(() => {
    setVisible(false);
  }, []);

  const renderOverlay = () => {
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
            'Dropdown',
            `mode="${mode}" is not supported for Dropdown's Menu.`,
          );
        }}
      >
        {overlayNode}
      </OverrideProvider>
    );
  };

  // ============================ Render ============================
  return (
    <RcDropdown
      alignPoint={alignPoint}
      {...props}
      visible={mergedVisible}
      builtinPlacements={builtinPlacements}
      arrow={!!arrow}
      overlayClassName={overlayClassNameCustomized}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer || getContextPopupContainer}
      transitionName={getTransitionName()}
      trigger={triggerActions}
      overlay={renderOverlay}
      placement={getPlacement()}
      onVisibleChange={onInnerVisibleChange}
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
