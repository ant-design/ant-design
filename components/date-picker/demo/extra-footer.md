---
order: 10
title:
  zh-CN: 额外的页脚
  en-US: Extra Footer
---

## zh-CN

在浮层中加入额外的页脚，以满足某些定制信息的需求。

## en-US

Render extra footer in panel for customized requirements.

```jsx
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

ReactDOM.render(
  <div>
    <DatePicker renderExtraFooter={() => 'extra footer'} />
    <br />
    <DatePicker renderExtraFooter={() => 'extra footer'} showTime />
    <br />
    <RangePicker renderExtraFooter={() => 'extra footer'} />
    <br />
    <RangePicker renderExtraFooter={() => 'extra footer'} showTime />
    <br />
    <DatePicker renderExtraFooter={() => 'extra footer'} picker="month" />
  </div>,
  mountNode,
);
```
