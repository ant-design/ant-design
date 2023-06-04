---
category: Components
subtitle: 分段控制器
group: 数据展示
title: Segmented
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*papwTpNscPIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tz7qSaWpi1kAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

分段控制器。自 `antd@4.20.0` 版本开始提供该组件。

## 何时使用

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/block.tsx">Block 分段选择器</code>
<code src="./demo/disabled.tsx">不可用</code>
<code src="./demo/controlled.tsx">受控模式</code>
<code src="./demo/custom.tsx">自定义渲染</code>
<code src="./demo/dynamic.tsx">动态数据</code>
<code src="./demo/size.tsx">三种大小</code>
<code src="./demo/with-icon.tsx">设置图标</code>
<code src="./demo/icon-only.tsx">只设置图标</code>
<code src="./demo/controlled-two.tsx" debug>受控同步模式</code>
<code src="./demo/size-consistent.tsx" debug>统一高度</code>
<code src="./demo/componentToken.tsx" debug>自定义组件 Token</code>

## API

> 自 `antd@4.20.0` 版本开始提供该组件。

### Segmented

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将宽度调整为父元素宽度的选项 | boolean | false |  |
| defaultValue | 默认选中的值 | string \| number |  |  |
| disabled | 是否禁用 | boolean | false |  |
| onChange | 选项变化时的回调函数 | function(value: string \| number) |  |  |
| options | 数据化配置选项内容 | string\[] \| number\[] \| Array<{ label: ReactNode value: string icon? ReactNode disabled?: boolean className?: string }> | [] |  |
| size | 控件尺寸 | `large` \| `middle` \| `small` | `middle` |  |
| value | 当前选中的值 | string \| number |  |  |

## Design Token

<ComponentTokenTable component="Segmented"></ComponentTokenTable>
