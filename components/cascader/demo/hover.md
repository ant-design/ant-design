---
order: 2
title:
  zh-CN: 移入展开
  en-US: Hover
---

## zh-CN

通过移入展开下级菜单，点击完成选择。

## en-US

Hover to expand sub menu, click to select option.

````jsx
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

// 只展示最后一项
function displayRender(label) {
  return label[label.length - 1];
}

ReactDOM.render(
  <Cascader options={options} expandTrigger="hover"
    displayRender={displayRender} onChange={onChange}
  />
, mountNode);
````
