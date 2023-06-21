---
category: Components
subtitle: 颜色选择器
title: ColorPicker
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RYNM8UcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EHL-QYJofZsAAAAAAAAAAAAADrJ8AQ/original
tag: New
demo:
  cols: 2
group:
  title: 数据录入
---

提供颜色选取的组件，自 `5.5.0` 版本开始提供该组件。

## 何时使用

当用户需要自定义颜色选择的时候使用。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/base.tsx">基本使用</code>
<code src="./demo/controlled.tsx">受控模式</code>
<code src="./demo/disabled.tsx" debug>禁用</code>
<code src="./demo/allowClear.tsx">清除颜色</code>
<code src="./demo/trigger.tsx">自定义触发器</code>
<code src="./demo/trigger-event.tsx">自定义触发事件</code>
<code src="./demo/format.tsx">颜色编码</code>
<code src="./demo/presets.tsx">预设颜色</code>
<code src="./demo/pure-panel.tsx" debug>Pure Render</code>

## API

> 自 `antd@5.5.0` 版本开始提供该组件。

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| format | 颜色格式 | `rgb` \| `hex` \| `hsb` | `hex` |
| value | 颜色的值 | string \| `Color` | - |
| defaultValue | 颜色默认的值 | string \| `Color` | - |
| allowClear | 允许清除选择的颜色 | boolean | false |
| presets | 预设的颜色 | `{ label: ReactNode, colors: Array<string \| Color> }[]` | - |
| children | 颜色选择器的触发器 | React.ReactNode | - |
| trigger | 颜色选择器的触发模式 | `hover` \| `click` | `click` |
| open | 是否显示弹出窗口 | boolean | - |
| disabled | 禁用颜色选择器 | boolean | - |
| placement | 弹出窗口的位置 | `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` | `bottomLeft` |
| arrow | 配置弹出的箭头 | `boolean \| { pointAtCenter: boolean }` | `true` | - |
| onChange | 颜色变化的回调 | `(value: Color, hex: string) => void` | - |
| onFormatChange | 颜色格式变化的回调 | `(format: 'hex' \| 'rgb' \| 'hsb') => void` | - |
| onOpenChange | 当 `open` 被改变时的回调 | `(open: boolean) => void` | - |
| onClear | 清除的回调 | `() => void` | - |

### Color

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| toHex | 转换成 `hex` 格式字符，返回格式如：`1677ff` | `() => string` | - |
| toHexString | 转换成 `hex` 格式颜色字符串，返回格式如：`#1677ff` | `() => string` | - |
| toHsb | 转换成 `hsb` 对象  | `() => ({ h: number, s: number, b: number, a number })` | - |
| toHsbString | 转换成 `hsb` 格式颜色字符串，返回格式如：`hsb(215, 91%, 100%)` | `() => string` | - |
| toRgb | 转换成 `rgb` 对象  | `() => ({ r: number, g: number, b: number, a number })` | - |
| toRgbString | 转换成 `rgb` 格式颜色字符串，返回格式如：`rgb(22, 119, 255)` | `() => string` | - |

## FAQ

### 关于颜色赋值的问题

颜色选择器的值同时支持字符串色值和选择器生成的 `Color` 对象，但由于不同格式的颜色字符串互相转换会有精度误差问题，所以受控场景推荐使用选择器生成的 `Color` 对象来进行赋值操作，这样可以避免精度问题，保证取值是精准的，选择器也可以按照预期工作。
