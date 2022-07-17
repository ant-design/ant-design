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
import React from 'react';
import { Image, Space } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

function ImageDemo() {
  return (
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
}

ReactDOM.render(<ImageDemo />, mountNode);
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
