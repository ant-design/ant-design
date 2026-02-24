---
category: Components
group: Feedback
title: Progress
description: Display the current progress of the operation.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gK_4S6fDRfgAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HJH8Tb1lcYAAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

If it will take a long time to complete an operation, you can use `Progress` to show the current progress and status.

- When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.
- When you need to display the completion percentage of an operation.

## Examples

### Progress bar

A standard progress bar.

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

### Circular progress bar

A circular progress bar.

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

### Mini size progress bar

Appropriate for a narrow area.

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

### Responsive circular progress bar

Responsive circular progress bar. When `width` is smaller than 20, progress information will be displayed in Tooltip.

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

### Mini size circular progress bar

A smaller circular progress bar.

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

### Dynamic

A dynamic progress bar is better.

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

### Custom text format

You can set a custom text by setting the `format` prop.

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

### Dashboard

By setting `type=dashboard`, you can get a dashboard style of progress easily.

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

### Progress bar with success segment

Show several parts of progress with different status.

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

### Stroke Linecap

By setting `strokeLinecap="butt"`, you can change the linecaps from `round` to `butt`, see [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) for more information.

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

### Custom line gradient

Gradient encapsulation, `circle` and `dashboard` will ignore `strokeLinecap` when setting gradient.

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

### Progress bar with steps

A progress bar with steps.

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

### Circular progress bar with steps

A circular progress bar that support steps and color segments, default gap is 2px.

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

### Progress size

The size of progress.

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

### Change progress value position

Change the position of the progress value, you can use `percentPosition` to adjust it so that the progress bar value is inside, outside or at the bottom of the progress bar.

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Progress by passing objects or functions through `classNames` and `styles`.

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

Common props ref：[Common props](/docs/react/common-props)

Properties that shared by all types.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| format | The template function of the content | function(percent, successPercent) | (percent) => percent + `%` | - |
| percent | To set the completion percentage | number | 0 | - |
| railColor | The color of unfilled part | string | - | - |
| showInfo | Whether to display the progress value and the status icon | boolean | true |
| status | To set the status of the Progress, options: `success` `exception` `normal` `active`(line only) | string | - |
| strokeColor | The color of progress bar | string | - | - |
| strokeLinecap | To set the style of the progress linecap | `round` \| `butt` \| `square`, see [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) | `round` | - |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| success | Configs of successfully progress bar | { percent: number, strokeColor: string } | - | - |
| ~~trailColor~~ | The color of unfilled part. Please use `railColor` instead | string | - | - |
| type | To set the type, options: `line` `circle` `dashboard` | string | `line` |
| size | Progress size | number \| \[number \| string, number] \| { width: number, height: number } \| "small" \| "default" | "default" | 5.3.0, Object: 5.18.0 |

### `type="line"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| steps | The total step count | number | - | - |
| rounding | The function to round the value | (step: number) => number | Math.round | 5.24.0 |
| strokeColor | The color of progress bar, render `linear-gradient` when passing an object, could accept `string[]` when has `steps`. | string \| string[] \| { from: string; to: string; direction: string } | - | 4.21.0: `string[]` |
| percentPosition | Progress value position, passed in object, `align` indicates the horizontal position of the value, `type` indicates whether the value is inside or outside the progress bar | { align: string; type: string } | { align: \"end\", type: \"outer\" } | 5.18.0 |

### `type="circle"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| steps | The total step count.When passing an object, `count` refers to the number of steps, and `gap` refers to the distance between them.When passing number, the default value for `gap` is 2. | number \| { count: number, gap: number } | - | 5.16.0 |
| strokeColor | The color of circular progress, render gradient when passing an object | string \| { number%: string } | - | - |
| strokeWidth | To set the width of the circular progress, unit: percentage of the canvas width | number | 6 | - |

### `type="dashboard"`

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| steps | The total step count.When passing an object, `count` refers to the number of steps, and `gap` refers to the distance between them.When passing number, the default value for `gap` is 2. | number \| { count: number, gap: number } | - | 5.16.0 |
| gapDegree | The gap degree of half circle, 0 ~ 295 | number | 75 |
| gapPlacement | The gap placement, options: `top` `bottom` `start` `end` | string | `bottom` |
| ~~gapPosition~~ | The gap position, options: `top` `bottom` `left` `right`, please use `gapPlacement` instead | string | `bottom` |
| strokeWidth | To set the width of the dashboard progress, unit: percentage of the canvas width | number | 6 |

## Semantic DOM

https://ant.design/components/progress/semantic.md

## Design Token



## Component Token (Progress)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| circleIconFontSize | Icon size of circular progress bar | string | 1.1666666666666667em |
| circleTextColor | Text color of circular progress bar | string | rgba(0,0,0,0.88) |
| circleTextFontSize | Text size of circular progress bar | string | 1em |
| defaultColor | Default color of progress bar | string | #1677ff |
| lineBorderRadius | Border radius of line progress bar | number | 100 |
| remainingColor | Color of remaining part of progress bar | string | rgba(0,0,0,0.06) |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorSuccess | Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorWhite | Pure white color don't changed by theme | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeSM | Small font size | number |  |
| lineHeight | Line height of text. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| motionEaseOutQuint | Preset motion curve. | string |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


