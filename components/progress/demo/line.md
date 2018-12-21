---
order: 0
title:
  zh-CN: 进度条
  en-US: Progress bar
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

````jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </div>,
  mountNode
);
````
