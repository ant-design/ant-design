import * as React from 'react';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import RcSteps from '@rc-component/steps';
import type { StepsProps as RcStepsProps, StepIconRender } from '@rc-component/steps/lib/Steps';
import classNames from 'classnames';

import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import Progress from '../progress';
import Tooltip from '../tooltip';
import useStyle from './style';

export interface StepProps {
  className?: string;
  description?: React.ReactNode;
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
  type?: 'default' | 'navigation' | 'inline';
  className?: string;
  rootClassName?: string;
  current?: number;
  /** @deprecated Please use `orientation` instead. */
  direction?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
  iconPrefix?: string;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  prefixCls?: string;
  progressDot?: boolean | ProgressDotRender;
  responsive?: boolean;
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  style?: React.CSSProperties;
  percent?: number;
  onChange?: (current: number) => void;
  items?: StepProps[];
  ellipsis?: boolean;
}

const Steps = (props: StepsProps) => {
  const {
    // Style
    size,
    className,
    rootClassName,
    style,

    // Layout
    direction,
    orientation,
    responsive = true,
    progressDot,
    labelPlacement,
    ellipsis,

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
  } = useComponentConfig('steps');

  const prefixCls = getPrefixCls('steps', props.prefixCls);
  const itemIconCls = `${prefixCls}-item-icon`;

  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ============================= Size =============================
  const mergedSize = useSize(size);

  // ============================ Layout ============================
  // const { xs } = useBreakpoint(responsive);
  const xs = false;

  const mergedOrientation = React.useMemo<StepsProps['orientation']>(() => {
    const nextOrientation = orientation || direction;

    return (responsive && xs) || nextOrientation === 'vertical' ? 'vertical' : 'horizontal';
  }, [xs, direction]);

  const mergedLabelPlacement = React.useMemo<StepsProps['labelPlacement']>(() => {
    if (progressDot || mergedOrientation === 'vertical') {
      return mergedOrientation === 'vertical' ? 'horizontal' : 'vertical';
    }
    return labelPlacement || 'horizontal';
  }, []);

  // ========================== Percentage ==========================
  const isInline = props.type === 'inline';
  const mergedPercent = isInline ? undefined : percent;

  // ============================= Icon =============================
  const internalIconRender: RcStepsProps['iconRender'] = (info) => {
    const { item, index } = info;

    const { status, icon } = item;

    if (progressDot) {
      let dotNode: React.ReactNode = <span className={`${itemIconCls}-dot`} />;
      if (typeof progressDot === 'function') {
        dotNode = progressDot(dotNode, {
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
      default:
        return <span className={`${itemIconCls}-number`}>{info.index + 1}</span>;
    }
  };

  // ============================= MISC =============================

  // const iconPrefix = getPrefixCls('', props.iconPrefix);
  // const mergedPercent = isInline ? undefined : percent;

  // const icons = {
  //   finish: <CheckOutlined className={`${prefixCls}-finish-icon`} />,
  //   error: <CloseOutlined className={`${prefixCls}-error-icon`} />,
  // };

  // const stepIconRender: StepIconRender = ({ node, status }) => {
  //   if (status === 'process' && mergedPercent !== undefined) {
  //     // currently it's hard-coded, since we can't easily read the actually width of icon
  //     const progressWidth = mergedSize === 'small' ? 32 : 40;
  //     // iconWithProgress
  //     return (
  //       <div className={`${prefixCls}-progress-icon`}>
  //         <Progress
  //           type="circle"
  //           percent={mergedPercent}
  //           size={progressWidth}
  //           strokeWidth={4}
  //           format={() => null}
  //         />
  //         {node}
  //       </div>
  //     );
  //   }
  //   return node;
  // };

  // ============================ Custom ============================
  const itemRender: RcStepsProps['itemRender'] = (itemNode, itemInfo) =>
    itemInfo.item.content ? <Tooltip title={itemInfo.item.content}>{itemNode}</Tooltip> : itemNode;

  // ============================ Styles ============================
  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  const stepsClassName = classNames(
    contextClassName,
    {
      [`${prefixCls}-rtl`]: rtlDirection === 'rtl',
      [`${prefixCls}-dot`]: progressDot,
      [`${prefixCls}-ellipsis`]: ellipsis,
      [`${prefixCls}-with-progress`]: mergedPercent !== undefined,
      [`${prefixCls}-${mergedSize}`]: mergedSize,
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  // ============================ Render ============================
  return (
    <RcSteps
      {...restProps}
      style={mergedStyle}
      current={current}
      items={items}
      iconRender={internalIconRender}
      itemRender={isInline ? itemRender : undefined}
      orientation={mergedOrientation}
      prefixCls={prefixCls}
      className={stepsClassName}
      labelPlacement={mergedLabelPlacement}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Steps.displayName = 'Steps';
}

export default Steps;
