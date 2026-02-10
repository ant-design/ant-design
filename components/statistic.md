---
category: Components
group: Data Display
title: Statistic
description: Display statistic number.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BPWDRbSYxJ4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

## Examples

### Basic

Simplest Usage.

```tsx
import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} />
    </Col>
    <Col span={12}>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      <Button style={{ marginTop: 16 }} type="primary">
        Recharge
      </Button>
    </Col>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} loading />
    </Col>
  </Row>
);

export default App;
```

### Unit

Add unit through `prefix` and `suffix`.

```tsx
import React from 'react';
import { LikeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
    </Col>
    <Col span={12}>
      <Statistic title="Unmerged" value={93} suffix="/ 100" />
    </Col>
  </Row>
);

export default App;
```

### Animated number

Animated number with [react-countup](https://www.npmjs.com/package/react-countup).

```tsx
import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Users" value={112893} formatter={formatter} />
    </Col>
    <Col span={12}>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
    </Col>
  </Row>
);

export default App;
```

### In Card

Display statistic data in Card.

```tsx
import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Card variant="borderless">
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          styles={{ content: { color: '#3f8600' } }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card variant="borderless">
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          styles={{ content: { color: '#cf1322' } }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
);

export default App;
```

### Timer

Timer component.

```tsx
import React from 'react';
import type { StatisticTimerProps } from 'antd';
import { Col, Row, Statistic } from 'antd';

const { Timer } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
const before = Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
const tenSecondsLater = Date.now() + 10 * 1000;

const onFinish: StatisticTimerProps['onFinish'] = () => {
  console.log('finished!');
};

const onChange: StatisticTimerProps['onChange'] = (val) => {
  if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
};

const App: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Timer type="countdown" value={deadline} onFinish={onFinish} />
    </Col>
    <Col span={12}>
      <Timer type="countdown" title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
    </Col>
    <Col span={12}>
      <Timer type="countdown" title="Countdown" value={tenSecondsLater} onChange={onChange} />
    </Col>
    <Col span={12}>
      <Timer type="countup" title="Countup" value={before} onChange={onChange} />
    </Col>
    <Col span={24} style={{ marginTop: 32 }}>
      <Timer
        type="countdown"
        title="Day Level (Countdown)"
        value={deadline}
        format="D 天 H 时 m 分 s 秒"
      />
    </Col>
    <Col span={24} style={{ marginTop: 32 }}>
      <Timer
        type="countup"
        title="Day Level (Countup)"
        value={before}
        format="D 天 H 时 m 分 s 秒"
      />
    </Col>
  </Row>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of the Statistic by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Flex, Statistic } from 'antd';
import type { StatisticProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 16px;
    border-radius: 8px;
  `,
}));

const styleFn: StatisticProps['styles'] = ({ props }) => {
  const numValue = Number(props.value ?? 0);
  const isNegative = Number.isFinite(numValue) && numValue < 0;
  if (isNegative) {
    return {
      title: {
        color: '#ff4d4f',
      },
      content: {
        color: '#ff7875',
      },
    } satisfies StatisticProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const statisticSharedProps: StatisticProps = {
    classNames: { root: classNames.root },
    prefix: <ArrowUpOutlined />,
  };

  return (
    <Flex vertical gap="middle">
      <Statistic
        {...statisticSharedProps}
        title="Monthly Active Users"
        value={93241}
        styles={{ title: { color: '#1890ff', fontWeight: 600 }, content: { fontSize: '24px' } }}
        suffix="users"
      />
      <Statistic
        {...statisticSharedProps}
        title="Yearly Loss"
        value={-18.7}
        precision={1}
        styles={styleFn}
        suffix="%"
      />
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

#### Statistic

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the Statistic component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| decimalSeparator | The decimal separator | string | `.` |  |
| formatter | Customize value display logic | (value) => ReactNode | - |  |
| groupSeparator | Group separator | string | `,` |  |
| loading | Loading status of Statistic | boolean | false | 4.8.0 |
| precision | The precision of input value | number | - |  |
| prefix | The prefix node of value | ReactNode | - |  |
| styles | Customize inline style for each semantic structure inside the Statistic component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffix | The suffix node of value | ReactNode | - |  |
| title | Display title | ReactNode | - |  |
| value | Display value | string \| number | - |  |
| valueStyle | Set value section style | CSSProperties | - |  |

#### Statistic.Countdown <Badge type="error">Deprecated</Badge>

<Antd component="Alert" title="When using version >= 5.25.0, Please use Statistic.Timer instead." type="warning" banner="true"></Antd>

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| format | Format as [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | The prefix node of value | ReactNode | - |  |
| suffix | The suffix node of value | ReactNode | - |  |
| title | Display title | ReactNode | - |  |
| value | Set target countdown time | number | - |  |
| valueStyle | Set value section style | CSSProperties | - |  |
| onFinish | Trigger when time's up | () => void | - |  |
| onChange | Trigger when time's changing | (value: number) => void | - | 4.16.0 |

#### Statistic.Timer <Badge>5.25.0+</Badge>

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| type | time counter down or up | `countdown` `countup` | - |  |
| format | Format as [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | The prefix node of value | ReactNode | - |  |
| suffix | The suffix node of value | ReactNode | - |  |
| title | Display title | ReactNode | - |  |
| value | Set target countdown time | number | - |  |
| valueStyle | Set value section style | CSSProperties | - |  |
| onFinish | Trigger when time's up, only to be called when type is `countdown` | () => void | - |  |
| onChange | Trigger when time's changing | (value: number) => void | - |  |

## Semantic DOM

https://ant.design/components/statistic/semantic.md

## Design Token



## Component Token (Statistic)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| contentFontSize | Content font size | number | 24 |
| titleFontSize | Title font size | number | 14 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| padding | Control the padding of the element. | number |  |


