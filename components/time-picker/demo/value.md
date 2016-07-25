---
order: 1
title: 
  zh-CN: 受控组件
  en-US: Under control
---

`Value` and `onChange` should be used together, 

````jsx
import { TimePicker } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      value: null,
    };
  },
  onChange(time) {
    console.log(time);
    this.setState({ value: time });
  },
  render() {
    return <TimePicker value={this.state.value} onChange={this.onChange} />;
  },
});

ReactDOM.render(<Test />, mountNode);
````
