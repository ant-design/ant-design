---
category: Components
subtitle: 图片
group: 数据展示
title: Image
cols: 2
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 加载显示大图或加载失败时容错处理。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/fallback.tsx">容错处理</code>
<code src="./demo/placeholder.tsx">渐进加载</code>
<code src="./demo/preview-group.tsx">多张图片预览</code>
<code src="./demo/preview-group-visible.tsx">相册模式</code>
<code src="./demo/previewSrc.tsx">自定义预览图片</code>
<code src="./demo/controlled-preview.tsx">受控的预览</code>
<code src="./demo/preview-mask.tsx" debug>自定义预览文本</code>
<code src="./demo/preview-group-top-progress.tsx" debug>多图预览时顶部进度自定义</code>
<code src="./demo/component-token.tsx" debug>自定义组件 Token</code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像描述 | string | - | 4.6.0 |
| fallback | 加载失败容错地址 | string | - | 4.6.0 |
| height | 图像高度 | string \| number | - | 4.6.0 |
| placeholder | 加载占位, 为 `true` 时使用默认占位 | ReactNode | - | 4.6.0 |
| preview | 预览参数，为 `false` 时禁用 | boolean \| [previewType](#previewtype) | true | 4.6.0 [previewType](#previewtype):4.7.0 |
| src | 图片地址 | string | - | 4.6.0 |
| width | 图像宽度 | string \| number | - | 4.6.0 |
| onError | 加载错误回调 | (event: Event) => void | - | 4.12.0 |
| rootClassName | 为展示图片根 DOM 和预览大图根 DOM 提供自定义 className | string | - | 4.20.0 |

### previewType

```typescript
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible, current: number) => void; // current 参数 v5.3.0 后支持
  getContainer?: string | HTMLElement | (() => HTMLElement); // v4.8.0 指定预览窗口挂载的节点，但依旧为全屏展示
  src?: string; // v4.10.0
  mask?: ReactNode; // v4.9.0
  maskClassName?: string; // v4.11.0
  rootClassName?: string; // v5.4.0 后支持
  current?: number; // v4.12.0 仅支持 PreviewGroup
  countRender?: (current: number, total: number) => string  // v4.20.0 仅支持 PreviewGroup
  scaleStep?: number;
  forceRender?: boolean;
  onChange?: (current: number, prevCurrent: number) => void; // v5.3.0 后支持
}
```

其他属性见 [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)

## Design Token

<ComponentTokenTable component="Image"></ComponentTokenTable>
