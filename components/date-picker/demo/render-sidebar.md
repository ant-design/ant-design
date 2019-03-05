---
order: 0
title:
  zh-CN: 侧边栏
  en-US: With Sidebar
---

## zh-CN

使用 `renderSidebar` 在面板中添加额外的侧边栏

## en-US

We can customize the rendering of sidebar in the calendar by providing a `renderSidebar` function to `DatePicker`.

````jsx
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

ReactDOM.render(
  <div>
    <DatePicker onChange={onChange} renderSidebar={() => <div>This is a sidebar content</div>} />
    <br />
    <RangePicker onChange={onChange} renderSidebar={() => <div>This is a sidebar content</div>} />
  </div>,
  mountNode,
);
````
