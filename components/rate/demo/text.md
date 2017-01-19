---
order: 2
title:
  zh-CN: 文案展现
  en-US: Show copywriting
---

## zh-CN

给评分组件加上文案展示。

## en-US

Add copywriting in rate components.

````__react
import { Rate } from 'antd';

const Rater = React.createClass({
  getInitialState() {
    return {
      value: 3,
      count: null,
    };
  },
  handleChange(value) {
    this.setState({ value });
  },
  render() {
    const { value } = this.state;
    return (
      <span>
        <Rate onChange={this.handleChange} value={value} />
        {value && <span className="ant-rate-text">{value} stars</span>}
      </span>
    );
  },
});

ReactDOM.render(<Rater />, mountNode);
````
