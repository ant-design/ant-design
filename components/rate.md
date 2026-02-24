---
category: Components
group: Data Entry
title: Rate
description: Used for rating operation on something.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*oyOcTrB12_YAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*M7_ER7GJr6wAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- Show evaluation.
- A quick rating operation on something.

## Examples

### Basic

The simplest usage.

```tsx
import React from 'react';
import { Rate } from 'antd';

const App: React.FC = () => <Rate />;

export default App;
```

### Sizes

Three sizes.

```tsx
import React from 'react';
import { Flex, Rate } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Rate size="large" />
    <Rate />
    <Rate size="small" />
  </Flex>
);

export default App;
```

### Half star

Support select half star.

```tsx
import React from 'react';
import { Rate } from 'antd';

const App: React.FC = () => <Rate allowHalf defaultValue={2.5} />;

export default App;
```

### Show copywriting

Add copywriting in rate components.

```tsx
import React, { useState } from 'react';
import { Flex, Rate } from 'antd';
import type { RateProps } from 'antd';

const desc: RateProps['tooltips'] = [
  'terrible',
  { placement: 'top', title: 'bad', trigger: 'hover' },
  'normal',
  'good',
  'wonderful',
];

function getDescTitle(value: number, desc: RateProps['tooltips']) {
  const item = desc?.[value - 1];
  return typeof item === 'object' ? item.title : item;
}

const App: React.FC = () => {
  const [value, setValue] = useState(3);
  return (
    <Flex gap="middle" vertical>
      <Rate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span>{getDescTitle(value, desc) as React.ReactNode}</span> : null}
    </Flex>
  );
};

export default App;
```

### Read only

Read only, can't use mouse to interact.

```tsx
import React from 'react';
import { Rate } from 'antd';

const App: React.FC = () => <Rate disabled defaultValue={2} />;

export default App;
```

### Clear star

Support set allow to clear star when click again.

```tsx
import React from 'react';
import { Flex, Rate } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Flex gap="middle">
      <Rate defaultValue={3} />
      <span>allowClear: true</span>
    </Flex>
    <Flex gap="middle">
      <Rate defaultValue={3} allowClear={false} />
      <span>allowClear: false</span>
    </Flex>
  </Flex>
);

export default App;
```

### Other Character

Replace the default star to other character like alphabet, digit, iconfont or even Chinese word.

```tsx
import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { Flex, Rate } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Rate character={<HeartOutlined />} allowHalf />
    <Rate character="A" allowHalf style={{ fontSize: 36 }} />
    <Rate character="好" allowHalf />
  </Flex>
);

export default App;
```

### Customize character

Can customize each character using `(RateProps) => ReactNode`.

```tsx
import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Rate } from 'antd';

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Rate defaultValue={2} character={({ index = 0 }) => index + 1} />
    <Rate defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />
  </Flex>
);

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether to allow clear when click again | boolean | true |  |
| allowHalf | Whether to allow semi selection | boolean | false |  |
| character | The custom character of rate | ReactNode \| (RateProps) => ReactNode | &lt;StarFilled /> | function(): 4.4.0 |
| className | The custom class name of rate | string | - |  |
| count | Star count | number | 5 |  |
| defaultValue | The default value | number | 0 |  |
| disabled | If read only, unable to interact | boolean | false |  |
| keyboard | Support keyboard operation | boolean | true | 5.18.0 |
| size | Star size | 'small' \| 'middle' \| 'large' | 'middle' |  |
| style | The custom style object of rate | CSSProperties | - |  |
| tooltips | Customize tooltip by each character | [TooltipProps](/components/tooltip#api)[] \| string\[] | - |  |
| value | The current value | number | - |  |
| onBlur | Callback when component lose focus | function() | - |  |
| onChange | Callback when select value | function(value: number) | - |  |
| onFocus | Callback when component get focus | function() | - |  |
| onHoverChange | Callback when hover item | function(value: number) | - |  |
| onKeyDown | Callback when keydown on component | function(event) | - |  |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Design Token



## Component Token (Rate)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| starBg | Star background color | string | rgba(0,0,0,0.06) |
| starColor | Star color | string | #fadb14 |
| starHoverScale | Scale of star when hover | readonly string[] \| Transform \| readonly Transform[] \| { _multi_value_?: boolean; _skip_check_?: boolean; value: readonly string[] \| Transform \| (readonly string[] \| Transform \| undefined)[] \| undefined } \| undefined | scale(1.1) |
| starSize | Star size | number | 20 |
| starSizeLG | Large star size | number | 25 |
| starSizeSM | Small star size | number | 15 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| lineWidth | Border width of base components | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |


