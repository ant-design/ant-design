---
order: 1
title:
  zh-CN: 可以自定义显示
  en-US: Custom trigger
---

## zh-CN

切换按钮和结果分开。

## en-US

Separate trigger button and result.

````jsx
import { Cascader } from 'antd';

const options = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
  }],
}];

const CitySwitcher = React.createClass({
  getInitialState() {
    return {
      text: '未选择',
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
          <a href="#">切换城市</a>
        </Cascader>
      </span>
    );
  },
});

ReactDOM.render(<CitySwitcher />, mountNode);
````
