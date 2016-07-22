---
order: 3
title: 
  zh-CN: 分段式滑块
  en-US: Graduated slider
---

## zh-CN

使用 `marks` 属性标注分段式滑块，使用 `value` / `defaultValue` 指定滑块位置。当 `included=false` 时，表明不同标记间为并列关系。当 `step=null` 时，Slider 的可选值仅有 `marks` 标出来的部分。

## en-US

Using `marks` property to mark a graduated slider, use `value` or `defaultValue` to specify the position of thumb.
When `included` is false, means that different thumbs are coordinative.
when `step` is null, users can only slide the thumbs onto marks.


````jsx
import { Slider } from 'antd';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

ReactDOM.render(
  <div>
    <p>包含关系</p>
    <Slider marks={marks} defaultValue={37} />
    <Slider range marks={marks} defaultValue={[26, 37]} />
    <p>并列关系</p>
    <Slider marks={marks} included={false} defaultValue={37} />
    <p>结合 step</p>
    <Slider marks={marks} step={10} defaultValue={37} />
    <p>`step=null`</p>
    <Slider marks={marks} step={null} defaultValue={37} />
  </div>
, mountNode);
````
