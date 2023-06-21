---
category: Components
subtitle: 进度条
group: 反馈
title: Progress
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gK_4S6fDRfgAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HJH8Tb1lcYAAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；
- 当需要显示一个操作完成的百分比时。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/line.tsx">进度条</code>
<code src="./demo/circle.tsx">进度圈</code>
<code src="./demo/line-mini.tsx">小型进度条</code>
<code src="./demo/circle-micro.tsx">响应式进度圈</code>
<code src="./demo/circle-mini.tsx">小型进度圈</code>
<code src="./demo/circle-dynamic.tsx">进度圈动态展示</code>
<code src="./demo/dynamic.tsx">动态展示</code>
<code src="./demo/format.tsx">自定义文字格式</code>
<code src="./demo/dashboard.tsx">仪表盘</code>
<code src="./demo/segment.tsx">分段进度条</code>
<code src="./demo/linecap.tsx">边缘形状</code>
<code src="./demo/gradient-line.tsx">自定义进度条渐变色</code>
<code src="./demo/steps.tsx">步骤进度条</code>
<code src="./demo/size.tsx">尺寸</code>

## API

各类型共用的属性。

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 内容的模板函数 | function(percent, successPercent) | (percent) => percent + `%` | - |
| percent | 百分比 | number | 0 | - |
| showInfo | 是否显示进度数值或状态图标 | boolean | true | - |
| status | 状态，可选：`success` `exception` `normal` `active`(仅限 line) | string | - | - |
| strokeColor | 进度条的色彩 | string | - | - |
| strokeLinecap | 进度条的样式 | `round` \| `butt` \| `square`，区别详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) | `round` | - |
| success | 成功进度条相关配置 | { percent: number, strokeColor: string } | - | - |
| trailColor | 未完成的分段的颜色 | string | - | - |
| type | 类型，可选 `line` `circle` `dashboard` | string | `line` | - |
| size | 进度条的尺寸 | number \| \[number \| string, number] \| "small" \| "default" | "default" | v5.3.0 |

### `type="line"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| steps | 进度条总共步数 | number | - | - |
| strokeColor | 进度条的色彩，传入 object 时为渐变。当有 `steps` 时支持传入一个数组。 | string \| string[] \| { from: string; to: string; direction: string } | - | 4.21.0: `string[]` |

### `type="circle"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| strokeColor | 圆形进度条线的色彩，传入 object 时为渐变 | string \| object | - | - |
| strokeWidth | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 | - |

### `type="dashboard"`

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| gapDegree | 仪表盘进度条缺口角度，可取值 0 ~ 295 | number | 75 | - |
| gapPosition | 仪表盘进度条缺口位置 | `top` \| `bottom` \| `left` \| `right` | `bottom` | - |
| strokeWidth | 仪表盘进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 | - |

## Design Token

<ComponentTokenTable component="Progress"></ComponentTokenTable>
