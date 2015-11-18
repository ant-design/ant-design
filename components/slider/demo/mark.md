# 分段式滑块

- order: 3

使用 `marks` 属性标注分段式滑块，使用 `value` / `defaultValue` 指定滑块位置。可以结合 `step` `included` 使用。

---

````jsx
import { Slider } from 'antd';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C'
};

ReactDOM.render(
<div>
  <p>包含关系</p>
  <Slider marks={marks} defaultValue={37} />
  <Slider range marks={marks} defaultValue={[26, 37]} />
  <p>并列关系</p>
  <Slider marks={marks} included={false} defaultValue={37} />
  <p>结合 `step`</p>
  <Slider marks={marks} step={10} defaultValue={37} />
</div>
, document.getElementById('components-slider-demo-mark'));
````
