---
category: Components
group: Data Entry
title: Switch
description: Used to toggle between two states.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rtArRpBNDZcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*al07RK8SGf4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- If you need to represent the switching between two states or on-off state.
- The difference between `Switch` and `Checkbox` is that `Switch` will trigger a state change directly when you toggle it, while `Checkbox` is generally used for state marking, which should work in conjunction with submit operation.

## Examples

### Basic

The most basic usage.

```tsx
import React from 'react';
import { Switch } from 'antd';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const App: React.FC = () => <Switch defaultChecked onChange={onChange} />;

export default App;
```

### Disabled

Disabled state of `Switch`.

```tsx
import React, { useState } from 'react';
import { Button, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  const toggle = () => {
    setDisabled(!disabled);
  };

  return (
    <Space vertical>
      <Switch disabled={disabled} defaultChecked />
      <Button type="primary" onClick={toggle}>
        Toggle disabled
      </Button>
    </Space>
  );
};

export default App;
```

### Text & icon

With text and icon.

```tsx
import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    <Switch checkedChildren="1" unCheckedChildren="0" />
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked
    />
  </Space>
);

export default App;
```

### Two sizes

`size="small"` represents a small sized switch.

```tsx
import React from 'react';
import { Switch } from 'antd';

const App: React.FC = () => (
  <>
    <Switch defaultChecked />
    <br />
    <Switch size="small" defaultChecked />
  </>
);

export default App;
```

### Loading

Mark a pending state of switch.

```tsx
import React from 'react';
import { Switch } from 'antd';

const App: React.FC = () => (
  <>
    <Switch loading defaultChecked />
    <br />
    <Switch size="small" loading />
  </>
);

export default App;
```


### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Switch by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Switch } from 'antd';
import type { SwitchProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  root: {
    width: 40,
    backgroundColor: token.colorPrimary,
  },
}));

const stylesObject: SwitchProps['styles'] = {
  root: {
    backgroundColor: '#F5D2D2',
  },
};

const stylesFn: SwitchProps['styles'] = (info) => {
  if (info.props.size === 'default') {
    return {
      root: {
        backgroundColor: '#BDE3C3',
      },
    } satisfies SwitchProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyle();
  return (
    <Flex vertical gap="middle">
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        classNames={classNames}
        styles={stylesObject}
      />
      <Switch classNames={classNames} size="default" styles={stylesFn} />
    </Flex>
  );
};

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Determine whether the Switch is checked | boolean | false |  |
| checkedChildren | The content to be shown when the state is checked | ReactNode | - |  |
| className | The additional class to Switch | string | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |
| defaultChecked | Whether to set the initial state | boolean | false |  |
| defaultValue | Alias for `defaultChecked` | boolean | - | 5.12.0 |
| disabled | Disable switch | boolean | false |  |
| loading | Loading state of switch | boolean | false |  |
| size | The size of the Switch, options: `default` `small` | string | `default` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |
| unCheckedChildren | The content to be shown when the state is unchecked | ReactNode | - |  |
| value | Alias for `checked` | boolean | - | 5.12.0 |
| onChange | Trigger when the checked state is changing | function(checked: boolean, event: Event) | - |  |
| onClick | Trigger when clicked | function(checked: boolean, event: Event) | - |  |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Semantic DOM

https://ant.design/components/switch/semantic.md

## Design Token



## Component Token (Switch)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| handleBg | Background color of Switch handle | string | #fff |
| handleShadow | Shadow of Switch handle | string | 0 2px 4px 0 rgba(0,35,11,0.2) |
| handleSize | Size of Switch handle | number | 18 |
| handleSizeSM | Size of small Switch handle | number | 12 |
| innerMaxMargin | Maximum margin of content area | number | 24 |
| innerMaxMarginSM | Maximum margin of content area of small Switch | number | 18 |
| innerMinMargin | Minimum margin of content area | number | 9 |
| innerMinMarginSM | Minimum margin of content area of small Switch | number | 6 |
| trackHeight | Height of Switch | string \| number | 22 |
| trackHeightSM | Height of small Switch | string \| number | 16 |
| trackMinWidth | Minimum width of Switch | string \| number | 44 |
| trackMinWidthSM | Minimum width of small Switch | string \| number | 28 |
| trackPadding | Padding of Switch | number | 2 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorTextTertiary | The third level of text color is generally used for descriptive text, such as form supplementary explanation text, list descriptive text, etc. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| opacityLoading | Control the opacity of the loading state. | number |  |



## FAQ

### Why not work in Form.Item? {#faq-binding-data}

Form.Item default bind value to `value` property, but Switch value property is `checked`. You can use `valuePropName` to change bind property.

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Switch />
</Form.Item>
```
