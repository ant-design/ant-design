---
category: Components
type: Data Display
title: Empty
cols: 1
---

Empty state placeholder.

## When To Use

- When there is no data provided, display for friendly tips.
- User tutorial to create something in fresh new situation.

## API

```jsx
<Empty>
  <Button>Create</Button>
</Empty>
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| description | Customize description | string \| ReactNode | - |  |
| imageStyle | style of image | CSSProperties | - |  |
| image | Customize image. Will tread as image url when string provided. | string \| ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |  |

## Built-in images

- Empty.PRESENTED_IMAGE_SIMPLE

  <div class="site-empty-buildIn-img site-empty-buildIn-simple"><div>

- Empty.PRESENTED_IMAGE_DEFAULT

  <div class="site-empty-buildIn-img site-empty-buildIn-default"></div>

<style>
  .site-empty-buildIn-img {
    background-repeat: no-repeat;
    background-size: cover;
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
  [data-theme="dark"] .site-empty-buildIn-simple {
    background-image: url("https://gw.alipayobjects.com/zos/antfincdn/ldFsHUh3Xh/ea62c5fe-07bb-4fcd-9d35-19220cef372e.png");
  }
  [data-theme="dark"] .site-empty-buildIn-default {
    background-image: url("https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gfq-SoT3wF0AAAAAAAAAAABkARQnAQ");
  }
</style>
