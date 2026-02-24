---
category: Components
group: Data Display
title: Segmented
description: Display multiple options and allow users to select a single option.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XJR2TbS1aaQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-9tSSoO_MkIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

This component is available since `antd@4.20.0`.

## When To Use

- When displaying multiple options and user can select a single option;
- When switching the selected option, the content of the associated area changes.

## Examples

### Basic

The most basic usage.

```tsx
import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string>
    options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
    onChange={(value) => {
      console.log(value); // string
    }}
  />
);

export default Demo;
```

### Vertical Direction

Make it vertical.

```tsx
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    orientation="vertical"
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
```

### Block Segmented

`block` property will make the `Segmented` fit to its parent width.

```tsx
import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string | number> options={[123, 456, 'longtext-longtext-longtext-longtext']} block />
);

export default Demo;
```

### Round shape

Round shape of Segmented.

```tsx
import React, { useState } from 'react';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';

import type { SizeType } from '../../config-provider/SizeContext';

const Demo: React.FC = () => {
  const [size, setSize] = useState<SizeType>('middle');
  return (
    <Flex gap="small" align="flex-start" vertical>
      <Segmented<SizeType> options={['small', 'middle', 'large']} value={size} onChange={setSize} />
      <Segmented
        size={size}
        shape="round"
        options={[
          { value: 'light', icon: <SunOutlined /> },
          { value: 'dark', icon: <MoonOutlined /> },
        ]}
      />
    </Flex>
  );
};

export default Demo;
```

### Disabled

Disabled Segmented.

```tsx
import React from 'react';
import { Flex, Segmented } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented options={['Map', 'Transit', 'Satellite']} disabled />
    <Segmented
      options={[
        'Daily',
        { label: 'Weekly', value: 'Weekly', disabled: true },
        'Monthly',
        { label: 'Quarterly', value: 'Quarterly', disabled: true },
        'Yearly',
      ]}
    />
  </Flex>
);

export default App;
```

### Controlled mode

Controlled Segmented.

```tsx
import React, { useState } from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => {
  const [value, setValue] = useState<string>('Map');
  return (
    <Segmented<string>
      options={['Map', 'Transit', 'Satellite']}
      value={value}
      onChange={setValue}
    />
  );
};

export default Demo;
```

### Custom Render

Custom each Segmented Item.

```tsx
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex, Segmented } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" alt="User 1" />
              <div>User 1</div>
            </div>
          ),
          value: 'user1',
          tooltip: { title: 'hello user1', color: 'gold' },
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#f56a00' }} alt="User 2">
                K
              </Avatar>
              <div>User 2</div>
            </div>
          ),
          value: 'user2',
          tooltip: { title: 'hello user2', color: 'pink' },
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="User 3" />
              <div>User 3</div>
            </div>
          ),
          value: 'user3',
          tooltip: { title: 'hello user3', color: 'geekblue' },
        },
      ]}
    />
    <Segmented
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Spring</div>
              <div>Jan-Mar</div>
            </div>
          ),
          value: 'spring',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Summer</div>
              <div>Apr-Jun</div>
            </div>
          ),
          value: 'summer',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Autumn</div>
              <div>Jul-Sept</div>
            </div>
          ),
          value: 'autumn',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <div>Winter</div>
              <div>Oct-Dec</div>
            </div>
          ),
          value: 'winter',
        },
      ]}
    />
  </Flex>
);

export default App;
```

### Dynamic

Load `options` dynamically.

```tsx
import React, { useState } from 'react';
import { Button, Flex, Segmented } from 'antd';

const Demo: React.FC = () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [moreLoaded, setMoreLoaded] = useState(false);

  const handleLoadOptions = () => {
    setOptions((prev) => [...prev, 'Quarterly', 'Yearly']);
    setMoreLoaded(true);
  };

  return (
    <Flex gap="small" align="flex-start" vertical>
      <Segmented options={options} />
      <Button type="primary" disabled={moreLoaded} onClick={handleLoadOptions}>
        Load more options
      </Button>
    </Flex>
  );
};

export default Demo;
```

### Three sizes of Segmented

There are three sizes of an Segmented: `large` (40px), `default` (32px) and `small` (24px).

```tsx
import React from 'react';
import { Flex, Segmented } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" align="flex-start" vertical>
    <Segmented size="large" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
    <Segmented size="small" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
  </Flex>
);

export default App;
```

### With Icon

Set `icon` for Segmented Item.

```tsx
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    options={[
      { label: 'List', value: 'List', icon: <BarsOutlined /> },
      { label: 'Kanban', value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
```

### With Icon only

Set `icon` without `label` for Segmented Item.

```tsx
import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
    ]}
  />
);

export default Demo;
```

### With name

Passing the `name` property to all `input[type="radio"]` that are in the same Segmented. It is usually used to let the browser see your Segmented as a real "group" and keep the default behavior. For example, using left/right keyboard arrow to change your selection that in the same Segmented.

```tsx
import React from 'react';
import { Segmented } from 'antd';

const Demo: React.FC = () => (
  <Segmented<string> options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} name="group" />
);

export default Demo;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of the Segmented by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { CloudOutlined, RocketOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Flex, Segmented } from 'antd';
import type { SegmentedProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 2px;
  `,
}));

const styleFn: SegmentedProps['styles'] = (info) => {
  if (info.props.vertical) {
    return {
      root: {
        border: '1px solid #77BEF0',
        padding: 4,
        width: 100,
      },
      icon: {
        color: '#77BEF0',
      },
      item: {
        textAlign: 'start',
      },
    } satisfies SegmentedProps['styles'];
  }
  return {};
};

const styles: SegmentedProps['styles'] = {
  root: {
    padding: 4,
    width: 260,
  },
};

const options: SegmentedProps['options'] = [
  {
    label: 'Boost',
    value: 'boost',
    icon: <RocketOutlined />,
  },
  {
    label: 'Stream',
    value: 'stream',
    icon: <ThunderboltOutlined />,
  },
  {
    label: 'Cloud',
    value: 'cloud',
    icon: <CloudOutlined />,
  },
];

const App: React.FC = () => {
  const segmentedSharedProps: SegmentedProps = {
    options,
    classNames,
  };

  return (
    <Flex vertical gap="middle">
      <Segmented {...segmentedSharedProps} styles={styles} />
      <Segmented {...segmentedSharedProps} styles={styleFn} vertical />
    </Flex>
  );
};

export default App;
```





## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@4.20.0`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false |  |
| classNames | Customize class for each semantic structure inside the Segmented component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultValue | Default selected value | string \| number |  |  |
| disabled | Disable all segments | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | function(value: string \| number) |  |  |
| options | Set children optional | string\[] \| number\[] \| SegmentedItemType\[] | [] |  |
| orientation | Orientation | `horizontal` \| `vertical` | `horizontal` |  |
| size | The size of the Segmented. | `large` \| `middle` \| `small` | `middle` |  |
| styles | Customize inline style for each semantic structure inside the Segmented component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| vertical | Orientation，Simultaneously existing with `orientation`, `orientation` takes priority | boolean | `false` | 5.21.0 |
| value | Currently selected value | string \| number |  |  |
| shape | shape of Segmented | `default` \| `round` | `default` | 5.24.0 |
| name | The `name` property of all `input[type="radio"]` children. if not set, it will fallback to a randomly generated name | string |  | 5.23.0 |

### SegmentedItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Disabled state of segmented item | boolean | false |  |
| className | The additional css class | string | - |  |
| icon | Display icon for Segmented item | ReactNode | - |  |
| label | Display text for Segmented item | ReactNode | - |  |
| tooltip | tooltip for Segmented item | string \| [TooltipProps](../tooltip/index.en-US.md#api) | - |  |
| value | Value for Segmented item | string \| number | - |  |

## Semantic DOM

https://ant.design/components/segmented/semantic.md

## Design Token



## Component Token (Segmented)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| itemActiveBg | Background color of item when active | string | rgba(0,0,0,0.15) |
| itemColor | Text color of item | string | rgba(0,0,0,0.65) |
| itemHoverBg | Background color of item when hover | string | rgba(0,0,0,0.06) |
| itemHoverColor | Text color of item when hover | string | rgba(0,0,0,0.88) |
| itemSelectedBg | Background color of item when selected | string | #ffffff |
| itemSelectedColor | Text color of item when selected | string | rgba(0,0,0,0.88) |
| trackBg | Background of Segmented container | string | #f5f5f5 |
| trackPadding | Padding of Segmented container | string \| number | 2 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| boxShadowTertiary | Control the tertiary box shadow style of an element. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlPaddingHorizontal | Control the horizontal padding of an element. | number |  |
| controlPaddingHorizontalSM | Control the horizontal padding of an element with a small-medium size. | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOut | Preset motion curve. | string |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


