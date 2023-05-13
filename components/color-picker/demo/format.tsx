import { Col, ColorPicker, Row, Space } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React, { useMemo, useState } from 'react';

export default () => {
  const [colorHex, setColorHex] = useState<Color | string>('#1677ff');
  const [colorHsb, setColorHsb] = useState<Color | string>('hsb(215, 91%, 100%)');
  const [colorRgb, setColorRgb] = useState<Color | string>('rgb(22, 119, 255)');

  const hexString = useMemo(
    () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
    [colorHex],
  );

  const hsbString = useMemo(
    () => (typeof colorHsb === 'string' ? colorHsb : colorHsb.toHsbString()),
    [colorHsb],
  );

  const rgbString = useMemo(
    () => (typeof colorRgb === 'string' ? colorRgb : colorRgb.toRgbString()),
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
