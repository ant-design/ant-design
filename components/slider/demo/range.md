# 双滑块

- order: 4

设置 `range` 为 `true`，将会渲染两个滑块，此时应用 `defaultValues` `values` 设置滑块的值，而非 `defaultValue` `values`。

---

````jsx
import { Slider } from 'antd';

ReactDOM.render(
<div>
  <Slider range={true} defaultValues={[0, 30]} />
  <Slider range={true} step={10} values={[20, 50]} />
</div>
, document.getElementById('components-slider-demo-range'));
````
