---
order: 1
title:
  zh-CN: 预设彩色标签
  en-US: Preset Color
---

## zh-CN

`antd@2.7.0` 之后，我们添加了多种预设色彩的标签样式，用作不同场景使用。

## en-US

After `antd@2.7.0`, We preset a series of colorful tag style for different situation usage.

````jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag presetColor="pink">pink</Tag>
    <Tag presetColor="red">red</Tag>
    <Tag presetColor="orange">orange</Tag>
    <Tag presetColor="yellow">yellow</Tag>
    <Tag presetColor="green">green</Tag>
    <Tag presetColor="cyan">cyan</Tag>
    <Tag presetColor="blue">blue</Tag>
    <Tag presetColor="purple">purple</Tag>
    <br />
    <Tag presetColor="pink-inverse">pink-inverse</Tag>
    <Tag presetColor="red-inverse">red-inverse</Tag>
    <Tag presetColor="orange-inverse">orange-inverse</Tag>
    <Tag presetColor="yellow-inverse">yellow-inverse</Tag>
    <Tag presetColor="green-inverse">green-inverse</Tag>
    <Tag presetColor="cyan-inverse">cyan-inverse</Tag>
    <Tag presetColor="blue-inverse">blue-inverse</Tag>
    <Tag presetColor="purple-inverse">purple-inverse</Tag>
  </div>,
  mountNode
);
````

````css
#components-demo-preset-color .ant-tag {
  text-transform: uppercase;
}
````
