---
order: 0
title:
    zh-CN: 基本用法
    en-US: Basic
---

## zh-CN

简单的 checkbox。

## en-US

Basic usage of checkbox.

````jsx
import { Checkbox } from 'antd';
import { ThemeProvider } from 'styled-components';

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

ReactDOM.render(
  <div>
    <ThemeProvider theme={{ primaryColor: 'red' }}>
      <Checkbox onChange={onChange}>Checkbox</Checkbox>
    </ThemeProvider>
    <Checkbox onChange={onChange}>Checkbox</Checkbox>
  </div>
, mountNode);
````
