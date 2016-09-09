---
order: 10
title:
  zh-CN: 国际化
  en-US: Locale
---

## zh-CN

通过 `locale` 语言, 默认支持 `en_US`，`zh_CN`。

moment 会自动使用当前时区，如果需要使用别的时区，则需要自行设置，设置方法请参考 [moment 官方文档](http://momentjs.com/)。

## en-US

Use locale to set the language. `en_US`, `zh_CN` are supported by default.

moment will use your time zone automatically. If you want to set other time zone, please set it by yourself. [More](http://momentjs.com/)


````jsx
import { DatePicker } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment';
// It's recommended to set moment locale and time zone globally,
// otherwise, you need to set it by `value` or `defaultValue` or `defaultPickerValue`.
// moment.locale('en');

const log = console.log.bind(console);

ReactDOM.render(
  <DatePicker
    defaultPickerValue={moment().locale('en').utcOffset(0)}
    locale={enUS}
    showTime
    onChange={log}
  />,
  mountNode
);
````
