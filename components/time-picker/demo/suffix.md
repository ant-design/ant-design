---
order: 12
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

## en-US

Click `TimePicker`, and then we could select or input a time in panel.

```jsx
import { TimePicker, Icon } from 'antd';
import moment from 'moment';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const icon = <Icon type="smile" />;

ReactDOM.render(
  <TimePicker
    suffixIcon={icon}
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />,
  mountNode,
);
```
