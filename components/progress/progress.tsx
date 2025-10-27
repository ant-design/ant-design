import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks';
import type {
  SemanticClassNames,
  SemanticClassNamesType,
  SemanticStyles,
  SemanticStylesType,
} from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import Circle from './Circle';
import Line from './Line';
import Steps from './Steps';
import useStyle from './style';
import { getSize, getSuccessPercent, validProgress } from './utils';

export type SemanticName = 'root' | 'body' | 'rail' | 'track' | 'indicator';

export type ProgressClassNamesType = SemanticClassNamesType<ProgressProps, SemanticName>;

export type ProgressStylesType = SemanticStylesType<ProgressProps, SemanticName>;

export const ProgressTypes = ['line', 'circle', 'dashboard'] as const;
export type ProgressType = (typeof ProgressTypes)[number];
const ProgressStatuses = ['normal', 'exception', 'active', 'success'] as const;
export type ProgressSize = 'default' | 'small';
export type StringGradients = Record<string, string>;
type FromToGradients = { from: string; to: string };
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients);
export interface PercentPositionType {
  align?: 'start' | 'center' | 'end';
  type?: 'inner' | 'outer';
}

export interface SuccessProps {
  percent?: number;
  strokeColor?: string;
}

export type ProgressAriaProps = Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'>;

export type GapPlacement = 'top' | 'bottom' | 'start' | 'end';
export type GapPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ProgressProps extends ProgressAriaProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  classNames?: ProgressClassNamesType;
  styles?: ProgressStylesType;

  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: (typeof ProgressStatuses)[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | string[] | ProgressGradient;
  /** @deprecated Please use `railColor` instead */
  trailColor?: string;
  railColor?: string;
  /** @deprecated Use `size` instead */
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPlacement?: GapPlacement;
  /** @deprecated please use `gapPlacement` instead */
  gapPosition?: GapPosition;
  size?: number | [number | string, number] | ProgressSize | { width?: number; height?: number };
  steps?: number | { count: number; gap: number };
  percentPosition?: PercentPositionType;
  children?: React.ReactNode;
  rounding?: (step: number) => number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    classNames,
    styles,
    steps,
    strokeColor,
    percent = 0,
    size = 'default',
    showInfo = true,
    type = 'line',
    status,
    format,
    style,
    percentPosition = {},
    ...restProps
  } = props;

  // ========================= MISC =========================
  const { align: infoAlign = 'end', type: infoPosition = 'outer' } = percentPosition;
  const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
  const strokeColorNotGradient =
    typeof strokeColor === 'string' || Array.isArray(strokeColor) ? strokeColor : undefined;
  const strokeColorIsBright = React.useMemo(() => {
    if (strokeColorNotArray) {
      const color =
        typeof strokeColorNotArray === 'string'
          ? strokeColorNotArray
          : Object.values(strokeColorNotArray)[0];
      return new FastColor(color).isLight();
    }
    return false;
  }, [strokeColor]);

  const percentNumber = React.useMemo<number>(() => {
    const successPercent = getSuccessPercent(props);
    return Number.parseInt(
      successPercent !== undefined ? (successPercent ?? 0)?.toString() : (percent ?? 0)?.toString(),
      10,
    );
  }, [percent, props.success]);

  const progressStatus = React.useMemo<(typeof ProgressStatuses)[number]>(() => {
    if (!ProgressStatuses.includes(status!) && percentNumber >= 100) {
      return 'success';
    }
    return status || 'normal';
  }, [status, percentNumber]);

  // ======================= Context ========================
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('progress');

  const prefixCls = getPrefixCls('progress', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedProps: ProgressProps = {
    ...props,
    percent,
    type,
    size,
    showInfo,
    percentPosition,
  };

  // ======================== Styles ========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ProgressClassNamesType,
    ProgressStylesType,
    ProgressProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  // ========================= Info =========================
  const isLineType = type === 'line';
  const isPureLineType = isLineType && !steps;
  const progressInfo = React.useMemo<React.ReactNode>(() => {
    if (!showInfo) {
      return null;
    }
    const successPercent = getSuccessPercent(props);
    let text: React.ReactNode;
    const textFormatter = format || ((number) => `${number}%`);
    const isBrightInnerColor = isLineType && strokeColorIsBright && infoPosition === 'inner';
    if (
      infoPosition === 'inner' ||
      format ||
      (progressStatus !== 'exception' && progressStatus !== 'success')
    ) {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? <CloseCircleFilled /> : <CloseOutlined />;
    } else if (progressStatus === 'success') {
      text = isLineType ? <CheckCircleFilled /> : <CheckOutlined />;
    }

    return (
      <span
        className={clsx(
          `${prefixCls}-indicator`,
          {
            [`${prefixCls}-indicator-bright`]: isBrightInnerColor,
            [`${prefixCls}-indicator-${infoAlign}`]: isPureLineType,
            [`${prefixCls}-indicator-${infoPosition}`]: isPureLineType,
          },
          mergedClassNames.indicator,
        )}
        style={mergedStyles.indicator}
        title={typeof text === 'string' ? text : undefined}
      >
        {text}
      </span>
    );
  }, [showInfo, percent, percentNumber, progressStatus, type, prefixCls, format]);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Progress');
    [
      ['width', 'size'],
      ['trailColor', 'railColor'],
      ['gapPosition', 'gapPlacement'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });

    if (type === 'circle' || type === 'dashboard') {
      if (Array.isArray(size)) {
        warning(
          false,
          'usage',
          'Type "circle" and "dashboard" do not accept array as `size`, please use number or preset size instead.',
        );
      } else if (typeof size === 'object') {
        warning(
          false,
          'usage',
          'Type "circle" and "dashboard" do not accept object as `size`, please use number or preset size instead.',
        );
      }
    }
  }

  // ======================== Render ========================
  const sharedProps = {
    ...props,
    classNames: mergedClassNames as SemanticClassNames<SemanticName>,
    styles: mergedStyles as SemanticStyles<SemanticName>,
  };

  let progress: React.ReactNode;
  // Render progress shape
  if (type === 'line') {
    progress = steps ? (
      <Steps
        {...sharedProps}
        strokeColor={strokeColorNotGradient}
        prefixCls={prefixCls}
        steps={typeof steps === 'object' ? steps.count : steps}
      >
        {progressInfo}
      </Steps>
    ) : (
      <Line
        {...sharedProps}
        strokeColor={strokeColorNotArray}
        prefixCls={prefixCls}
        direction={direction}
        percentPosition={{
          align: infoAlign,
          type: infoPosition,
        }}
      >
        {progressInfo}
      </Line>
    );
  } else if (type === 'circle' || type === 'dashboard') {
    progress = (
      <Circle
        {...sharedProps}
        strokeColor={strokeColorNotArray}
        prefixCls={prefixCls}
        progressStatus={progressStatus}
      >
        {progressInfo}
      </Circle>
    );
  }

  const classString = clsx(
    prefixCls,
    `${prefixCls}-status-${progressStatus}`,
    {
      [`${prefixCls}-${(type === 'dashboard' && 'circle') || type}`]: type !== 'line',
      [`${prefixCls}-inline-circle`]: type === 'circle' && getSize(size, 'circle')[0] <= 20,
      [`${prefixCls}-line`]: isPureLineType,
      [`${prefixCls}-line-align-${infoAlign}`]: isPureLineType,
      [`${prefixCls}-line-position-${infoPosition}`]: isPureLineType,
      [`${prefixCls}-steps`]: steps,
      [`${prefixCls}-show-info`]: showInfo,
      [`${prefixCls}-${size}`]: typeof size === 'string',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    contextClassName,
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
  );

  return (
    <div
      ref={ref}
      style={{ ...contextStyle, ...mergedStyles.root, ...style }}
      className={classString}
      role="progressbar"
      aria-valuenow={percentNumber}
      aria-valuemin={0}
      aria-valuemax={100}
      {...omit(restProps, [
        'railColor',
        'trailColor',
        'strokeWidth',
        'width',
        'gapDegree',
        'gapPosition',
        'gapPlacement',
        'strokeLinecap',
        'success',
      ])}
    >
      {progress}
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Progress.displayName = 'Progress';
}

export default Progress;
