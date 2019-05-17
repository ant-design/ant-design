---
order: 2
title:
  zh-CN: 卡片模式
  en-US: Card
---

## zh-CN

用于嵌套在空间有限的容器中。

## en-US

With custom header api calendar

```jsx
import { Calendar, Select, Radio } from 'antd';

const { Group, Button } = Radio;

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <Calendar
      fullscreen={false}
      headerRender={({ value, type, onChange, onTypeChange }) => {
        const start = 0;
        const end = 12;
        const monthOptions = [];

        const current = value.clone();
        const localeData = value.localeData();
        const months = [];
        for (let i = 0; i < 12; i++) {
          current.month(i);
          months.push(localeData.monthsShort(current));
        }

        for (let index = start; index < end; index++) {
          monthOptions.push(
            <Select.Option className="month-item" key={`${index}`}>
              {months[index]}
            </Select.Option>,
          );
        }
        const month = value.month();

        const year = value.year();
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
          options.push(
            <Select.Option key={i} value={i} className="year-item">
              {i}
            </Select.Option>,
          );
        }

        return (
          <div style={{ padding: 5 }}>
            <div>Custom header </div>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={newYear => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={String(month)}
              onChange={selectedMonth => {
                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10));
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>

            <Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
              <Button value="month">Month</Button>
              <Button value="year">Year</Button>
            </Group>
          </div>
        );
      }}
      onPanelChange={onPanelChange}
    />
  </div>,
  mountNode,
);
```
