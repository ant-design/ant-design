# AutoComplete — 自动完成

## 功能概述

输入框自动完成功能。

## 输入字段

### 可选

- `options`: { value, label, disabled }[]，数据源。
- `value`: string，输入框值（受控）。
- `defaultValue`: string，默认值。
- `placeholder`: string，占位符。
- `allowClear`: boolean | { clearIcon }，允许清除。
- `disabled`: boolean，禁用。
- `status`: string，状态，可选 `error` | `warning`。
- `variant`: string，形态变体，可选 `outlined` | `borderless` | `filled`，默认 `outlined`。
- `defaultOpen`: boolean，默认打开下拉。
- `open`: boolean，是否打开下拉（受控）。
- `defaultActiveFirstOption`: boolean，是否默认高亮第一个选项，默认 `true`。
- `backfill`: boolean，键盘选择时把选中项回填到输入框。
- `filterOption`: boolean | (inputValue, option) => boolean，筛选选项。
- `notFoundContent`: ReactNode，无匹配时显示内容。
- `popupClassName`: string，下拉类名。
- `popupMatchSelectWidth`: boolean | number，下拉宽度匹配，默认 `true`。
- `getPopupContainer`: (node) => HTMLElement，下拉容器。
- `children`: ReactNode，自定义输入框。
- `onSelect`: (value, option) => void，选中选项回调。
- `onChange`: (value) => void，值变化回调。
- `onSearch`: (value) => void，搜索回调。
- `onFocus`: () => void，聚焦回调。
- `onBlur`: () => void，失焦回调。
- `onDropdownVisibleChange`: (open) => void，下拉显示变化回调。
- `onClear`: () => void，清除回调。

## 使用建议

需要输入建议时使用；配合 filterOption 过滤选项；自定义输入框使用 children。

## 示例代码

```tsx
import { useState } from 'react';
import { AutoComplete, Input, Space } from 'antd';
import type { AutoCompleteProps } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [anotherOptions, setAnotherOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSearch = (searchText: string) => {
    setOptions(getPanelValue(searchText));
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 基础用法 */}
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />

      {/* 自定义选项 */}
      <AutoComplete
        style={{ width: 200 }}
        options={[
          { value: 'Burns Bay Road' },
          { value: 'Downing Street' },
          { value: 'Wall Street' },
        ]}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />

      {/* 自定义输入框 */}
      <AutoComplete options={options} style={{ width: 200 }} onSearch={onSearch}>
        <Input.TextArea placeholder="input here" style={{ height: 50 }} />
      </AutoComplete>

      {/* 不区分大小写 */}
      <AutoComplete
        style={{ width: 200 }}
        options={[{ value: 'test@example.com' }, { value: 'test@example.org' }]}
        placeholder="Email"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />

      {/* 查询模式 - 带分类 */}
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={500}
        style={{ width: 250 }}
        options={[
          {
            label: 'Libraries',
            options: [
              { label: 'AntDesign', value: 'AntDesign' },
              { label: 'AntDesign UI', value: 'AntDesign UI' },
            ],
          },
          {
            label: 'Solutions',
            options: [{ label: 'AntDesign solutions', value: 'AntDesign solutions' }],
          },
        ]}
        placeholder="input here"
      />
    </Space>
  );
};
```

## 返回结果

渲染一个自动完成输入框组件。
