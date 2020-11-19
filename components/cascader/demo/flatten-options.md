---
order: 12
title:
  zh-CN: 设置flattenOptions
  en-US: Set flattenOptions
---

## zh-CN

当你在同一个页面使用多个支持搜索的该组件，可通过统一计算`flattenOptions`并传入组件来优化渲染耗时

## en-US

When you use multiple components that support search on the same page, you can optimize the rendering time by calculating `flattenOptions` and passing in the component.

```jsx
import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];
function flattenTree(opts, props, ancestor = []) {
  const names = { label: 'label', value: 'value', children: 'children' };
  let flattenOptions = [];
  const childrenName = names.children;
  opts.forEach(option => {
    const path = ancestor.concat(option);
    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }
    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}
function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
}

function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}
const flattenOptions = flattenTree(options, {});
ReactDOM.render(
  <>
    <Cascader
      options={options}
      flattenOptions={flattenOptions}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{ filter }}
    />
    <br />
    <br />
    <Cascader
      options={options}
      flattenOptions={flattenOptions}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{ filter }}
    />
    <br />
    <br />
    <Cascader
      options={options}
      flattenOptions={flattenOptions}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{ filter }}
    />
    <br />
    <br />
    <Cascader
      options={options}
      flattenOptions={flattenOptions}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{ filter }}
    />
    <br />
    <br />
    <Cascader
      options={options}
      flattenOptions={flattenOptions}
      onChange={onChange}
      placeholder="Please select"
      showSearch={{ filter }}
    />
  </>,
  mountNode,
);
```
