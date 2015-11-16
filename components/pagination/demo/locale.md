# 国际化

- order: 6

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { Pagination } from 'antd';
import enUS from 'antd/lib/pagination/locale/en_US';

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination onChange={onChange} total={50} locale={enUS} />,
 document.getElementById('components-pagination-demo-locale'));
````
