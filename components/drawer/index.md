
---
category: Components
type: Other
title: Drawer
subtitle: 抽屉
---

## API
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 抽屉的类属性 | string | `drawer` |
| openClassName | 打开抽屉时的类属性 | string | `drawer-open`|
| wrapperClassName | 包装器的类属性 | string | null |
| showIcon | 是否显示抽屉的 icon | boolean | true |
| icon | 抽屉的 icon | ReactNode | node |
| visible | 抽屉是否课件 | boolean | false |
| zIndex  | 抽屉在当前堆叠上下文中的堆叠层级 | number | 999  |
| parent | 抽屉挂载的dom | string | `body` |
| width | 抽屉的宽度 | string | `60vw` |
| placement | 抽屉的方向 | `left` 或 `right` | `left` |
| onChange  | 面板状态改变事件 |  (state:boolean)=>void | null |
| onIconClick | icon 点击事件 | (e:event)=>void | null


