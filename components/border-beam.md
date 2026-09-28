---
category: Components
group: Other
title: BorderBeam
description: Decorative component that renders a moving beam along a container border.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 6.4.0
---

## When To Use

- Use when a container needs stronger visual emphasis without introducing business state semantics.
- Suitable for login panels, recommendation cards, AI modules, and key CTA blocks.
- As a decorative effect, it should not replace focus rings, validation borders, or status feedback.

## Examples

### Basic

Basic usage. Wrap any container with `BorderBeam` to add a continuous decorative beam effect along its border.

```tsx
import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam>
      <Card title="Workspace overview">
        Review task status, deployment health, and recent automation activity in one panel.
      </Card>
    </BorderBeam>
  </div>
);

export default App;
```

### Show on hover

Hide the border beam by default, and reveal it when hovering over the container.

```tsx
import React from 'react';
import { BorderBeam, Card } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, prefixCls, cssVar } = props;
  return {
    card: css`
      width: 360px;
      .${prefixCls}-border-beam {
        opacity: 0;
        transition: opacity ${cssVar.motionDurationMid};
        &::before {
          animation-play-state: paused;
        }
      }
      &:hover {
        .${prefixCls}-border-beam {
          opacity: 1;
          &::before {
            animation-play-state: running;
          }
        }
      }
    `,
  };
});

const Demo: React.FC = () => {
  const { styles } = useStyles();
  return (
    <BorderBeam>
      <Card className={styles.card} title="Hover over the card">
        The border beam appears when the pointer moves over this card.
      </Card>
    </BorderBeam>
  );
};

export default Demo;
```

### Multiple beams

Use `count` to set the number of beams. Multiple beams are evenly distributed around the container border. It should be a positive integer, and the default value is `1`.

```tsx
import React from 'react';
import { BorderBeam, Card, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="medium">
    <BorderBeam count={3}>
      <Card title="Multiple beams">
        Set count to distribute multiple beams evenly around the container border.
      </Card>
    </BorderBeam>
    <BorderBeam count={2}>
      <Card title="Multiple beams">
        Set count to distribute multiple beams evenly around the container border.
      </Card>
    </BorderBeam>
  </Flex>
);

export default App;
```

### Custom container

A custom container can also host `BorderBeam`. The beam layer is inserted into the child node and positioned with `position: absolute` along the container edge, so the host element needs to provide a positioning context. In most cases, set `position: relative`.

```tsx
import React from 'react';
import { BorderBeam } from 'antd';

const panelStyle: React.CSSProperties = {
  position: 'relative',
  width: 420,
  background: '#fff',
  border: '1px solid #f0f0f0',
  borderRadius: 8,
};

const contentStyle: React.CSSProperties = {
  minHeight: 160,
  padding: 24,
  color: 'rgba(0, 0, 0, 0.88)',
  lineHeight: 1.5715,
};

const App: React.FC = () => (
  <BorderBeam>
    <div style={panelStyle}>
      <div style={contentStyle}>
        Review task status, deployment health, and recent automation activity in one custom
        container.
      </div>
    </div>
  </BorderBeam>
);

export default App;
```

### Gradients

Display six gradient beam palettes and switch between them.

```tsx
import React from 'react';
import { BorderBeam, Card, Flex, Segmented, Tag, Typography } from 'antd';
import type { BorderBeamGradient } from 'antd';

const presets: Array<{
  key: string;
  name: string;
  usage: string;
  description: string;
  color: BorderBeamGradient;
}> = [
  {
    key: 'ocean',
    name: 'Ocean',
    usage: 'Dashboard',
    description: 'A calm blue-green accent that works well for data views and cloud tooling.',
    color: [
      { color: '#1677ff', percent: 0 },
      { color: '#36cfc9', percent: 52 },
      { color: '#95de64', percent: 100 },
    ],
  },
  {
    key: 'sunset',
    name: 'Sunset',
    usage: 'Upgrade',
    description: 'A warm highlight for upgrade prompts, featured cards, and marketing blocks.',
    color: [
      { color: '#ff7a45', percent: 0 },
      { color: '#ff4d4f', percent: 49 },
      { color: '#ff85c0', percent: 100 },
    ],
  },
  {
    key: 'aurora',
    name: 'Aurora',
    usage: 'AI',
    description:
      'A vivid cool-toned beam suited for AI assistants, copilots, and automation panels.',
    color: [
      { color: '#7c3aed', percent: 0 },
      { color: '#06b6d4', percent: 57 },
      { color: '#67e8f9', percent: 100 },
    ],
  },
  {
    key: 'forest',
    name: 'Forest',
    usage: 'Recommendation',
    description:
      'A bright natural palette that feels good on recommendation and growth-oriented cards.',
    color: [
      { color: '#22c55e', percent: 0 },
      { color: '#a3e635', percent: 54 },
      { color: '#facc15', percent: 100 },
    ],
  },
  {
    key: 'ember',
    name: 'Ember',
    usage: 'Alert',
    description: 'A high-energy warm gradient for important alerts, launch cards, and hot paths.',
    color: [
      { color: '#fa541c', percent: 0 },
      { color: '#ff7875', percent: 46 },
      { color: '#ffd666', percent: 100 },
    ],
  },
  {
    key: 'nebula',
    name: 'Nebula',
    usage: 'Labs',
    description: 'A cool purple-pink mix that fits experimental modules and product lab surfaces.',
    color: [
      { color: '#2f54eb', percent: 0 },
      { color: '#722ed1', percent: 44 },
      { color: '#ff85c0', percent: 100 },
    ],
  },
];

const defaultPresetKey = presets[0].key;

const App: React.FC = () => {
  const [currentPresetKey, setCurrentPresetKey] = React.useState(defaultPresetKey);
  const currentPreset = presets.find((preset) => preset.key === currentPresetKey) ?? presets[0];

  return (
    <Flex vertical gap={16} style={{ maxWidth: 480 }}>
      <Segmented
        block
        options={presets.map((preset) => ({
          label: preset.name,
          value: preset.key,
        }))}
        value={currentPresetKey}
        onChange={(value) => setCurrentPresetKey(value as string)}
      />
      <BorderBeam color={currentPreset.color}>
        <Card
          title={currentPreset.name}
          extra={<Tag variant="filled">{currentPreset.usage}</Tag>}
          styles={{
            body: {
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            },
          }}
        >
          <Typography.Text type="secondary">{currentPreset.description}</Typography.Text>
          <Flex gap={8} wrap>
            {currentPreset.color.map((item) => (
              <Tag key={`${item.color}-${item.percent}`} color={item.color} variant="filled">
                {item.color} · {item.percent}%
              </Tag>
            ))}
          </Flex>
          <Typography.Text type="secondary">
            Stop positions use the public 0-100 input range.
          </Typography.Text>
        </Card>
      </BorderBeam>
    </Flex>
  );
};

export default App;
```

### Duration

Use `duration` to control how many seconds the beam takes to complete one loop. The default is 6 seconds.

```tsx
import React from 'react';
import { BorderBeam, Card, Flex, Tag, Typography } from 'antd';

const durations = [
  {
    name: 'Fast',
    seconds: 3,
    description: 'A quick loop for temporary highlights and active modules.',
  },
  {
    name: 'Default',
    seconds: 6,
    description: 'The original pacing for most emphasized containers.',
  },
  {
    name: 'Slow',
    seconds: 12,
    description: 'A calmer loop for persistent panels and ambient surfaces.',
  },
];

const App: React.FC = () => (
  <Flex gap={16} wrap>
    {durations.map(({ name, seconds, description }) => (
      <div key={name} style={{ width: 220 }}>
        <BorderBeam duration={seconds}>
          <Card title={name} extra={<Tag variant="filled">{seconds}s</Tag>}>
            <Typography.Text type="secondary">{description}</Typography.Text>
          </Card>
        </BorderBeam>
      </div>
    ))}
  </Flex>
);

export default App;
```

### Size

Use `size` to control the size of the visible beam segment. The default is `100px`, and numbers are treated as pixels.

```tsx
import React from 'react';
import { BorderBeam, Card, Tag, Typography } from 'antd';

const sizes: Array<{
  name: string;
  size?: number | string;
  bodyMinHeight: number;
  description: string;
  spanFull?: boolean;
}> = [
  {
    name: 'Default',
    bodyMinHeight: 112,
    description: 'Uses the default 100px visible beam segment.',
  },
  {
    name: 'Compact',
    size: 56,
    bodyMinHeight: 112,
    description: 'Keeps the highlight shorter for dense card groups.',
  },
  {
    name: 'Extended',
    size: 160,
    bodyMinHeight: 192,
    description: 'Creates a longer highlight for wider feature panels.',
    spanFull: true,
  },
];

const App: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: 32,
      maxWidth: 960,
    }}
  >
    {sizes.map(({ name, size, bodyMinHeight, description, spanFull }) => (
      <div key={name} style={{ gridColumn: spanFull ? '1 / -1' : undefined }}>
        <BorderBeam size={size}>
          <Card
            title={name}
            extra={<Tag variant="filled">{size ?? 100}px</Tag>}
            styles={{ body: { minHeight: bodyMinHeight, display: 'flex', alignItems: 'center' } }}
          >
            <Typography.Text type="secondary">{description}</Typography.Text>
          </Card>
        </BorderBeam>
      </div>
    ))}
  </div>
);

export default App;
```

### Line width

Use `lineWidth` to adjust the beam width of an individual BorderBeam. The default value is `1px`, and numbers are treated as pixels.

```tsx
import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => (
  <div style={{ width: 360 }}>
    <BorderBeam lineWidth={2}>
      <Card title="Custom line width" style={{ borderWidth: 2 }}>
        Set lineWidth to match the border width of this container.
      </Card>
    </BorderBeam>
  </div>
);

export default App;
```




## API

Common props ref：[Common props](/docs/react/common-props)

### BorderBeam

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | Decorated content | `ReactNode` | - | 6.4.0 | × |
| color | Beam color configuration. Supports a single color string or gradient stops. `percent` uses the `0 ~ 100` input range and BorderBeam reserves tail space for the transparent fade | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| count | Number of beams | number | 1 | 6.6.0 | × |
| duration | Time in seconds for the beam to complete one loop | number | 6 | 6.5.0 | × |
| lineWidth | Width of the beam line. Numbers are treated as pixels | `number \| string` | `1px` | 6.5.0 | × |
| outset | Outset distance of the beam layer from the container edge. Set to `0` for clipped containers | `number \| string` | - | 6.4.0 | × |
| size | Size of the visible beam segment. Numbers are treated as pixels | `number \| string` | 100 | 6.5.0 | × |

## Design Token



## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| lineWidth | Border width of base components | number |  |



## FAQ

### How does BorderBeam behave when reduced motion is enabled? {#faq-reduced-motion}

`BorderBeam` treats the beam as a decorative effect. When `prefers-reduced-motion: reduce` is active, the beam effect is hidden.

### What does `percent` mean in `color`? {#faq-color-percent}

`percent` represents the authored stop position and accepts values from `0` to `100`. BorderBeam maps those stops into the visible beam segment and reserves the trailing area for transparent fade-out so the moving tail stays visible.

### `size` limits {#faq-size-limit}

`BorderBeam` creates the beam with a square gradient layer whose side length is `size`. The layer travels around the container border, and a mask exposes the areas where it overlaps the border. `size` sets the side length independently of the border path length.

Along a horizontal edge, the gradient layer extends about `size / 2` to either side of the edge. If `size` approaches or exceeds twice the mask overlay height, the square can cover both the top and bottom edges. The same geometry applies to the width while the beam travels along a vertical edge.

Keep `size` well below twice the shorter side of the mask overlay: `size < 2 × min(width, height)`. The mask overlay is usually close in size to the decorated container, while `outset` changes its dimensions. Border radius, `lineWidth`, and transparent areas in the gradient also affect the point at which the overlap becomes visible.

### Why is `BorderBeam` not working? {#faq-not-working}

`BorderBeam` needs to resolve the actual DOM node from `children` and insert the beam layer into that node. Make sure the wrapped content is a native DOM element, or a React component that correctly forwards its `ref` to a DOM element. Otherwise BorderBeam cannot locate the real container and the beam cannot be rendered.

The beam layer is positioned with `position: absolute`, so the resolved DOM node also needs to provide a positioning context. In most cases, set `position: relative` on the wrapped element. BorderBeam does not inspect or patch the child positioning style for you.

For performance reasons, whether `children` can host the beam and its positioning information are resolved during initialization, and are not continuously updated when the child structure or positioning styles change later.

### How do I keep the beam radius aligned with my container? {#faq-radius}

`BorderBeam` renders the beam layer as a child of the actual container and directly inherits its radius through `border-radius: inherit`. For a single-container child such as `Card`, the beam automatically follows the container radius. For more complex child trees, make sure the radius is set on the actual container root.

The radius stays in sync through CSS inheritance, without being read or measured during initialization. Later changes made through `className`, responsive styles, or CSS variables are automatically reflected by the beam layer.
