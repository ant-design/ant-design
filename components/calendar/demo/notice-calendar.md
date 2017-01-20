---
order: 1
title:
  zh-CN: 通知事项日历
  en-US: Notice Calendar
---

## zh-CN

一个复杂的应用示例，用 `dateCellRender` 和 `monthCellRender` 函数来自定义需要渲染的数据。

## en-US

This component can be rendered by using `dateCellRender` and `monthCellRender` with the data you need.

````__react
import { Calendar } from 'antd';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'normal', content: 'This is usual event.' },
      ]; break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'normal', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ]; break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'normal', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ]; break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item =>
          <li key={item.content}>
            <span className={`event-${item.type}`}>●</span>
            {item.content}
          </li>
        )
      }
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? <div className="notes-month">
    <section>{num}</section>
    <span>Backlog number</span>
  </div> : null;
}

ReactDOM.render(
  <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
, mountNode);
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

.event-warning {
  color: #fac450;
}

.event-normal {
  color: #108ee9;
}

.event-error {
  color: #f50;
}

.notes-month {
  text-align: center;
}
.notes-month section {
  font-size: 28px;
}
````
