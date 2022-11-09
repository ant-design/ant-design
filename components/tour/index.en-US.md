---
category: Components
group: Data Display
title: Tour
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

A popup component for guiding users through a product. Available since `5.0.0`.

## When To Use

Use when you want to guide users through a product.

## Examples

<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/non-modal.tsx">Non-modal</code>
<code src="./demo/placement.tsx">Placement</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

### Tour

| Property  | Description                                                                                         | Type                                                                                                                          | Default   | Version |
| --------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| arrow     | Whether to show the arrow, including the configuration whether to point to the center of the elemen | `boolean`\|`{ pointAtCenter: boolean}`                                                                                        | `true`    |         |
| placement | Position of the guide card relative to the target element                                           | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom`  |         |
| onClose   | Callback function on shutdown                                                                       | `Function`                                                                                                                    | -         |         |
| mask      | Whether to enable masking                                                                           | `boolean`                                                                                                                     | `true`    |         |
| type      | Type, affects the background color and text color                                                   | `default` `primary`                                                                                                           | `default` |         |

### TourStep

| Property        | Description                                                                                          | Type                                                                                                                          | Default   | Version |
| --------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| target          | Get the element the guide card points to. Empty makes it show in center of screen                    | `() => HTMLElement` `HTMLElement`                                                                                             | -         |         |
| arrow           | Whether to show the arrow, including the configuration whether to point to the center of the element | `boolean` `{ pointAtCenter: boolean}`                                                                                         | `true`    |         |
| cover           | Displayed pictures or videos                                                                         | `ReactNode`                                                                                                                   | -         |         |
| title           | title                                                                                                | `ReactNode`                                                                                                                   | -         |         |
| description     | description                                                                                          | `ReactNode`                                                                                                                   | -         |         |
| placement       | Position of the guide card relative to the target element                                            | `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight` | `bottom`  |         |
| onClose         | Callback function on shutdown                                                                        | `Function`                                                                                                                    | -         |         |
| mask            | Whether to enable masking, the default follows the `mask` property of Tour                           | `boolean`                                                                                                                     | `true`    |         |
| type            | Type, affects the background color and text color                                                    | `default` `primary`                                                                                                           | `default` |         |
| nextButtonProps | Properties of the Next button                                                                        | `{ children: ReactNode; onClick: Function }`                                                                                  | -         |         |
| prevButtonProps | Properties of the previous button                                                                    | `{ children: ReactNode; onClick: Function }`                                                                                  | -         |         |
