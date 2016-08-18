---
order: 10
title: 
  zh-CN: 国际化
  en-US: Locale
---

## zh-CN

通过 `locale` 配置时区、语言等, 默认支持 `en_US`，`zh_CN`。

## en-US

Use locale to set the properties like time zone, language and etc. en_US, zh_CN are supported by default.


````jsx
import { DatePicker } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';

const customLocale = {
  timezoneOffset: 0 * 60,
  firstDayOfWeek: 0,
  minimalDaysInFirstWeek: 1,
};

ReactDOM.render(<DatePicker locale={{ ...enUS, ...customLocale }} />, mountNode);
````
