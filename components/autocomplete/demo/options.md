---
order: 2
title: 自定义选项
---

 Datasource 的每一项是一个 `Autocomplete.Option`。通过 `Autocomplete.Option` 自定义下拉菜单。

````jsx
import { Autocomplete } from 'antd';
const Option = Autocomplete.Option;

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
    return (<Autocomplete style={{ width: 200 }}
      dataSource={dataSource}
      onChange={this.handleChange} />
    );
  },
});
ReactDOM.render(
  <Complete />
, mountNode);
````
