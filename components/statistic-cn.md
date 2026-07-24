---
category: Components
group: 数据展示
title: Statistic
subtitle: 统计数值
description: 展示统计数值。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BPWDRbSYxJ4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## 代码演示 {#examples}

### 基本

简单的展示。

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

### 单位

通过前缀和后缀添加单位。

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

### 动画效果

给数值添加动画进入效果，需要配合 [react-countup](https://www.npmjs.com/package/react-countup)。

```tsx
import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import { createStyles } from 'antd-style';
import CountUp from 'react-countup';

const useStyle = createStyles(({ css }) => {
  return {
    content: css`
      font-variant-numeric: tabular-nums;
    `,
  };
});

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

const Demo: React.FC = () => {
  const { styles } = useStyle();
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          classNames={{ content: styles.content }}
          title="Active Users"
          value={112893}
          formatter={formatter}
        />
      </Col>
      <Col span={12}>
        <Statistic
          classNames={{ content: styles.content }}
          title="Account Balance (CNY)"
          value={112893}
          precision={2}
          formatter={formatter}
        />
      </Col>
    </Row>
  );
};

export default Demo;
```

### 在卡片中使用

在卡片中展示统计数值。

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

### 计时器

计时器组件。

```tsx
import React from 'react';
import type { StatisticTimerProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import { createStyles } from 'antd-style';

const { Timer } = Statistic;

const useStyle = createStyles(({ css }) => {
  return {
    content: css`
      font-variant-numeric: tabular-nums;
    `,
  };
});

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK
const before = Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
const tenSecondsLater = Date.now() + 10 * 1000;

const onFinish: StatisticTimerProps['onFinish'] = () => {
  console.log('finished!');
};

const onChange: StatisticTimerProps['onChange'] = (val) => {
  if (typeof val === 'number' && !Number.isNaN(val) && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
};

const Demo: React.FC = () => {
  const { styles } = useStyle();
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Timer
          classNames={{ content: styles.content }}
          type="countdown"
          value={deadline}
          onFinish={onFinish}
        />
      </Col>
      <Col span={12}>
        <Timer
          classNames={{ content: styles.content }}
          type="countdown"
          title="Million Seconds"
          value={deadline}
          format="HH:mm:ss:SSS"
        />
      </Col>
      <Col span={12}>
        <Timer
          classNames={{ content: styles.content }}
          type="countdown"
          title="Countdown"
          value={tenSecondsLater}
          onChange={onChange}
        />
      </Col>
      <Col span={12}>
        <Timer
          classNames={{ content: styles.content }}
          type="countup"
          title="Countup"
          value={before}
          onChange={onChange}
        />
      </Col>
      <Col span={24} style={{ marginTop: 32 }}>
        <Timer
          classNames={{ content: styles.content }}
          type="countdown"
          title="Day Level (Countdown)"
          value={deadline}
          format="D 天 H 时 m 分 s 秒"
        />
      </Col>
      <Col span={24} style={{ marginTop: 32 }}>
        <Timer
          classNames={{ content: styles.content }}
          type="countup"
          title="Day Level (Countup)"
          value={before}
          format="D 天 H 时 m 分 s 秒"
        />
      </Col>
    </Row>
  );
};

export default Demo;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Statistic 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Flex, Statistic } from 'antd';
import type { GetProp, StatisticProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 16px;
    border-radius: 8px;
  `,
}));

const styleFn: StatisticProps['styles'] = ({
  props,
}): GetProp<StatisticProps, 'styles', 'Return'> => {
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
      value: {
        backgroundColor: '#fff1f0',
        borderRadius: 4,
        paddingInline: 6,
        userSelect: 'none',
      },
    };
  }
  return {};
};

const Demo: React.FC = () => {
  const statisticSharedProps: StatisticProps = {
    classNames: { root: classNames.root },
    prefix: <ArrowUpOutlined />,
  };
  return (
    <Flex vertical gap="medium">
      <Statistic
        {...statisticSharedProps}
        title="Monthly Active Users"
        value={93241}
        styles={{
          title: { color: '#1890ff', fontWeight: 600 },
          content: { fontSize: '24px' },
          value: {
            backgroundColor: '#e6f4ff',
            borderRadius: 4,
            color: '#0958d9',
            paddingInline: 6,
            userSelect: 'none',
          },
        }}
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

export default Demo;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

#### Statistic

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| classNames | 用于自定义 Statistic 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  | 6.0.0 |
| decimalSeparator | 设置小数点 | string | `.` |  | × |
| formatter | 自定义数值展示 | (value) => ReactNode | - |  | × |
| groupSeparator | 设置千分位标识符 | string | `,` |  | × |
| loading | 数值是否加载中 | boolean | false | 4.8.0 | × |
| precision | 数值精度 | number | - |  | × |
| prefix | 设置数值的前缀 | ReactNode | - |  | × |
| styles | 用于自定义 Statistic 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom) , CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties> | - |  | 6.0.0 |
| suffix | 设置数值的后缀 | ReactNode | - |  | × |
| title | 数值的标题 | ReactNode | - |  | × |
| value | 数值内容 | string \| number | - |  | × |
| ~~valueStyle~~ | 设置数值区域的样式，请使用 `styles.content` 替代 | CSSProperties | - |  | × |

#### Statistic.Countdown <Badge type="error">Deprecated</Badge>

<Antd component="Alert" title="版本 >= 5.25.0 时请使用 Statistic.Timer 作为替代方案。" type="warning" banner="true"></Antd>

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 格式化倒计时展示，参考 [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | 设置数值的前缀 | ReactNode | - |  |
| suffix | 设置数值的后缀 | ReactNode | - |  |
| title | 数值的标题 | ReactNode | - |  |
| value | 数值内容 | number | - |  |
| valueStyle | 设置数值区域的样式 | CSSProperties | - |  |
| onFinish | 倒计时完成时触发 | () => void | - |  |
| onChange | 倒计时时间变化时触发 | (value: number) => void | - |  |

#### Statistic.Timer <Badge>5.25.0+</Badge>

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 计时类型，倒计时或者正计时 | `countdown` \| `countup` | - |  |
| format | 格式化倒计时展示，参考 [dayjs](https://day.js.org/) | string | `HH:mm:ss` |  |
| prefix | 设置数值的前缀 | ReactNode | - |  |
| suffix | 设置数值的后缀 | ReactNode | - |  |
| title | 数值的标题 | ReactNode | - |  |
| value | `countdown` 模式下为目标时间，`countup` 模式下为起始时间（毫秒时间戳） | number | - |  |
| valueStyle | 设置数值区域的样式 | CSSProperties | - |  |
| onFinish | 倒计时完成时触发，指定为 `countup` 时此属性不生效 | () => void | - |  |
| onChange | 倒计时时间变化时触发 | (value: number) => void | - |  |

## Semantic DOM

Statistic 提供 `root`、`header`、`title`、`content`、`value`、`prefix` 和 `suffix` 语义化 DOM 节点。

https://ant.design/components/statistic-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Statistic)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| contentFontSize | 内容字体大小 | string \| number | 24 |
| titleFontSize | 标题字体大小 | number | 14 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| padding | 控制元素的内间距。 | number |  |


