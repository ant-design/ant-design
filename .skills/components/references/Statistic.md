# Statistic — 统计数值

## 功能概述

展示统计数值。当需要突出某个或某组数字时，用于展示带描述的统计类数据。

## 输入字段

### 必填

- `value`: string | number，数值。

### 可选

- `title`: ReactNode，标题。
- `prefix`: ReactNode，数值前缀。
- `suffix`: ReactNode，数值后缀。
- `precision`: number，数值精度（小数位数）。
- `decimalSeparator`: string，小数分隔符，默认 `.`。
- `groupSeparator`: string，千分位分隔符，默认 `,`。
- `formatter`: (value) => ReactNode，自定义格式化。
- `valueStyle`: CSSProperties，数值样式。
- `loading`: boolean，加载状态。

### Statistic.Countdown 属性

倒计时组件：

- `value`: number，目标时间戳。
- `format`: string，格式化字符串，默认 `HH:mm:ss`。
- `onFinish`: () => void，倒计时结束回调。
- `onChange`: (value) => void，时间变化回调。

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
      {/* 基础用法 */}
      <Col span={12}>
        <Statistic title="Active Users" value={112893} />
      </Col>
      <Col span={12}>
        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      </Col>
    </Row>

    <Row gutter={16}>
      {/* 带前后缀 */}
      <Col span={12}>
        <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
      </Col>
      <Col span={12}>
        <Statistic title="Unmerged" value={93} suffix="/ 100" />
      </Col>
    </Row>

    <Row gutter={16}>
      {/* 带样式 */}
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

    {/* 倒计时 */}
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
