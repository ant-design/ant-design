# Cascader — 级联选择

## 功能概述

级联选择框。

## 应用场景

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## 输入字段

### Cascader 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，支持清除，默认 true，版本 5.8.0: 支持对象形式。
- `~~autoClearSearchValue~~`: boolean，是否在选中项后清空搜索框，只在 `multiple` 为 `true` 时有效，默认 true，版本 5.9.0。
- `changeOnSelect`: boolean，单选时生效（multiple 下始终都可以选择），点选每级菜单选项值都会发生变化，默认 false。
- `className`: string，自定义类名。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultOpen`: boolean，是否默认展示浮层。
- `defaultValue`: string\[] | number\[]，默认的选中项，默认 \[]。
- `disabled`: boolean，禁用，默认 false。
- `displayRender`: (label, selectedOptions) => ReactNode，选择后展示的渲染函数，默认 label => label.join(`/`)，版本 `multiple`: 4.18.0。
- `tagRender`: ({ label: string, onClose: function, value: string }) => ReactNode，自定义 tag 内容 render，仅在多选时生效。
- `~~popupClassName~~`: string，自定义浮层类名，使用 `classNames.popup.root` 替换，版本 4.23.0。
- `~~dropdownRender~~`: (menus: ReactNode) => ReactNode，自定义下拉框内容，请使用 `popupRender` 替换，版本 4.4.0。
- `popupRender`: (menus: ReactNode) => ReactNode，自定义下拉框内容。
- `~~dropdownStyle~~`: CSSProperties，下拉菜单的 style 属性，使用 `styles.popup.root` 替换。
- `expandIcon`: ReactNode，自定义次级菜单展开图标，版本 4.4.0。
- `expandTrigger`: string，次级菜单的展开方式，可选 'click' 和 'hover'，默认 `click`。
- `fieldNames`: object，自定义 options 中 label value children 的字段，默认 { label: `label`, value: `value`, children: `children` }。
- `getPopupContainer`: function(triggerNode)，菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010)，默认 () => document.body。
- `loadData`: (selectedOptions) => void，用于动态加载选项，无法与 `showSearch` 一起使用。
- `maxTagCount`: number | `responsive`，最多显示多少个 tag，响应式模式会对性能产生损耗，版本 4.17.0。
- `maxTagPlaceholder`: ReactNode | function(omittedValues)，隐藏 tag 时显示的内容，版本 4.17.0。
- `maxTagTextLength`: number，最大显示的 tag 文本长度，版本 4.17.0。
- `notFoundContent`: ReactNode，当下拉列表为空时显示的内容，默认 `Not Found`。
- `open`: boolean，控制浮层显隐，版本 4.17.0。
- `options`: [Option](#option)\[]，可选项数据源。
- `placeholder`: string，输入框占位文本。
- `placement`: `bottomLeft` `bottomRight` `topLeft` `topRight`，浮层预设位置，默认 `bottomLeft`，版本 4.17.0。
- `prefix`: ReactNode，自定义前缀，版本 5.22.0。
- `showSearch`: boolean | [Object](#showsearch)，在选择框中显示搜索框，默认 false。
- `size`: `large` | `middle` | `small`，输入框大小。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `suffixIcon`: ReactNode，自定义的选择框后缀图标。
- `value`: string\[] | number\[]，指定选中项。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `onChange`: (value, selectedOptions) => void，选择完成后的回调。
- `~~onDropdownVisibleChange~~`: (value) => void，显示/隐藏浮层的回调，请使用 `onOpenChange` 替换，版本 4.17.0。
- `onOpenChange`: (value) => void，显示/隐藏浮层的回调。
- `multiple`: boolean，支持多选节点，版本 4.17.0。
- `showCheckedStrategy`: `Cascader.SHOW_PARENT` | `Cascader.SHOW_CHILD`，定义选中项回填的方式（仅在 `multiple` 为 `true` 时生效）。`Cascader.SHOW_CHILD`: 只显示选中的子节点。`Cascader.SHOW_PARENT`: 只显示父节点（当父节点下所有子节点都选中时），默认 `Cascader.SHOW_PARENT`，版本 4.20.0。
- `removeIcon`: ReactNode，自定义的多选框清除图标。
- `~searchValue~`: string，设置搜索的值，需要与 `showSearch` 配合使用，版本 4.17.0。
- `~onSearch~`: (search: string) => void，监听搜索，返回输入的值，版本 4.17.0。
- `~~dropdownMenuColumnStyle~~`: CSSProperties，下拉菜单列的样式，请使用 `popupMenuColumnStyle` 替换。
- `popupMenuColumnStyle`: CSSProperties，下拉菜单列的样式。
- `optionRender`: (option: Option) => React.ReactNode，自定义渲染下拉选项，版本 5.16.0。

### showSearch 属性

#### 必填

- 无必填属性。

#### 可选

- `autoClearSearchValue`: boolean，是否在选中项后清空搜索框，只在 `multiple` 为 `true` 时有效，默认 true，版本 5.9.0。
- `filter`: function(inputValue, path): boolean，接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false。
- `limit`: number | false，搜索结果展示数量，默认 50。
- `matchInputWidth`: boolean，搜索结果列表是否与输入框同宽（[效果](https://github.com/ant-design/ant-design/issues/25779)），默认 true。
- `render`: function(inputValue, path): ReactNode，用于渲染 filter 后的选项。
- `sort`: function(a, b, inputValue)，用于排序 filter 后的选项。
- `searchValue`: string，设置搜索的值，需要与 `showSearch` 配合使用，版本 4.17.0。
- `onSearch`: (search: string) => void，监听搜索，返回输入的值，版本 4.17.0。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

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
    <Cascader options={options} showSearch placeholder="搜索城市" />

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
      <Cascader
        options={options}
        value={value}
        onChange={setValue}
        multiple
        maxTagCount="responsive"
        placeholder="多选级联"
      />

      <Cascader options={options} onChange={console.log} disabled placeholder="禁用" />

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
    <Cascader
      options={options}
      displayRender={(labels) => labels.join(' > ')}
      placeholder="自定义显示格式"
    />

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

    <Cascader options={options} changeOnSelect placeholder="选择即改变" />
  </>
);
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

    <Cascader options={options} showSearch placeholder="Search" />

    <Cascader options={options} multiple placeholder="Multiple" />
  </>
);
```

## 返回结果

渲染一个级联选择器，用于多级数据选择。
