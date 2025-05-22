import * as React from 'react';
import { UnstableContext } from '@rc-component/steps';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { GetProps, LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Steps from '../steps';
import type { StepsProps } from '../steps';
import { BlockContext } from '../steps/context';
// CSSINJS
import useStyle from './style';
import type { TimelineItemProps } from './TimelineItem';
import TimelineItem from './TimelineItem';
import TimelineItemList from './TimelineItemList';
import useItems from './useItems';

// export type SemanticName = 'root' | 'indicator' | 'tail' | 'content' | 'item' | 'label';

type Color = 'blue' | 'red' | 'green' | 'gray';

export interface TimelineItemType {
  // Style
  color?: LiteralUnion<Color>;
  style?: React.CSSProperties;
  className?: string;

  // Data
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

  // key?: React.Key;
  // prefixCls?: string;

  // pending?: boolean;
  // position?: string;

  // classNames?: Partial<Record<SemanticName, string>>;
  // styles?: Partial<Record<SemanticName, React.CSSProperties>>;
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
  mode?: 'left' | 'alternate' | 'right' | 'start' | 'end';

  // Data
  items?: TimelineItemType[];
  children?: React.ReactNode;

  /** @deprecated Please add pending item in `items` directly */
  pending?: React.ReactNode;
  /** @deprecated Please add pending item in `items` directly */
  pendingDot?: React.ReactNode;
  reverse?: boolean;

  // classNames?: Partial<Record<SemanticName, string>>;
  // styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

type CompoundedComponent = React.FC<TimelineProps> & {
  // Item: React.FC<TimelineItemProps>;
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

  // ===================== Data =======================
  const rawItems: TimelineItemType[] = useItems(prefixCls, items, children, pending, pendingDot);

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
    return modeList.includes(mode) ? mode : 'start';
  }, [mode]);

  const layoutAlternate = React.useMemo(
    () => mergedMode === 'alternate' || mergedItems.some((item) => item.title),
    [mergedItems, mergedMode],
  );

  // ===================== Warn =======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Timeline');

    // Pending
    const pendingWarning = 'You can create a `item` as pending node directly.';
    warning.deprecated(!pending, 'pending', 'items', pendingWarning);
    warning.deprecated(!pendingDot, 'pendingDot', 'items', pendingWarning);

    // Mode
    warning.deprecated(mode !== 'left' && mode !== 'right', 'mode=left|right', 'mode=start|end');
  }

  // ==================== Render ======================
  return (
    <BlockContext.Provider value>
      <UnstableContext.Provider value={stepContext}>
        <Steps
          // Style
          className={cls(
            prefixCls,
            contextClassName,
            className,
            hashId,
            cssVarCls,
            `${prefixCls}-mode-${mergedMode}`,
            {
              [`${prefixCls}-layout-alternate`]: layoutAlternate,
              [`${prefixCls}-rtl`]: direction === 'rtl',
            },
          )}
          classNames={mergedClassNames}
          styles={mergedStyles}
          // Design
          variant={variant}
          orientation="vertical"
          // Layout
          type="dot"
          items={mergedItems}
          current={mergedItems.length - 1}
        />
      </UnstableContext.Provider>
    </BlockContext.Provider>
  );

  // // =================== Warning =====================
  // if (process.env.NODE_ENV !== 'production') {
  //   const warning = devUseWarning('Timeline');

  //   warning.deprecated(!children, 'Timeline.Item', 'items');
  // }

  // // Style

  // const mergedItems: TimelineItemProps[] = useItems(items, children);

  // return (
  //   <TimelineItemList
  //     classNames={{
  //       root: classNames(
  //         contextClassName,
  //         className,
  //         cssVarCls,
  //         rootCls,
  //         contextClassNames.root,
  //         timelineClassNames?.root,
  //       ),
  //       tail: classNames(contextClassNames.tail, timelineClassNames?.tail),
  //       indicator: classNames(contextClassNames.indicator, timelineClassNames?.indicator),
  //       label: classNames(contextClassNames.label, timelineClassNames?.label),
  //       content: classNames(contextClassNames.content, timelineClassNames?.content),
  //       item: classNames(contextClassNames.item, timelineClassNames?.item),
  //     }}
  //     styles={{
  //       root: { ...contextStyles.root, ...styles?.root, ...contextStyle, ...style },
  //       tail: { ...contextStyles.tail, ...styles?.tail },
  //       indicator: { ...contextStyles.indicator, ...styles?.indicator },
  //       label: { ...contextStyles.label, ...styles?.label },
  //       content: { ...contextStyles.content, ...styles?.content },
  //       item: { ...contextStyles.item, ...styles?.item },
  //     }}
  //     {...restProps}
  //     prefixCls={prefixCls}
  //     direction={direction}
  //     items={mergedItems}
  //     hashId={hashId}
  //   />
  // );
};

export default Timeline;
