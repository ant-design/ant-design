---
order: 0
title: 基本使用
---

基本使用。通过 dataSource 设置自动完成的数据源

````jsx
import { Autocomplete } from 'antd';

const Complete = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  handleChange(value) {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  },
  render() {
    const { dataSource } = this.state;
    return (<Autocomplete dataSource={dataSource}
      style={{ width: 200 }}
      onChange={this.handleChange} />
    );
  },
});
ReactDOM.render(
  <Complete />
, mountNode);
````
