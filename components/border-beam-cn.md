---
category: Components
group: 其他
title: BorderBeam
subtitle: 边框流光
description: 为容器边框提供持续流动的装饰性高亮效果。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uae3QbkNCm8AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VcjGQLSrYdcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 6.4.0
---

## 何时使用 {#when-to-use}

- 需要强化某个容器的视觉关注度，但又不希望引入业务状态语义时。
- 适合登录面板、推荐卡片、AI 模块、重点 CTA 区域等场景。
- 它是装饰性效果，不应替代焦点态、校验态或业务状态边框。

## 代码演示 {#examples}

### 基础用法

基础用法。使用 `BorderBeam` 修饰任意容器即可为边框添加持续流动的装饰性高亮效果。

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

### 渐变色

展示 6 组渐变流光配色，可切换查看不同效果。

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

通用属性参考：[通用属性](/docs/react/common-props)

### BorderBeam

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| children | 装饰内容 | `ReactNode` | - | 6.4.0 | × |
| color | 流光颜色配置，支持单色字符串或渐变停靠点数组。`percent` 使用 `0 ~ 100` 的输入区间，组件会在内部为尾部透明过渡预留空间 | `string \| { color: string; percent: number }[]` | - | 6.4.0 | × |
| outset | 流光层相对容器边缘的外扩距离，遇到裁剪容器时可设为 `0` | `number \| string` | - | 6.4.0 | × |

## 主题变量（Design Token）{#design-token}



## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |



## FAQ

### 开启减少动态效果后会怎样？ {#faq-reduced-motion}

`BorderBeam` 会将流光视为装饰效果。当命中 `prefers-reduced-motion: reduce` 时，组件会隐藏 beam 效果。

### `color` 中的 `percent` 表示什么？ {#faq-color-percent}

`percent` 表示渐变停靠点的输入位置，取值范围为 `0 ~ 100`。组件会将这些停靠点映射到可见 beam 段内，并为尾部透明过渡保留空间，以保持流光尾迹连续可见。

### 为什么 `BorderBeam` 没有效果？ {#faq-not-working}

`BorderBeam` 需要通过 `children` 获取实际 DOM 节点，并将流光层插入到该节点中。请确保被包裹的内容是原生 DOM 元素，或是正确透传 `ref` 到 DOM 的 React 组件，否则组件无法定位真实容器，也就无法渲染流光效果。

流光层使用 `position: absolute` 定位，因此被索引到的 DOM 节点还需要提供定位上下文，通常可以为它设置 `position: relative`。`BorderBeam` 不会主动检测或修正子节点的定位样式。

为保证性能，`children` 是否可以插入以及其定位信息会在初始化时判断，后续不会持续监听子节点结构或定位样式变化。

### 如何让流光边框跟随容器圆角？ {#faq-radius}

`BorderBeam` 会在初始化时读取实际容器的计算后 `border-radius`。这个能力更适合 `Card` 这类单容器子节点场景；若子节点结构较复杂，建议直接把圆角写在实际容器根节点上，以获得更稳定的结果。

为保证性能，圆角计算完成后不会持续重新测量。后续由尺寸、祖先样式或子节点内部状态引起的圆角变化，不保证自动重新同步。动画轨迹在运行时可能会做内部平滑处理。

例如：

```tsx
const radius = 24;

<BorderBeam>
  <Card style={{ borderRadius: radius }} />
</BorderBeam>;
```
