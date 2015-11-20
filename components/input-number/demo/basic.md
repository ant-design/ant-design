# 基本

- order: 0

数字输入框

---

````jsx
import { InputNumber } from 'antd';

function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(
<InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
, document.getElementById('components-input-number-demo-basic'));
````

