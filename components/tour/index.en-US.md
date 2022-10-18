---
category: Components
subtitle: Walk Through
type: Data Entry
title: Tour
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

Guide the user to recognize what function a certain part or parts of a web page has

## 何时使用

For webpages with complex functions, or websites with new functions, it is very important to guide users to recognize the new features and learn how to use the new functions

## API

### Tour

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| target | `() => HTMLElement`&#124; `HTMLElement` | - | Get the element the guide card points to |
| arrow | `boolean`&#124; `{ pointAtCenter: boolean}` | `true` | Whether to show the arrow, including the configuration whether to point to the center of the elemen |
| cover | `ReactNode` | - | Displayed pictures or videos |
| title | `ReactNode` | - | title |
| description | `ReactNode` | - | description |
| placement | `left`&#124; `leftTop` &#124; `leftBottom` &#124; `right`&#124; `rightTop`&#124; `rightBottom`&#124; `top`&#124; `topLeft`&#124; `topRight`&#124; `bottom` &#124; `bottomLeft`&#124; `bottomRight` | `bottom` | Position of the guide card relative to the target element |
| onClose | `Function` | - | Callback function on shutdown |
| mask | `boolean` | `true` | Whether to enable masking, the default follows the `mask` property of Tour |
| type | `default`&#124; `primary` | `default` | Type, affects the background color and text color |
| nextButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '下一步' }` | Properties of the Next button |
| prevButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '上一步' }` | Properties of the previous button |
| className | `string` | - | - |
| style | `React.CSSProperties` | - | - |

### TourStep 引导步骤卡片

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| target | `() => HTMLElement`&#124; `HTMLElement` | - | Get the element the guide card points to |
| arrow | `boolean`&#124; `{ pointAtCenter: boolean}` | `true` | Whether to show the arrow, including the configuration whether to point to the center of the element |
| cover | `ReactNode` | - | Displayed pictures or videos |
| title | `ReactNode` | - | title |
| description | `ReactNode` | - | description |
| placement | `left`&#124; `leftTop` &#124; `leftBottom` &#124; `right`&#124; `rightTop`&#124; `rightBottom`&#124; `top`&#124; `topLeft`&#124; `topRight`&#124; `bottom` &#124; `bottomLeft`&#124; `bottomRight` | `bottom` | Position of the guide card relative to the target element |
| onClose | `Function` | - | Callback function on shutdown |
| mask | `boolean` | `true` | Whether to enable masking, the default follows the `mask` property of Tour |
| type | `default`&#124; `primary` | `default` | Type, affects the background color and text color |
| nextButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '下一步' }` | Properties of the Next button |
| prevButtonProps | `{ children: ReactNode; onClick: Function }` | `{ children: '上一步' }` | Properties of the previous button |
| className | `string` | - | - |
| style | `React.CSSProperties` | - | - |
