---
category: Components
title: ColorPicker
description: Used for color selection.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RYNM8UcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EHL-QYJofZsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Data Entry
---

## When To Use

Used when the user needs to make a customized color selection.

## Examples

<!-- prettier-ignore -->
<code src="./demo/base.tsx">Basic Usage</code>
<code src="./demo/size.tsx">Trigger size</code>
<code src="./demo/controlled.tsx">controlled mode</code>
<code src="./demo/line-gradient.tsx" version="5.20.0">Line Gradient</code>
<code src="./demo/text-render.tsx">Rendering Trigger Text</code>
<code src="./demo/disabled.tsx">Disable</code>
<code src="./demo/disabled-alpha.tsx">Disabled Alpha</code>
<code src="./demo/allowClear.tsx">Clear Color</code>
<code src="./demo/trigger.tsx">Custom Trigger</code>
<code src="./demo/trigger-event.tsx">Custom Trigger Event</code>
<code src="./demo/format.tsx">Color Format</code>
<code src="./demo/presets.tsx">Preset Colors</code>
<code src="./demo/presets-line-gradient.tsx" debug>Preset Line Gradient</code>
<code src="./demo/panel-render.tsx">Custom Render Panel</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/pure-panel.tsx" debug>Pure Render</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.5.0`.

<!-- prettier-ignore -->
| Property | Description | Type | Default | Version | [Global Config](/components/config-provider#component-config) |
| :-- | :-- | :-- | :-- | :-- | --- |
| allowClear | 	Allow clearing color selected | boolean | false |  | × |
| arrow | Configuration for popup arrow | `boolean \| { pointAtCenter: boolean }` | true |  | 6.3.0 |
| children | Trigger of ColorPicker | React.ReactNode | - |  | × |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  | 6.0.0 |
| defaultValue | Default value of color | [ColorType](#colortype) | - |  | × |
| defaultFormat | Default format of color | `rgb` \| `hex` \| `hsb` | `hex` | 5.9.0 | × |
| disabled | Disable ColorPicker | boolean | - |  | × |
| disabledAlpha | Disable Alpha | boolean | - | 5.8.0 | × |
| disabledFormat | Disable format of color | boolean | - | 5.22.0 | × |
| ~~destroyTooltipOnHide~~ | Whether destroy dom when close | `boolean` | false | 5.7.0 | × |
| destroyOnHidden | Whether destroy dom when close | `boolean` | false | 5.25.0 | × |
| format | Format of color | `rgb` \| `hex` \| `hsb` | - |  | × |
| mode | Configure single or gradient color | `'single' \| 'gradient' \| ('single' \| 'gradient')[]` | `single` | 5.20.0 | × |
| open | Whether to show popup | boolean | - |  | × |
| presets | Preset colors | [PresetColorType](#presetcolortype) | - |  | × |
| placement | Placement of popup | The design of the [placement](/components/tooltip/#api) parameter is the same as the `Tooltips` component. | `bottomLeft` |  | × |
| panelRender | Custom Render Panel | `(panel: React.ReactNode, extra: { components: { Picker: FC; Presets: FC } }) => React.ReactNode` | - | 5.7.0 | × |
| showText | Show color text | boolean \| `(color: Color) => React.ReactNode` | - | 5.7.0 | × |
| size | Setting the trigger size | `large` \| `medium` \| `small` | `medium` | 5.7.0 | × |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  | 6.0.0 |
| trigger | ColorPicker trigger mode | `hover` \| `click` | `click` |  | × |
| value | Value of color | [ColorType](#colortype) | - |  | × |
| onChange | Callback when `value` is changed | `(value: Color, css: string) => void` | - |  | × |
| onChangeComplete | Called when color pick ends. Will not change the display color when `value` controlled by `onChangeComplete` | `(value: Color) => void` | - | 5.7.0 | × |
| onFormatChange | Callback when `format` is changed | `(format: 'hex' \| 'rgb' \| 'hsb') => void` | - |  | × |
| onOpenChange | Callback when `open` is changed | `(open: boolean) => void` | - |  | × |
| onClear | Called when clear | `() => void` | - | 5.6.0 | × |

#### ColorType

```typescript
type ColorType =
  | string
  | Color
  | {
      color: string;
      percent: number;
    }[];
```

#### PresetColorType

```typescript
type PresetColorType = {
  label: React.ReactNode;
  defaultOpen?: boolean;
  key?: React.Key;
  colors: ColorType[];
};
```

### Color

<!-- prettier-ignore -->
| Property | Description | Type | Version |
| :-- | :-- | :-- | :-- |
| toCssString | Convert to CSS support format | `() => string` | 5.20.0 |
| toHex | Convert to `hex` format characters, the return type like: `1677ff` | `() => string` | - |
| toHexString | Convert to `hex` format color string, the return type like: `#1677ff` | `() => string` | - |
| toHsb | Convert to `hsb` object  | `() => ({ h: number, s: number, b: number, a number })` | - |
| toHsbString | Convert to `hsb` format color string, the return type like: `hsb(215, 91%, 100%)` | `() => string` | - |
| toRgb | Convert to `rgb` object  | `() => ({ r: number, g: number, b: number, a number })` | - |
| toRgbString | Convert to `rgb` format color string, the return type like: `rgb(22, 119, 255)` | `() => string` | - |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## FAQ

### Questions about color assignment {#faq-color-assignment}

The value of the color selector supports both string color values and selector-generated `Color` objects. However, since there is a precision error when converting color strings of different formats to each other, it is recommended to use selector-generated `Color` objects for assignment operations in controlled scenarios, so that the precision problem can be avoided and the values are guaranteed to be accurate and the selector can work as expected.
