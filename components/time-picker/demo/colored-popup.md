---
order: 9
title:
  zh-CN: 色付きポップアップ
  en-US: Colored Popup
debug: true
---

## zh-CN

カスタムクラスを `TimePicker`ポップアップに渡す

## en-US

Passing custom class to `TimePicker` popup

```jsx
import { TimePicker } from 'antd';
import moment from 'moment';

const onChange = (time, timeString) => {
  console.log(time, timeString);
};

export default () => (
  <TimePicker
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
    popupClassName="myCustomClassName"
  />
);
```

```css
.myCustomClassName .ant-picker-time-panel-cell-inner {
  color: red !important;
}
```
