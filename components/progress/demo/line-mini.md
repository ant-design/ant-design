---
order: 2
title: 
  zh-CN: 小型进度条
  en-US: Mini size progress bar
---

## zh-CN

适合放在较狭窄的区域内。

## en-US

Appropriate for a narrow area.

````__react
import { Progress } from 'antd';

ReactDOM.render(
  <div style={{ width: 170 }}>
    <Progress percent={30} strokeWidth={5} />
    <Progress percent={50} strokeWidth={5} status="active" />
    <Progress percent={70} strokeWidth={5} status="exception" />
    <Progress percent={100} strokeWidth={5} />
  </div>
, mountNode);
````
