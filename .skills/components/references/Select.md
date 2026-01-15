# Select — 选择器

## 功能概述

下拉选择器，用于代替原生选择器或提供更优雅的多选体验。支持单选、多选、搜索、远程数据加载等功能。

## 核心概念

### 选择数据流

```
用户点击 Select
     ↓
 弹出选项列表
     ↓
 用户搜索/过滤 (如果 showSearch=true)
     ↓
 用户选择选项
     ↓
 onChange 回调触发
     ↓
 value 更新
```

### 关键数据结构

```tsx
interface Option {
  label: ReactNode; // 选项显示文本
  value: string | number | boolean;
  disabled?: boolean; // 是否禁用
  children?: Option[]; // 分组选项
}

interface LabeledValue {
  label: React.ReactNode;
  value: string | number;
}
```

## 输入字段

### 必填

无必填字段，但通常需要提供 `options` 或 `children`。

### 可选

- `options`: { label, value, disabled? }[]，选项数据。
- `value`: string | string[] | LabeledValue，当前值（受控模式）。
- `defaultValue`: 同上，默认值（非受控模式）。
- `mode`: string，模式，可选 `multiple` | `tags`，默认单选。
- `placeholder`: string，占位文本。
- `size`: string，尺寸，可选 `large` | `middle` | `small`，默认 `middle`。
- `variant`: string，形态变体（5.13.0+），可选 `outlined` | `borderless` | `filled` | `underlined`，默认 `outlined`。
- `showSearch`: boolean，是否支持搜索。
- `filterOption`: boolean | (input, option) => boolean，筛选逻辑。
- `optionFilterProp`: string，搜索时过滤的属性名，默认 `value`。
- `allowClear`: boolean | { clearIcon }，允许清除。
- `loading`: boolean，加载中状态。
- `disabled`: boolean，禁用状态。
- `status`: string，校验状态，可选 `error` | `warning`。
- `maxCount`: number，最多选中项数（5.13.0+）。
- `maxTagCount`: number | `responsive`，最多显示标签数。
- `maxTagPlaceholder`: ReactNode | (omittedValues) => ReactNode，隐藏标签占位内容。
- `virtual`: boolean，虚拟滚动，默认 `true`。
- `listHeight`: number，下拉列表高度，默认 `256`。
- `dropdownRender`: (menu) => ReactNode，自定义下拉内容。
- `notFoundContent`: ReactNode，空状态内容。
- `onChange`: (value, option) => void，选中变化回调。
- `onSearch`: (value) => void，搜索变化回调。
- `onSelect`: (value, option) => void，选中某项回调。
- `onDeselect`: (value, option) => void，取消选中回调。
- `onDropdownVisibleChange`: (open) => void，下拉展开收起回调。
- `labelRender`: (props) => ReactNode，自定义选中标签渲染。
- `optionRender`: (option, info) => ReactNode，自定义选项渲染。

### Select.Option 属性（children 模式）

- `value`: string | number，选项值。
- `label`: ReactNode，选项标签。
- `disabled`: boolean，禁用状态。

### Select.OptGroup 属性

- `label`: ReactNode，分组标签。

## 常见选择模式

| 模式 | mode       | 说明                 | 典型场景      |
| ---- | ---------- | -------------------- | ------------- |
| 单选 | -          | 选中一个值           | 国家/城市选择 |
| 多选 | 'multiple' | 选中多个值，显示标签 | 权限/兴趣多选 |
| 标签 | 'tags'     | 支持创建新选项       | 标签输入      |

### 搜索配置

| 配置             | 说明           | 用法                                  |
| ---------------- | -------------- | ------------------------------------- |
| showSearch       | 启用搜索框     | showSearch={true}                     |
| filterOption     | 自定义过滤函数 | filterOption={(input, option) => ...} |
| optionFilterProp | 搜索时的属性   | optionFilterProp="label" \| "value"   |

## 常见场景示例

### 场景 1: 基础单选

```tsx
import { Select } from 'antd';

const options = [
  { value: '1', label: '选项 1' },
  { value: '2', label: '选项 2' },
  { value: '3', label: '选项 3' },
];

const BasicSelect: React.FC = () => (
  <Select
    style={{ width: 200 }}
    placeholder="请选择"
    options={options}
    onChange={(value) => console.log(value)}
  />
);
```

### 场景 2: 多选模式

```tsx
import { useState } from 'react';
import { Select } from 'antd';

const MultipleSelect: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="请选择多个选项"
      value={value}
      onChange={setValue}
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ]}
      maxTagCount={2}
    />
  );
};
```

### 场景 3: 搜索和过滤

```tsx
import { Select } from 'antd';

const SearchableSelect: React.FC = () => (
  <Select
    showSearch
    placeholder="搜索选项"
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      { value: 'jack', label: 'Jack Chen' },
      { value: 'lucy', label: 'Lucy Liu' },
      { value: 'tom', label: 'Tom Hanks' },
    ]}
  />
);
```

### 场景 4: 远程搜索加载

```tsx
import { useRef, useState } from 'react';
import { Select } from 'antd';

const RemoteSelect: React.FC = () => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const handleSearch = (value: string) => {
    clearTimeout(debounceTimer.current);
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);
    debounceTimer.current = setTimeout(() => {
      fetch(`/api/search?q=${value}`)
        .then((res) => res.json())
        .then((data) => setOptions(data))
        .finally(() => setLoading(false));
    }, 500);
  };

  return (
    <Select
      showSearch
      placeholder="远程搜索"
      onSearch={handleSearch}
      loading={loading}
      options={options}
      filterOption={false}
    />
  );
};
```

### 场景 5: 分组选项

```tsx
import { Select } from 'antd';

const GroupedSelect: React.FC = () => (
  <Select
    placeholder="选择水果"
    options={[
      {
        label: '热带水果',
        options: [
          { value: 'mango', label: '芒果' },
          { value: 'banana', label: '香蕉' },
        ],
      },
      {
        label: '温带水果',
        options: [
          { value: 'apple', label: '苹果' },
          { value: 'pear', label: '梨' },
        ],
      },
    ]}
  />
);
```

### 场景 6: 标签模式（创建新选项）

```tsx
import { useState } from 'react';
import { Select } from 'antd';

const TagSelect: React.FC = () => {
  const [options, setOptions] = useState([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]);
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (newValue: string[]) => {
    const notExist = newValue.find((v) => !options.find((opt) => opt.value === v));
    if (notExist) {
      setOptions([...options, { value: notExist, label: notExist }]);
    }
    setValue(newValue);
  };

  return (
    <Select
      mode="tags"
      value={value}
      onChange={handleChange}
      options={options}
      placeholder="输入创建新标签"
    />
  );
};
```

## AI 生成指引

### 场景判断表

| 需求     | 推荐配置        | 关键属性                              |
| -------- | --------------- | ------------------------------------- |
| 简单单选 | 基础 Select     | options, onChange, placeholder        |
| 多选选项 | mode="multiple" | mode, maxTagCount                     |
| 需要搜索 | showSearch=true | showSearch, filterOption              |
| 远程搜索 | 结合 onSearch   | loading, onSearch, filterOption=false |
| 创建新项 | mode="tags"     | mode, onChange                        |
| 分组显示 | optgroup 结构   | options with nested 结构              |

### 类型导入

```tsx
import type {
  DefaultOptionType, // 选项类型
  LabeledValue, // 标签值类型
  SelectProps, // Select props 类型
  SelectValue, // 选择值类型
} from 'antd/es/select';
```

## 使用建议

优先使用 `options` 属性而非 `children`；大数据量时确保 `virtual` 开启；远程搜索时配合 `loading` 和 `onSearch` 使用；多选时考虑使用 `maxTagCount` 控制显示。

## 示例代码

```tsx
import { Select, Space } from 'antd';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
];

const App: React.FC = () => (
  <Space wrap>
    <Select
      style={{ width: 200 }}
      placeholder="Please select"
      options={options}
      onChange={(value) => console.log(value)}
    />
    <Select
      mode="multiple"
      style={{ width: 300 }}
      placeholder="Multiple select"
      options={options}
    />
  </Space>
);
```

## 返回结果

渲染一个下拉选择器，支持单选、多选和搜索等交互。
