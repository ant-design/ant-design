---
category: Components
group: Navigation
title: Steps
description: A navigation bar that guides users through the steps of a task.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*677sTqCpE3wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cFsBQLA0b7UAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

When a given task is complicated or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.

## Examples

### Basic

The most basic step bar. Use the `variant` property to set different styles and `size` to control the size.

```tsx
import React from 'react';
import { Flex, Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
    subTitle: 'Left 00:00:08',
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => (
  <Flex vertical gap="large">
    <Steps current={1} items={items} />
    <Steps current={1} items={items} variant="outlined" />
    <Steps current={1} items={items} size="small" />
    <Steps current={1} items={items} size="small" variant="outlined" />
  </Flex>
);

export default App;
```

### Error status

By using `status` of `Steps`, you can specify the state for current step.

```tsx
import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Process',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => <Steps current={1} status="error" items={items} />;

export default App;
```

### Vertical

A simple step bar in the vertical orientation.

```tsx
import React from 'react';
import { Flex, Steps } from 'antd';

const content = 'This is a content.';

const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => (
  <Flex>
    <div style={{ flex: 1 }}>
      <Steps orientation="vertical" current={1} items={items} />
    </div>
    <div style={{ flex: 1 }}>
      <Steps orientation="vertical" current={1} items={items} size="small" />
    </div>
  </Flex>
);

export default App;
```

### Clickable

Setting `onChange` makes Steps clickable.

```tsx
import React, { useState } from 'react';
import { Divider, Steps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const content = 'This is a content.';

  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            content,
          },
          {
            title: 'Step 2',
            content,
          },
          {
            title: 'Step 3',
            content,
          },
        ]}
      />

      <Divider />

      <Steps
        current={current}
        onChange={onChange}
        orientation="vertical"
        items={[
          {
            title: 'Step 1',
            content,
          },
          {
            title: 'Step 2',
            content,
          },
          {
            title: 'Step 3',
            content,
          },
        ]}
      />
    </>
  );
};

export default App;
```

### Panel Steps

Panel style steps.

```tsx
import React, { useState } from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const sharedProps: StepsProps = {
    type: 'panel',
    current,
    onChange,
    items: [
      {
        title: 'Step 1',
        subTitle: '00:00',
        content: 'This is a content.',
      },
      {
        title: 'Step 2',
        content: 'This is a content.',
        status: 'error',
      },
      {
        title: 'Step 3',
        content: 'This is a content.',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} />
      <Steps {...sharedProps} size="small" variant="outlined" />
    </Flex>
  );
};

export default App;
```

### With icon

You can use your own custom icons by setting the property `icon` for `items`.

```tsx
import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Pay',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
);

export default App;
```


### Title Placement and Progress

Use `titlePlacement` to set the label position and display the progress through `percent`.

```tsx
import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];
const App: React.FC = () => (
  <>
    <Steps current={1} titlePlacement="vertical" items={items} ellipsis />
    <br />
    <Steps current={1} percent={60} titlePlacement="vertical" items={items} />
    <br />
    <Steps current={1} percent={80} size="small" titlePlacement="vertical" items={items} />
  </>
);

export default App;
```

### Dot Style

Steps with progress dot style.

```tsx
import React from 'react';
import { Divider, Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

const items = [
  {
    title: 'Finished',
    content: 'This is a content.',
  },
  {
    title: 'In Progress',
    content: 'This is a content.',
  },
  {
    title: 'Waiting',
    content: 'This is a content.',
  },
];

const sharedProps: StepsProps = {
  type: 'dot',
  current: 1,
  items,
};

const sharedVerticalProps = {
  ...sharedProps,
  orientation: 'vertical',
  style: {
    flex: 'auto',
  },
} as const;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps {...sharedProps} />
    <Steps {...sharedProps} variant="outlined" />
    <Divider />
    <Flex gap="middle">
      <Steps {...sharedVerticalProps} />
      <Steps {...sharedVerticalProps} variant="outlined" />
    </Flex>
  </Flex>
);

export default App;
```


### Navigation Steps

Navigation steps.

```tsx
import React, { useState } from 'react';
import { Flex, Steps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <Flex vertical gap="large">
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            subTitle: '00:00:05',
            status: 'finish',
            content: 'This is a content.',
          },
          {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            content: 'This is a content.',
          },
          {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            content: 'This is a content.',
          },
        ]}
      />

      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        items={[
          {
            status: 'finish',
            title: 'Step 1',
          },
          {
            status: 'process',
            title: 'Step 2',
          },
          {
            status: 'wait',
            title: 'Step 3',
          },
          {
            status: 'wait',
            title: 'Step 4',
          },
        ]}
      />

      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        items={[
          {
            status: 'finish',
            title: 'finish 1',
          },
          {
            status: 'finish',
            title: 'finish 2',
          },
          {
            status: 'process',
            title: 'current process',
          },
          {
            status: 'wait',
            title: 'wait',
            disabled: true,
          },
        ]}
      />
    </Flex>
  );
};

export default App;
```




### Inline Steps

Inline type steps, suitable for displaying the process and current state of the object in the list content scene.

```tsx
import React from 'react';
import type { StepsProps } from 'antd';
import { Avatar, List, Steps } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
    current: 0,
  },
  {
    title: 'Ant Design Title 2',
    current: 1,
    status: 'error',
  },
  {
    title: 'Ant Design Title 3',
    current: 2,
  },
  {
    title: 'Ant Design Title 4',
    current: 1,
  },
];

const items = [
  {
    title: 'Step 1',
    content: 'This is Step 1',
  },
  {
    title: 'Step 2',
    content: 'This is Step 2',
  },
  {
    title: 'Step 3',
    content: 'This is Step 3',
  },
];

const App: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <Steps
          style={{ marginTop: 8 }}
          type="inline"
          current={item.current}
          status={item.status as StepsProps['status']}
          items={items}
        />
      </List.Item>
    )}
  />
);

export default App;
```

### Inline Style Combination

Inline step bar modifies the style and aligns through `offset`.

```tsx
import React from 'react';
import type { StepsProps } from 'antd';
import { Flex, Steps, theme } from 'antd';

const items: StepsProps['items'] = Array.from({ length: 5 }, (_, index) => ({
  title: `Step ${index + 1}`,
  subTitle: 'Sub Title',
  content: `This is Step ${index + 1}`,
}));

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Flex vertical>
      <Steps type="inline" current={1} items={items} />
      <Steps
        type="inline"
        current={4}
        items={items}
        status="finish"
        styles={{
          itemTitle: {
            color: token.colorPrimaryText,
          },
          itemSubtitle: {
            color: token.colorPrimaryTextActive,
          },
          itemRail: {
            background: token.colorTextDisabled,
          },
        }}
      />
      <Steps type="inline" current={1} items={items.slice(2)} offset={2} />
    </Flex>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Steps by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `2px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    padding: token.padding,
  },
}));

const stylesObject: StepsProps['styles'] = {
  itemIcon: { borderRadius: '30%' },
  itemContent: { fontStyle: 'italic' },
};

const stylesFn: StepsProps['styles'] = (info) => {
  if (info.props.type === 'navigation') {
    return {
      root: {
        borderColor: '#1890ff',
      },
    } satisfies StepsProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyles();

  const sharedProps: StepsProps = {
    items: [
      { title: 'Finished', content: 'This is a content.' },
      { title: 'In Progress', content: 'This is a content.' },
      { title: 'Waiting', content: 'This is a content.' },
    ],
    current: 1,
    classNames: { root: styles.root },
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} styles={stylesObject} />
      <Steps {...sharedProps} styles={stylesFn} type="navigation" />
    </Flex>
  );
};

export default App;
```




## API

Common props ref：[Common props](/docs/react/common-props)

### Steps

The whole of the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| current | To set the current step, counting from 0. You can overwrite this state by using `status` of `Step` | number | 0 |  |
| ~~direction~~ | To specify the direction of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| iconRender | Custom render icon, please use `items.icon` first | (oriNode, info: { index, active, item }) => ReactNode | - |  |
| initial | Set the initial step, counting from 0 | number | 0 |  |
| ~~labelPlacement~~ | Place title and content with `horizontal` or `vertical` direction | string | `horizontal` |  |
| orientation | To specify the orientation of the step bar, `horizontal` or `vertical` | string | `horizontal` |  |
| percent | Progress circle percentage of current step in `process` status (only works on basic Steps) | number | - | 4.5.0 |
| progressDot | Steps with progress dot style, customize the progress dot by setting it to a function. `titlePlacement` will be `vertical` | boolean \| (iconDot, { index, status, title, content }) => ReactNode | false |  |
| responsive | Change to vertical direction when screen width smaller than `532px` | boolean | true |  |
| size | To specify the size of the step bar, `default` and `small` are currently supported | string | `default` |  |
| status | To specify the status of current step, can be set to one of the following values: `wait` `process` `finish` `error` | string | `process` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| titlePlacement | Place title and content with `horizontal` or `vertical` direction | string | `horizontal` |  |
| type | Type of steps, can be set to one of the following values: `default` `dot` `inline` `navigation` `panel` | string | `default` |  |
| variant | Config style variant | `filled` \| `outlined` | `filled` |  |
| onChange | Trigger when Step is changed | (current) => void | - |  |
| items | StepItem content | [StepItem](#stepitem) | [] | 4.24.0 |

### StepItem

A single step in the step bar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| content | Description of the step, optional property | ReactNode | - |  |
| ~~description~~ | Description of the step, optional property | ReactNode | - |  |
| disabled | Disable click | boolean | false |  |
| icon | Icon of the step, optional property | ReactNode | - |  |
| status | To specify the status. It will be automatically set by `current` of `Steps` if not configured. Optional values are: `wait` `process` `finish` `error` | string | `wait` |  |
| subTitle | Subtitle of the step | ReactNode | - |  |
| title | Title of the step | ReactNode | - |  |

## Semantic DOM

### Steps

https://ant.design/components/steps/semantic.md

### StepItem

https://ant.design/components/steps/semantic_items.md

## Design Token



## Component Token (Steps)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| customIconFontSize | Font size of custom icon | number | 24 |
| customIconSize | Size of custom icon container | number | 32 |
| customIconTop | Top of custom icon | number | 0 |
| dotCurrentSize | Current size of dot | number | 10 |
| dotSize | Size of dot | number | 8 |
| iconFontSize | Size of icon | number | 14 |
| iconSize | Size of icon container | number | 32 |
| iconSizeSM | Size of small steps icon | number | 24 |
| iconTop | Top of icon | number | -0.5 |
| navArrowColor | Color of arrow in nav | string | rgba(0,0,0,0.25) |
| navContentMaxWidth | Max width of nav content | MaxWidth<string \| number> \| undefined | unset |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgFilledHover | The wrong color fills the background color of the suspension state, which is currently only used in the hover effect of the dangerous filled button. | string |  |
| colorErrorHover | The hover state of the error color. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBg | Light background color of primary color, usually used for weak visual level selection state. | string |  |
| colorPrimaryBgHover | The hover state color corresponding to the light background color of the primary color. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextLabel | Control the font color of text label. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorTextSecondary | The second level of text color is generally used in scenarios where text color is not emphasized, such as label text, menu text selection state, etc. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlItemBgHover | Control the background color of control component item when hovering. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeLG | Large font size | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineHeightSM | Line height of small text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthBold | The default line width of the outline class components, such as Button, Input, Select, etc. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


