---
order: 6
title:
  zh-CN: 网格型内嵌卡片
  en-US: Grid card
---

## zh-CN

一种常见的卡片内容区隔模式。

## en-US

Grid style card content.

````jsx
import { Card } from 'antd';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

ReactDOM.render(
  <Card title="卡片标题" noHovering bodyStyle={{ padding: 0 }}>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
    <Card.Grid style={gridStyle}>卡片内容</Card.Grid>
  </Card>
, mountNode);
````
