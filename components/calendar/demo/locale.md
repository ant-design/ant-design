---
order: 4
title:
  zh-CN: 国际化
  en-US: locale
---

## zh-CN

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

## en-US

To set the properties like time zone, language and etc. en_US, zh_CN are supported by default.

````jsx
import { Calendar } from 'antd';
import enUS from 'antd/lib/calendar/locale/en_US';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <Calendar onPanelChange={onPanelChange} locale={enUS} />
, mountNode);
````
