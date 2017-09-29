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
import { Mention } from 'antd';
const { toString, toContentState } = Mention;

function onChange(contentState) {
  console.log(toString(contentState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

ReactDOM.render(
  <Mention
    style={{ width: '100%' }}
    onChange={onChange}
    defaultValue={toContentState('@afc163')}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
    onSelect={onSelect}
  />
, mountNode);
````
