---
order: 6.1
title:
  zh-CN: 轮播的公告
  en-US: Loop Banner
---

## zh-CN

配合 [react-text-loop](https://npmjs.com/package/react-text-loop) 实现消息轮播通知栏。

## en-US

Show a loop banner by using with [react-text-loop](https://npmjs.com/package/react-text-loop).

```tsx
import { Alert } from 'antd';
import TextLoop from 'react-text-loop';

ReactDOM.render(
  <Alert
    banner
    message={
      <TextLoop mask>
        <div>Notice message one</div>
        <div>Notice message two</div>
        <div>Notice message three</div>
        <div>Notice message four</div>
      </TextLoop>
    }
  />,
  mountNode,
);
```
