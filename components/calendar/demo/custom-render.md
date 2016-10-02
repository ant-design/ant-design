---
order: 1
title:
  zh-CN: 自定义渲染
  en-US: Custom Render
---

## zh-CN

用 `dateCellRender` 和 `monthCellRender` 函数来自定义需要渲染的数据。

## en-US

This component can be rendered by using `dateCellRender` and `monthCellRender` with the data you need.

````jsx
import { Calendar } from 'antd';
import moment from 'moment';

function dateCellRender(value) {
  return <div>Custom date {value.date()}</div>;
}

function monthCellRender(value) {
  return <div>Custom monthly {value.month()}</div>;
}

ReactDOM.render(
  <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')}
    dateCellRender={dateCellRender} monthCellRender={monthCellRender}
  />
, mountNode);
````
