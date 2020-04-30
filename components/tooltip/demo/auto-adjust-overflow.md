---
order: 3
title:
  zh-CN: 自动调整位置
  en-US: Adjust placement automatically
debug: true
---

## zh-CN

气泡框不可见时自动调整位置

## en-US

Adjust placement automatically when tooltip is invisible.

```jsx
import { Tooltip, Button } from 'antd';

const wrapStyles = {
  overflow: 'hidden',
  position: 'relative',
  padding: '24px',
  border: '1px solid #e9e9e9',
};

ReactDOM.render(
  <div style={wrapStyles}>
    <Tooltip
      placement="left"
      title="Prompt Text"
      getPopupContainer={trigger => trigger.parentElement}
    >
      <Button>Adjust automatically / 自动调整</Button>
    </Tooltip>
    <br />
    <Tooltip
      placement="left"
      title="Prompt Text"
      getPopupContainer={trigger => trigger.parentElement}
      autoAdjustOverflow={false}
    >
      <Button>Ignore / 不处理</Button>
    </Tooltip>
  </div>,
  mountNode,
);
```
