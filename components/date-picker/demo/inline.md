---
order: 2
title: 
  zh-CN: 适应宽度
  en-US: Inline width
---

## zh-CN

`inline` 使输入框适应父元素的宽度。

## en-US

By using `inline`, you can adapt the width of `DatePicker` to the parent.


````jsx
import { DatePicker } from 'antd';

ReactDOM.render(
  <div width="100%">
    <div>
      <DatePicker />
    </div>
    <div>
      <DatePicker inline />
    </div>
    <div>
      <DatePicker.RangePicker />
    </div>
    <div>
      <DatePicker.RangePicker inline />
    </div>
  </div>
, mountNode);
````
