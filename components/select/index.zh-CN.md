---
category: Components
group: 数据录入
title: Select
subtitle: 选择器
description: 下拉选择器。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*qGSbQJ0POEsAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a6ggRInInJ4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio-cn/) 是更好的选择。
- 如果你在寻找一个可输可选的输入框，那你可能需要 [AutoComplete](/components/auto-complete-cn/)。

### 用法升级 <Badge>5.11.0+</Badge>

<!-- prettier-ignore -->
:::warning{title="升级提示"}
在 5.11.0 版本后，我们提供了 `<Select options={[...]} />` 的简写方式，有更好的性能和更方便的数据组织方式，开发者不再需要自行拼接 JSX。
同时我们废弃了原先的写法，你还是可以在 5.x 继续使用，但会在控制台看到警告，并会在 6.0 后移除。
:::

```tsx
// >=5.11.0 可用，推荐的写法 ✅
return (
  <Select
    onChange={onChange}
    options={[
      { value: '1', label: <span>Option 1</span> },
      { value: '2', label: <span>Option 2</span> },
    ]}
  />
);

// 5.x 可用，但是 >=5.11.0 时不推荐 🙅🏻‍♀️
return (
  <Select onChange={onChange}>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
  </Select>
);
```

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本使用</code>
<code src="./demo/search.tsx">带搜索框</code>
<code src="./demo/search-filter-option.tsx">自定义搜索</code>
<code src="./demo/multiple.tsx">多选</code>
<code src="./demo/size.tsx">三种大小</code>
<code src="./demo/option-render.tsx">自定义下拉选项</code>
<code src="./demo/search-sort.tsx">带排序的搜索</code>
<code src="./demo/tags.tsx">标签</code>
<code src="./demo/optgroup.tsx">分组</code>
<code src="./demo/coordinate.tsx">联动</code>
<code src="./demo/search-box.tsx">搜索框</code>
<code src="./demo/label-in-value.tsx">获得选项的文本</code>
<code src="./demo/automatic-tokenization.tsx">自动分词</code>
<code src="./demo/select-users.tsx">搜索用户</code>
<code src="./demo/suffix.tsx" version="5.22.0">前后缀</code>
<code src="./demo/custom-dropdown-menu.tsx">扩展菜单</code>
<code src="./demo/hide-selected.tsx">隐藏已选择选项</code>
<code src="./demo/variant.tsx" version="5.13.0">形态变体</code>
<code src="./demo/filled-debug.tsx" debug>Filled debug</code>
<code src="./demo/custom-tag-render.tsx">自定义选择标签</code>
<code src="./demo/custom-label-render.tsx">自定义选中 label</code>
<code src="./demo/responsive.tsx">响应式 maxTagCount</code>
<code src="./demo/big-data.tsx">大数据</code>
<code src="./demo/status.tsx">自定义状态</code>
<code src="./demo/placement.tsx">弹出位置</code>
<code src="./demo/placement-debug.tsx" debug>动态高度</code>
<code src="./demo/debug.tsx" debug>Debug 专用</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/option-label-center.tsx" debug>选项文本居中</code>
<code src="./demo/debug-flip-shift.tsx" iframe="200" debug>翻转+偏移</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/maxCount.tsx" version="5.13.0">最大选中数量</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Select props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 自定义清除按钮 | boolean \| { clearIcon?: ReactNode } | false | 5.8.0: 支持对象类型 |
| ~~autoClearSearchValue~~ | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效 | boolean | true |  |
| autoFocus | 默认获取焦点 | boolean | false |  |
| classNames | 用于自定义 Select 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | boolean | true |  |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |  |
| defaultValue | 指定默认选中的条目 | string \| string\[] \|<br />number \| number\[] \| <br />LabeledValue \| LabeledValue\[] | - |  |
| disabled | 是否禁用 | boolean | false |  |
| ~~popupClassName~~ | 下拉菜单的 className 属性，使用 `classNames.popup.root` 替换 | string | - | 4.23.0 |
| popupMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 | boolean \| number | true | 5.5.0 |
| ~~dropdownRender~~ | 自定义下拉框内容，使用 `popupRender` 替换 | (originNode: ReactNode) => ReactNode | - |  |
| popupRender | 自定义下拉框内容 | (originNode: ReactNode) => ReactNode | - | 5.25.0 |
| ~~dropdownStyle~~ | 下拉菜单的 style 属性，使用 `styles.popup.root` 替换 | CSSProperties | - |  |
| fieldNames | 自定义节点 label、value、options、groupLabel 的字段 | object | { label: `label`, value: `value`, options: `options`, groupLabel: `label` } | 4.17.0（`groupLabel` 在 5.6.0 新增） |
| ~~filterOption~~ | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false。[示例](#select-demo-search) | boolean \| function(inputValue, option) | true |  |
| ~~filterSort~~ | 搜索时对筛选结果项的排序函数, 类似[Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)里的 compareFunction | (optionA: Option, optionB: Option, info: { searchValue: string }) => number | - | `searchValue`: 5.19.0 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |  |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 { value: string, label: ReactNode } 的格式 | boolean | false |  |
| listHeight | 设置弹窗滚动高度 | number | 256 |  |
| loading | 加载中状态 | boolean | false |  |
| maxCount | 指定可选中的最多 items 数量，仅在 `mode` 为 `multiple` 或 `tags` 时生效 | number | - | 5.13.0 |
| maxTagCount | 最多显示多少个 tag，响应式模式会对性能产生损耗 | number \| `responsive` | - | responsive: 4.10 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode \| function(omittedValues) | - |  |
| maxTagTextLength | 最大显示的 tag 文本长度 | number | - |  |
| menuItemSelectedIcon | 自定义多选时当前选中的条目图标 | ReactNode | - |  |
| mode | 设置 Select 的模式为多选或标签 | `multiple` \| `tags` | - |  |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | `Not Found` |  |
| open | 是否展开下拉菜单 | boolean | - |  |
| ~~optionFilterProp~~ | 搜索时过滤对应的 `option` 属性，如设置为 `children` 表示对内嵌内容进行搜索。若通过 `options` 属性配置选项内容，建议设置 `optionFilterProp="label"` 来对内容进行搜索。 | string | `value` |  |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。[示例](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | `children` |  |
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | { label, value }\[] | - |  |
| optionRender | 自定义渲染下拉选项 | (option: FlattenOptionData\<BaseOptionType\> , info: { index: number }) => React.ReactNode | - | 5.11.0 |
| placeholder | 选择框默认文本 | string | - |  |
| placement | 选择框弹出的位置 | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| prefix | 自定义前缀 | ReactNode | - | 5.22.0 |
| removeIcon | 自定义的多选框清除图标 | ReactNode | - |  |
| ~~searchValue~~ | 控制搜索文本 | string | - |  |
| showSearch | 配置是否可搜索 | boolean \| [Object](#showsearch) | 单选为 false，多选为 true |  |
| size | 选择框大小 | `large` \| `middle` \| `small` | `middle` |  |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| styles | 用于自定义 Select 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | 自定义的选择框后缀图标。以防止图标被用于其他交互，替换的图标默认不会响应展开、收缩事件，可以通过添加 `pointer-events: none` 样式透传。 | ReactNode | `<DownOutlined />` |  |
| tagRender | 自定义 tag 内容 render，仅在 `mode` 为 `multiple` 或 `tags` 时生效 | (props) => ReactNode | - |  |
| labelRender | 自定义当前选中的 label 内容 render （LabelInValueType的定义见 [LabelInValueType](https://github.com/react-component/select/blob/b39c28aa2a94e7754ebc570f200ab5fd33bd31e7/src/Select.tsx#L70)） | (props: LabelInValueType) => ReactNode | - | 5.15.0 |
| tokenSeparators | 自动分词的分隔符，仅在 `mode="tags"` 时生效 | string\[] | - |  |
| value | 指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新） | string \| string\[] \| <br />number \| number\[] \| <br />LabeledValue \| LabeledValue\[] | - |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| virtual | 设置 false 时关闭虚拟滚动 | boolean | true | 4.1.0 |
| onActive | 键盘和鼠标交互时触发 | function(value: string \| number \| LabeledValue) | - |  |
| onBlur | 失去焦点时回调 | function | - |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value, option:Option \| Array&lt;Option>) | - |  |
| onClear | 清除内容时回调 | function | - | 4.6.0 |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 `multiple` 或 `tags` 模式下生效 | function(value: string \| number \| LabeledValue) | - |  |
| ~~onDropdownVisibleChange~~ | 展开下拉菜单的回调，使用 `onOpenChange` 替换 | (open: boolean) => void | - |  |
| onOpenChange | 展开下拉菜单的回调 | (open: boolean) => void | - |  |
| onFocus | 获得焦点时回调 | (event: FocusEvent) => void | - |  |
| onInputKeyDown | 按键按下时回调 | (event: KeyboardEvent) => void | - |  |
| onPopupScroll | 下拉列表滚动时的回调 | (event: UIEvent) => void | - |  |
| ~~onSearch~~ | 文本框值变化时回调 | function(value: string) | - |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value: string \| number \| LabeledValue, option: Option) | - |  |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentElement}` 将下拉弹层渲染节点固定在触发器的父元素中。

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoClearSearchValue | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效 | boolean | true |  |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false。[示例](#select-demo-search) | boolean \| function(inputValue, option) | true |  |
| filterSort | 搜索时对筛选结果项的排序函数, 类似[Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)里的 compareFunction | (optionA: Option, optionB: Option, info: { searchValue: string }) => number | - | `searchValue`: 5.19.0 |
| optionFilterProp | 搜索时过滤对应的 `option` 属性，如设置为 `children` 表示对内嵌内容进行搜索。若通过 `options` 属性配置选项内容，建议设置 `optionFilterProp="label"` 来对内容进行搜索。 | string | `value` |  |
| searchValue | 控制搜索文本 | string | - |  |
| onSearch | 文本框值变化时回调 | function(value: string) | - |  |

### Select Methods

| 名称    | 说明     | 版本 |
| ------- | -------- | ---- |
| blur()  | 取消焦点 |      |
| focus() | 获取焦点 |      |

### Option props

| 参数      | 说明                     | 类型             | 默认值 | 版本 |
| --------- | ------------------------ | ---------------- | ------ | ---- |
| className | Option 器类名            | string           | -      |      |
| disabled  | 是否禁用                 | boolean          | false  |      |
| title     | 选项上的原生 title 提示  | string           | -      |      |
| value     | 默认根据此属性值进行筛选 | string \| number | -      |      |

### OptGroup props

| 参数      | 说明                    | 类型            | 默认值 | 版本 |
| --------- | ----------------------- | --------------- | ------ | ---- |
| key       | Key                     | string          | -      |      |
| label     | 组名                    | React.ReactNode | -      |      |
| className | Option 器类名           | string          | -      |      |
| title     | 选项上的原生 title 提示 | string          | -      |      |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Select"></ComponentTokenTable>

## FAQ

### `mode="tags"` 模式下为何搜索有时会出现两个相同选项？ {#faq-tags-mode-duplicate}

这一般是 `options` 中的 `label` 和 `value` 不同导致的，你可以通过 `optionFilterProp="label"` 将过滤设置为展示值以避免这种情况。

### 点击 `dropdownRender` 里的元素，下拉菜单不会自动消失？ {#faq-dropdown-not-close}

你可以使用受控模式，手动设置 `open` 属性：[codesandbox](https://codesandbox.io/s/ji-ben-shi-yong-antd-4-21-7-forked-gnp4cy?file=/demo.js)。

### 反过来希望点击 `dropdownRender` 里元素不消失该怎么办？ {#faq-dropdown-keep-open}

Select 当失去焦点时会关闭下拉框，如果你可以通过阻止默认行为避免丢失焦点导致的关闭：

```tsx
<Select
  dropdownRender={() => (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      Some Content
    </div>
  )}
/>
```

### 自定义 Option 样式导致滚动异常怎么办？ {#faq-custom-option-scroll}

这是由于虚拟滚动默认选项高度为 `24px`，如果你的选项高度小于该值则需要通过 `listItemHeight` 属性调整，而 `listHeight` 用于设置滚动容器高度：

```tsx
<Select listItemHeight={10} listHeight={250} />
```

注意：`listItemHeight` 和 `listHeight` 为内部属性，如无必要，请勿修改该值。

### 为何无障碍测试会报缺失 `aria-` 属性？ {#faq-aria-attribute}

Select 无障碍辅助元素仅在弹窗展开时创建，因而当你在进行无障碍检测时请先打开下拉后再进行测试。对于 `aria-label` 与 `aria-labelledby` 属性缺失警告，请自行为 Select 组件添加相应无障碍属性。

Select 虚拟滚动会模拟无障碍绑定元素。如果需要读屏器完整获取全部列表，你可以设置 `virtual={false}` 关闭虚拟滚动，无障碍选项将会绑定到真实元素上。

### 使用 `tagRender` 生成的自定义标签，点击关闭时会呼出下拉框 {#faq-tagrender-dropdown}

如果你不希望点击某个元素后下拉框自动出现（例如关闭按钮），可以在其上阻止 `MouseDown` 事件的传播。

```tsx
<Select
  tagRender={(props) => {
    const { closable, label, onClose } = props;
    return (
      <span className="border">
        {label}
        {closable ? (
          <span
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="cursor-pointer"
          >
            ❎
          </span>
        ) : null}
      </span>
    );
  }}
/>
```
