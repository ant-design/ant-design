---
order: 10
title: 
  zh-CN: 国际化
  en-US: Locale
---

## zh-CN

通过 `locale` 配置时区、语言等, 默认支持 `en_US`，`zh_CN`。不同版本带有不同的时区配置，如果所在时区与默认配置不同，需要自行设置。上面的 demo 就是在东八区使用 en_US 版本的例子。 

## en-US

Use locale to set the properties like time zone, language and etc. `en_US`, `zh_CN` are supported by default. There are different time zone configuration in different versions, you must set it by yourself if your time zone does not match the default setting. The example above is to show how to use the `en_US` version at GMT+8 time zone.


````jsx
import { DatePicker } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';

const customLocale = {
  timezoneOffset: 8 * 60,
  firstDayOfWeek: 0,
  minimalDaysInFirstWeek: 1,
};

ReactDOM.render(<DatePicker locale={{ ...enUS, ...customLocale }} />, mountNode);
````
