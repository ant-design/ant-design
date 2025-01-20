import React from 'react';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { FormattedMessage } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import ColorPatterns from './ColorPatterns';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

const locales = {
  cn: {
    saturation: (s: string) => `饱和度建议不低于${primaryMinSaturation}（当前值 ${s}）`,
    brightness: (b: string) => `亮度建议不低于${primaryMinBrightness}（当前值 ${b}）`,
  },
  en: {
    saturation: (s: string) =>
      `Saturation is recommended not to be lower than ${primaryMinSaturation} (currently ${s})`,
    brightness: (b: string) =>
      `Brightness is recommended not to be lower than ${primaryMinBrightness} (currently ${b})`,
  },
};

const ColorPaletteTool: React.FC = () => {
  const [primaryColor, setPrimaryColor] = React.useState<string>('#1890ff');
  const [primaryColorInstance, setPrimaryColorInstance] = React.useState<Color>();

  const [locale] = useLocale(locales);

  const handleChangeColor = (color: Color, hex: string) => {
    setPrimaryColor(hex);
    setPrimaryColorInstance(color);
  };

  const colorValidation = React.useMemo<React.ReactNode>(() => {
    let text = '';
    if (primaryColorInstance) {
      const { s, b } = primaryColorInstance.toHsb() || {};
      if (s * 100 < primaryMinSaturation) {
        text += locale.saturation((s * 100).toFixed(2));
      }
      if (b * 100 < primaryMinBrightness) {
        text += locale.brightness((b * 100).toFixed(2));
      }
    }
    return <span className="color-palette-picker-validation">{text.trim()}</span>;
  }, [primaryColorInstance, primaryMinSaturation, primaryMinBrightness]);
  return (
    <div className="color-palette-horizontal">
      <div className="color-palette-pick">
        <FormattedMessage id="app.docs.color.pick-primary" />
      </div>
      <div className="main-color">
        <ColorPatterns color={primaryColor} />
      </div>
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
