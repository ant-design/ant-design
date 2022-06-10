---
order: 6.1
title:
  zh-CN: 轮播的公告
  en-US: Loop Banner
---

## zh-CN

配合 [react-text-loop-next](https://npmjs.com/package/react-text-loop-next) 或 [react-fast-marquee](https://npmjs.com/package/react-fast-marquee) 实现消息轮播通知栏。

## en-US

Show a loop banner by using with [react-text-loop-next](https://npmjs.com/package/react-text-loop-next) or [react-fast-marquee](https://npmjs.com/package/react-fast-marquee).

```tsx
import { Alert } from 'antd';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { TextLoop } from 'react-text-loop-next';

const App: React.FC = () => (
  <>
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
    />
    <Alert
      banner
      message={
        <Marquee pauseOnHover gradient={false}>
          I can be a React component, multiple React components, or just some text.
        </Marquee>
      }
    />
  </>
);

export default App;
```
