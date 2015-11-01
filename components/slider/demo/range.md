# 双滑块

- order: 4

设置 `range` 为 `true`，将会渲染两个滑块。

---

````jsx
import { Slider } from 'antd';

ReactDOM.render(
<div>
  <Slider range defaultValue={[0, 30]} />
  <Slider range step={10} value={[20, 50]} />
</div>
, document.getElementById('components-slider-demo-range'));
````
