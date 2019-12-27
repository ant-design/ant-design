---
order: 4
title:
  zh-CN: 查询模式 - 确定类目
  en-US: Lookup-Patterns - Certain Category
---

## zh-CN

[查询模式: 确定类目](https://ant.design/docs/spec/reaction#Lookup-Patterns) 示例。

## en-US

Demonstration of [Lookup Patterns: Certain Category](https://ant.design/docs/spec/reaction#Lookup-Patterns). Basic Usage, set options of autocomplete with `options` property.

```tsx
import { Input, AutoComplete } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const { Option, OptGroup } = AutoComplete;

function renderTitle(title: string) {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
}

function renderItem(title: string, count: number) {
  return {
    value: title,
    label: (
      <>
        {title}
        <span className="certain-search-item-count">
          <UserOutlined /> {count}
        </span>
      </>
    ),
  };
}

const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)],
  },
];

function Complete() {
  return (
    <div className="certain-category-search-wrapper" style={{ width: 250 }}>
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={500}
        style={{ width: '100%' }}
        options={options}
      >
        <Input
          size="large"
          suffix={<SearchOutlined className="certain-category-icon" />}
          placeholder="input here"
        />
      </AutoComplete>
    </div>
  );
}

ReactDOM.render(<Complete />, mountNode);
```

```css
.certain-category-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix {
  right: 12px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}

.certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}

.certain-category-search.ant-select-focused .certain-category-icon {
  color: #108ee9;
}

.certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
```
