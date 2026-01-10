import * as React from 'react';
import { UnstableContext } from '@rc-component/steps';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import type { GetProp, GetProps, LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import Steps from '../steps';
import type { StepsProps, StepsSemanticName } from '../steps';
import { InternalContext } from '../steps/context';
import { genCssVar } from '../theme/util/genStyleUtils';
import useStyle from './style';
import useItems from './useItems';

const stepInternalContext = {
  rootComponent: 'ol',
  itemComponent: 'li',
};

export type ItemPosition = 'left' | 'right' | 'start' | 'end';
export type ItemPlacement = 'start' | 'end';

export type TimelineMode = ItemPosition | 'alternate';

type Color = 'blue' | 'red' | 'green' | 'gray';

export interface TimelineItemType {
  // Style
  color?: LiteralUnion<Color>;
  className?: string;
  style?: React.CSSProperties;
  classNames?: GetProp<StepsProps, 'items'>[number]['classNames'];
  styles?: GetProp<StepsProps, 'items'>[number]['styles'];

  // Design
  placement?: ItemPlacement;
  /** @deprecated please use `placement` instead */
  position?: ItemPosition;
  loading?: boolean;

  // Data
  key?: React.Key;
  title?: React.ReactNode;
  content?: React.ReactNode;
  /** @deprecated Please use `title` instead */
  label?: React.ReactNode;
  /** @deprecated Please use `content` instead */
  children?: React.ReactNode;

  // Icon
  icon?: React.ReactNode;
  /** @deprecated Please use `icon` instead */
  dot?: React.ReactNode;
}

export type TimelineClassNamesType = SemanticClassNamesType<TimelineProps, StepsSemanticName>;
export type TimelineStylesType = SemanticStylesType<TimelineProps, StepsSemanticName>;

export interface TimelineProps {
  // Style
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: TimelineClassNamesType;
  styles?: TimelineStylesType;
  rootClassName?: string;

  // Design
  variant?: StepsProps['variant'];
  mode?: TimelineMode;
  orientation?: 'horizontal' | 'vertical';
  titleSpan?: string | number;

  // Data
  items?: TimelineItemType[];
  children?: React.ReactNode;

  /** @deprecated Please add pending item in `items` directly */
  pending?: React.ReactNode;
  /** @deprecated Please add pending item in `items` directly */
  pendingDot?: React.ReactNode;
  reverse?: boolean;
}

type CompoundedComponent = React.FC<TimelineProps> & {
  Item: React.FC<TimelineItemType>;
};

const Timeline: CompoundedComponent = (props) => {
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('timeline');

  const {
    prefixCls: customizePrefixCls,

    // Style
    className,
    style,
    classNames,
    styles,

    // Design
    variant = 'outlined',
    mode,
    orientation = 'vertical',
    titleSpan,

    // Data
    items,
    children,
    reverse,

    // Legacy Pending
    pending,
    pendingDot,

    ...restProps
  } = props;

  // ===================== MISC =======================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // ==================== Styles ======================
  // This will be duplicated with Steps's hashId & cssVarCls when they have same token
  // But this is safe to keep here since web will do nothing
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const [varName] = genCssVar(rootPrefixCls, 'timeline');

  const stepsClassNames = React.useMemo<StepsProps['classNames']>(
    () => ({
      item: `${prefixCls}-item`,
      itemTitle: `${prefixCls}-item-title`,
      itemIcon: `${prefixCls}-item-icon`,
      itemContent: `${prefixCls}-item-content`,
      itemRail: `${prefixCls}-item-rail`,
      itemWrapper: `${prefixCls}-item-wrapper`,
      itemSection: `${prefixCls}-item-section`,
      itemHeader: `${prefixCls}-item-header`,
    }),
    [prefixCls],
  );

  // ===================== Mode =======================
  const mergedMode = React.useMemo(() => {
    // Deprecated
    if (mode === 'left') {
      return 'start';
    }

    if (mode === 'right') {
      return 'end';
    }

    // Fill
    const modeList: (string | undefined)[] = ['alternate', 'start', 'end'];
    return (modeList.includes(mode) ? mode : 'start') as TimelineMode;
  }, [mode]);

  // ===================== Data =======================
  const rawItems = useItems(
    rootPrefixCls,
    prefixCls,
    mergedMode,
    items,
    children,
    pending,
    pendingDot,
  );

  const mergedItems = React.useMemo(
    () => (reverse ? [...rawItems].reverse() : rawItems),
    [reverse, rawItems],
  );

  // =========== Merged Props for Semantic ===========
  const mergedProps: TimelineProps = {
    ...props,
    variant,
    mode: mergedMode,
    orientation,
    items: mergedItems,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TimelineClassNamesType,
    TimelineStylesType,
    TimelineProps
  >([stepsClassNames, contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const stepContext = React.useMemo<GetProps<typeof UnstableContext>>(
    () => ({ railFollowPrevStatus: reverse }),
    [reverse],
  );

  // ==================== Design ======================
  const layoutAlternate = React.useMemo(
    () =>
      mergedMode === 'alternate' ||
      (orientation === 'vertical' && mergedItems.some((item) => item.title)),
    [mergedItems, mergedMode, orientation],
  );

  // ===================== Warn =======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Timeline');

    // Item
    warning.deprecated(!children, 'Timeline.Item', 'items');

    // Pending
    const pendingWarning = 'You can create a `item` as pending node directly.';
    warning.deprecated(!pending, 'pending', 'items', pendingWarning);
    warning.deprecated(!pendingDot, 'pendingDot', 'items', pendingWarning);

    // Mode
    warning.deprecated(mode !== 'left' && mode !== 'right', 'mode=left|right', 'mode=start|end');

    // Item Props
    const warnItems = items || [];

    (
      [
        ['label', 'title'],
        ['children', 'content'],
        ['dot', 'icon'],
        ['position', 'placement'],
      ] as const
    ).forEach(([oldProp, newProp]) => {
      warning.deprecated(
        warnItems.every((item) => !item[oldProp]),
        `items.${oldProp}`,
        `items.${newProp}`,
      );
    });
  }

  // ==================== Render ======================
  const stepStyle: React.CSSProperties = { ...contextStyle, ...style };

  if (titleSpan && mergedMode !== 'alternate') {
    if (typeof titleSpan === 'number') {
      stepStyle[varName('head-span')] = titleSpan;
    } else {
      stepStyle[varName('head-span-ptg')] = titleSpan;
    }
  }

  return (
    <InternalContext.Provider value={stepInternalContext}>
      <UnstableContext.Provider value={stepContext}>
        <Steps
          {...restProps}
          // Style
          className={clsx(prefixCls, contextClassName, className, hashId, cssVarCls, {
            [`${prefixCls}-${orientation}`]: orientation === 'horizontal',
            [`${prefixCls}-layout-alternate`]: layoutAlternate,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          })}
          style={stepStyle}
          classNames={mergedClassNames}
          styles={mergedStyles}
          // Design
          variant={variant}
          orientation={orientation}
          // Layout
          type="dot"
          items={mergedItems}
          current={mergedItems.length - 1}
        />
      </UnstableContext.Provider>
    </InternalContext.Provider>
  );
};

Timeline.Item = (() => {}) as React.FC<TimelineItemType>;

if (process.env.NODE_ENV !== 'production') {
  Timeline.displayName = 'Timeline';
}

export default Timeline;
