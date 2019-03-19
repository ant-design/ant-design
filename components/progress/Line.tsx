import * as React from 'react';
import { validProgress } from './utils';
import { ProgressProps } from './progress';

interface LineProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
}
// type BackgroundProps = { background?: string } | { backgroundImage?: string };

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
    const { from = '#ccc', to = '#f96', direction = 'to right' } = strokeColor;
    backgroundProps = { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
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
