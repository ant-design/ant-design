---
order: 4
title: 参考对象
---

用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。

````jsx
import { Affix, Button } from 'antd';

const Demo = () => {
  return (
    <div style={{ height: 100, overflow: 'hidden' }}>
      <div style={{ height: '100%', overflowY: 'scroll' }} id="affix-target">
        <div style={{ height: 300, backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg)' }}>
          <br />
          <br />
          <br />
          <Affix target={() => document.getElementById('affix-target')} offsetTop={20}>
            <Button type="primary">固定在容器顶部</Button>
          </Affix>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
````
