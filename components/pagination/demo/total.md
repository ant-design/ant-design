---
order: 9
title: 总数
---

通过设置 `showTotal` 展示总共有多少数据。

````jsx
import { Pagination, Select } from 'antd';

ReactDOM.render(
  <Pagination
    selectComponentClass={Select}
    total={80}
    showTotal={total => `共 ${total} 条`}
    pageSize={20} defaultCurrent={1}
  />,
  mountNode
);
````
