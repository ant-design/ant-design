# 时间选择

- order: 4

和 [时间选择组件](/components/timepicker) 配合使用。

---

````jsx
import { Datepicker, Timepicker } from 'antd';

function onChange(value) {
  console.log(value);
}

ReactDOM.render(<div>
  <Datepicker onChange={onChange} />
  <Timepicker onChange={onChange} />
</div>, document.getElementById('components-datepicker-demo-time'));
````

