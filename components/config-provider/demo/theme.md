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
import { ConfigProvider, Button, Radio, Space, Form, Input } from 'antd';

const FormSizeDemo = () => {
  const [color, setColor] = useState('#1890ff');

  function onColorChange({ hex }) {
    setColor(hex);
    ConfigProvider.config({
      theme: {
        primaryColor: hex,
      },
    });
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <SketchPicker
        presetColors={['#1890ff', '#25b864', '#ff6f00']}
        color={color}
        onChange={onColorChange}
      />

      <Radio.Group>
        <Radio value="Bamboo">Bamboo</Radio>
        <Radio value="Light">Light</Radio>
        <Radio value="little">Little</Radio>
      </Radio.Group>

      <Button type="primary">Primary Color</Button>

      <Form>
        <Form.Item status="error">
          <Input />
        </Form.Item>
      </Form>

      <span style={{ color: 'var(--ant-primary-color)' }}>Primary Color String</span>
    </Space>
  );
};
ReactDOM.render(<FormSizeDemo />, mountNode);
```
