---
category: Components
group: 反馈
title: Progress
subtitle: 进度条
description: 展示操作的当前进度。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gK_4S6fDRfgAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HJH8Tb1lcYAAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；
- 当需要显示一个操作完成的百分比时。

## 代码演示 {#examples}

### 进度条

标准的进度条。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </Flex>
);

export default App;
```

### 进度圈

圈形的进度。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </Flex>
);

export default App;
```

### 小型进度条

适合放在较狭窄的区域内。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="small" style={{ width: 180 }}>
    <Progress percent={30} size="small" />
    <Progress percent={50} size="small" status="active" />
    <Progress percent={70} size="small" status="exception" />
    <Progress percent={100} size="small" />
  </Flex>
);

export default App;
```

### 响应式进度圈

响应式的圈形进度，当 `width` 小于等于 20 的时候，进度信息将不会显示在进度圈里面，而是以 Tooltip 的形式显示。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex align="center" gap="small">
    <Progress
      type="circle"
      railColor="#e6f4ff"
      percent={60}
      strokeWidth={20}
      size={14}
      format={(number) => `进行中，已完成${number}%`}
    />
    <span>代码发布</span>
  </Flex>
);

export default App;
```

### 小型进度圈

小一号的圈形进度。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex wrap gap="small">
    <Progress type="circle" percent={30} size={80} />
    <Progress type="circle" percent={70} size={80} status="exception" />
    <Progress type="circle" percent={100} size={80} />
  </Flex>
);

export default App;
```

### 动态展示

会动的进度条才是好进度条。

```tsx
import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Progress, Space } from 'antd';

const App: React.FC = () => {
  const [percent, setPercent] = useState<number>(0);

  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  return (
    <Flex vertical gap="small">
      <Flex vertical gap="small">
        <Progress percent={percent} type="line" />
        <Progress percent={percent} type="circle" />
      </Flex>
      <Space.Compact>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Space.Compact>
    </Flex>
  );
};

export default App;
```

### 自定义文字格式

`format` 属性指定格式。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Progress type="circle" percent={75} format={(percent) => `${percent} Days`} />
    <Progress type="circle" percent={100} format={() => 'Done'} />
  </Flex>
);

export default App;
```

### 仪表盘

通过设置 `type=dashboard`，可以很方便地实现仪表盘样式的进度条。

```tsx
import React, { useState } from 'react';
import { Flex, Progress, Segmented } from 'antd';

import type { GapPlacement } from '../progress';

const App: React.FC = () => {
  const [gapPlacement, setGapPlacement] = useState<GapPlacement>('bottom');
  const [gapDegree, setGapDegree] = useState<number>(50);
  return (
    <Flex vertical gap="large">
      <div>
        gapDegree:
        <Segmented
          options={[
            { label: 50, value: 50 },

            { label: 100, value: 100 },
          ]}
          defaultValue={50}
          onChange={(value: number) => {
            setGapDegree(value);
          }}
        />
      </div>
      <div>
        gapPlacement:
        <Segmented
          options={[
            { label: 'start', value: 'start' },
            { label: 'end', value: 'end' },
            { label: 'top', value: 'top' },
            { label: 'bottom', value: 'bottom' },
          ]}
          defaultValue="bottom"
          onChange={(value: GapPlacement) => {
            setGapPlacement(value);
          }}
        />
      </div>
      <Progress type="dashboard" gapDegree={gapDegree} percent={30} gapPlacement={gapPlacement} />
    </Flex>
  );
};

export default App;
```

### 分段进度条

分段展示进度，可以用于细化进度语义。

```tsx
import React from 'react';
import { Flex, Progress, Tooltip } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Tooltip title="3 done / 3 in progress / 4 to do">
      <Progress percent={60} success={{ percent: 30 }} />
    </Tooltip>
    <Flex gap="small" wrap>
      <Tooltip title="3 done / 3 in progress / 4 to do">
        <Progress percent={60} success={{ percent: 30 }} type="circle" />
      </Tooltip>
      <Tooltip title="3 done / 3 in progress / 4 to do">
        <Progress percent={60} success={{ percent: 30 }} type="dashboard" />
      </Tooltip>
    </Flex>
  </Flex>
);

export default App;
```

### 边缘形状

通过设定 `strokeLinecap="butt"` 可以将进度条边缘的形状从闭合的圆形的圆弧调整为断口，详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap)。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="small">
    <Progress strokeLinecap="butt" percent={75} />
    <Flex wrap gap="small">
      <Progress strokeLinecap="butt" type="circle" percent={75} />
      <Progress strokeLinecap="butt" type="dashboard" percent={75} />
    </Flex>
  </Flex>
);

export default App;
```

### 自定义进度条渐变色

渐变色封装，`circle` 与 `dashboard` 设置渐变时 `strokeLinecap` 会被忽略。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';
import type { ProgressProps } from 'antd';

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const conicColors: ProgressProps['strokeColor'] = {
  '0%': '#87d068',
  '50%': '#ffe58f',
  '100%': '#ffccc7',
};

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Progress percent={99.9} strokeColor={twoColors} />
    <Progress percent={50} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
    <Flex gap="small" wrap>
      <Progress type="circle" percent={90} strokeColor={twoColors} />
      <Progress type="circle" percent={100} strokeColor={twoColors} />
      <Progress type="circle" percent={93} strokeColor={conicColors} />
    </Flex>
    <Flex gap="small" wrap>
      <Progress type="dashboard" percent={90} strokeColor={twoColors} />
      <Progress type="dashboard" percent={100} strokeColor={twoColors} />
      <Progress type="dashboard" percent={93} strokeColor={conicColors} />
    </Flex>
  </Flex>
);

export default App;
```

### 步骤进度条

带步骤的进度条。

```tsx
import React from 'react';
import { green, red } from '@ant-design/colors';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Progress percent={50} steps={3} />
    <Progress percent={30} steps={5} />
    <Progress percent={100} steps={5} size="small" strokeColor={green[6]} />
    <Progress percent={60} steps={5} strokeColor={[green[6], green[6], red[5]]} />
  </Flex>
);

export default App;
```

### 步骤进度圈

步骤进度圈，支持颜色分段展示，默认间隔为 2px。

```tsx
import React from 'react';
import { Flex, Progress, Slider, Typography } from 'antd';

const App: React.FC = () => {
  const [stepsCount, setStepsCount] = React.useState<number>(5);
  const [stepsGap, setStepsGap] = React.useState<number>(7);
  return (
    <>
      <Typography.Title level={5}>Custom count:</Typography.Title>
      <Slider min={2} max={10} value={stepsCount} onChange={setStepsCount} />
      <Typography.Title level={5}>Custom gap:</Typography.Title>
      <Slider step={4} min={0} max={40} value={stepsGap} onChange={setStepsGap} />
      <Flex wrap gap="middle" style={{ marginTop: 16 }}>
        <Progress
          type="dashboard"
          steps={8}
          percent={50}
          railColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
        <Progress
          type="circle"
          percent={100}
          steps={{ count: stepsCount, gap: stepsGap }}
          railColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
      </Flex>
    </>
  );
};

export default App;
```

### 尺寸

进度条尺寸。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Flex vertical gap="small" style={{ width: 300 }}>
      <Progress percent={50} />
      <Progress percent={50} size="small" />
      <Progress percent={50} size={[300, 20]} />
    </Flex>
    <Flex align="center" wrap gap={30}>
      <Progress type="circle" percent={50} />
      <Progress type="circle" percent={50} size="small" />
      <Progress type="circle" percent={50} size={20} />
    </Flex>
    <Flex align="center" wrap gap={30}>
      <Progress type="dashboard" percent={50} />
      <Progress type="dashboard" percent={50} size="small" />
      <Progress type="dashboard" percent={50} size={20} />
    </Flex>
    <Flex align="center" wrap gap={30}>
      <Progress steps={3} percent={50} />
      <Progress steps={3} percent={50} size="small" />
      <Progress steps={3} percent={50} size={20} />
      <Progress steps={3} percent={50} size={[20, 30]} />
    </Flex>
  </Flex>
);

export default App;
```

### 改变进度数值位置

改变进度数值位置，可使用 `percentPosition` 调整，使进度条数值在进度条内部、外部或底部。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Progress
      percent={0}
      percentPosition={{ align: 'center', type: 'inner' }}
      size={[200, 20]}
      strokeColor="#E6F4FF"
    />
    <Progress percent={10} percentPosition={{ align: 'center', type: 'inner' }} size={[300, 20]} />
    <Progress
      percent={50}
      percentPosition={{ align: 'start', type: 'inner' }}
      size={[300, 20]}
      strokeColor="#B7EB8F"
    />
    <Progress
      percent={60}
      percentPosition={{ align: 'end', type: 'inner' }}
      size={[300, 20]}
      strokeColor="#001342"
    />
    <Progress percent={100} percentPosition={{ align: 'center', type: 'inner' }} size={[400, 20]} />
    <Progress percent={60} percentPosition={{ align: 'start', type: 'outer' }} />
    <Progress percent={100} percentPosition={{ align: 'start', type: 'outer' }} />
    <Progress percent={60} percentPosition={{ align: 'center', type: 'outer' }} size="small" />
    <Progress percent={100} percentPosition={{ align: 'center', type: 'outer' }} />
  </Flex>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象或者函数可以自定义 Progress 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Progress } from 'antd';
import type { ProgressProps } from 'antd';

const classNames: ProgressProps['classNames'] = {
  root: 'demo-progress-root',
  rail: 'demo-progress-rail',
  track: 'demo-progress-track',
};

const stylesFn: ProgressProps['styles'] = (info) => {
  const percent = info?.props?.percent ?? 0;
  const hue = 200 - (200 * percent) / 100;
  return {
    track: {
      backgroundImage: `
        linear-gradient(
          to right,
          hsla(${hue}, 85%, 65%, 1),
          hsla(${hue + 30}, 90%, 55%, 0.95)
        )`,
      borderRadius: 8,
      transition: 'all 0.3s ease',
    },
    rail: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
    },
  } satisfies ProgressProps['styles'];
};

const App: React.FC = () => (
  <Flex vertical gap="large">
    <Progress classNames={classNames} styles={stylesFn} percent={10} />
    <Progress classNames={classNames} styles={stylesFn} percent={20} />
    <Progress classNames={classNames} styles={stylesFn} percent={40} />
    <Progress classNames={classNames} styles={stylesFn} percent={60} />
    <Progress classNames={classNames} styles={stylesFn} percent={80} />
    <Progress classNames={classNames} styles={stylesFn} percent={99} />
  </Flex>
);

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

各类型共用的属性。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| format | 内容的模板函数 | function(percent, successPercent) | (percent) => percent + `%` | - |
| percent | 百分比 | number | 0 | - |
| railColor | 未完成的分段的颜色 | string | - | - |
| showInfo | 是否显示进度数值或状态图标 | boolean | true | - |
| status | 状态，可选：`success` `exception` `normal` `active`(仅限 line) | string | - | - |
| strokeColor | 进度条的色彩 | string | - | - |
| strokeLinecap | 进度条的样式 | `round` \| `butt` \| `square`，区别详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) | `round` | - |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| success | 成功进度条相关配置 | { percent: number, strokeColor: string } | - | - |
| ~~trailColor~~ | 未完成的分段的颜色。已废弃，请使用 `railColor` | string | - | - |
| type | 类型，可选 `line` `circle` `dashboard` | string | `line` | - |
| size | 进度条的尺寸 | number \| \[number \| string, number] \| { width: number, height: number } \| "small" \| "default" | "default" | 5.3.0, Object: 5.18.0 |

### `type="line"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| steps | 进度条总共步数 | number | - | - |
| rounding | 用于四舍五入数值的函数 | (step: number) => number | Math.round | 5.24.0 |
| strokeColor | 进度条的色彩，传入 object 时为渐变。当有 `steps` 时支持传入一个数组。 | string \| string[] \| { from: string; to: string; direction: string } | - | 4.21.0: `string[]` |
| percentPosition | 进度数值位置，传入对象，`align` 表示数值的水平位置，`type` 表示数值在进度条内部还是外部 | { align: string; type: string } | { align: \"end\", type: \"outer\" } | 5.18.0 |

### `type="circle"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| steps | 进度条总共步数，传入 object 时，count 指步数，gap 指间隔大小。传 number 类型时，gap 默认为 2。 | number \| { count: number, gap: number } | - | 5.16.0 |
| strokeColor | 圆形进度条线的色彩，传入 object 时为渐变 | string \| { number%: string } | - | - |
| strokeWidth | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 | - |

### `type="dashboard"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| steps | 进度条总共步数，传入 object 时，count 指步数，gap 指间隔大小。传 number 类型时，gap 默认为 2。 | number \| { count: number, gap: number } | - | 5.16.0 |
| gapDegree | 仪表盘进度条缺口角度，可取值 0 ~ 295 | number | 75 | - |
| gapPlacement | 仪表盘进度条缺口位置 | `top` \| `bottom` \| `start` \| `end` | `bottom` | - |
| ~~gapPosition~~ | 仪表盘进度条缺口位置，请使用 `gapPlacement` 替换 | `top` \| `bottom` \| `left` \| `right` | `bottom` | - |
| strokeWidth | 仪表盘进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 | - |

## Semantic DOM

https://ant.design/components/progress-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Progress)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| circleIconFontSize | 圆形进度条图标大小 | string | 1.1666666666666667em |
| circleTextColor | 圆形进度条文字颜色 | string | rgba(0,0,0,0.88) |
| circleTextFontSize | 圆形进度条文本大小 | string | 1em |
| defaultColor | 进度条默认颜色 | string | #1677ff |
| lineBorderRadius | 条状进度条圆角 | number | 100 |
| remainingColor | 进度条剩余部分颜色 | string | rgba(0,0,0,0.06) |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorSuccess | 用于表示操作成功的 Token 序列，如 Result、Progress 等组件会使用该组梯度变量。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorWhite | 不随主题变化的纯白色 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| motionEaseOutQuint | 预设动效曲率 | string |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |


