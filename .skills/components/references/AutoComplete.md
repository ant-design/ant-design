# AutoComplete — 自动完成

## 功能概述

输入框自动完成功能。

## 应用场景

- 需要一个输入框而不是选择器。
- 需要输入建议/辅助提示。
- 和 Select 的区别是。
- AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助**输入**。
- Select 是在限定的可选项中进行选择，关键词是**选择**。

## 输入字段

### AutoComplete 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，支持清除，默认 false，版本 5.8.0: 支持对象形式。
- `backfill`: boolean，使用键盘选择选项的时候把选中项回填到输入框中，默认 false。
- `children`: HTMLInputElement | HTMLTextAreaElement | React.ReactElement<InputProps>，自定义输入框，默认 <Input />。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultActiveFirstOption`: boolean，是否默认高亮第一个选项，默认 true。
- `defaultOpen`: boolean，是否默认展开下拉菜单。
- `defaultValue`: string，指定默认选中的条目。
- `disabled`: boolean，是否禁用，默认 false。
- `~~dropdownRender~~`: (originNode: ReactNode) => ReactNode，自定义下拉框内容，使用 `popupRender` 替换，版本 4.24.0。
- `popupRender`: (originNode: ReactNode) => ReactNode，自定义下拉框内容。
- `~~popupClassName~~`: string，下拉菜单的 className 属性，使用 `classNames.popup.root` 替换，版本 4.23.0。
- `~~dropdownStyle~~`: CSSProperties，下拉菜单的 style 属性，使用 `styles.popup.root` 替换。
- `popupMatchSelectWidth`: boolean | number，下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动，默认 true。
- `~~filterOption~~`: boolean | function(inputValue, option)，是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false，默认 true。
- `getPopupContainer`: function(triggerNode)，菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0)，默认 () => document.body。
- `notFoundContent`: ReactNode，当下拉列表为空时显示的内容。
- `open`: boolean，是否展开下拉菜单。
- `options`: { label, value }\[]，数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能。
- `placeholder`: string，输入框提示。
- `showSearch`: true | [Object](#showsearch)，搜索配置，默认 true。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `size`: `large` | `middle` | `small`，控件大小。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `value`: string，指定当前选中的条目。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0。
- `virtual`: boolean，设置 false 时关闭虚拟滚动，默认 true，版本 4.1.0。
- `onBlur`: function()，失去焦点时的回调。
- `onChange`: function(value)，选中 option，或 input 的 value 变化时，调用此函数。
- `~~onDropdownVisibleChange~~`: (open: boolean) => void，展开下拉菜单的回调，使用 `onOpenChange` 替换。
- `onOpenChange`: (open: boolean) => void，展开下拉菜单的回调。
- `onFocus`: function()，获得焦点时的回调。
- `~~onSearch~~`: function(value)，搜索补全项的时候调用。
- `onSelect`: function(value, option)，被选中时调用，参数为选中项的 value 值。
- `onClear`: function，清除内容时的回调，版本 4.6.0。
- `onInputKeyDown`: (event: KeyboardEvent) => void，按键按下时回调。
- `onPopupScroll`: (event: UIEvent) => void，下拉列表滚动时的回调。

### showSearch 属性

#### 必填

- 无必填属性。

#### 可选

- `filterOption`: boolean | function(inputValue, option)，是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false，默认 true。
- `onSearch`: function(value)，搜索补全项的时候调用。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

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
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />

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

      <AutoComplete options={options} style={{ width: 200 }} onSearch={onSearch}>
        <Input.TextArea placeholder="input here" style={{ height: 50 }} />
      </AutoComplete>

      <AutoComplete
        style={{ width: 200 }}
        options={[{ value: 'test@example.com' }, { value: 'test@example.org' }]}
        placeholder="Email"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />

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
