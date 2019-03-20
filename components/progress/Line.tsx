import * as React from 'react';
import { validProgress } from './utils';
import { ProgressProps, ProgressGradient } from './progress';

interface LineProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
}
type StringGradients = { [percent: string]: string };

export const handleGradient = (strokeColor: ProgressGradient) => {
  const { from = '#108ee9', to = '#87d068', direction = 'to right', ...rest } = strokeColor;
  const keys = Object.keys(rest);
  if (keys.length !== 0) {
    let backgroundImage = `linear-gradient(${direction}, `;
    for (const key of keys) {
      const value = (rest as StringGradients)[key];
      backgroundImage += `${value} ${key}, `;
    }
    backgroundImage = backgroundImage.substring(0, backgroundImage.length - 2) + ')';
    return { backgroundImage };
  }
  return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
};

const Line: React.SFC<LineProps> = props => {
  const {
    prefixCls,
    percent,
    successPercent,
    strokeWidth,
    size,
    strokeColor,
    strokeLinecap,
    children,
  } = props;
  let backgroundProps;
  if (strokeColor && typeof strokeColor !== 'string') {
    backgroundProps = handleGradient(strokeColor);
  } else {
    backgroundProps = {
      background: strokeColor,
    };
  }
  const percentStyle = {
    width: `${validProgress(percent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '100px',
    ...backgroundProps,
  };
  const successPercentStyle = {
    width: `${validProgress(successPercent)}%`,
    height: strokeWidth || (size === 'small' ? 6 : 8),
    borderRadius: strokeLinecap === 'square' ? 0 : '100px',
  };
  const successSegment =
    successPercent !== undefined ? (
      <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
    ) : null;
  return (
    <div>
      <div className={`${prefixCls}-outer`}>
        <div className={`${prefixCls}-inner`}>
          <div className={`${prefixCls}-bg`} style={percentStyle} />
          {successSegment}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Line;
