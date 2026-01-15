# Cascader — 级联选择

## 功能概述

级联选择框，用于从一组相关联的数据集合进行选择，常用于省市区选择、组织结构等多层级数据选择场景。

## 核心概念

### 级联选择流程

```
点击输入框
     ↓
 打开下拉菜单（第一级）
     ↓
 选择第一级选项
     ↓
 显示第二级选项
     ↓
 ...逐级选择...
     ↓
 选择最后一级
     ↓
 onChange 回调 + 关闭菜单
```

### 关键数据结构

```tsx
// 级联选项结构
interface CascaderOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  children?: CascaderOption[]; // 子选项
  isLeaf?: boolean; // 是否叶子节点（动态加载）
}

// 级联选择值（路径）
type CascaderValue = (string | number)[]; // e.g., ['zhejiang', 'hangzhou', 'xihu']

// onChange 事件信息
interface CascaderChangeInfo {
  value: CascaderValue | CascaderValue[];
  selectedOptions: CascaderOption[] | CascaderOption[][]; // 选中的选项路径
}

// showSearch 配置
interface ShowSearchConfig {
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;
  render?: (inputValue: string, path: CascaderOption[]) => ReactNode;
  sort?: (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number;
  matchInputWidth?: boolean;
  limit?: number | false;
}
```

## 输入字段

### 必填

- `options`: CascaderOption[]，可选项数据源。

### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | CascaderValue | - | 当前值（受控） |
| `defaultValue` | CascaderValue | - | 默认值 |
| `placeholder` | string | `'请选择'` | 占位文本 |
| `size` | `'large'` \| `'middle'` \| `'small'` | `'middle'` | 尺寸 |
| `variant` | `'outlined'` \| `'borderless'` \| `'filled'` | `'outlined'` | 形态变体 |
| `disabled` | boolean | false | 禁用状态 |
| `status` | `'error'` \| `'warning'` | - | 校验状态 |
| `allowClear` | boolean \| { clearIcon } | true | 允许清除 |
| `showSearch` | boolean \| ShowSearchConfig | false | 搜索功能 |
| `changeOnSelect` | boolean | false | 选择即改变，默认只有选择末级节点才触发 |
| `expandTrigger` | `'click'` \| `'hover'` | `'click'` | 展开触发方式 |
| `multiple` | boolean | false | 多选模式（4.17.0+） |
| `maxTagCount` | number \| `'responsive'` | - | 最多显示标签数 |
| `maxTagPlaceholder` | ReactNode \| (omittedValues) => ReactNode | - | 隐藏标签占位 |
| `open` | boolean | - | 控制下拉显示（受控） |
| `notFoundContent` | ReactNode | `'Not Found'` | 空状态内容 |

### 自定义配置

- `displayRender`: (labels, selectedOptions) => ReactNode，自定义显示渲染。
- `fieldNames`: { label, value, children }，自定义字段名。
- `loadData`: (selectedOptions) => Promise<void>，动态加载选项。
- `dropdownRender`: (menus) => ReactNode，自定义下拉框内容。
- `tagRender`: (props) => ReactNode，自定义标签渲染。
- `optionRender`: (option) => ReactNode，自定义选项渲染（5.17.0+）。

### 下拉配置

- `popupClassName`: string，下拉类名。
- `popupPlacement`: string，下拉位置。
- `getPopupContainer`: (node) => HTMLElement，下拉容器。
- `popupStyle`: CSSProperties，下拉样式。

### 事件回调

- `onChange`: (value, selectedOptions) => void，选择变化回调。
- `onSearch`: (inputValue) => void，搜索变化回调（5.17.0+）。
- `onOpenChange`: (open) => void，下拉展开收起回调。

## 常见场景示例

### 场景 1: 基础级联选择（省市区）

```tsx
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'shangcheng', label: 'Shangcheng' },
        ],
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        children: [{ value: 'jiangbei', label: 'Jiangbei' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men' }],
      },
    ],
  },
];

const App: React.FC = () => (
  <Cascader
    options={options}
    onChange={(value, selectedOptions) => {
      console.log('Value:', value);
      console.log('SelectedOptions:', selectedOptions);
    }}
    placeholder="选择城市"
  />
);
```

### 场景 2: 受控和默认值

```tsx
import { useState } from 'react';
import { Button, Cascader, Space } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu']);

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setValue(['zhejiang', 'hangzhou', 'xihu'])}>设置值</Button>
        <Button onClick={() => setValue([])}>清除</Button>
      </Space>

      <Cascader options={options} value={value} onChange={setValue} placeholder="受控级联选择" />
    </>
  );
};
```

### 场景 3: 搜索功能

```tsx
import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
          { value: 'shangcheng', label: 'Shangcheng' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men' }],
      },
    ],
  },
];

const App: React.FC = () => (
  <>
    {/* 基础搜索 */}
    <Cascader options={options} showSearch placeholder="搜索城市" />

    {/* 自定义搜索 */}
    <Cascader
      options={options}
      showSearch={{
        filter: (inputValue, path) =>
          path.some((option) => option.label.toLowerCase().includes(inputValue.toLowerCase())),
      }}
      placeholder="自定义搜索"
    />
  </>
);
```

### 场景 4: 动态加载

```tsx
import { useState } from 'react';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
  isLeaf?: boolean;
}

const App: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    {
      value: 'parent1',
      label: 'Parent 1',
      isLeaf: false,
    },
    {
      value: 'parent2',
      label: 'Parent 2',
      isLeaf: false,
    },
  ]);

  const onLoadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // 模拟异步加载
    setTimeout(() => {
      targetOption.children = [
        {
          label: `${targetOption.label} - Child 1`,
          value: `${targetOption.value}-child1`,
          isLeaf: true,
        },
        {
          label: `${targetOption.label} - Child 2`,
          value: `${targetOption.value}-child2`,
          isLeaf: true,
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  return (
    <Cascader
      options={options}
      loadData={onLoadData}
      onChange={console.log}
      placeholder="动态加载"
    />
  );
};
```

### 场景 5: 多选和禁用

```tsx
import { useState } from 'react';
import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true, // 禁用此项
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men' }],
      },
    ],
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<(string | number)[][]>([]);

  return (
    <>
      {/* 多选 */}
      <Cascader
        options={options}
        value={value}
        onChange={setValue}
        multiple
        maxTagCount="responsive"
        placeholder="多选级联"
      />

      {/* 禁用状态 */}
      <Cascader options={options} onChange={console.log} disabled placeholder="禁用" />

      {/* 清除 */}
      <Cascader options={options} onChange={console.log} allowClear placeholder="允许清除" />
    </>
  );
};
```

### 场景 6: 自定义显示和渲染

```tsx
import { Cascader } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
];

const App: React.FC = () => (
  <>
    {/* 自定义显示 */}
    <Cascader
      options={options}
      displayRender={(labels) => labels.join(' > ')}
      placeholder="自定义显示格式"
    />

    {/* 自定义字段名 */}
    <Cascader
      options={[
        {
          id: 'zhejiang',
          name: 'Zhejiang',
          sub: [
            {
              id: 'hangzhou',
              name: 'Hangzhou',
              sub: [{ id: 'xihu', name: 'West Lake' }],
            },
          ],
        },
      ]}
      fieldNames={{ label: 'name', value: 'id', children: 'sub' }}
      placeholder="自定义字段名"
    />

    {/* 选择任意级 */}
    <Cascader options={options} changeOnSelect placeholder="选择即改变" />
  </>
);
```

## AI 生成指引

### 场景判断表

| 用户需求   | 选择方案         | 关键属性                      |
| ---------- | ---------------- | ----------------------------- |
| 简单级联   | Cascader 基础    | options, onChange             |
| 省市区选择 | 三级 options     | 嵌套 options 结构             |
| 搜索功能   | showSearch       | showSearch={true}             |
| 自定义搜索 | showSearch 对象  | showSearch={ filter, render } |
| 动态加载   | loadData         | loadData 函数，isLeaf         |
| 受控模式   | value + onChange | value, onChange               |
| 多选       | multiple         | multiple={true}               |
| 禁用项     | disabled         | options 中 disabled 属性      |
| 自定义显示 | displayRender    | displayRender 函数            |
| 自定义字段 | fieldNames       | fieldNames 对象               |
| 选择任意级 | changeOnSelect   | changeOnSelect={true}         |
| 悬停展开   | expandTrigger    | expandTrigger='hover'         |

### 类型导入

```tsx
import type {
  CascaderOptionType, // 选项类型
  CascaderProps, // Cascader 组件 props 类型
  CascaderValueType, // 值类型
} from 'antd';
```

## 使用建议

多级分类选择使用 Cascader；省市区选择是典型场景；大数据量使用 `loadData` 动态加载；需要搜索使用 `showSearch`；多选场景使用 `multiple={true}`；自定义字段名使用 `fieldNames`；选择任意级别使用 `changeOnSelect={true}`；在 Form 中配合 `Form.Item` 使用。

## 示例代码

```tsx
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men' }],
      },
    ],
  },
];

const App: React.FC = () => (
  <>
    <Cascader
      options={options}
      onChange={(value, selectedOptions) => console.log(value, selectedOptions)}
      placeholder="Please select"
    />

    {/* 搜索 */}
    <Cascader options={options} showSearch placeholder="Search" />

    {/* 多选 */}
    <Cascader options={options} multiple placeholder="Multiple" />
  </>
);
```

## 返回结果

渲染一个级联选择器，用于多级数据选择。
