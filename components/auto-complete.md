---
category: Components
title: AutoComplete
description: Autocomplete function of input field.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*g8THS4NpV6sAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WERTQ6qvgEYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: Data Entry
  order: 4
demo:
  cols: 2
---

## When To Use

- When you need an input box instead of a selector.
- When you need input suggestions or helping text.

The differences with Select are:

- AutoComplete is an input box with text hints, and users can type freely. The keyword is aiding **input**.
- Select is selecting among given choices. The keyword is **select**.

## Examples

### Basic Usage

Basic Usage, set data source of autocomplete with `options` property.

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

### Customized

You could set custom `Option` label

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

### Customize Input Component

Customize Input Component

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

### Non-case-sensitive AutoComplete

A non-case-sensitive AutoComplete

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

### Lookup-Patterns - Certain Category

Demonstration of [Lookup Patterns: Certain Category](https://ant.design/docs/spec/reaction#lookup-patterns). Basic Usage, set options of autocomplete with `options` property.

```css
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-inline-start: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
```

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

### Lookup-Patterns - Uncertain Category

Demonstration of [Lookup Patterns: Uncertain Category](https://ant.design/docs/spec/reaction#lookup-patterns).

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

### Status

Add status to AutoComplete with `status`, which could be `error` or `warning`.

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

### Variants

There are `outlined`, `filled`, `borderless`, and `underlined` variants to choose from.

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

### Customize clear button

Customize clear button

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of AutoComplete by passing objects/functions through `classNames` and `styles`.

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

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button | boolean \| { clearIcon?: ReactNode } | false | 5.8.0: Support Object type |
| backfill | If backfill selected item the input when using keyboard | boolean | false |  |
| children | Customize input element | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement&lt;InputProps> | &lt;Input /> |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |  |
| defaultOpen | Initial open state of dropdown | boolean | - |  |
| defaultValue | Initial selected option | string | - |  |
| disabled | Whether disabled select | boolean | false |  |
| ~~dropdownRender~~ | Customize dropdown content, use `popupRender` instead | (originNode: ReactNode) => ReactNode | - | 4.24.0 |
| popupRender | Customize dropdown content | (originNode: ReactNode) => ReactNode | - |  |
| ~~dropdownStyle~~ | The style of dropdown menu, use `styles.popup.root` instead | CSSProperties | - |  |
| ~~popupClassName~~ | The className of dropdown menu, use `classNames.popup.root` instead | string | - | 4.23.0 |
| popupMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | true |  |
| ~~filterOption~~ | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \| function(inputValue, option) | true |  |
| getPopupContainer | Parent node of the dropdown. Default to body, if you encountered positioning problems during scroll, try changing to the scrollable area and position relative to it. [Example](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |  |
| notFoundContent | Specify content to show when no result matches | ReactNode | - |  |
| open | Controlled open state of dropdown | boolean | - |  |
| options | Select options. Will get better perf than jsx definition | { label, value }\[] | - |  |
| placeholder | The placeholder of input | string | - |  |
| showSearch | search for configuration | true \| [Object](#showsearch) | true |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| size | The size of the input box | `large` \| `middle` \| `small` | - |  |
| value | Selected option | string | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| variant | Variants of input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 |
| virtual | Disable virtual scroll when set to false | boolean | true | 4.1.0 |
| onBlur | Called when leaving the component | function() | - |  |
| onChange | Called when selecting an option or changing an input value | function(value) | - |  |
| ~~onDropdownVisibleChange~~ | Called when dropdown open, use `onOpenChange` instead | (open: boolean) => void | - |  |
| onOpenChange | Called when dropdown open | (open: boolean) => void | - |  |
| onFocus | Called when entering the component | function() | - |  |
| ~~onSearch~~ | Called when searching items | function(value) | - |  |
| onSelect | Called when a option is selected. param is option's value and option instance | function(value, option) | - |  |
| onClear | Called when clear | function | - | 4.6.0 |
| onInputKeyDown | Called when key pressed | (event: KeyboardEvent) => void | - |  |
| onPopupScroll | Called when dropdown scrolls | (event: UIEvent) => void | - |  |

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \| function(inputValue, option) | true |  |
| onSearch | Called when searching items | function(value) | - |  |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## Semantic DOM

https://ant.design/components/auto-complete/semantic.md

## Design Token



## Component Token (Select)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| activeBorderColor | Active border color | string | #1677ff |
| activeOutlineColor | Active outline color | string | rgba(5,145,255,0.1) |
| clearBg | Background color of clear button | string | #ffffff |
| hoverBorderColor | Hover border color | string | #4096ff |
| multipleItemBg | Background color of multiple tag | string | rgba(0,0,0,0.06) |
| multipleItemBorderColor | Border color of multiple tag | string | transparent |
| multipleItemBorderColorDisabled | Border color of multiple tag when disabled | string | transparent |
| multipleItemColorDisabled | Text color of multiple tag when disabled | string | rgba(0,0,0,0.25) |
| multipleItemHeight | Height of multiple tag | number | 24 |
| multipleItemHeightLG | Height of multiple tag with large size | number | 32 |
| multipleItemHeightSM | Height of multiple tag with small size | number | 16 |
| multipleSelectorBgDisabled | Background color of multiple selector when disabled | string | rgba(0,0,0,0.04) |
| optionActiveBg | Background color when option is active | string | rgba(0,0,0,0.04) |
| optionFontSize | Font size of option | number | 14 |
| optionHeight | Height of option | number | 32 |
| optionLineHeight | Line height of option | LineHeight<string \| number> \| undefined | 1.5714285714285714 |
| optionPadding | Padding of option | Padding<string \| number> \| undefined | 5px 12px |
| optionSelectedBg | Background color when option is selected | string | #e6f4ff |
| optionSelectedColor | Text color when option is selected | string | rgba(0,0,0,0.88) |
| optionSelectedFontWeight | Font weight when option is selected | FontWeight \| undefined | 600 |
| selectorBg | Background color of selector | string | #ffffff |
| showArrowPaddingInlineEnd | Inline end padding of arrow | number | 18 |
| singleItemHeightLG | Height of single selected item with large size | number | 40 |
| zIndexPopup | z-index of dropdown | number | 1050 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorBgBase | Used to derive the base variable of the background color gradient. In v5, we added a layer of background color derivation algorithm to produce map token of background color. But PLEASE DO NOT USE this Seed Token directly in the code! | string |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorBorderDisabled | Control the border color of the element in the disabled state. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgHover | The hover state background color of the error state. | string |  |
| colorErrorHover | The hover state of the error color. | string |  |
| colorErrorOutline | Control the outline color of input component in error state. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorIconHover | Weak action hover color. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextPlaceholder | Control the color of placeholder text. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningBgHover | The hover state background color of the warning state. | string |  |
| colorWarningHover | The hover state of the warning color. | string |  |
| colorWarningOutline | Control the outline color of input component in warning state. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlOutlineWidth | Control the outline width of input component. | number |  |
| controlPaddingHorizontal | Control the horizontal padding of an element. | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeLG | Large font size | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| motionEaseInQuint | Preset motion curve. | string |  |
| motionEaseOutCirc | Preset motion curve. | string |  |
| motionEaseOutQuint | Preset motion curve. | string |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |



## FAQ

### Why doesn't the text composition system work well with onSearch in controlled mode? {#faq-controlled-onsearch-composition}

Please use `onChange` to manage control state. `onSearch` is used for searching input which is not the same as `onChange`. Besides, clicking on the option will not trigger the `onSearch` event.

Related issue: [#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)

### Why won't a controlled open AutoComplete display a drop-down menu when options are empty? {#faq-empty-options-controlled-open}

The AutoComplete component is essentially an extension of the Input form element. When the `options` property is empty, displaying empty text could mislead the user into believing the component is not operational, when in fact they are still able to input text. To avoid confusion, the `open` property will not display the drop-down menu when set to `true` and in combination with an empty `options` property. The `open` property must be used in conjunction with the `options` property.
