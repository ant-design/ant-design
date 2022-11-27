---
category: Components
group: Data Display
title: App
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

New App Component which provide global style & static function replacement.

## When To Use

Static function in React 18 concurrent mode will not well support. In v5, we recommend to use hooks for the static replacement. But it will make user manual work on define this.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>

## API

### Tour

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrow | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean`\|`{ pointAtCenter: boolean}` | `true` |  |
| placement | Position of the guide card relative to the target element | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | Callback function on shutdown | `Function` | - |  |
| mask | Whether to enable masking | `boolean` | `true` |  |
| type | Type, affects the background color and text color | `default` `primary` | `default` |  |

### TourStep

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| target | Get the element the guide card points to. Empty makes it show in center of screen | `() => HTMLElement` `HTMLElement` | - |  |
| arrow | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean` `{ pointAtCenter: boolean}` | `true` |  |
| cover | Displayed pictures or videos | `ReactNode` | - |  |
| title | title | `ReactNode` | - |  |
| description | description | `ReactNode` | - |  |
| placement | Position of the guide card relative to the target element | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom` |  |
| onClose | Callback function on shutdown | `Function` | - |  |
| mask | Whether to enable masking, the default follows the `mask` property of Tour | `boolean` | `true` |  |
| type | Type, affects the background color and text color | `default` `primary` | `default` |  |
| nextButtonProps | Properties of the Next button | `{ children: ReactNode; onClick: Function }` | - |  |
| prevButtonProps | Properties of the previous button | `{ children: ReactNode; onClick: Function }` | - |  |
