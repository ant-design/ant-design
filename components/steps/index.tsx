import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { StepsProps as RcStepsProps } from '@rc-component/steps';
import RcSteps from '@rc-component/steps';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isFunction, isNumber } from '../_util/is';
import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { TARGET_CLS } from '../_util/wave/interface';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { genCssVar } from '../theme/util/genStyleUtils';
import Tooltip from '../tooltip';
import { InternalContext } from './context';
import PanelArrow from './PanelArrow';
import ProgressIcon from './ProgressIcon';
import useStyle from './style';

type RcIconRenderTypeInfo = Parameters<NonNullable<RcStepsProps['iconRender']>>[1];

export type IconRenderType = (
  oriNode: React.ReactNode,
  info: Pick<RcIconRenderTypeInfo, 'index' | 'active' | 'item' | 'components'>,
) => React.ReactNode;

export type StepsSemanticType = {
  classNames?: {
    root?: string;
    item?: string;
    itemWrapper?: string;
    itemIcon?: string;
    itemSection?: string;
    itemHeader?: string;
    itemTitle?: string;
    itemSubtitle?: string;
    itemContent?: string;
    itemRail?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    item?: React.CSSProperties;
    itemWrapper?: React.CSSProperties;
    itemIcon?: React.CSSProperties;
    itemSection?: React.CSSProperties;
    itemHeader?: React.CSSProperties;
    itemTitle?: React.CSSProperties;
    itemSubtitle?: React.CSSProperties;
    itemContent?: React.CSSProperties;
    itemRail?: React.CSSProperties;
  };
};

export type StepsSemanticAllType = GenerateSemantic<StepsSemanticType, StepsProps>;

interface StepItem {
  className?: string;
  style?: React.CSSProperties;
  classNames?: GetProp<RcStepsProps, 'items'>[number]['classNames'];
  styles?: GetProp<RcStepsProps, 'items'>[number]['styles'];

  /** @deprecated Please use `content` instead */
  description?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
}

export type ProgressDotRender = (
  iconDot: React.ReactNode,
  info: {
    index: number;
    status: NonNullable<RcStepsProps['status']>;
    title: React.ReactNode;
    /** @deprecated Please use `content` instead. */
    description: React.ReactNode;
    content: React.ReactNode;
  },
) => React.ReactNode;

export interface BaseStepsProps {
  // Style
  className?: string;
  rootClassName?: string;
  classNames?: StepsSemanticAllType['classNamesAndFn'];
  styles?: StepsSemanticAllType['stylesAndFn'];
  variant?: 'filled' | 'outlined';
  /**
   * Note: `default` is deprecated and will be removed in v7, please use `medium` instead.
   */
  size?: Exclude<SizeType, 'large'> | 'default';
  // Layout
  type?: 'default' | 'navigation' | 'inline' | 'panel' | 'dot';
  /** @deprecated Please use `orientation` instead. */
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
  /** @deprecated Please use `titlePlacement` instead. */
  labelPlacement?: 'horizontal' | 'vertical';
  titlePlacement?: 'horizontal' | 'vertical';
  /** @deprecated Please use `type` and `iconRender` instead. */
  progressDot?: boolean | ProgressDotRender;
  responsive?: boolean;
  ellipsis?: boolean;
  /**
   * Maximum number of step items to display (`>= 3`).
   * Hidden step ranges are collapsed into disabled ellipsis steps.
   */
  maxCount?: number;
  /**
   * Set offset cell, only work when `type` is `inline`.
   */
  offset?: number;

  // Data
  current?: number;
  initial?: number;
  items?: StepItem[];
  percent?: number;
  status?: 'wait' | 'process' | 'finish' | 'error';

  // Render
  iconRender?: IconRenderType;

  // Events
  onChange?: (current: number) => void;
}

export interface StepsProps extends BaseStepsProps {
  prefixCls?: string;
  style?: React.CSSProperties;
}

const waveEffectClassNames: StepsProps['classNames'] = {
  itemIcon: TARGET_CLS,
};

const ELLIPSIS_TEXT = '...';

type DisplayStep = {
  item: StepItem;
  originIndex: number;
};

function getRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getTokenCount(total: number, start: number, end: number): number {
  const middleLen = start <= end ? end - start + 1 : 0;
  const hasLeftGap = middleLen > 0 ? start > 1 : total > 2;
  const hasRightGap = middleLen > 0 ? end < total - 2 : false;

  return 2 + middleLen + Number(hasLeftGap) + Number(hasRightGap);
}

function getCollapsedIndexes(
  total: number,
  currentIndex: number,
  maxCount: number,
): Array<number | null> {
  const safeCurrent = Math.min(Math.max(currentIndex, 0), total - 1);

  const pivot = Math.min(Math.max(safeCurrent, 1), total - 2);
  let start = pivot;
  let end = pivot;

  while (true) {
    const candidates: Array<{ start: number; end: number; distance: number }> = [];

    if (start > 1) {
      const nextStart = start - 1;
      if (getTokenCount(total, nextStart, end) <= maxCount) {
        candidates.push({
          start: nextStart,
          end,
          distance: Math.abs(safeCurrent - nextStart),
        });
      }
    }

    if (end < total - 2) {
      const nextEnd = end + 1;
      if (getTokenCount(total, start, nextEnd) <= maxCount) {
        candidates.push({
          start,
          end: nextEnd,
          distance: Math.abs(nextEnd - safeCurrent),
        });
      }
    }

    if (!candidates.length) {
      break;
    }

    candidates.sort((a, b) => a.distance - b.distance);
    start = candidates[0].start;
    end = candidates[0].end;
  }

  if (getTokenCount(total, start, end) > maxCount) {
    const indexes = Array.from(new Set([0, safeCurrent, total - 1])).sort((a, b) => a - b);
    if (indexes.length < Math.min(maxCount, total) && indexes.length === 2 && total > 2) {
      return [indexes[0], null, indexes[1]];
    }
    return indexes;
  }

  const indexes: Array<number | null> = [0];
  if (start > 1) {
    indexes.push(null);
  }
  indexes.push(...getRange(start, end));
  if (end < total - 2) {
    indexes.push(null);
  }
  indexes.push(total - 1);

  return indexes;
}

const Steps = (props: StepsProps) => {
  const {
    // Style
    size,
    className,
    rootClassName,
    style,
    variant = 'filled',
    type,
    classNames,
    styles,

    // Layout
    direction,
    orientation,
    responsive = true,
    progressDot,
    labelPlacement,
    titlePlacement,
    ellipsis,
    maxCount,
    offset = 0,

    // Data
    items,
    percent,
    current = 0,
    initial = 0,
    onChange,

    // Render
    iconRender,

    // MISC
    ...restProps
  } = props;

  const internalContent = React.useContext(InternalContext);

  const contextContent = useComponentConfig('steps');

  const {
    getPrefixCls,
    direction: rtlDirection,
    className: contextClassName,
    style: contextStyle,
  } = contextContent;

  let contextClassNames: StepsProps['classNames'];
  let contextStyles: StepsProps['styles'];
  let components: RcStepsProps['components'] = {};

  if (internalContent) {
    components = { root: internalContent.rootComponent, item: internalContent.itemComponent };
  } else {
    ({ classNames: contextClassNames, styles: contextStyles } = contextContent);
  }

  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('steps', props.prefixCls);
  const itemIconCls = `${prefixCls}-item-icon`;

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const [varName] = genCssVar(rootPrefixCls, 'cmp-steps');

  // ============================= Size =============================

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Steps');
    warning.deprecated(size !== 'default', 'size="default"', 'size="medium"');
  }

  const mergedSize = useSize(size);

  // ============================= Item =============================
  const mergedItems = React.useMemo(() => (items || []).filter(Boolean), [items]);

  // ============================ Layout ============================
  const { xs } = useBreakpoint(responsive);

  // Type
  const mergedType = React.useMemo(() => {
    if (type && type !== 'default') {
      return type;
    }

    if (progressDot) {
      return 'dot';
    }

    return type;
  }, [progressDot, type]);

  const isInline = mergedType === 'inline';
  const isDot = mergedType === 'dot' || mergedType === 'inline';

  // Progress Dot Render function
  const legacyProgressDotRender = React.useMemo(() => {
    return mergedType === 'dot' && isFunction(progressDot) ? progressDot : undefined;
  }, [mergedType, progressDot]);

  const mergedOrientation = React.useMemo<StepsProps['orientation']>(() => {
    const nextOrientation = orientation || direction;

    if (mergedType === 'panel') {
      return 'horizontal';
    }

    return (responsive && xs) || nextOrientation === 'vertical' ? 'vertical' : 'horizontal';
  }, [orientation, direction, mergedType, responsive, xs]);

  const mergedTitlePlacement = React.useMemo<StepsProps['titlePlacement']>(() => {
    if (isDot || mergedOrientation === 'vertical') {
      return mergedOrientation === 'vertical' ? 'horizontal' : 'vertical';
    }
    if (type === 'navigation') {
      return 'horizontal';
    }

    return titlePlacement || labelPlacement || 'horizontal';
  }, [isDot, labelPlacement, mergedOrientation, titlePlacement, type]);

  // ========================== Percentage ==========================
  const mergedPercent = isInline ? undefined : percent;

  const mergedMaxCount = isNumber(maxCount) ? Math.floor(maxCount) : undefined;
  const canApplyMaxCount =
    isNumber(mergedMaxCount) && mergedMaxCount >= 3 && mergedItems.length > mergedMaxCount;

  const mappedCurrent = current - initial;

  const displaySteps = React.useMemo<DisplayStep[]>(() => {
    if (!canApplyMaxCount || !mergedMaxCount) {
      return mergedItems.map((item, index) => ({ item, originIndex: index }));
    }

    const collapsedIndexes = getCollapsedIndexes(mergedItems.length, mappedCurrent, mergedMaxCount);

    return collapsedIndexes.map((index, collapsedIndex) => {
      if (index === null) {
        const prevIndex = collapsedIndexes[collapsedIndex - 1];
        const nextIndex = collapsedIndexes[collapsedIndex + 1];

        let ellipsisStatus: StepItem['status'] = 'wait';
        if (isNumber(prevIndex) && isNumber(nextIndex)) {
          const hiddenStart = prevIndex + 1;
          const hiddenEnd = nextIndex - 1;

          if (hiddenEnd < mappedCurrent) {
            ellipsisStatus = 'finish';
          } else if (hiddenStart > mappedCurrent) {
            ellipsisStatus = 'wait';
          } else {
            ellipsisStatus = 'process';
          }
        }

        return {
          item: {
            title: '',
            icon: ELLIPSIS_TEXT,
            status: ellipsisStatus,
            disabled: true,
            className: `${prefixCls}-item-ellipsis`,
          },
          originIndex: -1,
        };
      }

      return {
        item: {
          ...mergedItems[index],
        },
        originIndex: index,
      };
    });
  }, [canApplyMaxCount, mappedCurrent, mergedItems, mergedMaxCount, prefixCls]);

  const mappedDisplayCurrent = React.useMemo(() => {
    const displayCurrent = displaySteps.findIndex((step) => step.originIndex === mappedCurrent);
    if (displayCurrent >= 0) {
      return displayCurrent;
    }

    return mappedCurrent;
  }, [displaySteps, mappedCurrent]);

  // =========== Merged Props for Semantic ===========
  const mergedProps: StepsProps = {
    ...props,
    variant,
    size: mergedSize,
    type: mergedType,
    orientation: mergedOrientation,
    titlePlacement: mergedTitlePlacement,
    current,
    initial,
    percent: mergedPercent,
    responsive,
    offset,
    ellipsis,
    maxCount: mergedMaxCount,
  };

  // ============================ Styles ============================
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [waveEffectClassNames, contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
  );

  // ============================= Icon =============================
  const internalIconRender: RcStepsProps['iconRender'] = (_, info) => {
    const {
      item,
      index,
      active,
      components: { Icon: StepIcon },
    } = info;
    const originIndex = displaySteps[index]?.originIndex;
    const mappedIndex =
      originIndex !== undefined && originIndex >= 0 ? initial + originIndex : index;

    const { status, icon } = item;

    let iconContent: React.ReactNode = null;

    if (isDot || icon) {
      iconContent = icon;
    } else {
      switch (status) {
        case 'finish':
          iconContent = <CheckOutlined className={`${itemIconCls}-finish`} />;
          break;
        case 'error':
          iconContent = <CloseOutlined className={`${itemIconCls}-error`} />;
          break;
        default: {
          let numNode = <span className={`${itemIconCls}-number`}>{mappedIndex + 1}</span>;

          if (status === 'process' && mergedPercent !== undefined) {
            numNode = (
              <ProgressIcon
                prefixCls={prefixCls}
                rootPrefixCls={rootPrefixCls}
                percent={mergedPercent}
              >
                {numNode}
              </ProgressIcon>
            );
          }

          iconContent = numNode;
        }
      }
    }

    let iconNode: React.ReactNode = <StepIcon>{iconContent}</StepIcon>;

    // Custom Render Props
    if (iconRender) {
      iconNode = iconRender(iconNode, {
        index: mappedIndex,
        active,
        item,
        components: { Icon: StepIcon },
      });
    } else if (isFunction(legacyProgressDotRender)) {
      iconNode = legacyProgressDotRender(iconNode, {
        index: mappedIndex,
        ...(item as Required<typeof item>),
      });
    }

    return iconNode;
  };

  // ============================ Custom ============================
  const itemRender: RcStepsProps['itemRender'] = (itemNode, itemInfo) => {
    let content = itemNode;

    if (isInline && itemInfo.item.content) {
      content = (
        <Tooltip destroyOnHidden title={itemInfo.item.content}>
          {itemNode}
        </Tooltip>
      );
    }

    return (
      <Wave
        component="Steps"
        disabled={itemInfo.item.disabled || !onChange}
        colorSource={variant === 'filled' ? 'color' : null}
      >
        {content}
      </Wave>
    );
  };

  const itemWrapperRender: RcStepsProps['itemWrapperRender'] =
    mergedType === 'panel'
      ? (itemNode) => {
          return (
            <>
              {itemNode}
              <PanelArrow prefixCls={prefixCls} />
            </>
          );
        }
      : undefined;

  // ============================ Styles ============================
  const mergedStyle: React.CSSProperties = {
    [varName('items-offset')]: `${offset}`,
    ...contextStyle,
    ...style,
  };

  const stepsClassName = clsx(
    contextClassName,
    `${prefixCls}-${variant}`,
    {
      [`${prefixCls}-${mergedType}`]: mergedType !== 'dot' ? mergedType : false,
      [`${prefixCls}-rtl`]: rtlDirection === 'rtl',
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-ellipsis`]: ellipsis,
      [`${prefixCls}-max-count`]: canApplyMaxCount,
      [`${prefixCls}-with-progress`]: mergedPercent !== undefined,
      [`${prefixCls}-small`]: mergedSize === 'small',
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  // =========================== Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Steps');

    warning.deprecated(!labelPlacement, 'labelPlacement', 'titlePlacement');
    warning.deprecated(!progressDot, 'progressDot', 'type="dot"');
    warning.deprecated(!direction, 'direction', 'orientation');
    warning.deprecated(
      mergedItems.every((item) => !item.description),
      'items.description',
      'items.content',
    );
    warning(
      !isNumber(mergedMaxCount) || mergedMaxCount >= 3,
      'usage',
      '`maxCount` should be greater than or equal to 3.',
    );
  }

  const handleDisplayChange = (displayCurrent: number) => {
    const target = displaySteps[displayCurrent];
    if (onChange && target && target.originIndex >= 0) {
      onChange(initial + target.originIndex);
    }
  };

  // ============================ Render ============================
  return (
    <RcSteps
      {...restProps}
      // Style
      prefixCls={prefixCls}
      className={stepsClassName}
      style={mergedStyle}
      classNames={mergedClassNames}
      styles={mergedStyles}
      // Layout
      orientation={mergedOrientation}
      titlePlacement={mergedTitlePlacement}
      components={components}
      // Data
      initial={0}
      current={mappedDisplayCurrent}
      items={displaySteps.map((step) => step.item)}
      onChange={onChange ? handleDisplayChange : undefined}
      // Render
      iconRender={internalIconRender}
      itemRender={itemRender}
      itemWrapperRender={itemWrapperRender}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Steps.displayName = 'Steps';
}

export default Steps;
