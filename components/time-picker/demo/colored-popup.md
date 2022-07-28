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

```tsx
import { TimePicker } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import React from 'react';

const onChange = (time: Moment, timeString: string) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
    popupClassName="myCustomClassName"
  />
);

export default App;
```

```css
.myCustomClassName .ant-picker-time-panel-cell-inner {
  color: red !important;
}
```
