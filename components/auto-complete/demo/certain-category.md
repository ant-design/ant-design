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
import { Input, AutoComplete } from '@allenai/varnish';
import { UserOutlined } from '@ant-design/icons';

const renderTitle = (title: string) => {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=ai2"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
};

const renderItem = (title: string, count: number) => {
  return {
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  };
};

const options = [
  {
    label: renderTitle('Libraries'),
    options: [renderItem('Varnish', 10000), renderItem('Varnish UI', 10600)],
  },
  {
    label: renderTitle('Solutions'),
    options: [renderItem('Varnish UI FAQ', 60100), renderItem('Varnish FAQ', 30010)],
  },
  {
    label: renderTitle('Articles'),
    options: [renderItem('Varnish design language', 100000)],
  },
];

const Complete: React.FC = () => (
  <AutoComplete
    dropdownClassName="certain-category-search-dropdown"
    dropdownMatchSelectWidth={500}
    style={{ width: 250 }}
    options={options}
  >
    <Input.Search size="large" placeholder="input here" />
  </AutoComplete>
);

ReactDOM.render(<Complete />, mountNode);
```

```css
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
```
