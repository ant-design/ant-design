---
order: 1
title: 自定义样式
---

可以自定义回到顶部按钮的样式，限制宽高：`40px * 40px`。

````jsx
import { BackTop } from 'antd';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#57c5f7',
  color: '#fff',
  textAlign: 'center',
  fontSize: 20,
};

ReactDOM.render(
  <div>
    <BackTop style={{ bottom: 100 }}>
      <div style={style}>UP</div>
    </BackTop>
    向下滚动后，见右下角蓝色按钮
  </div>
, mountNode);
````
