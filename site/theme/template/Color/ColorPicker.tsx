/* eslint-disable @typescript-eslint/no-shadow */
import React, { useMemo, useState } from 'react';
import { SketchPicker } from 'react-color';

const noop = () => {};

const baseStyle: Record<PropertyKey, React.CSSProperties> = {
  swatch: {
    padding: '4px',
    background: '#fff',
    borderRadius: '2px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: 10,
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  wrapper: {
    position: 'inherit',
    zIndex: 100,
  },
};

interface ColorPickerProps {
  color?: string;
  small: boolean;
  position: string;
  presetColors?: string[];
  onChange: (hex: string, color: { hex: string }) => void;
  onChangeComplete: (hex: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = props => {
  const {
    small,
    presetColors,
    position = 'bottom',
    onChange = noop,
    onChangeComplete = noop,
  } = props;

  const [color, setColor] = useState<ColorPickerProps['color']>(props.color);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleClick = () => {
    setDisplayColorPicker(prev => !prev);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: { hex: string }) => {
    setColor(color.hex);
    onChange(color.hex, color);
  };

  const handleChangeComplete = (color: { hex: string }) => {
    setColor(color.hex);
    onChangeComplete(color.hex);
  };

  const width = small ? 80 : 120;

  const styles = useMemo<Record<PropertyKey, React.CSSProperties>>(
    () => ({
      ...baseStyle,
      color: {
        width: `${width}px`,
        height: small ? '16px' : '24px',
        borderRadius: '2px',
        backgroundColor: color,
      },
    }),
    [width, small, color],
  );

  if (position === 'top') {
    styles.wrapper.transform = `translate(calc(-100% + ${width + 8}px), -100%)`;
    styles.wrapper.paddingBottom = 8;
  }

  const swatch = (
    <div style={styles.swatch} onClick={handleClick}>
      <div style={styles.color} />
    </div>
  );

  const picker = displayColorPicker ? (
    <div style={styles.popover}>
      <div style={styles.cover} onClick={handleClose} />
      <div style={styles.wrapper}>
        <SketchPicker
          presetColors={presetColors}
          color={color}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
        />
      </div>
    </div>
  ) : null;

  return position === 'top' ? (
    <div>
      {picker}
      {swatch}
    </div>
  ) : (
    <div>
      {swatch}
      {picker}
    </div>
  );
};

export default ColorPicker;
