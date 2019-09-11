---
order: 5
title:
  zh-CN: 搜索框 loading
  en-US: Search box with loading
---

## zh-CN

搜索框 loading

## en-US

search loading when onSearch

```jsx
import { Input } from 'antd';

const { Search } = Input;

class InputSearch extends React.Component {
  state = {
    loading: false,
  };

  onSearch = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2000);
  };

  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={this.onSearch}
          style={{ width: 200 }}
          loading={this.state.loading}
        />
        <br />
        <br />
        <Search
          placeholder="input search text"
          onSearch={this.onSearch}
          loading={this.state.loading}
          enterButton
        />
        <br />
        <br />
        <Search
          placeholder="input search text"
          onSearch={this.onSearch}
          loading={this.state.loading}
          enterButton="Search"
        />
      </div>
    );
  }
}

ReactDOM.render(<InputSearch />, mountNode);
```
