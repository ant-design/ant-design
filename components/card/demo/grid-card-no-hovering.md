---
order: 6
title:
  zh-CN: 网卡没有盘旋
  en-US: Grid card no hovering
---

## zh-CN

一网格样式卡，不盘旋

## en-US

Grid style card with no hovering on the first and last grid items

````jsx
import { Card } from 'antd';

const gridStyle = {
  width: '100%',
  textAlign: 'center',
};

ReactDOM.render(
  <Card title="Card Title">
    <Card.Grid style={gridStyle} noHovering={true}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle} noHovering={true}>Content</Card.Grid>
  </Card>
, mountNode);
````
