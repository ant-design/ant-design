import classNames from 'classnames';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface ColorPlaceholderProps extends ColorPickerBaseProps {
  popupOpen?: boolean;
}

const ColorPlaceholder: FC<ColorPlaceholderProps> = (props) => {
  const { color, prefixCls, popupOpen, clearColor } = props;
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
              backgroundColor: color.toRgbString(),
            }}
          />
        </div>
      ),
    [color, clearColor],
  );

  return (
    <div
      className={classNames(ColorPlaceholderPrefixCls, {
        [`${ColorPlaceholderPrefixCls}-active`]: popupOpen,
      })}
    >
      {containerRender}
    </div>
  );
};
export default ColorPlaceholder;
