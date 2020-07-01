import * as React from 'react';

import { ProgressGradient, ProgressProps, StringGradients } from './progress';

import { validProgress } from './utils';

interface LineProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
}

/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */
export const sortGradient = (gradients: StringGradients) => {
  let tempArr: any[] = [];
  Object.keys(gradients).forEach(key => {
    const formattedKey = parseFloat(key.replace(/%/g, ''));
    if (!isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key],
      });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ');
};

/**
 * {
 *   '0%': '#afc163',
 *   '25%': '#66FF00',
 *   '50%': '#00CC00',     ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *   '75%': '#009900',              #00CC00 50%, #009900 75%, #ffffff 100%)
 *   '100%': '#ffffff'
 * }
 *
 * Then this man came to realize the truth:
 * Besides six pence, there is the moon.
 * Besides bread and butter, there is the bug.
 * And...
 * Besides women, there is the code.
 */
export const handleGradient = (strokeColor: ProgressGradient) => {
  const { from = '#1890ff', to = '#1890ff', direction = 'to right', ...rest } = strokeColor;
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients);
    return { backgroundImage: `linear-gradient(${direction}, ${sortedGradients})` };
  }
  return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
};

const Line: React.FC<LineProps> = props => {
  const {
    prefixCls,
    percent,
    strokeWidth,
    size,
    strokeColor,
    strokeLinecap,
    children,
    trailColor,
    success,
  } = props;

  let backgroundProps;
  if (strokeColor && typeof strokeColor !== 'string') {
    backgroundProps = handleGradient(strokeColor);
  } else {
    backgroundProps = {
      background: strokeColor,
    };
  }

  let trailStyle;
  if (trailColor && typeof trailColor === 'string') {
    trailStyle = {
      backgroundColor: trailColor,
    };
  }

  let successColor;
  if (success && 'strokeColor' in success) {
    successColor = success.strokeColor;
  }

  let successStyle;
  if (successColor && typeof successColor === 'string') {
    successStyle = {
      backgroundColor: successColor,
    };
  }
  const percentStyle = {
    width: `${validProgress(percent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '',
    ...backgroundProps,
  };

  let { successPercent } = props;
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    successPercent = success.progress;
  }

  if (success && 'percent' in success) {
    successPercent = success.percent;
  }

  let successPercentStyle = {
    width: `${validProgress(successPercent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '',
  };
  if (successStyle) {
    successPercentStyle = { ...successPercentStyle, ...successStyle };
  }
  const successSegment =
    successPercent !== undefined ? (
      <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
    ) : null;
  return (
    <>
      <div className={`${prefixCls}-outer`}>
        <div className={`${prefixCls}-inner`} style={trailStyle}>
          <div className={`${prefixCls}-bg`} style={percentStyle} />
          {successSegment}
        </div>
      </div>
      {children}
    </>
  );
};

export default Line;
