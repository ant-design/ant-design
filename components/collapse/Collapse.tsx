import * as React from 'react';
import RightOutlined from '@ant-design/icons/RightOutlined';
import type { CollapseProps as RcCollapseProps } from '@rc-component/collapse';
import RcCollapse from '@rc-component/collapse';
import type { CSSMotionProps } from '@rc-component/motion';
import { omit, toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type {
  SemanticClassNames,
  SemanticClassNamesType,
  SemanticStyles,
  SemanticStylesType,
} from '../_util/hooks/useMergeSemantic';
import initCollapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import type { CollapsibleType } from './CollapsePanel';
import CollapsePanel from './CollapsePanel';
import useStyle from './style';

export type ExpandIconPlacement = 'start' | 'end';

export type CollapseSemanticName = 'root' | 'header' | 'title' | 'body' | 'icon';

export type CollapseClassNamesType = SemanticClassNamesType<CollapseProps, CollapseSemanticName>;
export type CollapseStylesType = SemanticStylesType<CollapseProps, CollapseSemanticName>;

export interface CollapseProps extends Pick<RcCollapseProps, 'items'> {
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  /** 手风琴效果 */
  accordion?: boolean;
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyInactivePanel?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
  onChange?: (key: string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPlacement?: ExpandIconPlacement;
  /** @deprecated Please use `expandIconPlacement` instead */
  expandIconPosition?: ExpandIconPlacement;
  ghost?: boolean;
  size?: SizeType;
  collapsible?: CollapsibleType;
  /**
   * @deprecated use `items` instead
   */
  children?: React.ReactNode;
  classNames?: CollapseClassNamesType;
  styles?: CollapseStylesType;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
  classNames?: SemanticClassNames<CollapseSemanticName>;
  styles?: SemanticStyles<CollapseSemanticName>;
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  const {
    getPrefixCls,
    direction,
    expandIcon: contextExpandIcon,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('collapse');

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    bordered = true,
    ghost,
    size: customizeSize,
    expandIconPlacement,
    expandIconPosition,
    children,
    destroyInactivePanel,
    destroyOnHidden,
    expandIcon,
    classNames,
    styles,
  } = props;

  const mergedSize = useSize((ctx) => customizeSize ?? ctx ?? 'middle');
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const mergedPlacement = expandIconPlacement ?? expandIconPosition ?? 'start';

  // =========== Merged Props for Semantic ===========
  const mergedProps: CollapseProps = {
    ...props,
    size: mergedSize,
    bordered,
    expandIconPlacement: mergedPlacement,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    CollapseClassNamesType,
    CollapseStylesType,
    CollapseProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const mergedExpandIcon = expandIcon ?? contextExpandIcon;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Collapse');
    [
      ['destroyInactivePanel', 'destroyOnHidden'],
      ['expandIconPosition', 'expandIconPlacement'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const renderExpandIcon = React.useCallback(
    (panelProps: PanelProps = {}) => {
      const icon =
        typeof mergedExpandIcon === 'function' ? (
          mergedExpandIcon(panelProps)
        ) : (
          <RightOutlined
            rotate={panelProps.isActive ? (direction === 'rtl' ? -90 : 90) : undefined}
            aria-label={panelProps.isActive ? 'expanded' : 'collapsed'}
          />
        );
      return cloneElement(icon, () => ({
        className: clsx(
          (icon as React.ReactElement<{ className?: string }>)?.props?.className,
          mergedClassNames.icon,
          `${prefixCls}-arrow`,
        ),
        style: mergedStyles.icon,
      }));
    },
    [mergedExpandIcon, prefixCls, direction],
  );

  const collapseClassName = clsx(
    `${prefixCls}-icon-placement-${mergedPlacement}`,
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
      [`${prefixCls}-${mergedSize}`]: mergedSize !== 'middle',
    },
    contextClassName,
    className,
    rootClassName,
    hashId,
    cssVarCls,
    mergedClassNames.root,
  );

  const openMotion = React.useMemo<CSSMotionProps>(
    () => ({
      ...initCollapseMotion(rootPrefixCls),
      motionAppear: false,
      leavedClassName: `${prefixCls}-content-hidden`,
    }),
    [rootPrefixCls, prefixCls],
  );

  const items = React.useMemo<React.ReactNode[] | null>(() => {
    if (children) {
      return toArray(children).map((child) => child);
    }
    return null;
  }, [children]);

  return (
    // @ts-ignore
    <RcCollapse
      ref={ref}
      openMotion={openMotion}
      {...omit(props, ['rootClassName'])}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClassName}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      classNames={mergedClassNames}
      styles={mergedStyles}
      destroyOnHidden={destroyOnHidden ?? destroyInactivePanel}
    >
      {items}
    </RcCollapse>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Collapse.displayName = 'Collapse';
}

export default Object.assign(Collapse, { Panel: CollapsePanel });
