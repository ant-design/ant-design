# 卡片模式

- order: 0

用于嵌套在空间有限的容器中。

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
        { type: 'normal', content: '这里是普通事项.' },
        { type: 'error', content: '这里是错误事项.' },
        { type: 'error', content: '这里是错误事项.' }
      ];
      break;
  }
  return listData;
}

function onChange(value) {
  console.log('change');
}

function onTypeChange(type) {
  console.log('Type change: %s.', type);
}

ReactDOM.render(
  <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <Calendar fullscreen={false} type="date" getDateData={getDateData} onChange={onChange} onTypeChange={onTypeChange} />
  </div>
, document.getElementById('components-calendar-demo-card'));
````
