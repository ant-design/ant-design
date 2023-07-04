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
<code src="./demo/toolbarRender.tsx">Custom toolbar render</code>
<code src="./demo/imageRender.tsx">Custom preview render</code>
<code src="./demo/preview-mask.tsx" debug>Custom preview mask</code>
<code src="./demo/preview-group-top-progress.tsx" debug>Top progress customization when previewing multiple images</code>
<code src="./demo/component-token.tsx" debug>Custom component token</code>

## API

### Image

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | Image description | string | - | 4.6.0 |
| fallback | Load failure fault-tolerant src | string | - | 4.6.0 |
| height | Image height | string \| number | - | 4.6.0 |
| placeholder | Load placeholder, use default placeholder when set `true` | ReactNode | - | 4.6.0 |
| preview | preview config, disabled when `false` | boolean \| [PreviewType](#previewtype) | true | 4.6.0 [PreviewType](#previewtype):4.7.0 |
| src | Image path | string | - | 4.6.0 |
| width | Image width | string \| number | - | 4.6.0 |
| onError | Load failed callback | (event: Event) => void | - | 4.12.0 |
| rootClassName | Add custom className for image root DOM and preview mode root DOM | string | - | 4.20.0 |

Other attributes [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### PreviewType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| visible | Whether the preview dialog is visible or not | boolean | - | - |
| src | Custom preview src | string | - | 4.10.0 |
| getContainer | The mounted node for preview dialog but still display at fullScreen | string \| HTMLElement \| (() => HTMLElement) \| false | - | 4.8.0 |
| mask | Thumbnail mask | ReactNode | - | 4.9.0 |
| maskClassName | The className of the mask | string | - | 4.11.0 |
| rootClassName | The classname of the preview root DOM | string | - | 5.4.0 |
| scaleStep | `1 + scaleStep` is the step to increase or decrease the scale | number | 0.5 | - |
| minScale | Min scale | number | 1 | 5.7.0 |
| maxScale | Max scale | number | 50 | 5.7.0 |
| closeIcon | Custom close icon | React.ReactNode | - | 5.7.0 |
| forceRender | Force render preview dialog | boolean | - | - |
| toolbarRender | Custom toolbar render | (originalNode: React.ReactNode, info: Omit<[ToolbarRenderInfoType](#toolbarrenderinfotype), 'current' \| 'total'>) => React.ReactNode | - | 5.7.0 |
| imageRender | Custom preview content | (originalNode: React.ReactNode, info: { transform: [TransformType](#transformtype) }) => React.ReactNode | - | 5.7.0 |
| onTransform | Callback when the transform of image changed | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - | 5.7.0 |
| onVisibleChange | Callback when `visible` changed | (visible: boolean, prevVisible: boolean) => void | - | - |

## PreviewGroup

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| preview | Preview config, `disabled` when false | boolean \| [PreviewGroupType](#previewgrouptype) | true | 4.6.0 [PreviewGroupType](#previewgrouptype):4.7.0 |
| items | Preview items | string[] \| { src: string, crossOrigin: string, ... }[] | - | 5.7.0 |
| fallback | Load failure fault-tolerant src | string | - | 5.7.0 |

### PreviewGroupType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| visible | Whether the preview dialog is visible or not | boolean | - | - |
| getContainer | The mounted node for preview dialog but still display at fullScreen | string \| HTMLElement \| (() => HTMLElement) \| false | - | 4.8.0 |
| current | The index of the current preview | number | - | 4.12.0 |
| mask | Thumbnail mask | ReactNode | - | 4.9.0 |
| maskClassName | The className of the mask | string | - | 4.11.0 |
| rootClassName | The classname of the preview root DOM | string | - | 5.4.0 |
| scaleStep | `1 + scaleStep` is the step to increase or decrease the scale | number | 0.5 | - |
| minScale | Min scale | number | 1 | 5.7.0 |
| maxScale | Max scale | number | 50 | 5.7.0 |
| closeIcon | Custom close icon | React.ReactNode | - | 5.7.0 |
| forceRender | Force render preview dialog | boolean | - | - |
| countRender | Custom preview count content | (current: number, total: number) => React.ReactNode | - | 4.20.0 |
| toolbarRender | Custom toolbar render | (originalNode: React.ReactNode, info: [ToolbarRenderInfoType](#toolbarrenderinfotype)) => React.ReactNode | - | 5.7.0 |
| imageRender | Custom preview content | (originalNode: React.ReactNode, info: { transform: [TransformType](#transformtype), current: number }) => React.ReactNode | - | 5.7.0 |
| onTransform | Callback when the transform of image changed | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - | 5.7.0 |
| onChange | Callback when switch preview image | (current: number, prevCurrent: number) => void | - | 5.3.0 |
| onVisibleChange | Callback when `visible` changed | (visible: boolean, prevVisible: boolean, current: number) => void | - | current 参数 5.3.0 |

## Interface

### TransformType

```typescript
{
  x: number;
  y: number;
  rotate: number;
  scale: number;
  flipX: boolean;
  flipY: boolean;
}
```

### TransformAction

```typescript
type TransformAction =
  | 'flipY'
  | 'flipX'
  | 'rotateLeft'
  | 'rotateRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'close'
  | 'prev'
  | 'next'
  | 'wheel'
  | 'doubleClick'
  | 'move'
  | 'dragRebound';
```

### ToolbarRenderInfoType

```typescript
{
  icons: {
    flipYIcon: React.ReactNode;
    flipXIcon: React.ReactNode;
    rotateLeftIcon: React.ReactNode;
    rotateRightIcon: React.ReactNode;
    zoomOutIcon: React.ReactNode;
    zoomInIcon: React.ReactNode;
  };
  actions: {
    onFlipY: () => void;
    onFlipX: () => void;
    onRotateLeft: () => void;
    onRotateRight: () => void;
    onZoomOut: () => void;
    onZoomIn: () => void;
  };
  transform: TransformType,
  current: number;
  total: number;
}
```

## Design Token

<ComponentTokenTable component="Image"></ComponentTokenTable>
