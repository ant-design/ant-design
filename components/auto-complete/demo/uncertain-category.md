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
import { Button, Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
          <div className="global-search-item">
            <span className="global-search-item-desc">
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span className="global-search-item-count">{getRandomInt(200, 100)} results</span>
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
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          style={{ width: '100%' }}
          options={options}
          onSelect={onSelect}
          onSearch={this.handleSearch}
        >
          <Input
            suffix={
              <Button
                className="search-btn"
                style={{ marginRight: -12 }}
                size="large"
                type="primary"
              >
                <SearchOutlined />
              </Button>
            }
            size="large"
            placeholder="input here"
          />
        </AutoComplete>
      </div>
    );
  }
}

ReactDOM.render(<Complete />, mountNode);
```

```css
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

.global-search.ant-select-auto-complete .ant-select-selection--single {
  margin-right: -46px;
}

.global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input:not(:last-child) {
  padding-right: 62px;
}

.global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-item {
  display: flex;
}

.global-search-item-desc {
  flex: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}

.global-search-item-count {
  flex: none;
}
```
