---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。通过 options 设置自动完成的数据源

## en-US

Basic Usage, set data source of autocomplete with `options` property.

```tsx
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

function mockVal(str: string, repeat: number = 1) {
  return {
    value: str.repeat(repeat),
  };
}

class Complete extends React.Component {
  state = {
    value: '',
    options: [],
  };

  onSearch = searchText => {
    this.setState({
      options: !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { options, value } = this.state;

    return (
      <div>
        <AutoComplete
          options={[]}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={this.onSearch}
          placeholder="input here"
        />
        <br />
        <br />
        <AutoComplete
          value={value}
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={this.onSearch}
          onChange={this.onChange}
          placeholder="control mode"
        />
      </div>
    );
  }
}

ReactDOM.render(<Complete />, mountNode);
```
