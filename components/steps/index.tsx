import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import RcSteps from '@rc-component/steps';
import type { StepsProps as RcStepsProps } from '@rc-component/steps/lib/Steps';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import Tooltip from '../tooltip';
import PanelArrow from './PanelArrow';
import ProgressIcon from './ProgressIcon';
import useStyle from './style';

export interface StepProps {
  className?: string;
  /** @deprecated Please use `content` instead */
  description?: React.ReactNode;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
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

export interface StepsProps {
  // Style
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  rootClassName?: string;
  classNames?: RcStepsProps['classNames'];
  styles?: RcStepsProps['styles'];
  variant?: 'filled' | 'outlined';
  size?: 'default' | 'small';

  // Layout
  type?: 'default' | 'navigation' | 'inline' | 'panel';
  /** @deprecated Please use `orientation` instead. */
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
  labelPlacement?: 'horizontal' | 'vertical';
  progressDot?: boolean | ProgressDotRender;
  responsive?: boolean;
  ellipsis?: boolean;
  /**
   * Set offset cell, only work when `type` is `inline`.
   */
  offset?: number;

  // Data
  current?: number;
  initial?: number;
  items?: StepProps[];
  percent?: number;
  status?: 'wait' | 'process' | 'finish' | 'error';

  // Events
  onChange?: (current: number) => void;
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
    ellipsis,
    offset = 0,

    // Data
    items,
    percent,
    current = 0,

    // MISC
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction: rtlDirection,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('steps');

  const prefixCls = getPrefixCls('steps', props.prefixCls);
  const itemIconCls = `${prefixCls}-item-icon`;

  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ============================= Size =============================
  const mergedSize = useSize(size);

  // ============================= Item =============================
  const mergedItems = React.useMemo(() => (items || []).filter(Boolean), [items]);

  // ============================ Styles ============================
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
  );

  // ============================ Layout ============================
  const { xs } = useBreakpoint(responsive);

  // Type
  const mergedType = React.useMemo(() => {
    return type === 'default' ? null : type;
  }, [type]);

  const isInline = mergedType === 'inline';

  // Progress Dot
  const mergedProgressDot = React.useMemo(() => {
    switch (mergedType) {
      case 'inline':
        return true;
      case 'navigation':
      case 'panel':
        return false;
      default:
        return progressDot;
    }
  }, [progressDot]);

  const mergedOrientation = React.useMemo<StepsProps['orientation']>(() => {
    const nextOrientation = orientation || direction;

    if (mergedType === 'panel') {
      return 'horizontal';
    }

    return (responsive && xs) || nextOrientation === 'vertical' ? 'vertical' : 'horizontal';
  }, [xs, direction]);

  const mergedLabelPlacement = React.useMemo<StepsProps['labelPlacement']>(() => {
    if (mergedProgressDot || mergedOrientation === 'vertical') {
      return mergedOrientation === 'vertical' ? 'horizontal' : 'vertical';
    }
    if (type === 'navigation') {
      return 'horizontal';
    }

    return labelPlacement || 'horizontal';
  }, []);

  // ========================== Percentage ==========================
  const mergedPercent = isInline ? undefined : percent;

  // ============================= Icon =============================
  const internalIconRender: RcStepsProps['iconRender'] = (info) => {
    const { item, index } = info;

    const { status, icon } = item;

    if (mergedProgressDot) {
      let dotNode: React.ReactNode = <span className={`${itemIconCls}-dot`} />;
      if (typeof mergedProgressDot === 'function') {
        dotNode = mergedProgressDot(dotNode, {
          index,
          ...(item as Required<typeof item>),
        });
      }
      return dotNode;
    }

    if (icon) {
      return icon;
    }

    switch (status) {
      case 'finish':
        return <CheckOutlined className={`${itemIconCls}-finish`} />;
      case 'error':
        return <CloseOutlined className={`${itemIconCls}-error`} />;
      default: {
        let iconNode = <span className={`${itemIconCls}-number`}>{info.index + 1}</span>;

        if (status === 'process' && mergedPercent !== undefined) {
          iconNode = (
            <ProgressIcon prefixCls={prefixCls} percent={mergedPercent}>
              {iconNode}
            </ProgressIcon>
          );
        }

        return iconNode;
      }
    }
  };

  // ============================ Custom ============================
  const itemRender: RcStepsProps['itemRender'] = (itemNode, itemInfo) =>
    itemInfo.item.content ? (
      <Tooltip destroyOnHidden title={itemInfo.item.content}>
        {itemNode}
      </Tooltip>
    ) : (
      itemNode
    );

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
    '--steps-items-offset': `${offset}`,
    ...contextStyle,
    ...style,
  };

  const stepsClassName = cls(
    contextClassName,
    `${prefixCls}-${variant}`,
    {
      [`${prefixCls}-${mergedType}`]: mergedType,
      [`${prefixCls}-rtl`]: rtlDirection === 'rtl',
      [`${prefixCls}-dot`]: mergedProgressDot,
      [`${prefixCls}-ellipsis`]: ellipsis,
      [`${prefixCls}-with-progress`]: mergedPercent !== undefined,
      [`${prefixCls}-${mergedSize}`]: mergedSize,
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  // =========================== Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Steps');

    warning.deprecated(!direction, 'direction', 'orientation');
    warning.deprecated(
      mergedItems.every((item) => !item.description),
      'items.description',
      'items.content',
    );
  }

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
      labelPlacement={mergedLabelPlacement}
      // Data
      current={current}
      items={mergedItems}
      // Render
      iconRender={internalIconRender}
      itemRender={isInline ? itemRender : undefined}
      itemWrapperRender={itemWrapperRender}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Steps.displayName = 'Steps';
}

export default Steps;
