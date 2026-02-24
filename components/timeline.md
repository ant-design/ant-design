---
category: Components
group: Data Display
title: Timeline
description: Vertical display timeline.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FkTySqNt3sYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yIl9S4hAIBcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- When a series of information needs to be ordered by time (ascending or descending).
- When you need a timeline to make a visual connection.

## Examples

### Basic

Basic timeline.

```tsx
import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
      },
      {
        content: 'Technical testing 2015-09-01',
      },
      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### Variant

Use the `variant` to set the style of the timeline.

```tsx
import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    variant="filled"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
      },
      {
        content: 'Technical testing 2015-09-01',
      },
      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### Loading and Reversing

Node supports `loading` to indicate loading, and `reverse` property to control the order of nodes.

```tsx
import React, { useState } from 'react';
import { Button, Flex, Timeline } from 'antd';

const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);

  const handleClick = () => {
    setReverse(!reverse);
  };

  return (
    <Flex vertical gap="middle" align="flex-start">
      <Timeline
        reverse={reverse}
        items={[
          {
            content: 'Create a services site 2015-09-01',
          },
          {
            content: 'Solve initial network problems 2015-09-01',
          },
          {
            content: 'Technical testing 2015-09-01',
          },
          {
            loading: true,
            content: 'Recording...',
          },
        ]}
      />
      <Button type="primary" onClick={handleClick}>
        Toggle Reverse
      </Button>
    </Flex>
  );
};

export default App;
```


### Alternate

Alternate timeline.

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    mode="alternate"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
        color: 'green',
      },
      {
        icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
      },
      {
        color: 'red',
        content: 'Network problems being solved 2015-09-01',
      },
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
        content: 'Technical testing 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### Horizontal

Horizontal layout.

```tsx
import React from 'react';
import { Divider, Flex, Timeline } from 'antd';
import type { TimelineProps } from 'antd';

const sharedProps: TimelineProps = {
  orientation: 'horizontal',
  items: [
    {
      content: 'Init',
    },
    {
      content: 'Start',
    },
    {
      content: 'Pending',
    },
    {
      content: 'Complete',
    },
  ],
};

const App: React.FC = () => (
  <Flex vertical>
    <Timeline {...sharedProps} mode="start" />
    <Divider />
    <Timeline {...sharedProps} mode="end" />
    <Divider />
    <Timeline {...sharedProps} mode="alternate" />
  </Flex>
);

export default App;
```


### Custom

Set a node as an icon or other custom element.

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { theme, Timeline } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Timeline
      items={[
        {
          content: 'Create a services site 2015-09-01',
        },
        {
          content: 'Solve initial network problems 2015-09-01',
        },
        {
          icon: (
            <ClockCircleOutlined
              style={{
                fontSize: 20,
                // Only need to set when `fontSize` is customized
                background: token.colorBgContainer,
              }}
            />
          ),
          color: 'red',
          content: 'Technical testing 2015-09-01',
        },
        {
          content: 'Network problems being solved 2015-09-01',
        },
      ]}
    />
  );
};

export default App;
```

### End alternate

End alternate timeline.

```tsx
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    mode="end"
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
      },
      {
        icon: <ClockCircleOutlined />,
        color: 'red',
        content: 'Technical testing 2015-09-01',
      },
      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### Title

Use `title` show time alone.

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Timeline } from 'antd';

const App: React.FC = () => {
  const [mode, setMode] = useState<'start' | 'alternate' | 'end'>('start');

  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="start">Start</Radio>
        <Radio value="end">End</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline
        mode={mode}
        items={[
          {
            title: '2015-09-01',
            content: 'Create a services',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Solve initial network problems',
          },
          {
            content: 'Technical testing',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Network problems being solved',
          },
        ]}
      />
    </>
  );
};

export default App;
```

### Title Offset

Use `titleSpan` to set the title span space.

```tsx
import React from 'react';
import { Flex, Timeline, Typography } from 'antd';
import type { TimelineProps } from 'antd';

const items: TimelineProps['items'] = [
  { title: '05:10', content: 'Create a services' },
  { title: '09:03', content: 'Solve initial network problems' },
  { content: 'Technical testing' },
  { title: '11:28', content: 'Network problems being solved' },
];

const App: React.FC = () => {
  return (
    <Flex vertical gap="middle">
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 100px
      </Typography.Title>
      <Timeline items={items} titleSpan="100px" />
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 25%
      </Typography.Title>
      <Timeline items={items} titleSpan="25%" />
      <Typography.Title level={5} style={{ margin: 0 }}>
        titleSpan = 18, mode = end
      </Typography.Title>
      <Timeline items={items} titleSpan={18} mode="end" />
    </Flex>
  );
};

export default App;
```

### Semantic Sample

Achieve richer custom styles by using semantic structure.

```tsx
import React from 'react';
import { Timeline } from 'antd';

const App: React.FC = () => (
  <Timeline
    items={[
      {
        content: 'Create a services site 2015-09-01',
      },
      {
        content: 'Solve initial network problems 2015-09-01',
        styles: {
          root: {
            height: 100,
          },
          rail: {
            borderStyle: 'dashed',
          },
        },
      },
      {
        content: '...for a long time...',
        styles: {
          root: {
            height: 100,
          },
          rail: {
            borderStyle: 'dashed',
          },
          content: {
            opacity: 0.45,
          },
        },
      },
      {
        content: 'Technical testing 2015-09-01',
      },

      {
        content: 'Network problems being solved 2015-09-01',
      },
    ]}
  />
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Timeline by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Timeline } from 'antd';
import type { TimelineProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 8px;
    border-radius: 4px;
  `,
}));

const styles: TimelineProps['styles'] = {
  itemIcon: {
    borderColor: '#1890ff',
  },
};

const stylesFn: TimelineProps['styles'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return {
      root: {
        padding: '10px 6px',
        border: '1px solid #A294F9',
      },
      itemIcon: {
        borderColor: '#A294F9',
      },
    } satisfies TimelineProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: TimelineProps = {
    classNames,
    items: [
      {
        title: '2015-09-01',
        content: 'Create a services site',
      },
      {
        title: '2015-09-01 09:12:11',
        content: 'Solve initial network problems',
      },
      {
        content: 'Technical testing',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Timeline {...sharedProps} orientation="horizontal" styles={styles} />
      <Timeline {...sharedProps} orientation="vertical" styles={stylesFn} />
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

### Timeline

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| items | Each node of timeline | [Items](#Items)[] | - |  |
| mode | By sending `alternate` the timeline will distribute the nodes to the left and right | `start` \| `alternate` \| `end` | `start` |  |
| orientation | Set the direction of the timeline | `vertical` \| `horizontal` | `vertical` |  |
| ~~pending~~ | Set the last ghost node's existence or its content. Use `item.loading` instead | ReactNode | false |  |
| ~~pendingDot~~ | Set the dot of the last ghost node when pending is true. Use `item.icon` instead | ReactNode | &lt;LoadingOutlined /&gt; |  |
| reverse | Whether reverse nodes or not | boolean | false |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| titleSpan | Set the title span space. It is the distance to the center of the dot <InlinePopover previewURL="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1NJISa7bpqgAAAAAR5AAAAgAerJ8AQ/original"></InlinePopover> | number \| string | 12 |  |
| variant | Config style variant | `filled` \| `outlined` | `outlined` |  |

### Items

Node of timeline.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| color | Set the circle's color to `blue`, `red`, `green`, `gray` or other custom colors | string | `blue` |
| content | Set the content | ReactNode | - |
| ~~children~~ | Set the content. Please use `content` instead | ReactNode | - |
| ~~dot~~ | Customize timeline dot. Please use `icon` instead | ReactNode | - |
| icon | Customize node icon | ReactNode | - |
| ~~label~~ | Set the label. Please use `title` instead | ReactNode | - |
| loading | Set loading state | boolean | false |
| placement | Customize node placement | `start` \| `end` | - |
| ~~position~~ | Customize node position，Please use `placement` instead | `start` \| `end` | - |
| title | Set the title | ReactNode | - |

## Semantic DOM

### Timeline

https://ant.design/components/timeline/semantic.md

### Timeline Items

https://ant.design/components/timeline/semantic_items.md

## Design Token



## Component Token (Timeline)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| dotBg | Background color of node | string |  |
| dotBorderWidth | Border width of node | string \| number | 2 |
| dotSize | Node size | string \| number |  |
| itemPaddingBottom | Bottom padding of item | number | 20 |
| tailColor | Line color | string | rgba(5,5,5,0.06) |
| tailWidth | Line width | string \| number | 2 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorSuccess | Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| margin | Control the margin of an element, with a medium size. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


