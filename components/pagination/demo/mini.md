---
order: 4
title: 迷你
---

迷你版本。

````jsx
import { Pagination } from 'antd';

function showTotal(total) {
  return `共 ${total} 条`;
}

ReactDOM.render(<div>
  <Pagination size="small" total={50} />
  <br />
  <Pagination size="small" total={50} showSizeChanger showQuickJumper />
  <br />
  <Pagination size="small" total={50} showTotal={showTotal} />
</div>, mountNode);
````
