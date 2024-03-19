---
category: Components
title: ColorPicker
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RYNM8UcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EHL-QYJofZsAAAAAAAAAAAAADrJ8AQ/original
tag: New
demo:
  cols: 2
group:
  title: Data Entry
---

Components providing color selection, Available since `5.5.0`.

## When To Use

Used when the user needs to customize the color selection.

## Examples

<!-- prettier-ignore -->
<code src="./demo/base.tsx">Basic Usage</code>
<code src="./demo/size.tsx">Trigger size</code>
<code src="./demo/controlled.tsx">controlled mode</code>
<code src="./demo/change-completed.tsx">Color change completed</code>
<code src="./demo/text-render.tsx">Rendering Trigger Text</code>
<code src="./demo/disabled.tsx">Disable</code>
<code src="./demo/disabled-alpha.tsx">Disabled Alpha</code>
<code src="./demo/allowClear.tsx">Clear Color</code>
<code src="./demo/trigger.tsx">Custom Trigger</code>
<code src="./demo/trigger-event.tsx">Custom Trigger Event</code>
<code src="./demo/format.tsx">Color Format</code>
<code src="./demo/presets.tsx">Preset Colors</code>
<code src="./demo/panel-render.tsx">Custom Render Panel</code>
<code src="./demo/pure-panel.tsx" debug>Pure Render</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.5.0`.

<!-- prettier-ignore -->
| Property | Description | Type | Default | Version |
| :-- | :-- | :-- | :-- | :-- |
| allowClear | 	Allow clearing color selected | boolean | false | |
| arrow | Configuration for popup arrow | `boolean \| { pointAtCenter: boolean }` | true | |
| children | Trigger of ColorPicker | React.ReactNode | - | |
| defaultValue | Default value of color | string \| `Color` | - | |
| defaultFormat | Default format of color | `rgb` \| `hex` \| `hsb` | - | 5.9.0 |
| disabled | Disable ColorPicker | boolean | - | |
| disabledAlpha | Disable Alpha | boolean | - | 5.8.0 |
| destroyTooltipOnHide | Whether destroy popover when hidden | `boolean` | false | 5.7.0 |
| format | Format of color | `rgb` \| `hex` \| `hsb` | `hex` | |
| open | Whether to show popup | boolean | - | |
| presets | Preset colors | `{ label: ReactNode, colors: Array<string \| Color>, defaultOpen?: boolean }[]` | - | `defaultOpen: 5.11.0` |
| placement | Placement of popup | `top` \| `topLeft` \| `topRight` \| `bottom` \| `bottomLeft` \| `bottomRight` | `bottomLeft` | |
| panelRender | Custom Render Panel | `(panel: React.ReactNode, extra: { components: { Picker: FC; Presets: FC } }) => React.ReactNode` | - | 5.7.0 |
| showText | Show color text | boolean \| `(color: Color) => React.ReactNode` | - | 5.7.0 |
| size | Setting the trigger size | `large` \| `middle` \| `small` | `middle` | 5.7.0 |
| trigger | ColorPicker trigger mode | `hover` \| `click` | `click` | |
| value | Value of color | string \| `Color` | - | |
| onChange | Callback when `value` is changed | `(value: Color, hex: string) => void` | - | |
| onChangeComplete | Called when color pick ends   | `(value: Color) => void` | - | 5.7.0 |
| onFormatChange | Callback when `format` is changed | `(format: 'hex' \| 'rgb' \| 'hsb') => void` | - | |
| onOpenChange | Callback when `open` is changed | `(open: boolean) => void` | - | |
| onClear | Called when clear | `() => void` | - | 5.6.0 |

### Color

<!-- prettier-ignore -->
| Property | Description | Type | Default |
| :-- | :-- | :-- | :-- |
| toHex | Convert to `hex` format characters, the return type like: `1677ff` | `() => string` | - |
| toHexString | Convert to `hex` format color string, the return type like: `#1677ff` | `() => string` | - |
| toHsb | Convert to `hsb` object  | `() => ({ h: number, s: number, b: number, a number })` | - |
| toHsbString | Convert to `hsb` format color string, the return type like: `hsb(215, 91%, 100%)` | `() => string` | - |
| toRgb | Convert to `rgb` object  | `() => ({ r: number, g: number, b: number, a number })` | - |
| toRgbString | Convert to `rgb` format color string, the return type like: `rgb(22, 119, 255)` | `() => string` | - |

## FAQ

### Questions about color assignment

The value of the color selector supports both string color values and selector-generated `Color` objects. However, since there is a precision error when converting color strings of different formats to each other, it is recommended to use selector-generated `Color` objects for assignment operations in controlled scenarios, so that the precision problem can be avoided and the values are guaranteed to be accurate and the selector can work as expected.
