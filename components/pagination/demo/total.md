---
order: 9
title:
  zh-CN: 总数
  en-US: Total number
---

## zh-CN

通过设置 `showTotal` 展示总共有多少数据。

## en-US

You can show the total number of data by setting `showTotal`.

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
