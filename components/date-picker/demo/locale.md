---
order: 10
title: 国际化
---

通过 `locale` 配置时区、语言等, 默认支持 `en_US`，`zh_CN`。

````jsx
import { DatePicker } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';

const App = React.createClass({
  render() {
    const customLocale = {
      timezoneOffset: 0 * 60,
      firstDayOfWeek: 0,
      minimalDaysInFirstWeek: 1,
    };
    return <DatePicker locale={{ ...enUS, ...customLocale }} />;
  }
});

ReactDOM.render(<App />, mountNode);
````
