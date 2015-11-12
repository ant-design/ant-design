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


ReactDOM.render(
  <Calendar getDateData={getDateData} type="date" />
, document.getElementById('components-calendar-demo-basic'));
````
