import { Col, ColorPicker, Row } from 'antd';
import { FormattedMessage } from 'dumi';
import React, { useMemo, useState } from 'react';
import ColorPatterns from './ColorPatterns';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

const ColorPaletteTool: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>('#1890ff');
  const [backgroundColor, setBackgroundColor] = useState<string>('#141414');
  const [primaryColorInstance, setPrimaryColorInstance] = useState(null);

  const handleChangeColor = (color: Color, hex: string) => {
    setPrimaryColor(hex);
    setPrimaryColorInstance(color);
  };

  const handleChangeBackgroundColor = (_, hex: string) => {
    setBackgroundColor(hex);
  };

  const colorValidation = useMemo<React.ReactNode>(() => {
    let text = '';
    if (primaryColorInstance) {
      const { s, b } = primaryColorInstance.toHsb();
      if (s * 100 < primaryMinSaturation) {
        text += ` 饱和度建议不低于${primaryMinSaturation}（现在 ${(s * 100).toFixed(2)}）`;
      }
      if (b * 100 < primaryMinBrightness) {
        text += ` 亮度建议不低于${primaryMinBrightness}（现在 ${(b * 100).toFixed(2)}）`;
      }
    }
    return (
      <span className="color-palette-picker-validation color-palette-picker-validation-dark">
        {text.trim()}
      </span>
    );
  }, [primaryColorInstance]);

  return (
    <div className="color-palette-horizontal color-palette-horizontal-dark">
      <div className="main-color">
        {ColorPatterns({ color: primaryColor, dark: true, backgroundColor })}
      </div>
      <div className="color-palette-picker">
        <Row>
          <Col span={12}>
            <div className="color-palette-pick">
              <FormattedMessage id="app.docs.color.pick-primary" />
            </div>
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <Row>
                <Col span={18}>
                  <ColorPicker value={primaryColor} onChange={handleChangeColor} />
                </Col>
                <Col span={6}>
                  <span className="color-palette-pick-hex">{primaryColor}</span>
                </Col>
              </Row>
            </span>
          </Col>
          <Col span={12}>
            <div className="color-palette-pick">
              <FormattedMessage id="app.docs.color.pick-background" />
            </div>
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <Row>
                <Col span={18}>
                  <ColorPicker value={backgroundColor} onChange={handleChangeBackgroundColor} />
                </Col>
                <Col span={6}>
                  <span className="color-palette-pick-hex">{backgroundColor}</span>
                </Col>
              </Row>
            </span>
          </Col>
        </Row>
        {colorValidation}
      </div>
    </div>
  );
};

export default ColorPaletteTool;
