# 基本

- order: 0

最简单的用法。

---

````jsx
import { Calendar } from 'antd';

function getDateData(value) {

  let listData;
  switch (value.getDayOfMonth()) {
    case 8:
      listData = [
        { type: 'warn', content: '这里是警告事项.' },
        { type: 'normal', content: '这里是普通事项.' }
      ]; break;
    case 10:
      listData = [
        { type: 'warn', content: '这里是警告事项.' },
        { type: 'normal', content: '这里是普通事项.' },
        { type: 'error', content: '这里是错误事项.' }
      ]; break;
    case 15:
      listData = [
        { type: 'warn', content: '这里是警告事项.' },
        { type: 'normal', content: '这里是普通事项.' },
        { type: 'error', content: '这里是错误事项.' },
        { type: 'error', content: '这里是错误事项.' }
      ]; break;
  }
  
  return listData;

}
function onChange(value) {
  console.log('change');
}


ReactDOM.render(
  <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}><Calendar getDateData={getDateData} onChange={onChange} type="date" /></div>
, document.getElementById('components-calendar-demo-basic'));
````
