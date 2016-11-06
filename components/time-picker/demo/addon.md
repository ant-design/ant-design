---
order: 7
title:
  zh-CN: 附加内容
  en-US: Addon
---

## zh-CN

在 TimePicker 选择框底部显示自定义的内容。

## en-US

Render addon contents to timepicker panel's bottom.


````jsx
import { TimePicker, Button } from 'antd';

function onChange(time, timeString) {
  console.log(time, timeString);
}

ReactDOM.render(
  <TimePicker
    allowEmpty={false}
    onChange={onChange}
    addon={panel => (
      <div className="components-time-picker-demo-button">
        <Button size="small" onClick={() => panel.close()}>Ok</Button>
      </div>
    )}
  />
, mountNode);
````

<style>
.components-time-picker-demo-button {
  padding: 5px;
  text-align: right;
}
</style>
