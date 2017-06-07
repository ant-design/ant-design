---
order: 1
title:
  zh-CN: 类型
  en-US: Type
---

## zh-CN

支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。

## en-US

Image, Icon and letter are supported, and the latter two kinds avatar can have custom colors and background colors.

````jsx
import { Avatar, Row, Col } from 'antd';

ReactDOM.render(
  <div>
    <Row>
      <Col span={4}><Avatar icon="user" /></Col>
      <Col span={4}><Avatar>U</Avatar></Col>
      <Col span={4}><Avatar>USER</Avatar></Col>
      <Col span={4}><Avatar src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png" /></Col>
    </Row>
    <Row>
      <Col span={4}><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar></Col>
      <Col span={4}><Avatar style={{ backgroundColor: '#87d068' }} icon="user" /></Col>
    </Row>
  </div>
, mountNode);
````
