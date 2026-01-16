# ColorPicker — 颜色选择器

## 功能概述

用于选择颜色。

## 应用场景

- 当用户需要自定义颜色选择的时候使用。

## 输入字段

### ColorPicker 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean，允许清除选择的颜色，默认 false。
- `arrow`: `boolean | { pointAtCenter: boolean }`，配置弹出的箭头，默认 true。
- `children`: React.ReactNode，颜色选择器的触发器。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultValue`: [ColorType](#colortype)，颜色默认的值。
- `defaultFormat`: `rgb` | `hex` | `hsb`，颜色格式默认的值，默认 `hex`，版本 5.9.0。
- `disabled`: boolean，禁用颜色选择器。
- `disabledAlpha`: boolean，禁用透明度，版本 5.8.0。
- `disabledFormat`: boolean，禁用选择颜色格式，版本 5.22.0。
- `~~destroyTooltipOnHide~~`: `boolean`，关闭后是否销毁弹窗，默认 false，版本 5.7.0。
- `destroyOnHidden`: `boolean`，关闭后是否销毁弹窗，默认 false，版本 5.25.0。
- `format`: `rgb` | `hex` | `hsb`，颜色格式。
- `mode`: `'single' | 'gradient' | ('single' | 'gradient')[]`，选择器模式，用于配置单色与渐变，默认 `single`，版本 5.20.0。
- `open`: boolean，是否显示弹出窗口。
- `presets`: [PresetColorType](#presetcolortype)，预设的颜色。
- `placement`: 同 `Tooltips` 组件的 [placement](/components/tooltip-cn/#api) 参数设计，弹出窗口的位置，默认 `bottomLeft`。
- `panelRender`: `(panel: React.ReactNode, extra: { components: { Picker: FC; Presets: FC } }) => React.ReactNode`，自定义渲染面板，版本 5.7.0。
- `showText`: boolean | `(color: Color) => React.ReactNode`，显示颜色文本，版本 5.7.0。
- `size`: `large` | `middle` | `small`，设置触发器大小，默认 `middle`，版本 5.7.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `trigger`: `hover` | `click`，颜色选择器的触发模式，默认 `click`。
- `value`: [ColorType](#colortype)，颜色的值。
- `onChange`: `(value: Color, css: string) => void`，颜色变化的回调。
- `onChangeComplete`: `(value: Color) => void`，颜色选择完成的回调，通过 `onChangeComplete` 对 `value` 受控时拖拽不会改变展示颜色，版本 5.7.0。
- `onFormatChange`: `(format: 'hex' | 'rgb' | 'hsb') => void`，颜色格式变化的回调。
- `onOpenChange`: `(open: boolean) => void`，当 `open` 被改变时的回调。
- `onClear`: `() => void`，清除的回调，版本 5.6.0。

### Color 属性

#### 必填

- 无必填属性。

#### 可选

- `toCssString`: `() => string`，转换成 CSS 支持的格式，版本 5.20.0。
- `toHex`: `() => string`，转换成 `hex` 格式字符，返回格式如：`1677ff`。
- `toHexString`: `() => string`，转换成 `hex` 格式颜色字符串，返回格式如：`#1677ff`。
- `toHsb`: `() => ({ h: number, s: number, b: number, a number })`，转换成 `hsb` 对象。
- `toHsbString`: `() => string`，转换成 `hsb` 格式颜色字符串，返回格式如：`hsb(215, 91%, 100%)`。
- `toRgb`: `() => ({ r: number, g: number, b: number, a number })`，转换成 `rgb` 对象。
- `toRgbString`: `() => string`，转换成 `rgb` 格式颜色字符串，返回格式如：`rgb(22, 119, 255)`。

## 方法

无公开方法。

## 使用建议

需要选择颜色时使用；配合 presets 提供预设颜色；使用 showText 显示当前颜色值。

## 示例代码

```tsx
import { useState } from 'react';
import { ColorPicker, Space, theme } from 'antd';
import type { ColorPickerProps, GetProp } from 'antd';

type Color = GetProp<ColorPickerProps, 'value'>;

const App: React.FC = () => {
  const [color, setColor] = useState<Color>('#1677ff');
  const { token } = theme.useToken();

  const presets: ColorPickerProps['presets'] = [
    {
      label: 'Recommended',
      colors: [
        '#000000',
        '#ffffff',
        '#1677ff',
        '#52c41a',
        '#faad14',
        '#f5222d',
        '#722ed1',
        '#eb2f96',
        '#13c2c2',
        '#fa8c16',
      ],
    },
    {
      label: 'Recent',
      colors: ['#F5222D', '#FA8C16', '#8BBB11', '#52C41A', '#13A8A8'],
    },
  ];

  return (
    <Space direction="vertical">
      <ColorPicker />

      <ColorPicker defaultValue="#1677ff" />

      <ColorPicker value={color} onChange={setColor} />

      <ColorPicker showText />
      <ColorPicker showText={(color) => <span>Custom ({color.toHexString()})</span>} />

      <Space>
        <ColorPicker size="small" />
        <ColorPicker />
        <ColorPicker size="large" />
      </Space>

      <ColorPicker disabledAlpha />

      <ColorPicker presets={presets} />

      <ColorPicker format="hex" />
      <ColorPicker format="rgb" />
      <ColorPicker format="hsb" />

      <ColorPicker allowClear />

      <ColorPicker disabled />

      <ColorPicker trigger="hover" />

      <ColorPicker mode={['single', 'gradient']} />
    </Space>
  );
};
```

## 返回结果

渲染一个颜色选择器组件。
