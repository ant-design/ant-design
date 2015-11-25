# 通知事项日历演示

- order: 2

一个复杂的应用实例。

---

````jsx
import { Calendar } from 'antd';

function getListData(value) {
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
      { type: 'normal', content: '这里是普通事项好长啊。。....' },
      { type: 'error', content: '这里是错误事项.' },
      { type: 'error', content: '这里是错误事项.' },
      { type: 'error', content: '这里是错误事项.' },
      { type: 'error', content: '这里是错误事项.' }
    ]; break;
  default:
  }
  return listData || [];
}

function dateCellRender(value) {
  let listData = getListData(value);
  return <ul className="events">
    {listData.map((item, index) =>
      <li key={index}>
        <span className={`event-${item.type}`}>●</span>
        {item.content}
      </li>
    )}
  </ul>;
}


function getMonthData(value) {
  if (value.getMonth() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  let num = getMonthData(value);
  return num ? <div className="notes-month">
    <section>{num}</section>
    <span>待办事项数</span>
  </div> : null;
}

ReactDOM.render(
  <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
, document.getElementById('components-calendar-demo-notice-calendar'));
````


````css
.events {
  line-height: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.events li {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.events li span {
  vertical-align: middle;
}

.events li span:first-child {
  font-size: 9px;
  margin-right: 4px;
}

.event-warn {
  color: #fac450;
}

.event-normal {
  color: #2db7f5;
}

.event-error {
  color: #f60;
}

.notes-month {
  text-align: center;
}
.notes-month section {
  font-size: 28px;
}
````
