---
order: 2
title:
  zh-CN: 可以自定义显示
  en-US: Custom trigger
---

## zh-CN

切换按钮和结果分开。

## en-US

Separate trigger button and result.

````__react
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
  }],
}];

const CitySwitcher = React.createClass({
  getInitialState() {
    return {
      text: 'Unselect',
    };
  },
  onChange(value, selectedOptions) {
    this.setState({
      text: selectedOptions.map(o => o.label).join(', '),
    });
  },
  render() {
    return (
      <span>
        {this.state.text}
        &nbsp;
        <Cascader options={options} onChange={this.onChange}>
          <a href="#">Change city</a>
        </Cascader>
      </span>
    );
  },
});

ReactDOM.render(<CitySwitcher />, mountNode);
````
