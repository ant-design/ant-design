---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic
---

## zh-CN

基本使用

## en-US

Basic usage.

````jsx
import { Mentions, Row, Col, Input } from 'antd';

function onChange(value) {
  console.log('Change:', value);
}

function onSelect(option) {
  console.log('select', option);
}

ReactDOM.render(
  <Row>
    <Col span={12}>
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        defaultValue="@afc163"
      />
    </Col>
    <Col span={12}>
      <Input />
    </Col>
  </Row>,
  mountNode
);
````
