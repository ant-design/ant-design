---
order: 3
title:
  zh-CN: 小型进度圈
  en-US: Mini size circular progress bar
---

## zh-CN

小一号的圈形进度。

## en-US

A smaller circular progress bar.

````jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress type="circle" percent={30} width={80} />
    <Progress type="circle" percent={70} width={80} status="exception" />
    <Progress type="circle" percent={100} width={80} />
  </div>
, mountNode);
````
