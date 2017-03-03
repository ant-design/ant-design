---
order: 4
title:
  zh-CN: 查询模式 - 不确定类目
  en-US: Lookup-Patterns - Uncertain Category
---

## zh-CN

[查询模式: 不确定类目](https://ant.design/docs/spec/reaction#Lookup-Patterns) 示例。

## en-US

Demonstration of [Lookup Patterns: Uncertain Category](https://ant.design/docs/spec/reaction#Lookup-Patterns).
Basic Usage, set datasource of autocomplete with `dataSource` property.

````jsx
import { Icon, Button, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;

function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return (new Array(getRandomInt(5))).join('.').split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      {item.query} 在
      <a
        href={`https://s.taobao.com/search?q=${item.query}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.category}
      </a>
      区块中
      <span className="global-search-item-count">约 {item.count} 个结果</span>
    </Option>
  );
}

class Complete extends React.Component {
  state = {
    dataSource: [],
  }

  handleChange = (value) => {
    if (value) {
      this.setState({
        dataSource: searchResult(value),
      });
    }
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={dataSource.map(renderOption)}
          onSelect={onSelect}
          onChange={this.handleChange}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}

ReactDOM.render(<Complete />, mountNode);
````

````css
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

.global-search.ant-select-auto-complete .ant-input {
  height: 40px;
  padding: 11px 12px;
}

.global-search.ant-select-auto-complete .ant-select-selection__placeholder {
  top: 20px;
  margin-left: 12px;
  margin-right: 12px;
}

.global-search .search-btn {
  font-size: 18px;
}

.global-search.ant-select-auto-complete .ant-select-selection--single {
  margin-right: -50px;
}

.global-search.ant-select-auto-complete .ant-input-preSuffix-wrapper .ant-input:not(:last-child) {
  padding-right: 62px;
}

.global-search.ant-select-auto-complete .ant-input-preSuffix-wrapper .ant-input-suffix {
  right: 0;
}

.global-search.ant-select-auto-complete .ant-input-preSuffix-wrapper .ant-input-suffix button {
  padding-top: 5px;
  padding-bottom: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-item-count {
 position: absolute;
 right: 16px;
}
````
