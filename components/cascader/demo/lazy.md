---
order: 9
title:
  zh-CN: 动态加载选项
  en-US: Load Options Lazily
---

## zh-CN

使用 `loadData` 实现动态加载选项。

> 注意：`loadData` 与 `showSearch` 无法一起使用。

## en-US

Load options lazily with `loadData`.

> Note: `loadData` cannot work with `showSearch`.

````jsx
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  isLeaf: false,
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  isLeaf: false,
}];

class LazyOptions extends React.Component {
  state = {
    options,
  };

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      }, {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      }];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }

  render() {
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}

ReactDOM.render(<LazyOptions />, mountNode);
````
