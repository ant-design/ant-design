---
order: 99
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
import { TimePicker } from 'antd';
import moment from 'moment';
import { SmileOutlined } from '@ant-design/icons';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const icon = <SmileOutlined />;

ReactDOM.render(
  <TimePicker
    suffixIcon={icon}
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />,
  mountNode,
);
```
