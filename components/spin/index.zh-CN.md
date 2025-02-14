---
category: Components
group: 反馈
title: Spin
subtitle: 加载中
description: 用于页面和区块的加载中状态。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*5mC5TomY4B0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*i43_ToFrL8YAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/size.tsx">各种大小</code>
<code src="./demo/nested.tsx">卡片加载中</code>
<code src="./demo/tip.tsx">自定义描述文案</code>
<code src="./demo/delayAndDebounce.tsx">延迟</code>
<code src="./demo/custom-indicator.tsx">自定义指示符</code>
<code src="./demo/percent.tsx" version="5.18.0">进度</code>
<code src="./demo/fullscreen.tsx">全屏</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| delay | 延迟显示加载效果的时间（防止闪烁） | number (毫秒) | - |
| fullscreen | 显示带有 `Spin` 组件的背景 | boolean | false | 5.11.0 |
| indicator | 加载指示符 | ReactNode | - |  |
| percent | 展示进度，当设置 `percent="auto"` 时会预估一个永远不会停止的进度 | number \| 'auto' | - | 5.18.0 |
| size | 组件大小，可选值为 `small` `default` `large` | string | `default` |  |
| spinning | 是否为加载中状态 | boolean | true |  |
| tip | 当作为包裹元素时，可以自定义描述文案 | ReactNode | - |
| wrapperClassName | 包装器的类属性 | string | - |

### 静态方法

- `Spin.setDefaultIndicator(indicator: ReactNode)`

  你可以自定义全局默认 Spin 的元素。

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Spin"></ComponentTokenTable>
