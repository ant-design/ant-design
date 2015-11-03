# 范围

- order: 6

设置 `disabledDate` 方法，来确定不可选时段。

如上例：不可选择今天之后的日期。

---

````jsx
import { Datepicker } from 'antd';

const disabledDate = function(current, value) {
  // can not select days after today
  return current && current.getTime() > Date.now();
};

ReactDOM.render(
  <Datepicker disabledDate={disabledDate} />
, document.getElementById('components-datepicker-demo-range'));
````
