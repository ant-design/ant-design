---
group:
  title: 进阶使用
order: 1
title: 样式兼容
---

Ant Design 支持最近 2 个版本的现代浏览器。如果你需要兼容旧版浏览器，请根据实际需求进行降级处理：

## StyleProvider

查看 [`@ant-design/cssinjs`](https://github.com/ant-design/cssinjs#styleprovider).

## `:where` 选择器

Ant Design 的 CSS-in-JS 默认通过 `:where` 选择器降低 CSS Selector 优先级，以减少用户升级时额外调整自定义样式的成本，不过 `:where` 语法的[兼容性](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#browser_compatibility)在低版本浏览器比较差。在某些场景下你如果需要支持旧版浏览器（或者如 TailwindCSS 优先级冲突），你可以使用 `@ant-design/cssinjs` 取消默认的降权操作（请注意版本保持与 antd 一致）：

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

// `hashPriority` 默认为 `low`，配置为 `high` 后，
// 会移除 `:where` 选择器封装
export default () => (
  <StyleProvider hashPriority="high">
    <MyApp />
  </StyleProvider>
);
```

切换后，样式将从 `:where` 切换为类选择器：

```diff
--  :where(.css-bAMboO).ant-btn {
++  .css-bAMboO.ant-btn {
      color: #fff;
    }
```

注意：关闭 `:where` 降权后，你可能需要手动调整一些样式的优先级。亦或者**使用 PostCSS 插件**提升应用样式的优先级，PostCSS 提供了非常多的插件来调整优先级，你可以自行按需选择，例如：

- [postcss-scopify](https://www.npmjs.com/package/postcss-scopify)
- [postcss-increase-specificity](https://www.npmjs.com/package/postcss-increase-specificity)
- [postcss-add-root-selector](https://www.npmjs.com/package/postcss-add-root-selector)

通过插件配置，将你的 css 样式进行提升：

```diff
--  .my-btn {
++  #root .my-btn {
      background: red;
    }
```

## CSS 逻辑属性

为了统一 LTR 和 RTL 样式，Ant Design 使用了 CSS 逻辑属性。例如原 `margin-left` 使用 `margin-inline-start` 代替，使其在 LTR 和 RTL 下都为起始位置间距。如果你需要兼容旧版浏览器（如 360 浏览器、QQ 浏览器 等等），可以通过 `@ant-design/cssinjs` 的 `StyleProvider` 配置 `transformers` 将其转换：

```tsx
import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';

// `transformers` 提供预处理功能将样式进行转换
export default () => (
  <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
    <MyApp />
  </StyleProvider>
);
```

切换后，样式将降级 CSS 逻辑属性：

```diff
.ant-modal-root {
-- inset: 0;
++ top: 0;
++ right: 0;
++ bottom: 0;
++ left: 0;
}
```

## rem 适配

在响应式网页开发中，需要一种方便且灵活的方式来实现页面的适配和响应式设计。`px2remTransformer` 转换器可以快速而准确地将样式表中的像素单位转换为相对于根元素（HTML 标签）的 rem 单位，实现页面的自适应和响应式布局。

```tsx
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';

const px2rem = px2remTransformer({
  rootValue: 32, // 32px = 1rem; @default 16
});

export default () => (
  <StyleProvider transformers={[px2rem]}>
    <MyApp />
  </StyleProvider>
);
```

最终转换后的样式：

```diff
 .px2rem-box {
-  width: 400px;
+  width: 12.5rem;
   background-color: green;
-  font-size: 32px;
+  font-size: 1rem;
   border: 10PX solid #f0f;
 }

 @media only screen and (max-width: 600px) {
   .px2rem-box {
     background-color: red;
-    margin: 10px;
+    margin: 0.3125rem;
   }
 }
```

### 配置项

<!-- prettier-ignore -->
| 参数 | 说明  | 类型 | 默认值 |
| --- | --- | --- | --- |
| rootValue | 根元素字体大小 | `number` | 16 |
| precision | 转换后的小数点位数 | `number` | 5 |
| mediaQuery | 是否转换媒体查询中的 px | `boolean` | false |

详细请参考: [px2rem.ts#Options](https://github.com/ant-design/cssinjs/blob/master/src/transformers/px2rem.ts)

## Shadow DOM 场景

在 Shadow DOM 场景中，由于其添加 `<style />` 标签的方式与普通 DOM 不同，所以需要使用 `@ant-design/cssinjs` 的 `StyleProvider` 配置 `container` 属性用于设置插入位置：

```tsx
import { StyleProvider } from '@ant-design/cssinjs';
import { createRoot } from 'react-dom/client';

const shadowRoot = someEle.attachShadow({ mode: 'open' });
const container = document.createElement('div');
shadowRoot.appendChild(container);
const root = createRoot(container);

root.render(
  <StyleProvider container={shadowRoot}>
    <MyApp />
  </StyleProvider>,
);
```
