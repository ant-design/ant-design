---
order: 1
title: 图标按钮
---

`Button` 内可以嵌套图标，图标可以放在文字前、后，也可以单独存在。

````jsx
import { Button } from 'antd';

ReactDOM.render(<div>
  <Button type="primary" shape="circle" icon="search" />
  <Button type="primary" icon="search">按钮</Button>
  <br />
  <Button type="ghost" shape="circle-outline" icon="search" />
  <Button type="ghost" icon="search">按钮</Button>
</div>, mountNode);
````

<style>
#components-button-demo-icon .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
