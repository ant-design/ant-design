---
order: 12
title:
  zh-CN: <Missing>
  en-US: Customized Date Rendering
---

## zh-CN

<Missing>

## en-US

We can customize the rendering of date cells in the calendar by providing a `dateRender` function to `DatePicker`.

````jsx
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

ReactDOM.render(
  <div>
    <DatePicker
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid';
          style.borderRadius = '50%';
        }

        return (
          <div className="ant-calendar-date" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
    <RangePicker
      dateRender={(current) => {
        const style = {};
        if (current.date() === 1) {
          style.border = '1px solid';
          style.borderRadius = '50%';
        }

        return (
          <div className="ant-calendar-date" style={style}>
            {current.date()}
          </div>
        );
      }}
    />
  </div>
, mountNode);
````
