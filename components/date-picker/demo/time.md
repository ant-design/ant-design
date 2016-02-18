# 日期时间选择

- order: 4

增加选择时间功能。不要修改时间的格式 `HH:mm:ss`。

---

````jsx
import { DatePicker } from 'antd';

function onChange(value) {
  console.log('选择了时间：', value);
}

ReactDOM.render(
<DatePicker showTime format="yyyy-MM-dd HH:mm:ss" onChange={onChange} style={{ width: 160 }} />
, mountNode);
````
