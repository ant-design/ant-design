# Progress — 进度条

## 功能概述

展示操作的当前进度。

## 应用场景

- 在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。
- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；。
- 当需要显示一个操作完成的百分比时。

## 输入字段

### Progress 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `format`: function(percent, successPercent)，内容的模板函数，默认 (percent) => percent + `%`。
- `percent`: number，百分比，默认 0。
- `railColor`: string，未完成的分段的颜色。
- `showInfo`: boolean，是否显示进度数值或状态图标，默认 true。
- `status`: string，状态，可选：`success` `exception` `normal` `active`(仅限 line)。
- `strokeColor`: string，进度条的色彩。
- `strokeLinecap`: `round` | `butt` | `square`，区别详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap)，进度条的样式，默认 `round`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `success`: { percent: number, strokeColor: string }，成功进度条相关配置。
- `~~trailColor~~`: string，未完成的分段的颜色。已废弃，请使用 `railColor`。
- `type`: string，类型，可选 `line` `circle` `dashboard`，默认 `line`。
- `size`: number | \[number | string, number] | { width: number, height: number } | "small" | "default"，进度条的尺寸，默认 "default"，版本 5.3.0, Object: 5.18.0。

### `type="line"` 属性

#### 必填

- 无必填属性。

#### 可选

- `steps`: number，进度条总共步数。
- `rounding`: (step: number) => number，用于四舍五入数值的函数，默认 Math.round，版本 5.24.0。
- `strokeColor`: string | string[] | { from: string; to: string; direction: string }，进度条的色彩，传入 object 时为渐变。当有 `steps` 时支持传入一个数组，版本 4.21.0: `string[]`。
- `percentPosition`: { align: string; type: string }，进度数值位置，传入对象，`align` 表示数值的水平位置，`type` 表示数值在进度条内部还是外部，默认 { align: \"end\", type: \"outer\" }，版本 5.18.0。

### `type="circle"` 属性

#### 必填

- 无必填属性。

#### 可选

- `steps`: number | { count: number, gap: number }，进度条总共步数，传入 object 时，count 指步数，gap 指间隔大小。传 number 类型时，gap 默认为 2，版本 5.16.0。
- `strokeColor`: string | { number%: string }，圆形进度条线的色彩，传入 object 时为渐变。
- `strokeWidth`: number，圆形进度条线的宽度，单位是进度条画布宽度的百分比，默认 6。

### `type="dashboard"` 属性

#### 必填

- 无必填属性。

#### 可选

- `steps`: number | { count: number, gap: number }，进度条总共步数，传入 object 时，count 指步数，gap 指间隔大小。传 number 类型时，gap 默认为 2，版本 5.16.0。
- `gapDegree`: number，仪表盘进度条缺口角度，可取值 0 ~ 295，默认 75。
- `gapPlacement`: `top` | `bottom` | `start` | `end`，仪表盘进度条缺口位置，默认 `bottom`。
- `~~gapPosition~~`: `top` | `bottom` | `left` | `right`，仪表盘进度条缺口位置，请使用 `gapPlacement` 替换，默认 `bottom`。
- `strokeWidth`: number，仪表盘进度条线的宽度，单位是进度条画布宽度的百分比，默认 6。

## 方法

无公开方法。

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
