---
order: 4
title:
  zh-CN: 滚动容器
  en-US: Container to scroll.
---

## zh-CN

用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。

## en-US

Set a `target` for 'Affix', which is listen to scroll event of target element (default is `window`). 

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
            <Button type="primary">Fixed at the top of container</Button>
          </Affix>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
````
