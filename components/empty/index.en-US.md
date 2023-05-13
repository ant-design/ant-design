---
category: Components
group: Data Display
title: Empty
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZdiZSLzEV0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*obM7S5lIxeMAAAAAAAAAAAAADrJ8AQ/original
---

Empty state placeholder.

## When To Use

- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/simple.tsx">Chose image</code>
<code src="./demo/customize.tsx">Customize</code>
<code src="./demo/config-provider.tsx">ConfigProvider</code>
<code src="./demo/description.tsx">No description</code>

## API

```jsx
<Empty>
  <Button>Create</Button>
</Empty>
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| description | Customize description | ReactNode | - |  |
| image | Customize image. Will treat as image url when string provided | ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |  |
| imageStyle | The style of image | CSSProperties | - |  |

## Built-in images

- Empty.PRESENTED_IMAGE_SIMPLE

  <div class="site-empty-buildIn-img site-empty-buildIn-simple"><div>

- Empty.PRESENTED_IMAGE_DEFAULT

  <div class="site-empty-buildIn-img site-empty-buildIn-default"></div>

<style>
  .site-empty-buildIn-img {
    background-repeat: no-repeat;
    background-size: contain;
  }
  .site-empty-buildIn-simple {
    width: 55px;
    height: 35px;
    background-image: url("https://user-images.githubusercontent.com/507615/54591679-b0ceb580-4a65-11e9-925c-ad15b4eae93d.png");
  }
  .site-empty-buildIn-default {
    width: 121px;
    height: 116px;
    background-image: url("https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png");
  }
</style>

## Design Token

<ComponentTokenTable component="Empty"></ComponentTokenTable>
