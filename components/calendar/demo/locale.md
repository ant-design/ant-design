---
order: 3
title:
  zh-CN: 国际化
  en-US: Localization
---

## zh-CN

通过 `LocaleProvider` 配置语言。

## en-US

To set the language.

````jsx
import { Calendar, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment';
// It's recommended to set moment locale globally, otherwise, you need to set it by `value` or `defaultValue`
// moment.locale('en');

function onPanelChange(value, mode) {
  console.log(value, mode);
}
ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Calendar
      defaultValue={moment().locale('en')}
      onPanelChange={onPanelChange}
    />
  </LocaleProvider>,
  mountNode
);
````
