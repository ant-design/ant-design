# Statistic — 统计数值

## 功能概述

展示统计数值。

## 应用场景

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## 输入字段

### Statistic 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义 Statistic 组件内部各语义化结构的 class，支持对象或函数。
- `decimalSeparator`: string，设置小数点，默认 `.`。
- `formatter`: (value) => ReactNode，自定义数值展示。
- `groupSeparator`: string，设置千分位标识符，默认 `,`。
- `loading`: boolean，数值是否加载中，默认 false，版本 4.8.0。
- `precision`: number，数值精度。
- `prefix`: ReactNode，设置数值的前缀。
- `styles`: Record<[SemanticDOM](#semantic-dom) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties>，用于自定义 Statistic 组件内部各语义化结构的行内 style，支持对象或函数。
- `suffix`: ReactNode，设置数值的后缀。
- `title`: ReactNode，数值的标题。
- `value`: string | number，数值内容。
- `valueStyle`: CSSProperties，设置数值区域的样式。

### Statistic.Countdown <Badge type="error">Deprecated</Badge> 属性

#### 必填

- 无必填属性。

#### 可选

- `format`: string，格式化倒计时展示，参考 [dayjs](https://day.js.org/)，默认 `HH:mm:ss`。
- `prefix`: ReactNode，设置数值的前缀。
- `suffix`: ReactNode，设置数值的后缀。
- `title`: ReactNode，数值的标题。
- `value`: number，数值内容。
- `valueStyle`: CSSProperties，设置数值区域的样式。
- `onFinish`: () => void，倒计时完成时触发。
- `onChange`: (value: number) => void，倒计时时间变化时触发。

### Statistic.Timer <Badge>5.25.0+</Badge> 属性

#### 必填

- 无必填属性。

#### 可选

- `type`: `countdown` `countup`，计时类型，正计时或者倒计时。
- `format`: string，格式化倒计时展示，参考 [dayjs](https://day.js.org/)，默认 `HH:mm:ss`。
- `prefix`: ReactNode，设置数值的前缀。
- `suffix`: ReactNode，设置数值的后缀。
- `title`: ReactNode，数值的标题。
- `value`: number，数值内容。
- `valueStyle`: CSSProperties，设置数值区域的样式。
- `onFinish`: () => void，倒计时完成时触发, 指定为 `countup` 此属性不生效。
- `onChange`: (value: number) => void，倒计时时间变化时触发。

## 方法

无公开方法。

## 使用建议

数据概览使用统计数值；活动倒计时使用 Countdown；配合 Card 展示更美观。

## 示例代码

```tsx
import { ArrowDownOutlined, ArrowUpOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Statistic } from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2; // 2 days

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} />
      </Col>
      <Col span={12}>
        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
      </Col>
      <Col span={12}>
        <Statistic title="Unmerged" value={93} suffix="/ 100" />
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Countdown title="Countdown" value={deadline} onFinish={() => console.log('finished!')} />
      </Col>
      <Col span={12}>
        <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
      </Col>
    </Row>
  </Space>
);
```

## 返回结果

渲染一个统计数值展示组件。
