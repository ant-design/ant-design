---
order: 1
title: 自定义样式
---

可以自定义置顶按钮的样式，限制宽高: 40px * 40px。(右下角蓝色按钮)

````jsx
import { BackTop } from 'antd';

const style = {
  height: 40,
  width: 40,
  borderRadius: 3,
  backgroundColor: '#57c5f7',
  color: '#fff',
  textAlign: 'center',
  fontSize: 20,
};

const onClick = (e) => {
  console.log(e);
};

ReactDOM.render(
  <BackTop onClick={onClick} style={{ bottom: 100 }}>
    <div style={style}>UP</div>
  </BackTop>
, mountNode);
````
