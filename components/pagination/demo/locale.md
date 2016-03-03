# 国际化

- order: 7

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { Pagination, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Pagination defaultCurrent={1} total={50} />
  </LocaleProvider>,
 mountNode);
````
