---
order: 1
title:
  zh-CN: 垂直
  en-US: Vertical
---

## zh-CN

垂直显示。

## en-US

Vertical pagination.

````jsx
import { Carousel } from 'antd';

ReactDOM.render(
  <Carousel vertical>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>
, mountNode);
````

````css
/* For demo */
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
````
