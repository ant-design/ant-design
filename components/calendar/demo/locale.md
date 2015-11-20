# 国际化

- order: 4

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { Calendar } from 'antd';
import enUS from 'antd/lib/calendar/locale/en_US';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <Calendar onPanelChange={onPanelChange} locale={enUS}/>
, document.getElementById('components-calendar-demo-locale'));
````
