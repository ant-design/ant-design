import * as React from 'react';
import { presetPrimaryColors } from '@ant-design/colors';
import { clsx } from 'clsx';

import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import type {
  PercentPositionType,
  ProgressGradient,
  ProgressProps,
  ProgressSemanticClassNames,
  ProgressSemanticStyles,
  ProgressValueItem,
  StringGradients,
} from './progress';
import { LineStrokeColorVar } from './style';
import { getSize, getSuccessPercent, validProgress } from './utils';

interface LineProps extends Omit<ProgressProps, 'classNames' | 'styles'> {
  prefixCls: string;
  direction?: DirectionType;
  strokeColor?: string | ProgressGradient;
  percentPosition: PercentPositionType;
  classNames: ProgressSemanticClassNames;
  styles: ProgressSemanticStyles;
  isMultiValue?: boolean;
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
  const isMultiValue = props.isMultiValue && Array.isArray(percent);
  const successPercent = getSuccessPercent(props);

  // ======================== Multi-value rendering ========================
  if (isMultiValue) {
    const valueItems = percent as ProgressValueItem[];

    // Calculate cumulative values to stack them
    const stackedItems = valueItems.reduce<Array<ProgressValueItem & { accumulatedValue: number }>>(
      (acc, item) => {
        const lastAccumulated = acc.length > 0 ? acc[acc.length - 1].accumulatedValue : 0;
        const currentValue = validProgress(item.value);
        return [
          ...acc,
          {
            ...item,
            accumulatedValue: lastAccumulated + currentValue,
          },
        ];
      },
      [],
    );

    // Render in reverse order so the first items (which are smaller in the stack)
    // are rendered last (on top) in the DOM
    const tracks = stackedItems.reverse().map((item) => {
      const itemStatus = item.status || 'normal';
      const itemStrokeColor = item.strokeColor || strokeColor;
      const itemBackgroundProps =
        itemStrokeColor && typeof itemStrokeColor !== 'string'
          ? handleGradient(itemStrokeColor as ProgressGradient, directionConfig)
          : { [LineStrokeColorVar]: itemStrokeColor, background: itemStrokeColor };

      const itemTrackStyle: React.CSSProperties = {
        position: 'absolute',
        insetInlineStart: 0,
        width: `${validProgress(item.accumulatedValue)}%`,
        height,
        borderRadius,
        ...itemBackgroundProps,
      };

      return (
        <div
          key={`${item.value}-${item.status}-${item.accumulatedValue}`}
          className={clsx(
            trackCls,
            itemStatus === 'success' && `${trackCls}-success`,
            classNames.track,
          )}
          style={{
            ...styles.track,
            ...itemTrackStyle,
          }}
        />
      );
    });

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
          style={{ ...railStyle, ...styles.rail, position: 'relative' }}
        >
          {/************* Tracks *************/}
          {tracks}
          {infoPosition === 'inner' && (
            <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
          )}
        </div>

        {/* Indicator */}
        {infoPosition === 'outer' && children}
      </div>
    );
  }

  // ======================== Single-value rendering ========================
  const backgroundProps =
    strokeColor && typeof strokeColor !== 'string'
      ? handleGradient(strokeColor, directionConfig)
      : { [LineStrokeColorVar]: strokeColor, background: strokeColor };

  const percentTrackStyle: React.CSSProperties = {
    width: `${validProgress(percent as number)}%`,
    height,
    borderRadius,
    ...backgroundProps,
  };

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
