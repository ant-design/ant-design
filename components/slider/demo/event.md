# 事件

- order: 4

当 Slider 的值发生改变时，会触发 `onChange` 事件，并把改变后的值作为参数传入。在 `onmouseup` 时，会触发 `onAfterChange` 事件，并把当前值作为参数传入。

---

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
, document.getElementById('components-slider-demo-event'));
````
