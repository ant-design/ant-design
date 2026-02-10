---
category: Components
title: AutoComplete
subtitle: 自动完成
description: 输入框自动完成功能。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*g8THS4NpV6sAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WERTQ6qvgEYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: 数据录入
  order: 4
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 需要一个输入框而不是选择器。
- 需要输入建议/辅助提示。

和 Select 的区别是：

- AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助**输入**。
- Select 是在限定的可选项中进行选择，关键词是**选择**。

## 代码演示 {#examples}

### 基本使用

基本使用，通过 `options` 设置自动完成的数据源。

```tsx
import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [anotherOptions, setAnotherOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        showSearch={{
          onSearch: (text) => setOptions(getPanelValue(text)),
        }}
        placeholder="input here"
      />
      <br />
      <br />
      <AutoComplete
        value={value}
        showSearch={{ onSearch: (text) => setAnotherOptions(getPanelValue(text)) }}
        options={anotherOptions}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="control mode"
      />
    </>
  );
};

export default App;
```

### 自定义选项

可以返回自定义的 `Option` label

```tsx
import React from 'react';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';

const App: React.FC = () => {
  const [options, setOptions] = React.useState<AutoCompleteProps['options']>([]);
  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };
  return (
    <AutoComplete
      style={{ width: 200 }}
      showSearch={{ onSearch: handleSearch }}
      placeholder="input here"
      options={options}
    />
  );
};

export default App;
```

### 自定义输入组件

自定义输入组件。

```tsx
import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';

const { TextArea } = Input;

const App: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(
      !value ? [] : [{ value }, { value: value + value }, { value: value + value + value }],
    );
  };

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log('handleKeyPress', ev);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      showSearch={{ onSearch: handleSearch }}
    >
      <TextArea
        placeholder="input here"
        className="custom"
        style={{ height: 50 }}
        onKeyPress={handleKeyPress}
      />
    </AutoComplete>
  );
};

export default App;
```

### 不区分大小写

不区分大小写的 AutoComplete

```tsx
import React from 'react';
import { AutoComplete } from 'antd';

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const App: React.FC = () => (
  <AutoComplete
    style={{ width: 200 }}
    options={options}
    placeholder="try to type `b`"
    showSearch={{
      filterOption: (inputValue, option) =>
        option!.value.toUpperCase().includes(inputValue.toUpperCase()),
    }}
  />
);

export default App;
```

### 查询模式 - 确定类目

[查询模式: 确定类目](https://ant.design/docs/spec/reaction#lookup-patterns) 示例。

```tsx
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Flex, Input } from 'antd';

const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
  <Flex align="center" justify="space-between">
    {props.title}
    <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
      more
    </a>
  </Flex>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <Flex align="center" justify="space-between">
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </Flex>
  ),
});

const options = [
  {
    label: <Title title="Libraries" />,
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
  },
  {
    label: <Title title="Solutions" />,
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
  },
  {
    label: <Title title="Articles" />,
    options: [renderItem('AntDesign design language', 100000)],
  },
];

const App: React.FC = () => (
  <AutoComplete
    classNames={{
      popup: {
        root: 'certain-category-search-dropdown',
      },
    }}
    popupMatchSelectWidth={500}
    style={{ width: 250 }}
    options={options}
  >
    <Input.Search size="large" placeholder="input here" />
  </AutoComplete>
);

export default App;
```

### 查询模式 - 不确定类目

[查询模式: 不确定类目](https://ant.design/docs/spec/reaction#lookup-patterns) 示例。

```tsx
import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  Array.from({ length: getRandomInt(5) })
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query} on{' '}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const App: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{ width: 300 }}
      options={options}
      onSelect={onSelect}
      showSearch={{ onSearch: handleSearch }}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
  );
};

export default App;
```

### 自定义状态

使用 `status` 为 AutoComplete 添加状态，可选 `error` 或者 `warning`。

```tsx
import React, { useState } from 'react';
import { AutoComplete, Space } from 'antd';
import type { AutoCompleteProps } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const [anotherOptions, setAnotherOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <Space vertical style={{ width: '100%' }}>
      <AutoComplete
        options={options}
        showSearch={{
          onSearch: (text) => setOptions(getPanelValue(text)),
        }}
        status="error"
        style={{ width: 200 }}
      />
      <AutoComplete
        options={anotherOptions}
        showSearch={{
          onSearch: (text) => setAnotherOptions(getPanelValue(text)),
        }}
        status="warning"
        style={{ width: 200 }}
      />
    </Space>
  );
};

export default App;
```

### 多种形态

可选 `outlined` `filled` `borderless` `underlined` 四种形态。

```tsx
import React, { useState } from 'react';
import { AutoComplete, Flex } from 'antd';
import type { AutoCompleteProps } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <Flex vertical gap={12}>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        placeholder="Outlined"
        showSearch={{ onSearch: (text) => setOptions(getPanelValue(text)) }}
        onSelect={globalThis.console.log}
      />
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        placeholder="Filled"
        showSearch={{ onSearch: (text) => setOptions(getPanelValue(text)) }}
        onSelect={globalThis.console.log}
        variant="filled"
      />
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        placeholder="Borderless"
        showSearch={{ onSearch: (text) => setOptions(getPanelValue(text)) }}
        onSelect={globalThis.console.log}
        variant="borderless"
      />
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        placeholder="Underlined"
        onSearch={(text) => setOptions(getPanelValue(text))}
        onSelect={globalThis.console.log}
        variant="underlined"
      />
    </Flex>
  );
};

export default App;
```

### 自定义清除按钮

自定义清除按钮

```tsx
import React, { useState } from 'react';
import { CloseSquareFilled } from '@ant-design/icons';
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const App: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        showSearch={{ onSearch: (text) => setOptions(getPanelValue(text)) }}
        placeholder="UnClearable"
        allowClear={false}
      />
      <br />
      <br />
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        showSearch={{ onSearch: (text) => setOptions(getPanelValue(text)) }}
        placeholder="Customized clear icon"
        allowClear={{ clearIcon: <CloseSquareFilled /> }}
      />
    </>
  );
};

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 AutoComplete 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { AutoComplete, Flex } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border-radius: 4px;
  `,
}));

const stylesObject: AutoCompleteProps['styles'] = {
  popup: {
    root: { borderWidth: 1, borderColor: '#1890ff' },
    list: { backgroundColor: 'rgba(240,240,240, 0.85)' },
    listItem: { color: '#272727' },
  },
};

const stylesFn: AutoCompleteProps['styles'] = ({ props }) => {
  if (props.variant === 'filled') {
    return {
      popup: {
        root: { borderWidth: 1, borderColor: '#ccc' },
        list: { backgroundColor: 'rgba(240,240,240, 0.85)' },
        listItem: { color: '#272727' },
      },
    } satisfies AutoCompleteProps['styles'];
  }
  return {};
};

const options: AutoCompleteProps['options'] = [
  { value: 'Burnaby' },
  { value: 'Seattle' },
  { value: 'Los Angeles' },
  { value: 'San Francisco' },
  { value: 'Meet student' },
];

const App: React.FC = () => {
  const sharedProps: AutoCompleteProps = {
    options,
    classNames: {
      root: classNames.root,
    },
    style: { width: 200 },
  };

  return (
    <Flex vertical gap="middle">
      <AutoComplete {...sharedProps} placeholder="object styles" styles={stylesObject} />
      <AutoComplete
        {...sharedProps}
        variant="filled"
        placeholder="function styles"
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
```





## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean \| { clearIcon?: ReactNode } | false | 5.8.0: 支持对象形式 |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | boolean | false |  |
| children | 自定义输入框 | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement&lt;InputProps> | &lt;Input /> |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项 | boolean | true |  |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |  |
| defaultValue | 指定默认选中的条目 | string | - |  |
| disabled | 是否禁用 | boolean | false |  |
| ~~dropdownRender~~ | 自定义下拉框内容，使用 `popupRender` 替换 | (originNode: ReactNode) => ReactNode | - | 4.24.0 |
| popupRender | 自定义下拉框内容 | (originNode: ReactNode) => ReactNode | - |  |
| ~~popupClassName~~ | 下拉菜单的 className 属性，使用 `classNames.popup.root` 替换 | string | - | 4.23.0 |
| ~~dropdownStyle~~ | 下拉菜单的 style 属性，使用 `styles.popup.root` 替换 | CSSProperties | - |  |
| popupMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 | boolean \| number | true |  |
| ~~filterOption~~ | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false | boolean \| function(inputValue, option) | true |  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |  |
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | - |  |
| open | 是否展开下拉菜单 | boolean | - |  |
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | { label, value }\[] | - |  |
| placeholder | 输入框提示 | string | - |  |
| showSearch | 搜索配置 | true \| [Object](#showsearch) | true |  |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| size | 控件大小 | `large` \| `middle` \| `small` | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| value | 指定当前选中的条目 | string | - |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 |
| virtual | 设置 false 时关闭虚拟滚动 | boolean | true | 4.1.0 |
| onBlur | 失去焦点时的回调 | function() | - |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | - |  |
| ~~onDropdownVisibleChange~~ | 展开下拉菜单的回调，使用 `onOpenChange` 替换 | (open: boolean) => void | - |  |
| onOpenChange | 展开下拉菜单的回调 | (open: boolean) => void | - |  |
| onFocus | 获得焦点时的回调 | function() | - |  |
| ~~onSearch~~ | 搜索补全项的时候调用 | function(value) | - |  |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, option) | - |  |
| onClear | 清除内容时的回调 | function | - | 4.6.0 |
| onInputKeyDown | 按键按下时回调 | (event: KeyboardEvent) => void | - |  |
| onPopupScroll | 下拉列表滚动时的回调 | (event: UIEvent) => void | - |  |

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 true，反之则返回 false | boolean \| function(inputValue, option) | true |  |
| onSearch | 搜索补全项的时候调用 | function(value) | - |  |

## 方法 {#methods}

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

## Semantic DOM

https://ant.design/components/auto-complete-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Select)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeBorderColor | 激活态边框色 | string | #1677ff |
| activeOutlineColor | 激活态 outline 颜色 | string | rgba(5,145,255,0.1) |
| clearBg | 清空按钮背景色 | string | #ffffff |
| hoverBorderColor | 悬浮态边框色 | string | #4096ff |
| multipleItemBg | 多选标签背景色 | string | rgba(0,0,0,0.06) |
| multipleItemBorderColor | 多选标签边框色 | string | transparent |
| multipleItemBorderColorDisabled | 多选标签禁用边框色 | string | transparent |
| multipleItemColorDisabled | 多选标签禁用文本颜色 | string | rgba(0,0,0,0.25) |
| multipleItemHeight | 多选标签高度 | number | 24 |
| multipleItemHeightLG | 大号多选标签高度 | number | 32 |
| multipleItemHeightSM | 小号多选标签高度 | number | 16 |
| multipleSelectorBgDisabled | 多选框禁用背景 | string | rgba(0,0,0,0.04) |
| optionActiveBg | 选项激活态时背景色 | string | rgba(0,0,0,0.04) |
| optionFontSize | 选项字体大小 | number | 14 |
| optionHeight | 选项高度 | number | 32 |
| optionLineHeight | 选项行高 | LineHeight<string \| number> \| undefined | 1.5714285714285714 |
| optionPadding | 选项内间距 | Padding<string \| number> \| undefined | 5px 12px |
| optionSelectedBg | 选项选中时背景色 | string | #e6f4ff |
| optionSelectedColor | 选项选中时文本颜色 | string | rgba(0,0,0,0.88) |
| optionSelectedFontWeight | 选项选中时文本字重 | FontWeight \| undefined | 600 |
| selectorBg | 选框背景色 | string | #ffffff |
| showArrowPaddingInlineEnd | 箭头的行末内边距 | number | 18 |
| singleItemHeightLG | 单选大号回填项高度 | number | 40 |
| zIndexPopup | 下拉菜单 z-index | number | 1050 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorBgBase | 用于派生背景色梯度的基础变量，v5 中我们添加了一层背景色的派生算法可以产出梯度明确的背景色的梯度变量。但请不要在代码中直接使用该 Seed Token ！ | string |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBgElevated | 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorBorderDisabled | 控制元素在禁用状态下的边框颜色。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorBg | 错误色的浅色背景颜色 | string |  |
| colorErrorBgHover | 错误色的浅色背景色悬浮态 | string |  |
| colorErrorHover | 错误色的深色悬浮态 | string |  |
| colorErrorOutline | 控制输入组件错误状态下的外轮廓线颜色。 | string |  |
| colorFillSecondary | 二级填充色可以较为明显地勾勒出元素形体，如 Rate、Skeleton 等。也可以作为三级填充色的 Hover 状态，如 Table 等。 | string |  |
| colorFillTertiary | 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorIconHover | 控制弱操作图标在悬浮状态下的颜色，例如 allowClear 或 Alert 关闭按钮。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextPlaceholder | 控制占位文本的颜色。 | string |  |
| colorTextQuaternary | 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。 | string |  |
| colorWarning | 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。 | string |  |
| colorWarningBg | 警戒色的浅色背景颜色 | string |  |
| colorWarningBgHover | 警戒色的浅色背景色悬浮态 | string |  |
| colorWarningHover | 警戒色的深色悬浮态 | string |  |
| colorWarningOutline | 控制输入组件警告状态下的外轮廓线颜色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| controlOutlineWidth | 控制输入组件的外轮廓线宽度。 | number |  |
| controlPaddingHorizontal | 控制元素水平内间距。 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOut | 预设动效曲率 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| motionEaseInQuint | 预设动效曲率 | string |  |
| motionEaseOutCirc | 预设动效曲率 | string |  |
| motionEaseOutQuint | 预设动效曲率 | string |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |



## FAQ

### 为何受控状态下使用 onSearch 无法输入中文？ {#faq-controlled-onsearch-composition}

请使用 `onChange` 进行受控管理。`onSearch` 触发于搜索输入，与 `onChange` 时机不同。此外，点击选项时也不会触发 `onSearch` 事件。

相关 issue：[#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)

### 为何 options 为空时，受控 open 展开不会显示下拉菜单？ {#faq-empty-options-controlled-open}

AutoComplete 组件本质上是 Input 输入框的一种扩展，当 `options` 为空时，显示空文本会让用户误以为该组件不可操作，实际上它仍然可以进行文本输入操作。因此，为了避免给用户带来困惑，当 `options` 为空时，`open` 属性为 `true` 也不会展示下拉菜单，需要与 `options` 属性配合使用。
