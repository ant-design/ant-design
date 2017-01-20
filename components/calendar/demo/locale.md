---
order: 3
title:
  zh-CN: 国际化
  en-US: locale
---

## zh-CN

通过 `locale` 配置语言, 默认支持 en_US, zh_CN

## en-US

To set the language. en_US, zh_CN are supported by default.

````__react
import { Calendar } from 'antd';
import enUS from 'antd/lib/calendar/locale/en_US';
import moment from 'moment';
// It's recommended to set moment locale globally, otherwise, you need to set it by `value` or `defaultValue`
// moment.locale('en');

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <Calendar defaultValue={moment().locale('en')} onPanelChange={onPanelChange} locale={enUS} />
, mountNode);
````
