---
category: Components
type: Data Display
title: Image
cols: 2
cover: https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg
---

Previewable image.

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | Image description | string | - | 4.6.0 |
| fallback | Load failure fault-tolerant src | string | - | 4.6.0 |
| height | Image height | string \| number | - | 4.6.0 |
| placeholder | Load placeholder, use default placeholder when set `true` | ReactNode | - | 4.6.0 |
| preview | preview config, disabled when `false` | boolean \| [previewType](#previewType) | true | 4.6.0 [previewType](#previewType):4.7.0 |
| src | Image path | string | - | 4.6.0 |
| width | Image width | string \| number | - | 4.6.0 |
| getPopupContainer | The DOM container of the preview dialog | () => HTMLElement | () => document.body | 4.8.0 |

### previewType

```
{
  visible: boolean,
  onVisibleChange:function(value, prevValue)
}
```

Other attributes [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)
