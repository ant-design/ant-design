# 国际化

- order: 7

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { Pagination } from 'antd';
import enUS from 'antd/lib/pagination/locale/en_US';

ReactDOM.render(
  <Pagination defaultCurrent={1} total={50} locale={enUS} />,
 document.getElementById('components-pagination-demo-locale'));
````
