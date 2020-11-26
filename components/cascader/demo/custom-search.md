---
order: 12
title:
  zh-CN: 自定义搜索
  en-US: Custom Search
---

## zh-CN

可以直接监听`onSearch`事件，自己实现搜索逻辑

## en-US

You can directly listen `onSearch` events and implement search logic yourself

```jsx
import { Cascader, Row, Col } from 'antd';
import { useState } from 'react';

const CustomSearchCascaders = () => {
  const originOptions = [
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
  const [options1, setOptions1] = useState(originOptions);
  const [options2, setOptions2] = useState(originOptions);
  const [options3, setOptions3] = useState(originOptions);
  function flattenTree(opts, props, ancestor = []) {
    let flattenOptions = [];
    opts.forEach(option => {
      const path = ancestor.concat(option);
      if (props.changeOnSelect || !option.children || !option.children.length) {
        flattenOptions.push(path);
      }
      if (option.children) {
        flattenOptions = flattenOptions.concat(flattenTree(option.children, props, path));
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
  function highlightKeyword(str, keyword) {
    return str.split(keyword).map((node, index) =>
      index === 0
        ? node
        : [
            <span style={{ color: 'blue' }} key="seperator">
              {keyword}
            </span>,
            node,
          ],
    );
  }
  const flattenOptions = flattenTree(originOptions, { changeOnSelect: false });
  function search(val) {
    const filtered = [];
    flattenOptions.forEach(path => {
      const match = filter(val, path);
      if (match) {
        filtered.push(path);
      }
    });
    const result = filtered.map(path => ({
      __IS_FILTERED_OPTION: true,
      path,
      value: path.map(o => o.value),
      label: path.map((option, index) => {
        const { label } = option;
        const node = label.indexOf(val) > -1 ? highlightKeyword(label, val) : label;
        return index === 0 ? node : [' / ', node];
      }),
      disabled: path.some(o => !!o.disabled),
      isEmptyNode: true,
    }));
    return result;
  }
  function onSearch1(val) {
    const result = search(val);
    setOptions1(result);
  }
  function onSearch2(val) {
    const result = search(val);
    setOptions2(result);
  }
  function onSearch3(val) {
    const result = search(val);
    setOptions3(result);
  }
  return (
    <Row gutter={[12, 18]}>
      <Col span={24}>
        <Cascader
          options={options1}
          onChange={onChange}
          onSearch={onSearch1}
          placeholder="Please select"
          showSearch
        />
      </Col>
      <Col span={24}>
        <Cascader
          options={options2}
          onChange={onChange}
          onSearch={onSearch2}
          placeholder="Please select"
          showSearch
        />
      </Col>
      <Col span={24}>
        <Cascader
          options={options3}
          onChange={onChange}
          onSearch={onSearch3}
          placeholder="Please select"
          showSearch
        />
      </Col>
    </Row>
  );
};
ReactDOM.render(<CustomSearchCascaders />, mountNode);
```
