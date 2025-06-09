import * as React from 'react';
import { UnstableContext } from '@rc-component/steps';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { GetProp, GetProps, LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import Steps from '../steps';
import type { StepsProps } from '../steps';
import { InternalContext } from '../steps/context';
import useStyle from './style';
import useItems from './useItems';

const stepInternalContext = {
  rootComponent: 'ol',
  itemComponent: 'li',
};

export type ItemPosition = 'left' | 'right' | 'start' | 'end';

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

export interface TimelineProps {
  // Style
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: StepsProps['classNames'];
  styles?: StepsProps['styles'];
  rootClassName?: string;

  // Design
  variant?: StepsProps['variant'];
  mode?: TimelineMode;
  orientation?: 'horizontal' | 'vertical';

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
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // ==================== Styles ======================
  // This will be duplicated with Steps's hashId & cssVarCls when they have same token
  // But this is safe to keep here since web will do nothing
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const stepsClassNames: StepsProps['classNames'] = React.useMemo(
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

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [stepsClassNames, contextClassNames, classNames],
    [contextStyles, styles],
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
  const rawItems: TimelineItemType[] = useItems(
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

  const stepContext = React.useMemo<GetProps<typeof UnstableContext>>(
    () => ({
      railFollowPrevStatus: reverse,
    }),
    [reverse],
  );

  // ==================== Design ======================
  const layoutAlternate = React.useMemo(
    () =>
      mergedMode === 'alternate' ||
      (orientation === 'vertical' && mergedItems.some((item) => item.title)),
    [mergedItems, mergedMode],
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
      ] as const
    ).forEach(([oldProp, newProp]) => {
      warning.deprecated(
        warnItems.every((item) => !item[oldProp]),
        `items.${oldProp}`,
        `items.${newProp}`,
      );
    });

    warning.deprecated(
      warnItems.every((item) => item.position !== 'left' && item.position !== 'right'),
      `items.position=left|right`,
      `items.position=start|end`,
    );
  }

  // ==================== Render ======================
  return (
    <InternalContext.Provider value={stepInternalContext}>
      <UnstableContext.Provider value={stepContext}>
        <Steps
          {...restProps}
          // Style
          className={cls(
            prefixCls,
            contextClassName,
            className,
            hashId,
            cssVarCls,
            `${prefixCls}-${orientation}`,
            {
              [`${prefixCls}-layout-alternate`]: layoutAlternate,
              [`${prefixCls}-rtl`]: direction === 'rtl',
            },
          )}
          style={{
            ...contextStyle,
            ...style,
          }}
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
