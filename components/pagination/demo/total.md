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

````__react
import { Pagination } from 'antd';

ReactDOM.render(
<div>
  <Pagination
    total={85}
    showTotal={total => `Total ${total} items`}
    pageSize={20}
    defaultCurrent={1}
  />
  <br />
  <Pagination
    total={85}
    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    pageSize={20}
    defaultCurrent={1}
  />
</div>
, mountNode);
````
