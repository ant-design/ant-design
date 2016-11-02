---
order: 2
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
    <div className="view-port">
      <div id="scrollable-container">
        <div className="background">
          <br />
          <br />
          <br />
          <Affix target={() => document.getElementById('scrollable-container')} offsetTop={20}>
            <Button type="primary">Fixed at the top of container</Button>
          </Affix>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
````

<style>
#components-affix-demo-target .view-port {
  height: 100px;
  overflow: hidden;
}
#components-affix-demo-target #scrollable-container {
  height: 100%;
  overflow-y: scroll;
}
#components-affix-demo-target .background {
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}
</style>
