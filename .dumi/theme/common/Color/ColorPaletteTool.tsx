import { FormattedMessage } from 'dumi';
import React, { useMemo, useState } from 'react';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import ColorPatterns from './ColorPatterns';
import useLocale from '../../../hooks/useLocale';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

const ColorPaletteTool: React.FC = () => {
  const [, lang] = useLocale();
  const [primaryColor, setPrimaryColor] = useState<string>('#1890ff');
  const [primaryColorInstance, setPrimaryColorInstance] = useState<Color>(null);
  const handleChangeColor = (color: Color, hex: string) => {
    setPrimaryColor(hex);
    setPrimaryColorInstance(color);
  };
  const colorValidation = useMemo<React.ReactNode>(() => {
    let text = '';
    if (primaryColorInstance) {
      const { s, b } = primaryColorInstance.toHsb();
      if (s * 100 < primaryMinSaturation) {
        const curS = (s * 100).toFixed(2);
        text +=
          lang === 'cn'
            ? `饱和度建议不低于${primaryMinSaturation}（现在${curS}）`
            : `Saturation is recommended not to be lower than ${primaryMinSaturation}（currently${curS}）`;
      }
      if (b * 100 < primaryMinBrightness) {
        const curB = (b * 100).toFixed(2);
        text +=
          lang === 'cn'
            ? `亮度建议不低于${primaryMinBrightness}（现在${curB}）`
            : `Brightness is recommended not to be lower than ${primaryMinBrightness}（currently${curB}）`;
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
          <ColorPicker value={primaryColor} onChange={handleChangeColor} />
        </span>
        <span className="color-palette-picker-value">{primaryColor}</span>
        {colorValidation}
      </div>
    </div>
  );
};

export default ColorPaletteTool;
