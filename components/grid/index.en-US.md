---
category: Components
type: Layout
cols: 1
title: Grid
---

24 Grids System。

## Design concept

<div class="grid-demo">
<div class="ant-row demo-row">
  <div class="ant-col-24 demo-col demo-col-1">
    100%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-3">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-2">
    25%
  </div>
  <div class="ant-col-6 demo-col demo-col-3">
    25%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-8 demo-col demo-col-4">
    33.33%
  </div>
  <div class="ant-col-8 demo-col demo-col-5">
    33.33%
  </div>
  <div class="ant-col-8 demo-col demo-col-4">
    33.33%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-12 demo-col demo-col-1">
    50%
  </div>
  <div class="ant-col-12 demo-col demo-col-3">
    50%
  </div>
</div>
<div class="ant-row demo-row">
  <div class="ant-col-16 demo-col demo-col-4">
    66.66%
  </div>
  <div class="ant-col-8 demo-col demo-col-5">
    33.33%
  </div>
</div>
</div>

In most business situations,Ant Design need solve a lot of information storage problems within the design area,so based on 12 Grids System,we divided the design area into 24 aliquots.

We name the divided area as 'box'.We suggest that four boxes horizontal arrangement at most, one at least.Box on the proportion of the entire screen as above picture.To ensure that the level of visual comfort,we custom typography inside of the box based on the box unit.

## Outline

In the grid system, we define the frame outside the information area based on row and column, to ensure that every area can steady arrangement.

Following is a brief look at how it works:

* To establish a set of `column` in the horizontal direction by` row` (abbreviated col)
* Direct your content elements should be placed in the `col`, and only` col` as the `row`
* The column grid system is a value of 1-24 to represent its range spans.For example, three columns of equal width can be created by `.col-8`.
* If a `row` sum of` col` more than 24, then the extra `col` as a whole will start a new line arrangement.

## Flex layout

Our grid systems support Flex layout to allow the child elements within the parent horizontal alignment - Left, center, right of abode, and other wide arrangement, decentralized arrangement. Between sub-elements and sub-elements, support the top of the aligned vertically centered, bottom-aligned manner. At the same time, you can define the order of elements by using 'order'.

Flex layout is based on a grid 24 to define each "box" in width, but not rigidly adhere to the grid layout.

## API

Ant Design layout component if it can not meet your needs, you can use the excellent layout of the components of the community:

- [react-flexbox-grid](http://roylee0704.github.io/react-flexbox-grid/)
- [react-blocks](http://whoisandie.github.io/react-blocks/)

### Row

| Property       | Description           | Type     | Default       |
|------------|-----------------|--------------------|-------------|
| gutter     | grid spacing   | number | 0        |
| type     | layout mode, the optional `flex`, [effective modern browser](http://caniuse.com/#search=flex) | string |         |
| align     | the vertical alignment of the layout of flex: `top` ` middle` `bottom`  | string | `top`      |
| justify   | horizontal arrangement of the layout of flex: `start` ` end` `center` ` space-around` `space-between`   | string | `start`        |

### Col

| Property       | Description           | Type     | Default       |
|------------|-----------------|--------------------|-------------|
| span     | raster occupying the number of cells,0 corresponds to `display: none`  | number | none        |
| order     | raster order, under `flex` effective layout mode   | number | 0        |
| offset     | the number of cells to the left of the grid spacing, no cell in grid spacing  | number | 0        |
| push     | the number of cells that raster move to the right | number | 0        |
| pull     | the number of cells that raster move to the left   | number | 0        |
| xs       | `<768px`, could be a `span` value or a object contain above props | number\|object | - |
| sm       | `≥768px`, could be a `span` value or a object contain above props | number\|object | - |
| md       | `≥992px`, could be a `span` value or a object contain above props | number\|object | - |
| lg       | `≥1200px`, could be a `span` value or a object contain above props | number\|object | - |
