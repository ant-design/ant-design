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
import { ConfigProvider, Button, Radio, Space } from 'antd';

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
      <SketchPicker color={color} onChange={onColorChange} />

      <Radio.Group>
        <Radio.Button value="Bamboo">Bamboo</Radio.Button>
        <Radio.Button value="Light">Light</Radio.Button>
        <Radio.Button value="little">Little</Radio.Button>
      </Radio.Group>

      <Button type="primary">Primary Color</Button>

      <span style={{ color: 'var(--ant-primary-color)' }}>Primary Color String</span>
    </Space>
  );
};
ReactDOM.render(<FormSizeDemo />, mountNode);
```
