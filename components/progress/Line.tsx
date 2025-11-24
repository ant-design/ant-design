import * as React from 'react';
import { presetPrimaryColors } from '@ant-design/colors';
import { clsx } from 'clsx';

import type { SemanticClassNames, SemanticStyles } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import type {
  PercentPositionType,
  ProgressGradient,
  ProgressProps,
  SemanticName,
  StringGradients,
} from './progress';
import { LineStrokeColorVar } from './style';
import { getSize, getSuccessPercent, validProgress } from './utils';

interface LineProps extends Omit<ProgressProps, 'classNames' | 'styles'> {
  prefixCls: string;
  direction?: DirectionType;
  strokeColor?: string | ProgressGradient;
  percentPosition: PercentPositionType;
  classNames: SemanticClassNames<SemanticName>;
  styles: SemanticStyles<SemanticName>;
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
    const formattedKey = Number.parseFloat(key.replace(/%/g, ''));
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
    classNames,
    styles,
    direction: directionConfig,
    percent,
    size,
    strokeWidth,
    strokeColor,
    strokeLinecap = 'round',
    children,
    railColor,
    trailColor,
    percentPosition,
    success,
  } = props;

  const { align: infoAlign, type: infoPosition } = percentPosition;

  const mergedRailColor = railColor ?? trailColor;

  const borderRadius = strokeLinecap === 'square' || strokeLinecap === 'butt' ? 0 : undefined;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Progress');

    warning.deprecated(!('strokeWidth' in props), 'strokeWidth', 'size');
  }

  // ========================= Size =========================
  const mergedSize = size ?? [-1, strokeWidth || (size === 'small' ? 6 : 8)];

  const [width, height] = getSize(mergedSize, 'line', { strokeWidth });

  // ========================= Rail =========================
  const railStyle: React.CSSProperties = {
    backgroundColor: mergedRailColor || undefined,
    borderRadius,
    height,
  };

  // ======================== Tracks ========================
  const trackCls = `${prefixCls}-track`;

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, directionConfig)
      : { [LineStrokeColorVar]: strokeColor, background: strokeColor };

  const percentTrackStyle: React.CSSProperties = {
    width: `${validProgress(percent)}%`,
    height,
    borderRadius,
    ...backgroundProps,
  };

  const successPercent = getSuccessPercent(props);

  const successTrackStyle: React.CSSProperties = {
    width: `${validProgress(successPercent)}%`,
    height,
    borderRadius,
    backgroundColor: success?.strokeColor,
  };

  // ======================== Render ========================
  return (
    <div
      className={clsx(`${prefixCls}-body`, classNames.body, {
        [`${prefixCls}-body-layout-bottom`]: infoAlign === 'center' && infoPosition === 'outer',
      })}
      style={{ width: width > 0 ? width : '100%', ...styles.body }}
    >
      {/************** Rail **************/}
      <div
        className={clsx(`${prefixCls}-rail`, classNames.rail)}
        style={{ ...railStyle, ...styles.rail }}
      >
        {/************* Track *************/}
        {/* Percent */}
        <div
          className={clsx(trackCls, classNames.track)}
          style={{
            ...percentTrackStyle,
            ...styles.track,
          }}
        >
          {infoPosition === 'inner' && children}
        </div>

        {/* Success */}
        {successPercent !== undefined && (
          <div
            className={clsx(trackCls, `${trackCls}-success`, classNames.track)}
            style={{
              ...successTrackStyle,
              ...styles.track,
            }}
          />
        )}
      </div>

      {/* Indicator */}
      {infoPosition === 'outer' && children}
    </div>
  );
};

export default Line;
