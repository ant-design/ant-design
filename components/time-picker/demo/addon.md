---
order: 6
title:
  zh-CN: 附加内容
  en-US: Addon
---

## zh-CN

在 TimePicker 选择框底部显示自定义的内容。

## en-US

Render addon contents to timepicker panel's bottom.

````__react
import { TimePicker, Button } from 'antd';

ReactDOM.render(
  <TimePicker
    addon={panel => (
      <Button size="small" type="primary" onClick={() => panel.close()}>
        Ok
      </Button>
    )}
  />
, mountNode);
````
