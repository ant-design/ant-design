---
order: 5
title:
  zh-CN: 查询模式 - 不确定类目
  en-US: Lookup-Patterns - Uncertain Category
---

## zh-CN

[查询模式: 不确定类目](https://ant.design/docs/spec/reaction#Lookup-Patterns) 示例。

## en-US

Demonstration of [Lookup Patterns: Uncertain Category](https://ant.design/docs/spec/reaction#Lookup-Patterns).

```jsx
import { Input, AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((item, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });
}

class Complete extends React.Component {
  state = {
    options: [],
  };

  handleSearch = value => {
    this.setState({
      options: value ? searchResult(value) : [],
    });
  };

  render() {
    const { options } = this.state;
    return (
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={options}
        onSelect={onSelect}
        onSearch={this.handleSearch}
      >
        <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete>
    );
  }
}

ReactDOM.render(<Complete />, mountNode);
```
