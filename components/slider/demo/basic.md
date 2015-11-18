# 基本

- order: 0

基本滑动条。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。

---

````jsx
import { Slider } from 'antd';

ReactDOM.render(<div>
  <Slider defaultValue={30} />
  <Slider range defaultValue={[20, 50]} />
  <Slider range defaultValue={[20, 50]} disabled />
</div>
, document.getElementById('components-slider-demo-basic'));
````

<style>
.code-box-demo .ant-slider {
  margin-bottom: 50px;
}

.code-box-demo .ant-slider:last-child {
  margin-bottom: 10px;
}
</style>
