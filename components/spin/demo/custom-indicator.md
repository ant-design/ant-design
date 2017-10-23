---
order: 0
title:
  zh-CN: 自定义指示符
  en-US: Custom spinning indicator
---

## zh-CN

使用自定义指示符。

## en-US

Use custom loading indicator.

````jsx
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;
const squareLoader = <div className="square-loader" />;

ReactDOM.render(
  <div>
    <Spin indicator={antIcon} />
    <Spin indicator={squareLoader} />
  </div>, mountNode);
````

```css
.square-loader {
  width: 24px;
  height: 24px;
  background-color: #108ee9;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
```
