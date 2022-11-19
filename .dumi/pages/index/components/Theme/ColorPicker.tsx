import useSiteToken from '../../../../hooks/useSiteToken';
import { Input, Space, Popover } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { TinyColor } from '@ctrl/tinycolor';
import { PRESET_COLORS } from './colorUtil';
import ColorPanel, { ColorPanelProps } from 'antd-token-previewer/es/ColorPanel';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    color: css`
      width: ${token.controlHeightLG / 2}px;
      height: ${token.controlHeightLG / 2}px;
      border-radius: 100%;
      cursor: pointer;
      transition: all ${token.motionDurationFast};
    `,

    colorActive: css`
      box-shadow: 0 0 0 1px ${token.colorBgContainer},
        0 0 0 ${token.controlOutlineWidth * 2 + 1}px ${token.colorPrimary};
    `,
  };
};

const DebouncedColorPanel: FC<ColorPanelProps> = ({ color, onChange }) => {
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

  return <ColorPanel color={value} onChange={setValue} />;
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

    const colors = PRESET_COLORS.map((color) => {
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
        onChange={(event) => {
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
                  <DebouncedColorPanel
                    color={value || ''}
                    onChange={(color) => onChange?.(color)}
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
