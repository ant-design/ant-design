---
order: 100
title:
  zh-CN: 加载中状态 bug 还原
  en-US: Loading style bug
debug: true
---

## zh-CN

https://github.com/ant-design/ant-design/issues/36165

## en-US

https://github.com/ant-design/ant-design/issues/36165

```jsx
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const Text1 = () => '部署';
const Text2 = () => <span>部署</span>;
const Text3 = () => 'Submit';

const App = () => (
  <>
    <Button loading>部署</Button>
    <Button loading>
      <Text1 />
    </Button>
    <Button loading>
      <Text2 />
    </Button>
    <Button loading>
      <Text3 />
    </Button>
    <Button loading icon={<PoweroffOutlined />}>
      <Text1 />
    </Button>
    <Button loading>按钮</Button>
  </>
);

export default App;
```
