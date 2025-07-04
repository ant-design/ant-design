import * as React from 'react';
import { presetPrimaryColors } from '@ant-design/colors';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import type {
  PercentPositionType,
  ProgressGradient,
  ProgressProps,
  StringGradients,
} from './progress';
import { LineStrokeColorVar, Percent } from './style';
import { getSize, getSuccessPercent, validProgress } from './utils';

interface LineProps extends ProgressProps {
  prefixCls: string;
  direction?: DirectionType;
  strokeColor?: string | ProgressGradient;
  percentPosition: PercentPositionType;
}

/**
 * @example
 *   {
 *     "0%": "#afc163",
 *     "75%": "#009900",
 *     "50%": "green", // ====> '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *     "25%": "#66FF00",
 *     "100%": "#ffffff"
 *   }
 */
export const sortGradient = (gradients: StringGradients) => {
  let tempArr: { key: number; value?: string }[] = [];
  Object.keys(gradients).forEach((key) => {
    const formattedKey = parseFloat(key.replace(/%/g, ''));
    if (!Number.isNaN(formattedKey)) {
      tempArr.push({ key: formattedKey, value: gradients[key] });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ');
};

/**
 * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
 * butter, there is the bug. And... Besides women, there is the code.
 *
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */
export const handleGradient = (
  strokeColor: ProgressGradient,
  directionConfig?: DirectionType,
): React.CSSProperties => {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction = directionConfig === 'rtl' ? 'to left' : 'to right',
    ...rest
  } = strokeColor;
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients);
    const background = `linear-gradient(${direction}, ${sortedGradients})`;
    return { background, [LineStrokeColorVar]: background };
  }
  const background = `linear-gradient(${direction}, ${from}, ${to})`;
  return { background, [LineStrokeColorVar]: background };
};

const Line: React.FC<LineProps> = (props) => {
  const {
    prefixCls,
    direction: directionConfig,
    percent,
    size,
    strokeWidth,
    strokeColor,
    strokeLinecap = 'round',
    children,
    trailColor = null,
    percentPosition,
    success,
  } = props;

  const { align: infoAlign, type: infoPosition } = percentPosition;

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, directionConfig)
      : { [LineStrokeColorVar]: strokeColor, background: strokeColor };

  const borderRadius = strokeLinecap === 'square' || strokeLinecap === 'butt' ? 0 : undefined;

  const mergedSize = size ?? [-1, strokeWidth || (size === 'small' ? 6 : 8)];

  const [width, height] = getSize(mergedSize, 'line', { strokeWidth });

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Progress');

    warning.deprecated(!('strokeWidth' in props), 'strokeWidth', 'size');
  }

  const trailStyle: React.CSSProperties = {
    backgroundColor: trailColor || undefined,
    borderRadius,
  };

  const percentStyle: React.CSSProperties = {
    width: `${validProgress(percent)}%`,
    height,
    borderRadius,
    ...backgroundProps,
    [Percent]: validProgress(percent) / 100,
  };

  const successPercent = getSuccessPercent(props);

  const successPercentStyle: React.CSSProperties = {
    width: `${validProgress(successPercent)}%`,
    height,
    borderRadius,
    backgroundColor: success?.strokeColor,
  };

  const outerStyle: React.CSSProperties = {
    width: width < 0 ? '100%' : width,
  };

  const lineInner = (
    <div className={`${prefixCls}-inner`} style={trailStyle}>
      <div
        className={classNames(`${prefixCls}-bg`, `${prefixCls}-bg-${infoPosition}`)}
        style={percentStyle}
      >
        {infoPosition === 'inner' && children}
      </div>
      {successPercent !== undefined && (
        <div className={`${prefixCls}-success-bg`} style={successPercentStyle} />
      )}
    </div>
  );

  const isOuterStart = infoPosition === 'outer' && infoAlign === 'start';
  const isOuterEnd = infoPosition === 'outer' && infoAlign === 'end';

  return infoPosition === 'outer' && infoAlign === 'center' ? (
    <div className={`${prefixCls}-layout-bottom`}>
      {lineInner}
      {children}
    </div>
  ) : (
    <div className={`${prefixCls}-outer`} style={outerStyle}>
      {isOuterStart && children}
      {lineInner}
      {isOuterEnd && children}
    </div>
  );
};

export default Line;
