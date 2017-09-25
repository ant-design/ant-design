---
order: 0
title:
  zh-CN: 向上展开
  en-US: Expand up
---

## zh-CN

向上展开建议。

## en-US

Expand the suggestions up.

````jsx
import { Mention } from 'antd';
const { toString } = Mention;

function onChange(contentState) {
  console.log(toString(contentState));
}

function onSelect(suggestion) {
  console.log('onSelect', suggestion);
}

ReactDOM.render(
  <Mention
    style={{ width: '100%', height: 100 }}
    onChange={onChange}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
    onSelect={onSelect}
    placement="top"
  />
, mountNode);
````
