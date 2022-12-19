import type { ChangeEvent } from 'react';
import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'dumi';
import ColorPicker from './ColorPicker';
import ColorPatterns from './ColorPatterns';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

const ColorPaletteTool: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>('#1890ff');
  const [primaryColorInstance, setPrimaryColorInstance] = useState(null);
  const handleChangeColor = (e: string | ChangeEvent, color: { hex: string }) => {
    const value = (e as ChangeEvent<HTMLInputElement>).target
      ? (e as ChangeEvent<HTMLInputElement>).target.value
      : e;
    setPrimaryColor(value as string);
    setPrimaryColorInstance(color);
  };
  const colorValidation = useMemo<React.ReactNode>(() => {
    let text = '';
    if (primaryColorInstance) {
      if (primaryColorInstance.hsv.s * 100 < primaryMinSaturation) {
        text += ` 饱和度建议不低于${primaryMinSaturation}（现在 ${(
          primaryColorInstance.hsv.s * 100
        ).toFixed(2)}）`;
      }
      if (primaryColorInstance.hsv.v * 100 < primaryMinBrightness) {
        text += ` 亮度建议不低于${primaryMinBrightness}（现在 ${(
          primaryColorInstance.hsv.v * 100
        ).toFixed(2)}）`;
      }
    }
    return <span className="color-palette-picker-validation">{text.trim()}</span>;
  }, [primaryColorInstance, primaryMinSaturation, primaryMinBrightness]);
  return (
    <div className="color-palette-horizontal">
      <div className="color-palette-pick">
        <FormattedMessage id="app.docs.color.pick-primary" />
      </div>
      <div className="main-color">{ColorPatterns({ color: primaryColor })}</div>
      <div className="color-palette-picker">
        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <ColorPicker color={primaryColor} onChange={handleChangeColor} />
        </span>
        <span className="color-palette-picker-value">{primaryColor}</span>
        {colorValidation}
      </div>
    </div>
  );
};

export default ColorPaletteTool;
