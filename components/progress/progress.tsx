import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { tuple } from '../_util/type';
import warning from '../_util/warning';
import Circle from './Circle';
import Line from './Line';
import Steps from './Steps';
import { getSuccessPercent, validProgress } from './utils';

const ProgressTypes = tuple('line', 'circle', 'dashboard');
export type ProgressType = typeof ProgressTypes[number];
const ProgressStatuses = tuple('normal', 'exception', 'active', 'success');
export type ProgressSize = 'default' | 'small';
export type StringGradients = { [percentage: string]: string };
type FromToGradients = { from: string; to: string };
export type ProgressGradient = { direction?: string } & (StringGradients | FromToGradients);

export interface SuccessProps {
  percent?: number;
  /** @deprecated Use `percent` instead */
  progress?: number;
  strokeColor?: string;
}

export interface ProgressProps {
  prefixCls?: string;
  className?: string;
  type?: ProgressType;
  percent?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  status?: typeof ProgressStatuses[number];
  showInfo?: boolean;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'square' | 'round';
  strokeColor?: string | string[] | ProgressGradient;
  trailColor?: string;
  width?: number;
  success?: SuccessProps;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: ProgressSize;
  steps?: number;
  /** @deprecated Use `success` instead */
  successPercent?: number;
  children?: React.ReactNode;
}

const Progress: React.FC<ProgressProps> = (props: ProgressProps) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    steps,
    strokeColor,
    percent = 0,
    size = 'default',
    showInfo = true,
    type = 'line',
    ...restProps
  } = props;

  function getPercentNumber() {
    const successPercent = getSuccessPercent(props);
    return parseInt(
      successPercent !== undefined ? successPercent.toString() : percent.toString(),
      10,
    );
  }

  function getProgressStatus() {
    const { status } = props;
    if (ProgressStatuses.indexOf(status!) < 0 && getPercentNumber() >= 100) {
      return 'success';
    }
    return status || 'normal';
  }

  function renderProcessInfo(prefixCls: string, progressStatus: typeof ProgressStatuses[number]) {
    const { format } = props;
    const successPercent = getSuccessPercent(props);
    if (!showInfo) {
      return null;
    }
    let text;
    const textFormatter = format || (percentNumber => `${percentNumber}%`);
    const isLineType = type === 'line';
    if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      text = textFormatter(validProgress(percent), validProgress(successPercent));
    } else if (progressStatus === 'exception') {
      text = isLineType ? <CloseCircleFilled /> : <CloseOutlined />;
    } else if (progressStatus === 'success') {
      text = isLineType ? <CheckCircleFilled /> : <CheckOutlined />;
    }
    return (
      <span className={`${prefixCls}-text`} title={typeof text === 'string' ? text : undefined}>
        {text}
      </span>
    );
  }

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('progress', customizePrefixCls);
  const progressStatus = getProgressStatus();
  const progressInfo = renderProcessInfo(prefixCls, progressStatus);

  warning(
    !('successPercent' in props),
    'Progress',
    '`successPercent` is deprecated. Please use `success.percent` instead.',
  );

  const strokeColorNotArray = Array.isArray(strokeColor) ? strokeColor[0] : strokeColor;
  const strokeColorNotGradient =
    typeof strokeColor === 'string' || Array.isArray(strokeColor) ? strokeColor : undefined;
  let progress;
  // Render progress shape
  if (type === 'line') {
    progress = steps ? (
      <Steps {...props} strokeColor={strokeColorNotGradient} prefixCls={prefixCls} steps={steps}>
        {progressInfo}
      </Steps>
    ) : (
      <Line
        {...props}
        strokeColor={strokeColorNotArray}
        prefixCls={prefixCls}
        direction={direction}
      >
        {progressInfo}
      </Line>
    );
  } else if (type === 'circle' || type === 'dashboard') {
    progress = (
      <Circle
        {...props}
        strokeColor={strokeColorNotArray}
        prefixCls={prefixCls}
        progressStatus={progressStatus}
      >
        {progressInfo}
      </Circle>
    );
  }

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-${(type === 'dashboard' && 'circle') || (steps && 'steps') || type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true,
      [`${prefixCls}-show-info`]: showInfo,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <div
      {...omit(restProps, [
        'status',
        'format',
        'trailColor',
        'strokeWidth',
        'width',
        'gapDegree',
        'gapPosition',
        'strokeLinecap',
        'success',
        'successPercent',
      ])}
      className={classString}
    >
      {progress}
    </div>
  );
};

export default Progress;
