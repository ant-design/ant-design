/* eslint-disable react/no-array-index-key */
import type { CSSProperties, MouseEventHandler } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { ColorBlock } from '@rc-component/color-picker';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import { useLocale } from '../../locale';
import type { AggregationColor } from '../color';
import type { ColorFormatType, ColorPickerProps, ColorPickerSemanticType } from '../interface';
import { getColorAlpha } from '../util';
import ColorClear from './ColorClear';

export interface ColorTriggerProps {
  prefixCls: string;
  disabled?: boolean;
  format?: ColorFormatType;
  color: AggregationColor;
  open?: boolean;
  showText?: ColorPickerProps['showText'];
  className?: string;
  style?: CSSProperties;
  classNames: NonNullable<ColorPickerSemanticType['classNames']>;
  styles: NonNullable<ColorPickerSemanticType['styles']>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  activeIndex: number;
}

const ColorTrigger = forwardRef<HTMLDivElement, ColorTriggerProps>((props, ref) => {
  const {
    color,
    prefixCls,
    open,
    disabled,
    format,
    className,
    style,
    classNames,
    styles,
    showText,
    activeIndex,
    ...rest
  } = props;

  const colorTriggerPrefixCls = `${prefixCls}-trigger`;
  const colorTextPrefixCls = `${colorTriggerPrefixCls}-text`;
  const colorTextCellPrefixCls = `${colorTextPrefixCls}-cell`;

  const [locale] = useLocale('ColorPicker');

  // ============================== Text ==============================
  const desc: React.ReactNode = React.useMemo(() => {
    if (!showText) {
      return '';
    }

    if (typeof showText === 'function') {
      return showText(color);
    }

    if (color.cleared) {
      return locale.transparent;
    }

    if (color.isGradient()) {
      return color.getColors().map((c, index) => {
        const inactive = activeIndex !== -1 && activeIndex !== index;

        return (
          <span
            key={index}
            className={clsx(
              colorTextCellPrefixCls,
              inactive && `${colorTextCellPrefixCls}-inactive`,
            )}
          >
            {c.color.toRgbString()} {c.percent}%
          </span>
        );
      });
    }

    const hexString = color.toHexString().toUpperCase();
    const alpha = getColorAlpha(color);
    switch (format) {
      case 'rgb':
        return color.toRgbString();
      case 'hsb':
        return color.toHsbString();
      // case 'hex':
      default:
        return alpha < 100 ? `${hexString.slice(0, 7)},${alpha}%` : hexString;
    }
  }, [color, format, showText, activeIndex, locale.transparent, colorTextCellPrefixCls]);

  // ============================= Render =============================
  const containerNode = useMemo<React.ReactNode>(
    () =>
      color.cleared ? (
        <ColorClear prefixCls={prefixCls} className={classNames.body} style={styles.body} />
      ) : (
        <ColorBlock
          prefixCls={prefixCls}
          color={color.toCssString()}
          className={classNames.body}
          innerClassName={classNames.content}
          style={styles.body}
          innerStyle={styles.content}
        />
      ),
    [color, prefixCls, classNames.body, classNames.content, styles.body, styles.content],
  );

  return (
    <div
      ref={ref}
      className={clsx(colorTriggerPrefixCls, className, classNames.root, {
        [`${colorTriggerPrefixCls}-active`]: open,
        [`${colorTriggerPrefixCls}-disabled`]: disabled,
      })}
      style={{
        ...styles.root,
        ...style,
      }}
      {...pickAttrs(rest)}
    >
      {containerNode}
      {showText && (
        <div
          className={clsx(colorTextPrefixCls, classNames.description)}
          style={styles.description}
        >
          {desc}
        </div>
      )}
    </div>
  );
});

export default ColorTrigger;
