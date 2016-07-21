---
order: 0
title: 基本使用
---

## zh-CN

基本使用

## en-US

Basic usage.

````jsx
import { Mention } from 'antd';
const { toString, toEditorState } = Mention;

function onChange(editorState) {
  console.log(toString(editorState));
}

ReactDOM.render(
  <Mention
    style={{ width: 500, height: 100 }}
    onChange={onChange}
    defaultValue={toEditorState('@afc163')}
    suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
  />
, mountNode);
````
