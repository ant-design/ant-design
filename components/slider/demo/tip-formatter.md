# 格式化 `Tooltip` 内容

- order: 5

使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter={null}`，则隐藏 `Tooltip`。

---

````jsx
import { Slider } from 'antd';

function formatter(value) {
  return '$' + value;
}

ReactDOM.render(<div>
  <Slider tipFormatter={formatter} />
  <Slider tipFormatter={null} />
</div>, document.getElementById('components-slider-demo-tip-formatter'));
````
