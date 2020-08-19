---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic Usage
---

## zh-CN

默认背景，支持预览。

## en-US

Default placeholder background image, and preview.

```jsx
import { Image } from 'antd';

function ImageDemo() {
  return (
    <Image
      width={200}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
  );
}

ReactDOM.render(<ImageDemo />, mountNode);
```
