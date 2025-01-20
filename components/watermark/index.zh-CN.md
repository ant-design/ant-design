---
category: Components
group: 反馈
title: Watermark
subtitle: 水印
description: 给页面的某个区域加上水印。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*wr1ISY50SyYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*duAQQbjHlHQAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
tag: 5.1.0
---

## 何时使用

- 页面需要添加水印标识版权时使用。
- 适用于防止信息盗用。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/multi-line.tsx">多行水印</code>
<code src="./demo/image.tsx">图片水印</code>
<code src="./demo/custom.tsx">自定义配置</code>
<code src="./demo/portal.tsx">Modal 与 Drawer</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

> 自 `antd@5.1.0` 版本开始提供该组件。

### Watermark

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 水印的宽度，`content` 的默认值为自身的宽度 | number | 120 |  |
| height | 水印的高度，`content` 的默认值为自身的高度 | number | 64 |  |
| inherit | 是否将水印传导给弹出组件如 Modal、Drawer | boolean | true | 5.11.0 |
| rotate | 水印绘制时，旋转的角度，单位 `°` | number | -22 |  |
| zIndex | 追加的水印元素的 z-index | number | 9 |  |
| image | 图片源，建议导出 2 倍或 3 倍图，优先级高 (支持 base64 格式) | string | - |  |
| content | 水印文字内容 | string \| string[] | - |  |
| font | 文字样式 | [Font](#font) | [Font](#font) |  |
| gap | 水印之间的间距 | \[number, number\] | \[100, 100\] |  |
| offset | 水印距离容器左上角的偏移量，默认为 `gap/2` | \[number, number\] | \[gap\[0\]/2, gap\[1\]/2\] |  |

### Font

<!-- prettier-ignore -->
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| color | 字体颜色 | [CanvasFillStrokeStyles.fillStyle](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillStyle) | rgba(0,0,0,.15) |  |
| fontSize | 字体大小 | number | 16 |  |
| fontWeight | 字体粗细 | `normal` \| `light` \| `weight` \| number | normal |  |
| fontFamily | 字体类型 | string | sans-serif |  |
| fontStyle | 字体样式 | `none` \| `normal` \| `italic` \| `oblique` | normal |  |
| textAlign | 指定文本对齐方向  | [CanvasTextAlign](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textAlign) | `center` | 5.10.0 |

## 主题变量（Design Token）

<ComponentTokenTable component="Watermark"></ComponentTokenTable>

## FAQ

### 处理异常图片水印

当使用图片水印且图片加载异常时，可以同时添加 `content` 防止水印失效（自 5.2.3 开始支持）。

```typescript jsx
<Watermark
  height={30}
  width={130}
  content="Ant Design"
  image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
>
  <div style={{ height: 500 }} />
</Watermark>
```

### 从 5.18.0 版本后，为什么添加了 `overflow: hidden` 样式？

在之前版本，用户可以通过开发者工具将容器高度设置为 0 来隐藏水印，为了避免这种情况，我们在容器上添加了 `overflow: hidden` 样式。当容器高度变化时，则内容也一同被隐藏。你可以通过覆盖样式来修改这个行为：

```tsx
<Watermark style={{ overflow: 'visible' }} />
```
