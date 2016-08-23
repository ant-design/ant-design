---
order: 2
title:
  zh-CN: 自定义选项
  en-US: Customized
---

## zh-CN

Datasource 的每一项是一个 `AutoComplete.Option`。通过 `AutoComplete.Option` 自定义下拉菜单。

## en-US

Items in dataSource could be an `AutoComplete.Option`.


````jsx
import { AutoComplete } from 'antd';

const Option = AutoComplete.Option;

const Complete = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  handleChange(value) {
    let dataSource;
    if (!value || value.indexOf('@') >= 0) {
      dataSource = [];
    } else {
      dataSource = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({ dataSource });
  },
  render() {
    const { dataSource } = this.state;
    return (<AutoComplete
      style={{ width: 200 }}
      dataSource={dataSource}
      onChange={this.handleChange}
    />);
  },
});

ReactDOM.render(<Complete />, mountNode);
````
