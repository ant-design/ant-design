---
category: Components
group: Data Display
title: Image
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

Previewable image.

## When To Use

- When you need to display pictures.
- Display when loading a large image or fault tolerant handling when loading fail.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/fallback.tsx">Fault tolerant</code>
<code src="./demo/placeholder.tsx">Progressive Loading</code>
<code src="./demo/preview-group.tsx">Multiple image preview</code>
<code src="./demo/preview-group-visible.tsx">Preview from one image</code>
<code src="./demo/previewSrc.tsx">Custom preview image</code>
<code src="./demo/controlled-preview.tsx">Controlled Preview</code>
<code src="./demo/preview-mask.tsx" debug>Custom preview mask</code>
<code src="./demo/preview-group-top-progress.tsx" debug>Top progress customization when previewing multiple images</code>
<code src="./demo/component-token.tsx" debug>Custom component token</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | Image description | string | - | 4.6.0 |
| fallback | Load failure fault-tolerant src | string | - | 4.6.0 |
| height | Image height | string \| number | - | 4.6.0 |
| placeholder | Load placeholder, use default placeholder when set `true` | ReactNode | - | 4.6.0 |
| preview | preview config, disabled when `false` | boolean \| [previewType](#previewtype) | true | 4.6.0 [previewType](#previewtype):4.7.0 |
| src | Image path | string | - | 4.6.0 |
| width | Image width | string \| number | - | 4.6.0 |
| onError | Load failed callback | (event: Event) => void | - | 4.12.0 |
| rootClassName | add custom className for image root DOM and preview mode root DOM | string | - | 4.20.0 |

### previewType

```typescript
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible, current: number) => void; // `current` only support after v5.3.0
  getContainer?: string | HTMLElement | (() => HTMLElement); // v4.8.0 The mounted node for preview dialog but still display at fullScreen
  src?: string; // v4.10.0
  mask?: ReactNode; // v4.9.0
  maskClassName?: string; // v4.11.0
  rootClassName?: string; // only support after v5.4.0
  current?: number; // v4.12.0 Only support PreviewGroup
  countRender?: (current: number, total: number) => string  // v4.20.0 Only support PreviewGroup
  scaleStep?: number;
  onChange?: (current: number, prevCurrent: number) => void; // only support after v5.3.0
}
```

Other attributes [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

## Design Token

<ComponentTokenTable component="Image"></ComponentTokenTable>
