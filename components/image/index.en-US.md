---
category: Components
group: Data Display
title: Image
description: Preview-able image.
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

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
<code src="./demo/mask.tsx">preview mask</code>
<code src="./demo/preview-mask.tsx" debug>Custom preview mask</code>
<code src="./demo/coverPlacement.tsx" debug>Custom preview cover placement</code>
<code src="./demo/nested.tsx">nested</code>
<code src="./demo/preview-group-top-progress.tsx" debug>Top progress customization when previewing multiple images</code>
<code src="./demo/component-token.tsx" debug>Custom component token</code>
<code src="./demo/preview-imgInfo.tsx" debug>Gets image info in the render function</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Image

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| alt | Image description | string | - |  |
| classNames | Custom semantic structure class names | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| fallback | Fallback URL when load fails | string | - |  |
| height | Image height | string \| number | - |  |
| placeholder | Loading placeholder; if true, uses default placeholder | ReactNode | - |  |
| preview | Preview configuration; set to false to disable | boolean \| [PreviewType](#previewtype) | true |  |
| src | Image URL | string | - |  |
| styles | Custom semantic structure styles | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| width | Image width | string \| number | - |  |
| onError | Callback when loading error occurs | (event: Event) => void | - |  |

Other Property ref [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

### PreviewType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actionsRender | Custom toolbar render | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| classNames | Custom semantic structure class names | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| closeIcon | Custom close icon | React.ReactNode | - |  |
| cover | Custom preview mask | React.ReactNode \| [CoverConfig](#coverconfig) | - | CoverConfig support after v6.0 |
| ~~destroyOnClose~~ | Destroy child elements on preview close (removed, no longer supported) | boolean | false |  |
| ~~forceRender~~ | Force render preview image (removed, no longer supported) | boolean | - |  |
| getContainer | Specify container for preview mounting; still full screen; false mounts at current location | string \| HTMLElement \| (() => HTMLElement) \| false | - |  |
| imageRender | Custom preview content | (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo) }) => React.ReactNode | - |  |
| mask | preview mask effect | boolean \| { enabled?: boolean, blur?: boolean } | true |  |
| ~~maskClassName~~ | Thumbnail mask class name; please use 'classNames.cover' instead | string | - |  |
| maxScale | Maximum zoom scale | number | 50 |  |
| minScale | Minimum zoom scale | number | 1 |  |
| movable | Whether it is movable | boolean | true |  |
| open | Whether to display preview | boolean | - |  |
| rootClassName | Root DOM class name for preview; applies to both image and preview wrapper | string | - |  |
| scaleStep | Each step's zoom multiplier is 1 + scaleStep | number | 0.5 |  |
| src | Custom preview src | string | - |  |
| styles | Custom semantic structure styles | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| ~~toolbarRender~~ | Custom toolbar; please use 'actionsRender' instead | (originalNode: React.ReactElement, info: Omit<ToolbarRenderInfoType, 'current' \| 'total'>) => React.ReactNode | - |  |
| ~~visible~~ | Whether to show; please use 'open' instead | boolean | - |  |
| onOpenChange | Callback when preview open state changes | (visible: boolean) => void | - |  |
| onTransform | Callback for preview transform changes | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - |  |
| ~~onVisibleChange~~ | Callback when 'visible' changes; please use 'onOpenChange' instead | (visible: boolean, prevVisible: boolean) => void | - |  |

### PreviewGroup

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| fallback | Fallback URL for load error | string | - |  |
| items | Array of preview items | string[] \| { src: string, crossOrigin: string, ... }[] | - |  |
| preview | Preview configuration; disable by setting to false | boolean \| [PreviewGroupType](#previewgrouptype) | true |  |

### PreviewGroupType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| actionsRender | Custom toolbar render | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| classNames | Custom preview class names object | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| closeIcon | Custom close icon | React.ReactNode | - |  |
| countRender | Custom preview count render | (current: number, total: number) => React.ReactNode | - |  |
| current | Index of the current preview image | number | - |  |
| ~~forceRender~~ | Force render preview image (removed, no longer supported) | boolean | - |  |
| getContainer | Specify container for preview mounting; still full screen; false mounts at current location | string \| HTMLElement \| (() => HTMLElement) \| false | - |  |
| imageRender | Custom preview content | (originalNode: React.ReactElement, info: { transform: [TransformType](#transformtype), image: [ImgInfo](#imginfo), current: number }) => React.ReactNode | - |  |
| mask | preview mask effect | boolean \| { enabled?: boolean, blur?: boolean } | true |  |
| ~~maskClassName~~ | Thumbnail mask class name; please use 'classNames.cover' instead | string | - |  |
| minScale | Minimum zoom scale | number | 1 |  |
| maxScale | Maximum zoom scale | number | 50 |  |
| movable | Whether movable | boolean | true |  |
| open | Whether to display preview | boolean | - |  |
| ~~rootClassName~~ | Root DOM class name for preview; applies to both image and preview wrapper. Use 'classNames.root' instead | string | - |  |
| styles | Custom semantic structure styles | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| scaleStep | Each step's zoom multiplier is 1 + scaleStep | number | 0.5 |  |
| ~~toolbarRender~~ | Custom toolbar; please use 'actionsRender' instead | (originalNode: React.ReactElement, info: ToolbarRenderInfoType) => React.ReactNode | - |  |
| ~~visible~~ | Whether to show; please use 'open' instead | boolean | - |  |
| onOpenChange | Callback when preview open state changes, includes current preview index | (visible: boolean, info: { current: number }) => void | - |  |
| onChange | Callback when changing preview image | (current: number, prevCurrent: number) => void | - |  |
| onTransform | Callback for preview transform changes | { transform: [TransformType](#transformtype), action: [TransformAction](#transformaction) } | - |  |
| ~~onVisibleChange~~ | Callback when 'visible' changes; please use 'onOpenChange' instead | (visible: boolean, prevVisible: boolean, current: number) => void | - |  |

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
    onActive?: (index: number) => void; // support after 5.21.0
    onFlipY: () => void;
    onFlipX: () => void;
    onRotateLeft: () => void;
    onRotateRight: () => void;
    onZoomOut: () => void;
    onZoomIn: () => void;
    onReset: () => void; // support after 5.17.3
    onClose: () => void;
  };
  transform: TransformType,
  current: number;
  image: ImgInfo
}
```

### ImgInfo

```typescript
{
  url: string;
  alt: string;
  width: string | number;
  height: string | number;
}
```

### CoverConfig

```typescript
type CoverConfig = {
  coverNode?: React.ReactNode; // The custom node of preview mask
  placement?: 'top' | 'bottom' | 'center'; // Set the position of the preview mask display.
};
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Image"></ComponentTokenTable>
