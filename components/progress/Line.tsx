import * as React from 'react';
import { presetPrimaryColors } from '@ant-design/colors';
import { clsx } from 'clsx';

import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import type {
  PercentPositionType,
  ProgressGradient,
  ProgressProps,
  ProgressSemanticAllType,
  StringGradients,
} from './progress';
import { LineStrokeColorVar } from './style';
import { getSize, getSuccessPercent, validProgress } from './utils';

interface LineProps extends Omit<ProgressProps, 'classNames' | 'styles'> {
  prefixCls: string;
  direction?: DirectionType;
  vertical?: boolean;
  strokeColor?: string | ProgressGradient;
  percentPosition: PercentPositionType;
  classNames: NonNullable<ProgressSemanticAllType['classNames']>;
  styles: NonNullable<ProgressSemanticAllType['styles']>;
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
  vertical?: boolean,
): React.CSSProperties => {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction = vertical ? 'to top' : directionConfig === 'rtl' ? 'to left' : 'to right',
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
    direction,
    vertical,
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

  const [extent, thickness] = getSize(mergedSize, 'line', { strokeWidth });

  // ========================= Rail =========================
  const railStyle: React.CSSProperties = {
    backgroundColor: mergedRailColor || undefined,
    borderRadius,
    ...(vertical ? { width: thickness } : { height: thickness }),
  };

  // ======================== Tracks ========================
  const trackCls = `${prefixCls}-track`;

  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, direction, vertical)
      : { [LineStrokeColorVar]: strokeColor, background: strokeColor };

  const percentTrackStyle: React.CSSProperties = {
    borderRadius,
    ...backgroundProps,
    ...(vertical
      ? {
          width: '100%',
          height: `${validProgress(percent)}%`,
          position: 'absolute',
          top: 'auto',
          bottom: 0,
        }
      : {
          width: `${validProgress(percent)}%`,
          height: thickness,
        }),
  };

  const successPercent = getSuccessPercent(props);

  const successTrackStyle: React.CSSProperties = {
    borderRadius,
    backgroundColor: success?.strokeColor,
    ...(vertical
      ? {
          width: '100%',
          height: `${validProgress(successPercent)}%`,
          position: 'absolute',
          bottom: 0,
        }
      : {
          width: `${validProgress(successPercent)}%`,
          height: thickness,
        }),
  };

  // ======================== Render ========================
  return (
    <div
      className={clsx(`${prefixCls}-body`, classNames.body, {
        [`${prefixCls}-body-layout-bottom`]: infoAlign === 'center' && infoPosition === 'outer',
        [`${prefixCls}-body-vertical`]: vertical,
      })}
      style={vertical ? styles.body : { width: extent > 0 ? extent : '100%', ...styles.body }}
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
