---
order: 5
title: 自定义提示
---

使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter={null}`，则隐藏 `Tooltip`。

````jsx
import { Slider } from 'antd';

function formatter(value) {
  return `${value}%`;
}

ReactDOM.render(<div>
  <Slider tipFormatter={formatter} />
  <Slider tipFormatter={null} />
</div>, mountNode);
````
