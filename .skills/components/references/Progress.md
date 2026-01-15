# Progress — 进度条

## 功能概述

展示操作的当前进度。用于展示任务进度、加载进度等。

## 输入字段

### 必填

- `percent`: number，当前百分比。

### 可选

- `type`: string，进度条类型，可选 `line` | `circle` | `dashboard`，默认 `line`。
- `status`: string，状态，可选 `success` | `exception` | `normal` | `active`，默认 `normal`。
- `showInfo`: boolean，显示进度数值或状态图标，默认 `true`。
- `format`: (percent, successPercent) => ReactNode，自定义格式化函数。
- `strokeColor`: string | { from, to, direction } | object[]，进度条颜色。
- `trailColor`: string，未完成部分颜色。
- `strokeLinecap`: string，边缘形状，可选 `round` | `butt` | `square`，默认 `round`。
- `size`: number | [width, height] | `small` | `default`，尺寸。
- `steps`: number，分段进度条的步数。
- `percentPosition`: { align, type }，百分比位置（5.18.0+）。

### line 类型专属

- `strokeWidth`: number，线宽，默认 `8`。

### circle/dashboard 类型专属

- `width`: number，圆形进度条画布宽度，默认 `132`。
- `strokeWidth`: number，线宽百分比，默认 `6`。
- `gapDegree`: number，仪表盘缺口角度（dashboard），默认 `75`。
- `gapPosition`: string，仪表盘缺口位置（dashboard），可选 `top` | `bottom` | `left` | `right`，默认 `bottom`。

### 成功状态

- `success`: { percent, strokeColor }，成功进度配置。

## 使用建议

任务进度展示使用 `line` 类型；百分比展示使用 `circle` 类型；仪表盘场景使用 `dashboard` 类型；分步骤进度使用 `steps`。

## 示例代码

```tsx
import { Progress, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />

    <Space wrap>
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={70} status="exception" />
      <Progress type="circle" percent={100} />
    </Space>

    <Space wrap>
      <Progress type="dashboard" percent={75} />
      <Progress steps={5} percent={60} />
    </Space>
  </Space>
);
```

## 返回结果

渲染一个进度条，展示任务完成进度。
