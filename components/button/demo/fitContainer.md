---
order: 9
title:
  zh-CN: fitContainer 按钮
  en-US: fitContainer Button
---

## zh-CN

`fitContainer`属性将使按钮适合其父宽度。

## en-US

`fitContainer` property will make the button fit to its parent width.

````jsx
import { Button } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary" fitContainer>Primary</Button>
    <Button fitContainer>Default</Button>
    <Button type="dashed" fitContainer>Dashed</Button>
    <Button type="danger" fitContainer>danger</Button>
  </div>,
  mountNode);
````
