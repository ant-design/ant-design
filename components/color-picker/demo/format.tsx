import { Col, ColorPicker, Row, Space, theme } from 'antd';
import type { Color } from 'antd/lib/color-picker';
import { generateColor } from 'antd/lib/color-picker/util';
import React, { useState } from 'react';

export default () => {
  const { token } = theme.useToken();
  const [colorHex, setColorHex] = useState<Color>(generateColor(token.colorPrimary));
  const [colorHsb, setColorHsb] = useState<Color>(generateColor(token.colorPrimary));
  const [colorRgb, setColorRgb] = useState<Color>(generateColor(token.colorPrimary));
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row align={'middle'}>
        <Space>
          <Col>
            <ColorPicker format="hex" value={colorHex} onChange={(value) => setColorHex(value)} />
          </Col>
          <Col>
            HEX: <span>{colorHex.toHexString()}</span>
          </Col>
        </Space>
      </Row>
      <Row align={'middle'}>
        <Space>
          <Col>
            <ColorPicker format="hsb" value={colorHsb} onChange={(value) => setColorHsb(value)} />
          </Col>
          <Col>
            HSB: <span>{colorHsb.toHsbString()}</span>
          </Col>
        </Space>
      </Row>
      <Row align={'middle'}>
        <Space>
          <Col>
            <ColorPicker format="rgb" value={colorRgb} onChange={(value) => setColorRgb(value)} />
          </Col>
          <Col>
            RGB: <span>{colorRgb.toRgbString()}</span>
          </Col>
        </Space>
      </Row>
    </Space>
  );
};
