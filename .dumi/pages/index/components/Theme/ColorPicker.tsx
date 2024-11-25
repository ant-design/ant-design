import React, { useEffect, useState } from 'react';
import { ColorPicker, Flex, Input } from 'antd';
import { createStyles } from 'antd-style';
import type { ColorPickerProps, GetProp } from 'antd';
import { generateColor } from 'antd/es/color-picker/util';
import classNames from 'classnames';

import { PRESET_COLORS } from './colorUtil';

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

const useStyle = createStyles(({ token, css }) => ({
  color: css`
    width: ${token.controlHeightLG / 2}px;
    height: ${token.controlHeightLG / 2}px;
    border-radius: 100%;
    cursor: pointer;
    transition: all ${token.motionDurationFast};
    display: inline-block;

    & > input[type='radio'] {
      width: 0;
      height: 0;
      opacity: 0;
    }

    &:focus-within {
      // need ？
    }
  `,

  colorActive: css`
    box-shadow:
      0 0 0 1px ${token.colorBgContainer},
      0 0 0 ${token.controlOutlineWidth * 2 + 1}px ${token.colorPrimary};
  `,
}));

export interface ThemeColorPickerProps {
  id?: string;
  value?: string | Color;
  onChange?: (value?: Color | string) => void;
}

const DebouncedColorPicker: React.FC<React.PropsWithChildren<ThemeColorPickerProps>> = (props) => {
  const { value: color, children, onChange } = props;
  const [value, setValue] = useState(color);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange?.(value);
    }, 200);
    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    setValue(color);
  }, [color]);

  return (
    <ColorPicker
      value={value}
      onChange={setValue}
      presets={[{ label: 'PresetColors', colors: PRESET_COLORS }]}
    >
      {children}
    </ColorPicker>
  );
};

const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({ value, onChange, id }) => {
  const { styles } = useStyle();

  const matchColors = React.useMemo(() => {
    const valueStr = generateColor(value || '').toRgbString();
    let existActive = false;
    const colors = PRESET_COLORS.map((color) => {
      const colorStr = generateColor(color).toRgbString();
      const active = colorStr === valueStr;
      existActive = existActive || active;
      return { color, active, picker: false };
    });

    return [
      ...colors,
      {
        color: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
        picker: true,
        active: !existActive,
      },
    ];
  }, [value]);

  return (
    <Flex gap="large" align="center" wrap>
      <Input
        value={typeof value === 'string' ? value : value?.toHexString()}
        onChange={(event) => onChange?.(event.target.value)}
        style={{ width: 120 }}
        id={id}
      />
      <Flex gap="middle">
        {matchColors.map<React.ReactNode>(({ color, active, picker }) => {
          const colorNode = (
            <label
              key={color}
              className={classNames(styles.color, { [styles.colorActive]: active })}
              style={{ background: color }}
              onClick={() => {
                if (!picker) {
                  onChange?.(color);
                }
              }}
            >
              <input
                type="radio"
                name={picker ? 'picker' : 'color'}
                aria-label={color}
                tabIndex={picker ? -1 : 0}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
          );
          return picker ? (
            <DebouncedColorPicker
              key={`colorpicker-${value}`}
              value={value || ''}
              onChange={onChange}
            >
              {colorNode}
            </DebouncedColorPicker>
          ) : (
            colorNode
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ThemeColorPicker;
