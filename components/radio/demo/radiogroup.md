---
order: 1
title:
  zh-CN: RadioGroup 组合
  en-US: RadioGroup group
-----------------------

## zh-CN

一组互斥的 Radio 配合使用。

## en-US

A set of mutually exclusive Radio with the use of

```__react
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

const App = React.createClass({
  getInitialState() {
    return {
      value: 1,
    };
  },
  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  },
  render() {
    return (
      <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>
    );
  },
});

ReactDOM.render(<App />, mountNode);
```
