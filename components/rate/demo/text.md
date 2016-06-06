---
order: 2
title: 文案展现
---

给评分组件加上文案展示。

````jsx
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
        {value && <span className="ant-rate-text">{value} 星</span>}
      </span>
    );
  },
});

ReactDOM.render(<Rater />, mountNode);
````
