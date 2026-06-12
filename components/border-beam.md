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




## API

Common props ref：[Common props](/docs/react/common-props)

### BorderBeam

| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | Decorated content | `ReactNode` | - | 6.4.0 | × |
| color | Beam color configuration. Supports a single color string or gradient stops. `percent` uses the `0 ~ 100` input range and BorderBeam reserves tail space for the transparent fade | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| outset | Outset distance of the beam layer from the container edge. Set to `0` for clipped containers | `number \| string` | - | 6.4.0 | × |

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

### Why is `BorderBeam` not working? {#faq-not-working}

`BorderBeam` needs to resolve the actual DOM node from `children` and insert the beam layer into that node. Make sure the wrapped content is a native DOM element, or a React component that correctly forwards its `ref` to a DOM element. Otherwise BorderBeam cannot locate the real container and the beam cannot be rendered.

The beam layer is positioned with `position: absolute`, so the resolved DOM node also needs to provide a positioning context. In most cases, set `position: relative` on the wrapped element. BorderBeam does not inspect or patch the child positioning style for you.

For performance reasons, whether `children` can host the beam and its positioning information are resolved during initialization, and are not continuously updated when the child structure or positioning styles change later.

### How do I keep the beam radius aligned with my container? {#faq-radius}

`BorderBeam` reads the computed `border-radius` from the actual container during initialization. This works best for a single-container child such as `Card`; for more complex child trees, set the radius on the actual container root for a more deterministic result.

For performance reasons, the radius is not continuously measured after the initial calculation. Later radius changes caused by size, ancestor styles, or internal child state are not guaranteed to resync automatically. The running beam may still apply internal motion smoothing.

For example:

```tsx
const radius = 24;

<BorderBeam>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
