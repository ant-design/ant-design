---
order: 4
title: 
  zh-CN: 事件
  en-US: Event
---

## zh-CN

当 Slider 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `onmouseup` 时，会触发 `onAfterChange` 事件，并把当前值作为参数传入。

## en-US

The `onChange` callback function will fire when the user changes the slider's value. 
The `onAfterChange` callback function will fire when `onmouseup` fired.

````jsx
import { Slider } from 'antd';

function log(value) {
  console.log(value);
}

ReactDOM.render(
  <div>
    <Slider defaultValue={30} onChange={log} />
    <Slider range step={10} defaultValue={[20, 50]} onChange={log} />
    <Slider defaultValue={30} onAfterChange={log} />
  </div>
, mountNode);
````
