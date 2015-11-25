# 格式化 `Tooltip` 内容

- order: 5

使用 `tipFormatter` 可以格式化 `Tooltip` 的内容。

---

````jsx
import { Slider } from 'antd';

function formatter(value) {
  return '$' + value;
}

ReactDOM.render(<Slider tipFormatter={formatter} />
, document.getElementById('components-slider-demo-tip-formatter'));
````
