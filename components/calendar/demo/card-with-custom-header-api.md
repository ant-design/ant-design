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
import { Calendar, Select } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <Calendar
      fullscreen={false}
      renderHeader={returnData => (
        <div style={{ padding: 10, border: '1px solid #d9d9d9' }} ref={returnData.ref}>
          <Select defaultValue="Mar" onChange={returnData.monthChange} style={{ width: '100px' }}>
            {returnData.months.map(item => (
              <Select.Option key={`${item.index}`}>{item.month}</Select.Option>
            ))}
          </Select>
          <Select onChange={returnData.yearChange} style={{ width: '100px' }}>
            {returnData.years.map(item => (
              <Select.Option key={`${item.index}`}>{item.index}</Select.Option>
            ))}
          </Select>
          {returnData.typeSwitch}
        </div>
      )}
      onPanelChange={onPanelChange}
    />
  </div>,
  mountNode,
);
```
