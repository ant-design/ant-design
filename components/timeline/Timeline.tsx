import * as React from 'react';
import cls from 'classnames';

import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Steps from '../steps';
import { BlockContext } from '../steps/context';
// CSSINJS
import useStyle from './style';
import type { TimelineItemProps } from './TimelineItem';
import TimelineItem from './TimelineItem';
import TimelineItemList from './TimelineItemList';
import useItems from './useItems';

export type SemanticName = 'root' | 'indicator' | 'tail' | 'content' | 'item' | 'label';

export interface TimelineItemType {
  // Data
  title?: React.ReactNode;
  content?: React.ReactNode;
  /** @deprecated Please use `title` instead */
  label?: React.ReactNode;
  /** @deprecated Please use `content` instead */
  children?: React.ReactNode;

  // key?: React.Key;
  // prefixCls?: string;
  // className?: string;
  // color?: LiteralUnion<Color>;
  // dot?: React.ReactNode;
  // pending?: boolean;
  // position?: string;
  // style?: React.CSSProperties;

  // classNames?: Partial<Record<SemanticName, string>>;
  // styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

export interface TimelineProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  rootClassName?: string;
  // /** 指定最后一个幽灵节点是否存在或内容 */
  // pending?: React.ReactNode;
  // pendingDot?: React.ReactNode;
  // reverse?: boolean;
  // mode?: 'left' | 'alternate' | 'right';
  items?: TimelineItemType[];
  children?: React.ReactNode;
}

type CompoundedComponent = React.FC<TimelineProps> & {
  Item: React.FC<TimelineItemProps>;
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
    children,
    items,
    className,
    style,
    classNames: timelineClassNames,
    styles,
    ...restProps
  } = props;

  // ===================== MISC =======================
  const prefixCls = getPrefixCls('timeline', customizePrefixCls);

  // ===================== Data =======================
  const mergedItems: TimelineItemProps[] = useItems(items, children);

  // ==================== Render ======================
  return (
    <BlockContext.Provider value>
      <Steps
        className={cls(prefixCls, contextClassName, className)}
        type="dot"
        orientation="vertical"
        items={mergedItems}
      />
    </BlockContext.Provider>
  );

  // // =================== Warning =====================
  // if (process.env.NODE_ENV !== 'production') {
  //   const warning = devUseWarning('Timeline');

  //   warning.deprecated(!children, 'Timeline.Item', 'items');
  // }

  // // Style
  // const rootCls = useCSSVarCls(prefixCls);
  // const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

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
