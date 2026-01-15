# ColorPicker — 颜色选择器

## 功能概述

提供颜色选取的组件。

## 输入字段

### 可选

- `value`: Color | string，颜色值（受控）。
- `defaultValue`: Color | string，默认颜色值。
- `format`: string，颜色格式，可选 `rgb` | `hex` | `hsb`，默认 `hex`。
- `defaultFormat`: string，默认颜色格式。
- `mode`: ('single' | 'gradient')[] | 'single' | 'gradient'，选择器模式（5.18.0+）。
- `allowClear`: boolean，允许清除，默认 `false`。
- `disabled`: boolean，禁用。
- `disabledAlpha`: boolean，禁用透明度，默认 `false`。
- `showText`: boolean | (color) => ReactNode，显示颜色文本。
- `size`: string，尺寸，可选 `large` | `middle` | `small`，默认 `middle`。
- `trigger`: string，触发方式，可选 `hover` | `click`，默认 `click`。
- `open`: boolean，控制弹窗打开（受控）。
- `arrow`: boolean | { pointAtCenter }，箭头配置，默认 `true`。
- `placement`: string，弹窗位置。
- `panelRender`: (panel, extra) => ReactNode，自定义面板渲染。
- `presets`: { label, colors, defaultOpen }[]，预设颜色。
- `styles`: { popup, popupOverlayInner }，样式。
- `destroyTooltipOnHide`: boolean，隐藏时销毁。
- `getPopupContainer`: (node) => HTMLElement，弹窗容器。
- `onChange`: (value, hex) => void，颜色变化回调。
- `onChangeComplete`: (value) => void，颜色选择完成回调。
- `onFormatChange`: (format) => void，格式变化回调。
- `onOpenChange`: (open) => void，弹窗开关变化回调。
- `onClear`: () => void，清除回调。

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
      {/* 基础用法 */}
      <ColorPicker />

      {/* 默认值 */}
      <ColorPicker defaultValue="#1677ff" />

      {/* 受控 */}
      <ColorPicker value={color} onChange={setColor} />

      {/* 显示文本 */}
      <ColorPicker showText />
      <ColorPicker showText={(color) => <span>Custom ({color.toHexString()})</span>} />

      {/* 不同尺寸 */}
      <Space>
        <ColorPicker size="small" />
        <ColorPicker />
        <ColorPicker size="large" />
      </Space>

      {/* 禁用透明度 */}
      <ColorPicker disabledAlpha />

      {/* 预设颜色 */}
      <ColorPicker presets={presets} />

      {/* 不同格式 */}
      <ColorPicker format="hex" />
      <ColorPicker format="rgb" />
      <ColorPicker format="hsb" />

      {/* 允许清除 */}
      <ColorPicker allowClear />

      {/* 禁用 */}
      <ColorPicker disabled />

      {/* 触发方式 */}
      <ColorPicker trigger="hover" />

      {/* 渐变模式（5.18.0+） */}
      <ColorPicker mode={['single', 'gradient']} />
    </Space>
  );
};
```

## 返回结果

渲染一个颜色选择器组件。
