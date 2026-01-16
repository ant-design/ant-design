# Select — 选择器

## 功能概述

下拉选择器。

## 应用场景

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio-cn/) 是更好的选择。
- 如果你在寻找一个可输可选的输入框，那你可能需要 [AutoComplete](/components/auto-complete-cn/)。

## 输入字段

### Select props 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean | { clearIcon?: ReactNode }，自定义清除按钮，默认 false，版本 5.8.0: 支持对象类型。
- `~~autoClearSearchValue~~`: boolean，是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效，默认 true。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义 Select 组件内部各语义化结构的 class，支持对象或函数。
- `defaultActiveFirstOption`: boolean，是否默认高亮第一个选项，默认 true。
- `defaultOpen`: boolean，是否默认展开下拉菜单。
- `defaultValue`: string | string\[] |<br />number | number\[] | <br />LabeledValue | LabeledValue\[]，指定默认选中的条目。
- `disabled`: boolean，是否禁用，默认 false。
- `~~popupClassName~~`: string，下拉菜单的 className 属性，使用 `classNames.popup.root` 替换，版本 4.23.0。
- `popupMatchSelectWidth`: boolean | number，下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动，默认 true，版本 5.5.0。
- `~~dropdownRender~~`: (originNode: ReactNode) => ReactNode，自定义下拉框内容，使用 `popupRender` 替换。
- `popupRender`: (originNode: ReactNode) => ReactNode，自定义下拉框内容，版本 5.25.0。
- `~~dropdownStyle~~`: CSSProperties，下拉菜单的 style 属性，使用 `styles.popup.root` 替换。
- `fieldNames`: object，自定义节点 label、value、options、groupLabel 的字段，默认 { label: `label`, value: `value`, options: `options`, groupLabel: `label` }，版本 4.17.0（`groupLabel` 在 5.6.0 新增）。
- `~~filterOption~~`: boolean | function(inputValue, option)，是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false。[示例](#select-demo-search)，默认 true。
- `~~filterSort~~`: (optionA: Option, optionB: Option, info: { searchValue: string }) => number，搜索时对筛选结果项的排序函数, 类似[Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)里的 compareFunction，版本 `searchValue`: 5.19.0。
- `getPopupContainer`: function(triggerNode)，菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0)，默认 () => document.body。
- `labelInValue`: boolean，是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式，默认 false。
- `listHeight`: number，设置弹窗滚动高度，默认 256。
- `loading`: boolean，加载中状态，默认 false。
- `maxCount`: number，指定可选中的最多 items 数量，仅在 `mode` 为 `multiple` 或 `tags` 时生效，版本 5.13.0。
- `maxTagCount`: number | `responsive`，最多显示多少个 tag，响应式模式会对性能产生损耗，版本 responsive: 4.10。
- `maxTagPlaceholder`: ReactNode | function(omittedValues)，隐藏 tag 时显示的内容。
- `maxTagTextLength`: number，最大显示的 tag 文本长度。
- `menuItemSelectedIcon`: ReactNode，自定义多选时当前选中的条目图标。
- `mode`: `multiple` | `tags`，设置 Select 的模式为多选或标签。
- `notFoundContent`: ReactNode，当下拉列表为空时显示的内容，默认 `Not Found`。
- `open`: boolean，是否展开下拉菜单。
- `~~optionFilterProp~~`: 已废弃，见 `showSearch.optionFilterProp`。
- `optionLabelProp`: string，回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。[示例](https://codesandbox.io/s/antd-reproduction-template-tk678)，默认 `children`。
- `options`: { label, value }\[]，数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能。
- `optionRender`: (option: FlattenOptionData\<BaseOptionType\> , info: { index: number }) => React.ReactNode，自定义渲染下拉选项，版本 5.11.0。
- `placeholder`: string，选择框默认文本。
- `placement`: `bottomLeft` `bottomRight` `topLeft` `topRight`，选择框弹出的位置，默认 bottomLeft。
- `prefix`: ReactNode，自定义前缀，版本 5.22.0。
- `removeIcon`: ReactNode，自定义的多选框清除图标。
- `~~searchValue~~`: string，控制搜索文本。
- `showSearch`: boolean | [Object](#showsearch)，配置是否可搜索，默认 单选为 false，多选为 true。
- `size`: `large` | `middle` | `small`，选择框大小，默认 `middle`。
- `status`: 'error' | 'warning'，设置校验状态，版本 4.19.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义 Select 组件内部各语义化结构的行内 style，支持对象或函数。
- `suffixIcon`: ReactNode，自定义的选择框后缀图标。以防止图标被用于其他交互，替换的图标默认不会响应展开、收缩事件，可以通过添加 `pointer-events: none` 样式透传，默认 `<DownOutlined />`。
- `tagRender`: (props) => ReactNode，自定义 tag 内容 render，仅在 `mode` 为 `multiple` 或 `tags` 时生效。
- `labelRender`: (props: LabelInValueType) => ReactNode，自定义当前选中的 label 内容 render （LabelInValueType的定义见 [LabelInValueType](https://github.com/react-component/select/blob/b39c28aa2a94e7754ebc570f200ab5fd33bd31e7/src/Select.tsx#L70)），版本 5.15.0。
- `tokenSeparators`: string\[]，自动分词的分隔符，仅在 `mode="tags"` 时生效。
- `value`: string | string\[] | <br />number | number\[] | <br />LabeledValue | LabeledValue\[]，指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新）。
- `variant`: `outlined` | `borderless` | `filled` | `underlined`，形态变体，默认 `outlined`，版本 5.13.0 | `underlined`: 5.24.0。
- `virtual`: boolean，设置 false 时关闭虚拟滚动，默认 true，版本 4.1.0。
- `onActive`: function(value: string | number | LabeledValue)，键盘和鼠标交互时触发。
- `onBlur`: function，失去焦点时回调。
- `onChange`: function(value, option:Option | Array<Option>)，选中 option，或 input 的 value 变化时，调用此函数。
- `onClear`: function，清除内容时回调，版本 4.6.0。
- `onDeselect`: function(value: string | number | LabeledValue)，取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple` 或 `tags` 模式下生效。
- `~~onDropdownVisibleChange~~`: (open: boolean) => void，展开下拉菜单的回调，使用 `onOpenChange` 替换。
- `onOpenChange`: (open: boolean) => void，展开下拉菜单的回调。
- `onFocus`: (event: FocusEvent) => void，获得焦点时回调。
- `onInputKeyDown`: (event: KeyboardEvent) => void，按键按下时回调。
- `onPopupScroll`: (event: UIEvent) => void，下拉列表滚动时的回调。
- `~~onSearch~~`: function(value: string)，文本框值变化时回调。
- `onSelect`: function(value: string | number | LabeledValue, option: Option)，被选中时调用，参数为选中项的 value (或 key) 值。

### showSearch 属性

#### 必填

- 无必填属性。

#### 可选

- `autoClearSearchValue`: boolean，是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效，默认 true。
- `filterOption`: boolean | function(inputValue, option)，是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false。[示例](#select-demo-search)，默认 true。
- `filterSort`: (optionA: Option, optionB: Option, info: { searchValue: string }) => number，搜索时对筛选结果项的排序函数, 类似[Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)里的 compareFunction，版本 `searchValue`: 5.19.0。
- `optionFilterProp`: string | string[]，搜索时过滤对应的 `option` 属性，如设置为 `children` 表示对内嵌内容进行搜索。<br/> 若通过 `options` 属性配置选项内容，建议设置 `optionFilterProp="label"` 来对内容进行搜索。<br/> 当传入 `string[]` 时多个字段进行 OR 匹配搜索，默认 `value`，版本 `string[]`: 6.1.0。
- `searchValue`: string，控制搜索文本。
- `onSearch`: function(value: string)，文本框值变化时回调。

### Option props 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，Option 器类名。
- `disabled`: boolean，是否禁用，默认 false。
- `title`: string，选项上的原生 title 提示。
- `value`: string | number，默认根据此属性值进行筛选。

### OptGroup props 属性

#### 必填

- 无必填属性。

#### 可选

- `key`: string，Key。
- `label`: React.ReactNode，组名。
- `className`: string，Option 器类名。
- `title`: string，选项上的原生 title 提示。

## 方法

- `blur()`: 取消焦点
- `focus()`: 获取焦点

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
