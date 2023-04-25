import classNames from 'classnames';
import type { CSSProperties, FC } from 'react';
import React, { useMemo } from 'react';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface ColorPlaceholderProps extends ColorPickerBaseProps {
  popupOpen?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ColorPlaceholder: FC<ColorPlaceholderProps> = (props) => {
  const { color, prefixCls, popupOpen, clearColor, disabled, className, ...resetProps } = props;
  const ColorPlaceholderPrefixCls = `${prefixCls}-placeholder`;

  const containerRender = useMemo(
    () =>
      clearColor ? (
        <ColorClear {...props} />
      ) : (
        <div className={`${ColorPlaceholderPrefixCls}-container`}>
          <div className={`${ColorPlaceholderPrefixCls}-display`} />
          <div
            className={`${ColorPlaceholderPrefixCls}-layer`}
            style={{
              backgroundColor: color?.toRgbString(),
            }}
          />
        </div>
      ),
    [color, clearColor],
  );

  return (
    <div
      className={classNames(ColorPlaceholderPrefixCls, className, {
        [`${ColorPlaceholderPrefixCls}-active`]: popupOpen,
        [`${ColorPlaceholderPrefixCls}-disabled`]: disabled,
      })}
      {...resetProps}
    >
      {containerRender}
    </div>
  );
};
export default ColorPlaceholder;
