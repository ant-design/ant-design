import { Col, ColorPicker, Row, Space, theme } from 'antd';
import type { Color } from 'antd/lib/color-picker';
import React, { useMemo, useState } from 'react';

export default () => {
  const { token } = theme.useToken();
  const [colorHex, setColorHex] = useState<Color | string>(token.colorPrimary);
  const [colorHsb, setColorHsb] = useState<Color | string>(token.colorPrimary);
  const [colorRgb, setColorRgb] = useState<Color | string>(token.colorPrimary);

  const hexString = useMemo(
    () => (typeof colorHex === 'string' ? colorHex : (colorHex as Color).toHexString()),
    [colorHex],
  );
  const hsbString = useMemo(
    () => (typeof colorHsb === 'string' ? colorHsb : (colorHsb as Color).toHsbString()),
    [colorHsb],
  );
  const rgbString = useMemo(
    () => (typeof colorRgb === 'string' ? colorRgb : (colorRgb as Color).toRgbString()),
    [colorRgb],
  );

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker format="hex" value={colorHex} onChange={setColorHex} />
          </Col>
          <Col>
            HEX: <span>{hexString}</span>
          </Col>
        </Space>
      </Row>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker format="hsb" value={colorHsb} onChange={setColorHsb} />
          </Col>
          <Col>
            HSB: <span>{hsbString}</span>
          </Col>
        </Space>
      </Row>
      <Row align="middle">
        <Space>
          <Col>
            <ColorPicker format="rgb" value={colorRgb} onChange={setColorRgb} />
          </Col>
          <Col>
            RGB: <span>{rgbString}</span>
          </Col>
        </Space>
      </Row>
    </Space>
  );
};
