
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
| mask | 是否展示遮罩 | Boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 遮罩样式 | object | {} |
| showIcon | 是否显示抽屉的 icon | boolean | true |
| icon | 抽屉的 icon | ReactNode | node |
| visible | 抽屉是否可见 | boolean | false |
| getContainer | 指定 抽屉挂载节点 | (instance)=> HTMLElement | `body` |
| width | 抽屉的宽度 | string | `60vw` |
| placement | 抽屉的方向 | `left` 或 `right` | `left` |
| onChange  | 面板状态改变事件 |  (state:boolean)=>void | null |
| onIconClick | icon 点击事件 | (e:event)=>void | null
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false |


