import * as React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';
import classNames from 'classnames';
import type { CollapseProps as RcCollapseProps } from 'rc-collapse';
import RcCollapse from 'rc-collapse';
import type { CSSMotionProps } from 'rc-motion';
import toArray from 'rc-util/lib/Children/toArray';
import omit from 'rc-util/lib/omit';

import initCollapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import type { CollapsibleType } from './CollapsePanel';
import CollapsePanel from './CollapsePanel';
import useStyle from './style';

/** @deprecated Please use `start` | `end` instead */
type ExpandIconPositionLegacy = 'left' | 'right';
export type ExpandIconPosition = 'start' | 'end' | ExpandIconPositionLegacy | undefined;

export interface CollapseProps extends Pick<RcCollapseProps, 'items'> {
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  /** 手风琴效果 */
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPosition?: ExpandIconPosition;
  ghost?: boolean;
  size?: SizeType;
  collapsible?: CollapsibleType;
  /**
   * @deprecated use `items` instead
   */
  children?: React.ReactNode;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  const { getPrefixCls, direction, collapse } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPosition = 'start',
    children,
    expandIcon,
  } = props;

  const mergedSize = useSize((ctx) => customizeSize ?? ctx ?? 'middle');
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Collapse');

    // Warning if use legacy type `expandIconPosition`
    warning(
      expandIconPosition !== 'left' && expandIconPosition !== 'right',
      'deprecated',
      '`expandIconPosition` with `left` or `right` is deprecated. Please use `start` or `end` instead.',
    );
  }

  // Align with logic position
  const mergedExpandIconPosition = React.useMemo(() => {
    if (expandIconPosition === 'left') {
      return 'start';
    }
    return expandIconPosition === 'right' ? 'end' : expandIconPosition;
  }, [expandIconPosition]);

  const renderExpandIcon = (panelProps: PanelProps = {}) => {
    const icon = (
      expandIcon ? (
        expandIcon(panelProps)
      ) : (
        <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />
      )
    ) as React.ReactNode;

    return cloneElement(icon, () => ({
      className: classNames(
        (icon as React.ReactElement<any>).props.className,
        `${prefixCls}-arrow`,
      ),
    }));
  };

  const collapseClassName = classNames(
    `${prefixCls}-icon-position-${mergedExpandIconPosition}`,
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
      [`${prefixCls}-${mergedSize}`]: mergedSize !== 'middle',
    },
    collapse?.className,
    className,
    rootClassName,
    hashId,
  );
  const openMotion: CSSMotionProps = {
    ...initCollapseMotion(rootPrefixCls),
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`,
  };

  const items = React.useMemo<React.ReactNode[] | null>(
    () =>
      children
        ? toArray(children).map<React.ReactNode>((child, index) => {
            if (child.props?.disabled) {
              const key = child.key ?? String(index);
              const { disabled, collapsible } = child.props;
              const childProps: Omit<CollapseProps, 'items'> & { key: React.Key } = {
                ...omit(child.props, ['disabled']),
                key,
                collapsible: collapsible ?? (disabled ? 'disabled' : undefined),
              };
              return cloneElement(child, childProps);
            }
            return child;
          })
        : null,
    [children],
  );

  return wrapSSR(
    <RcCollapse
      ref={ref}
      openMotion={openMotion}
      {...omit(props, ['rootClassName'])}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClassName}
      style={{ ...collapse?.style, ...style }}
    >
      {items}
    </RcCollapse>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}

export default Object.assign(Collapse, { Panel: CollapsePanel });
