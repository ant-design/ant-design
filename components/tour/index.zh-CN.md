---
category: Components
subtitle: 漫游式引导
type: 数据展示
title: Tour
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

引导用户认识网页中的某个或某些部分具有什么样的功能。

## 何时使用

常用于用户第一次进入网站，或某个页面或者推出新功能或改版的网站。

## API

### Tour

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrow | 是否显示箭头，包含是否指向元素中心的配置 | `boolean` \| `{ pointAtCenter: boolean}` | `true` |  |
| placement | 引导卡片相对于目标元素的位置 | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | 关闭引导时的回调函数 | `Function` | - |  |
| mask | 是否启用蒙层，默认跟随 Tour 的 `mask` 属性 | `boolean` | `true` |  |
| type | 类型，影响底色与文字颜色 | `default` \| `primary` | `default` |  |

### TourStep 引导步骤卡片

| 属性 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| target | 获取引导卡片指向的元素 | `() => HTMLElement` \| `HTMLElement` | - |  |
| arrow | 是否显示箭头，包含是否指向元素中心的配置 | `boolean` \| `{ pointAtCenter: boolean}` | `true` |  |
| cover | 展示的图片或者视频 | `ReactNode` | - |  |
| title | 标题 | `ReactNode` | - |  |
| description | 主要描述部分 | `ReactNode` | - |  |
| placement | 引导卡片相对于目标元素的位置 | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` `bottom` |  |
| onClose | 关闭引导时的回调函数 | `Function` | - |  |
| mask | 是否启用蒙层，默认跟随 Tour 的 `mask` 属性 | `boolean` | `true` |  |
| type | 类型，影响底色与文字颜色 | `default` \| `primary` | `default` |  |
| nextButtonProps | 下一步按钮的属性 | `{ children: ReactNode; onClick: Function }` | `{ children: '下一步' }` |  |
| prevButtonProps | 上一步按钮的属性 | `{ children: ReactNode; onClick: Function }` | `{ children: '上一步' }` |  |
| className | - | `string` | - |  |
| style | - | `React.CSSProperties` | - |  |
