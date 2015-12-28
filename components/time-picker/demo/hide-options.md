# 只显示部分选项

- order: 6

通过 `hideDisabledOptions` 将不可选的选项隐藏。

---

````jsx
import { TimePicker } from 'antd';

function newArray(start, end) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledMinutes() {
  return newArray(0, 60).filter(value => value % 10 !== 0);
}

function disabledSeconds() {
  return newArray(0, 60).filter(value => value % 30 !== 0);
}

ReactDOM.render(
  <TimePicker disabledMinutes={disabledMinutes} disabledSeconds={disabledSeconds} hideDisabledOptions />
, document.getElementById('components-time-picker-demo-hide-options'));
````
