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

```jsx
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
        <Radio key="a" value={1}>A</Radio>
        <Radio key="b" value={2}>B</Radio>
        <Radio key="c" value={3}>C</Radio>
        <Radio key="d" value={4}>D</Radio>
      </RadioGroup>
    );
  },
});

ReactDOM.render(<App />, mountNode);
```
