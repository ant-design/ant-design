---
category: Components
group: Data Display
title: Collapse
description: A content area which can be collapsed and expanded.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*B7HKR5OBe8gAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sir-TK0HkWcAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

- Can be used to group or hide complex regions to keep the page clean.
- `Accordion` is a special kind of `Collapse`, which allows only one panel to be expanded at a time.

## Examples

### Collapse

By default, any number of panels can be expanded at a time. The first panel is expanded in this example.

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default App;
```

### Size

Ant Design supports a default collapse size as well as a large and small size.

If a large or small collapse is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a collapse with the default size.

```tsx
import React from 'react';
import { Collapse, Divider } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => (
  <>
    <Divider titlePlacement="start">Default Size</Divider>
    <Collapse
      items={[{ key: '1', label: 'This is default size panel header', children: <p>{text}</p> }]}
    />
    <Divider titlePlacement="start">Small Size</Divider>
    <Collapse
      size="small"
      items={[{ key: '1', label: 'This is small size panel header', children: <p>{text}</p> }]}
    />
    <Divider titlePlacement="start">Large Size</Divider>
    <Collapse
      size="large"
      items={[{ key: '1', label: 'This is large size panel header', children: <p>{text}</p> }]}
    />
  </>
);

export default App;
```

### Accordion

In accordion mode, only one panel can be expanded at a time.

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => <Collapse accordion items={items} />;

export default App;
```

### Nested panel

`Collapse` is nested inside the `Collapse`.

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const itemsNest: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel nest panel',
    children: <p>{text}</p>,
  },
];

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <Collapse defaultActiveKey="1" items={itemsNest} />,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse onChange={onChange} items={items} />;
};

export default App;
```

### Borderless

A borderless style of Collapse.

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = (
  <p style={{ paddingInlineStart: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: text,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: text,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: text,
  },
];

const App: React.FC = () => <Collapse items={items} bordered={false} defaultActiveKey={['1']} />;

export default App;
```

### Custom Panel

Customize the background, border, margin styles and icon for each panel.

```tsx
import type { CSSProperties } from 'react';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const App: React.FC = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
      items={getItems(panelStyle)}
    />
  );
};

export default App;
```

### No arrow

You can hide the arrow icon by passing `showArrow={false}` to `CollapsePanel` component.

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header with arrow icon',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header with no arrow icon',
    children: <p>{text}</p>,
    showArrow: false,
  },
];

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />;
};

export default App;
```

### Extra node

Render extra element in the top-right corner of each panel.

```tsx
import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Select } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => {
  const [expandIconPlacement, setExpandIconPlacement] =
    useState<CollapseProps['expandIconPlacement']>('start');

  const onPlacementChange = (newExpandIconPlacement: CollapseProps['expandIconPlacement']) => {
    setExpandIconPlacement(newExpandIconPlacement);
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];

  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPlacement={expandIconPlacement}
        items={items}
      />
      <br />
      <span>Expand Icon Placement: </span>
      <Select
        value={expandIconPlacement}
        style={{ margin: '0 8px' }}
        onChange={onPlacementChange}
        options={[
          { label: 'start', value: 'start' },
          { label: 'end', value: 'end' },
        ]}
      />
    </>
  );
};

export default App;
```

### Ghost Collapse

Making collapse's background to transparent.

```tsx
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const App: React.FC = () => <Collapse defaultActiveKey={['1']} ghost items={items} />;

export default App;
```

### Collapsible

Specify the trigger area of collapsible by `collapsible`.

<style>
#collapse-demo-collapsible .ant-space {
  width: 100%;
}
</style>

```tsx
import React from 'react';
import { Collapse, Space } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => (
  <Space vertical>
    <Collapse
      collapsible="header"
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'This panel can be collapsed by clicking text or icon',
          children: <p>{text}</p>,
        },
      ]}
    />
    <Collapse
      collapsible="icon"
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'This panel can only be collapsed by clicking icon',
          children: <p>{text}</p>,
        },
      ]}
    />
    <Collapse
      collapsible="disabled"
      items={[
        {
          key: '1',
          label: "This panel can't be collapsed",
          children: <p>{text}</p>,
        },
      ]}
    />
  </Space>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Collapse by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Collapse, Flex } from 'antd';
import { createStaticStyles } from 'antd-style';

import type { CollapseProps } from '..';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  `,
}));

const element = (
  <p>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: element,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: element,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: element,
  },
];

const styles: CollapseProps['styles'] = {
  root: {
    backgroundColor: '#fafafa',
    border: '1px solid #e0e0e0',
    borderRadius: 8,
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: '12px 16px',
    color: '#141414',
  },
};

const stylesFn: CollapseProps['styles'] = ({ props }) => {
  if (props.size === 'large') {
    return {
      root: {
        backgroundColor: '#fff',
        border: '1px solid #696FC7',
        borderRadius: 8,
      },
      header: {
        backgroundColor: '#F5EFFF',
        padding: '12px 16px',
        color: '#141414',
      },
    } satisfies CollapseProps['styles'];
  }
};

const App: React.FC = () => {
  const sharedProps: CollapseProps = { classNames, items };

  return (
    <Flex vertical gap="middle">
      <Collapse {...sharedProps} defaultActiveKey={['1']} styles={styles} />
      <Collapse {...sharedProps} defaultActiveKey={['2']} styles={stylesFn} size="large" />
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

### Collapse

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| accordion | If true, Collapse renders as Accordion | boolean | false |  |
| activeKey | Key of the active panel | string\[] \| string <br/> number\[] \| number | No default value. In [accordion mode](#collapse-demo-accordion), it's the key of the first panel |  |
| bordered | Toggles rendering of the border around the collapse block | boolean | true |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| collapsible | Specify how to trigger Collapse. Either by clicking icon or by clicking any area in header or disable collapse functionality itself | `header` \| `icon` \| `disabled` | - | 4.9.0 |
| defaultActiveKey | Key of the initial active panel | string\[] \| string <br/> number\[] \| number | - |  |
| ~~destroyInactivePanel~~ | Destroy Inactive Panel | boolean | false |  |
| destroyOnHidden | Destroy Inactive Panel | boolean | false | 5.25.0 |
| expandIcon | Allow to customize collapse icon | (panelProps) => ReactNode | - |  |
| expandIconPlacement | Set expand icon placement | `start` \| `end` | `start` | - |
| ~~expandIconPosition~~ | Set expand icon position, Please use `expandIconPlacement` instead | `start` \| `end` | - | 4.21.0 |
| ghost | Make the collapse borderless and its background transparent | boolean | false | 4.4.0 |
| size | Set the size of collapse | `large` \| `middle` \| `small` | `middle` | 5.2.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| onChange | Callback function executed when active panel is changed | function | - |  |
| items | collapse items content | [ItemType](#itemtype) | - | 5.6.0 |

### ItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Semantic structure className | [`Record<header \| body, string>`](#semantic-dom) | - | 5.21.0 |
| collapsible | Specify whether the panel be collapsible or the trigger area of collapsible | `header` \| `icon` \| `disabled` | - |  |
| children | Body area content | ReactNode | - |  |
| extra | The extra element in the corner | ReactNode | - |  |
| forceRender | Forced render of content on panel, instead of lazy rendering after clicking on header | boolean | false |  |
| key | Unique key identifying the panel from among its siblings | string \| number | - |  |
| label | Title of the panel | ReactNode | - | - |
| showArrow | If false, panel will not show arrow icon. If false, collapsible can't be set as icon | boolean | true |  |
| styles | Semantic DOM style | [`Record<header \| body, CSSProperties>`](#semantic-dom) | - | 5.21.0 |

### Collapse.Panel

:::warning{title=Deprecated}
When using version >= 5.6.0, we prefer to configuring the panel by `items`.
:::

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| collapsible | Specify whether the panel be collapsible or the trigger area of collapsible | `header` \| `icon` \| `disabled` | - | 4.9.0 (icon: 4.24.0) |
| extra | The extra element in the corner | ReactNode | - |  |
| forceRender | Forced render of content on panel, instead of lazy rendering after clicking on header | boolean | false |  |
| header | Title of the panel | ReactNode | - |  |
| key | Unique key identifying the panel from among its siblings | string \| number | - |  |
| showArrow | If false, panel will not show arrow icon. If false, collapsible can't be set as icon | boolean | true |  |

## Semantic DOM

https://ant.design/components/collapse/semantic.md

## Design Token



## Component Token (Collapse)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderlessContentBg | Background of content in borderless style | string | transparent |
| borderlessContentPadding | Padding of content in borderless style | Padding<string \| number> \| undefined | 4px 16px 16px |
| contentBg | Background of content | string | #ffffff |
| contentPadding | Padding of content | Padding<string \| number> \| undefined | 16px 16px |
| headerBg | Background of header | string | rgba(0,0,0,0.02) |
| headerPadding | Padding of header | Padding<string \| number> \| undefined | 12px 16px |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeLG | Large font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingLG | Control the large padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |


