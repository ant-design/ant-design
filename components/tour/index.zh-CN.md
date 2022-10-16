---
category: Components
subtitle: 漫游式引导
type: 数据展示
title: Tour
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

引导用户认识网页中的某个或某些部分具有什么样的功能

## 何时使用

对于拥有复杂功能的网页，或者推出新功能的网站，引导用户认识新的特性并学习新功能的用法非常重要

## API

### Tour

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| target | `() => HTMLElement`&#124; `HTMLElement` | - | 获取引导卡片指向的元素 |
| arrow | `boolean`&#124; `{ pointAtCenter: boolean}` | `true` | 是否显示箭头，包含是否指向元素中心的配置 |
| cover | `ReactNode` | - | 展示的图片或者视频 |
| title | `ReactNode` | - | 标题 |
| description | `ReactNode` | - | 主要描述部分 |
| placement | `left`&#124; `leftTop` &#124; `leftBottom` &#124; `right`&#124; `rightTop`&#124; `rightBottom`&#124; `top`&#124; `topLeft`&#124; `topRight`&#124; `bottom` &#124; `bottomLeft`&#124; `bottomRight` | `bottom` | 引导卡片相对于目标元素的位置 |
| onClose | `Function` | - | 关闭引导时的回调函数 |
| mask | `boolean` | `true` | 是否启用蒙层，默认跟随 Tour 的 `mask` 属性 |
| type | `default`&#124; `primary` | `default` | 类型，影响底色与文字颜色 |
| nextButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '下一步' }` | 下一步按钮的属性 |
| prevButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '上一步' }` | 上一步按钮的属性 |
| className | `string` | - | - |
| style | `React.CSSProperties` | - | - |

### TourStep 引导步骤卡片

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| target | `() => HTMLElement`&#124; `HTMLElement` | - | 获取引导卡片指向的元素 |
| arrow | `boolean`&#124; `{ pointAtCenter: boolean}` | `true` | 是否显示箭头，包含是否指向元素中心的配置 |
| cover | `ReactNode` | - | 展示的图片或者视频 |
| title | `ReactNode` | - | 标题 |
| description | `ReactNode` | - | 主要描述部分 |
| placement | `left`&#124; `leftTop` &#124; `leftBottom` &#124; `right`&#124; `rightTop`&#124; `rightBottom`&#124; `top`&#124; `topLeft`&#124; `topRight`&#124; `bottom` &#124; `bottomLeft`&#124; `bottomRight` | `bottom` | 引导卡片相对于目标元素的位置 |
| onClose | `Function` | - | 关闭引导时的回调函数 |
| mask | `boolean` | `true` | 是否启用蒙层，默认跟随 Tour 的 `mask` 属性 |
| type | `default`&#124; `primary` | `default` | 类型，影响底色与文字颜色 |
| nextButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '下一步' }` | 下一步按钮的属性 |
| prevButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '上一步' }` | 上一步按钮的属性 |
| className | `string` | - | - |
| style | `React.CSSProperties` | - | - |
