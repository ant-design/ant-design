---
order: 9999
title:
  zh-CN: 样式自定义
  en-US: Style Customization
debug: true
---

## zh-CN

测试一些 `style` 修改样式的行为。

## en-US

Use `style` to change default style.

```jsx
import { Divider } from '@allenai/varnish';

ReactDOM.render(
  <>
    <Divider style={{ borderWidth: 2, borderColor: '#7cb305' }} />
    <Divider style={{ borderColor: '#7cb305' }} dashed />
    <Divider type="vertical" style={{ height: 60, borderColor: '#7cb305' }} />
    <Divider type="vertical" style={{ height: 60, borderColor: '#7cb305' }} dashed />
  </>,
  mountNode,
);
```
