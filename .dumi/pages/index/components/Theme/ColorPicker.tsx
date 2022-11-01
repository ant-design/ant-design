import useSiteToken from '../../../../hooks/useSiteToken';
import { Input, Space, Popover } from 'antd';
import { SketchPicker } from 'react-color';
import React from 'react';
import { css } from '@emotion/react';
import { TinyColor } from '@ctrl/tinycolor';

const PRESET_COLORS = [
  '#1677FF',
  '#5A54F9',
  '#9E339F',
  '#FB7299',
  '#E0282E',
  '#F4801A',
  '#F2BD27',
  '#00B96B',
];

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    color: css`
      width: ${token.controlHeightLG / 2}px;
      height: ${token.controlHeightLG / 2}px;
      border-radius: 100%;
      cursor: pointer;
      outline-offset: 1px;
      transition: all ${token.motionDurationFast};
    `,

    colorActive: css`
      outline: ${token.controlOutlineWidth * 2}px solid ${token.colorPrimary};
    `,
  };
};

export interface RadiusPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function ColorPicker({ value, onChange }: RadiusPickerProps) {
  const style = useStyle();

  const matchColors = React.useMemo(() => {
    const valueStr = new TinyColor(value).toRgbString();
    let existActive = false;

    const colors = PRESET_COLORS.map(color => {
      const colorStr = new TinyColor(color).toRgbString();
      const active = colorStr === valueStr;
      existActive = existActive || active;

      return {
        color,
        active,
        picker: false,
      };
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
    <Space size="large">
      <Input
        value={value}
        onChange={event => {
          onChange?.(event.target.value);
        }}
        style={{ width: 120 }}
      />

      <Space size="middle">
        {matchColors.map(({ color, active, picker }) => {
          let colorNode = (
            <div
              key={color}
              css={[style.color, active && style.colorActive]}
              style={{
                background: color,
              }}
              onClick={() => {
                if (!picker) {
                  onChange?.(color);
                }
              }}
            />
          );

          if (picker) {
            colorNode = (
              <Popover
                key={color}
                overlayInnerStyle={{ padding: 0 }}
                content={
                  <SketchPicker
                    color={value}
                    presetColors={PRESET_COLORS}
                    disableAlpha
                    onChangeComplete={color => {
                      onChange?.(color.hex);
                    }}
                  />
                }
                trigger="click"
                showArrow={false}
              >
                {colorNode}
              </Popover>
            );
          }

          return colorNode;
        })}
      </Space>
    </Space>
  );
}
