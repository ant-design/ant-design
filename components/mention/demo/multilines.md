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

function onChange(editorState, value) {
  console.log(value);
}

ReactDOM.render(
  <Mention
    style={{ width: '100%', height: 200 }}
    onChange={onChange}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
    multiLines
  />,
  mountNode
);
````
