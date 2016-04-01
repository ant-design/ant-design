---
order: 9
title: 总数
---

通过设置 `showTotal` 展示总共有多少数据。

````jsx
import { Pagination, Select } from 'antd';

function showTotal(total) {
  return `共 ${total} 条`;
}

ReactDOM.render(
  <Pagination
    selectComponentClass={Select}
    total={80}
    showTotal={showTotal}
    pageSize={20} defaultCurrent={1} />,
  mountNode
);
````
