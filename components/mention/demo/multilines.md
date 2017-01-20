---
order: 5
title:
  zh-CN: 多行
  en-US: Multi-lines Mode
---

## zh-CN

多行模式，多行模式必须指定高度。

## en-US

Multi lines mode.

````__react
import { Mention } from 'antd';
const { toString } = Mention;

function onChange(editorState) {
  console.log(toString(editorState));
}

ReactDOM.render(
  <Mention
    style={{ width: '100%', height: 100 }}
    onChange={onChange}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
    multiLines
  />
, mountNode);
````
