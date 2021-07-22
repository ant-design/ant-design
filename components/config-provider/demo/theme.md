---
order: 5
title:
  zh-CN: 全局样式
  en-US: Global Theme
only: true
---

## zh-CN

修改全局主题色。

## en-US

Modify global theme color.

```jsx
import { SketchPicker } from 'react-color';
import React, { useState } from 'react';
import { ConfigProvider, Button, Radio, Space, Form, Input, Row, Col } from 'antd';

const FormSizeDemo = () => {
  const [color, setColor] = useState({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
  });

  function onColorChange(nextColor) {
    const mergedNextColor = {
      ...color,
      ...nextColor,
    };
    setColor(mergedNextColor);
    ConfigProvider.config({
      theme: mergedNextColor,
    });
  }

  return (
    <Row gutter={16}>
      <Col flex="none">
        <Space direction="vertical" align="center">
          {/* Primary Color */}
          <SketchPicker
            presetColors={['#1890ff', '#25b864', '#ff6f00']}
            color={color.primaryColor}
            onChange={({ hex }) => {
              onColorChange({
                primaryColor: hex,
              });
            }}
          />

          <span style={{ color: 'var(--ant-primary-color)' }}>var(`--ant-primary-color`)</span>

          {/* Error Color */}
          <SketchPicker
            presetColors={['#ff4d4f']}
            color={color.errorColor}
            onChange={({ hex }) => {
              onColorChange({
                errorColor: hex,
              });
            }}
          />

          <span style={{ color: 'var(--ant-error-color)' }}>var(`--ant-error-color`)</span>
        </Space>
      </Col>

      <Col>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Space>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </Space>
          <Space>
            <Button danger type="primary">
              Primary
            </Button>
            <Button danger>Default</Button>
            <Button danger type="dashed">
              Dashed
            </Button>
            <Button danger type="text">
              Text
            </Button>
            <Button danger type="link">
              Link
            </Button>
          </Space>

          <Space>
            <Radio.Group defaultValue="bamboo">
              <Radio value="bamboo">Bamboo</Radio>
              <Radio value="light">Light</Radio>
              <Radio value="little">Little</Radio>
            </Radio.Group>
          </Space>

          <Space>
            <Form>
              <Form.Item status="error">
                <Input />
              </Form.Item>
            </Form>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};
ReactDOM.render(<FormSizeDemo />, mountNode);
```
