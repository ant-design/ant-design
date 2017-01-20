---
order: 4
title:
  zh-CN: 迷你
  en-US: Mini size
---

## zh-CN

迷你版本。

## en-US

Mini size pagination.

````__react
import { Pagination } from 'antd';

function showTotal(total) {
  return `Total ${total} items`;
}

ReactDOM.render(
  <div>
    <Pagination size="small" total={50} />
    <br />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <br />
    <Pagination size="small" total={50} showTotal={showTotal} />
  </div>
, mountNode);
````
