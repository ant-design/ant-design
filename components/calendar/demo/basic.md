# 基本

- order: 0

一个通用的日历面板，支持年/月切换。

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
      ];
      break;
    case 10:
      listData = [
        { type: 'warn', content: '这里是警告事项.' },
        { type: 'normal', content: '这里是普通事项.' },
        { type: 'error', content: '这里是错误事项.' }
      ];
      break;
    case 15:
      listData = [
        { type: 'warn', content: '这里是警告事项.' },
        { type: 'normal', content: '这里是普通事项好长啊。。....' },
        { type: 'error', content: '这里是错误事项.' },
        { type: 'error', content: '这里是错误事项.' },
        { type: 'error', content: '这里是错误事项.' },
        { type: 'error', content: '这里是错误事项.' }
      ];
      break;
  }
  return listData;
}

function getMonthData(value) {
  if (value.getMonth() === 8) {
    return 1394;
  }
  return 0;
}

ReactDOM.render(
  <Calendar type="date" getDateData={getDateData} getMonthData={getMonthData} />
, document.getElementById('components-calendar-demo-basic'));
````
