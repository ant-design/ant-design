# 搜索框

- order: 9

带有搜索按钮。

---

````jsx
import { Input, Select, Button, Icon } from 'antd';
import jsonp from 'jsonp';
import querystring from 'querystring';
const Option = Select.Option;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://suggest.taobao.com/sug?${str}`, (err, d) => {
      if (currentValue === value) {
        const result = d.result;
        const data = [];
        result.forEach((r) => {
          data.push({
            value: r[0],
            text: r[0],
          });
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

const SearchInput = React.createClass({
  getInitialState() {
    return {
      data: [],
    };
  },

  handleChange(value) {
    fetch(value, (data) => {
      this.setState({
        data,
      });
    });
  },

  render() {
    const data = this.state.data;
    const options = data.map((d) => {
      return <Option key={d.value}>{d.text}</Option>;
    });
    return (
      <Input.Group className="ant-search-input" style={this.props.style}>
        <Select
          combobox
          searchPlaceholder={this.props.placeholder}
          notFoundContent=""
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={this.handleChange}
          onFocus={this.handleFocusBlur}
          onBlur={this.handleFocusBlur}>
          {options}
        </Select>
        <div className="ant-input-group-wrap">
          <Button className="ant-search-btn">
            <Icon type="search" />
          </Button>
        </div>
      </Input.Group>
    );
  },
});

ReactDOM.render(
  <SearchInput placeholder="input search text" style={{ width: 200 }} />
, mountNode);
````
