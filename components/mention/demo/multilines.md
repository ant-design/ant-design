---
order: 4
title: 多行
---

## zh-CN

多行模式，多行模式必须指定高度。

## en-US

Multi lines mode.

````jsx
import { Mention } from 'antd';
const { toString } = Mention;

function onChange(editorState) {
  console.log(toString(editorState));
}

ReactDOM.render(
  <Mention
    style={{ width: 500, height: 100 }}
    onChange={onChange}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
    multiLines
  />
, mountNode);
````
