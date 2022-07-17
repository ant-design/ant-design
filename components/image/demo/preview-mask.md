---
order: 99
title:
  zh-CN: 自定义预览文本
  en-US: Custom preview mask
debug: true
---

## zh-CN

自定义预览文本。

## en-US

Custom preview mask.

```tsx
import { ZoomInOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Image
    width={96}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    preview={{
      maskClassName: 'customize-mask',
      mask: (
        <Space direction="vertical" align="center">
          <ZoomInOutlined />
          示例
        </Space>
      ),
    }}
  />
);

export default App;
```

```css
.customize-mask {
  font-size: 20px;
  opacity: 1;
}
.customize-mask .anticon {
  font-size: 32px;
}
```
