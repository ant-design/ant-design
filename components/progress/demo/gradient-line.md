---
order: 11
title:
  zh-CN: 自定义进度条渐变色
  en-US: Custom line gradient
---

## zh-CN

`linear-gradient` 的封装。推荐只传两种颜色。

## en-US

A package of `linear-gradient`. It is recommended to only pass two colors.

````jsx
import { Progress } from 'antd';

const strokeColor = {
  from: '#108ee9',
  to: '#87d068',
}

ReactDOM.render(<Progress strokeColor={strokeColor} percent={99.9} status="active" />, mountNode);
````
