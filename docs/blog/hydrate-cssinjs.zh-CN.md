---
title: 动态样式去哪儿了？
date: 2023-07-21
author: zombieJ
---

众所周知，antd v5 使用了 CSS-in-JS 技术从而支持混合、动态样式的需求。相对的它需要在运行时生成样式，这会造成一定的性能损耗。因此我们研发了组件库级别的 `@ant-design/cssinjs` 库，通过一定的约束提升缓存效率，从而达到性能优化的目的。不过我们并不止步于此。我们可以通过一些逻辑，直接跳过运行时生成样式的阶段。

## 动态样式去哪儿了？

如果你研究过 Ant Design 的官网，你或许会发现官网虽然用了 Ant Design 的组件库。但是它并没有组件 CSS-in-JS 特有的 `<style />` 样式，当我们单独打开一个 Demo 页面会更加明显：

<img height="450" alt="no-cssinjs" src="https://github.com/ant-design/ant-design/assets/5378891/ae0a209c-85ab-4a63-9fe1-8e9b14348de0" />

`document.head` 里并没有 `<style />` 标签，取而代之只有两个 `css` 文件引用：

- umi.[hash].css
- ssr-[hash].css

前者为 dumi 生成的样式内容，例如 Demo 块、搜索框样式等等。而后者则是 SSR 生成的样式文件。在[定制主题](/docs/react/customize-theme)文档中，我们提过可以通过整体导出的方式将页面中用到的组件进行预先烘焙，从而生成 css 文件以供缓存命中从而提升下一次打开速度。这也是我们在官网中使用的方式。所以 Demo 中的组件，其实就是复用了这部分样式。

等等！CSS-in-JS 不是需要在运行时生成样式的 hash 然后通过 `<style />` 进行对齐的么？为什么 css 文件也可以对齐？不用着急，我们慢慢看。

## CSS-in-JS 注水

应用级的 CSS-in-JS 方案会对生成的样式计算出 hash 值，并且将其存入 Cache 中。当下次渲染时，会先从 Cache 中查找是否存在对应的样式，如果存在则直接使用，否则再生成一次。这样就可以避免重复生成样式，从而提升性能。

![CSS-in-JS process](https://github.com/ant-design/ant-design/assets/5378891/aa8825c9-a78a-4326-ac13-30a27cbe14b6)

每个动态插入到页面中的样式同样以为 hash 作为唯一标识符。如果页面中已经存在该 hash 的 `<style />`，则说明 SSR 中做过 inline style 注入。那么 `<style />` 就不用再次创建。

你可以发现，虽然 `<style />` 的节点创建可以省略，但是因为 hash 依赖于计算出的样式内容。所以即便页面中已经有可以复用的样式内容，它仍然免不了需要计算一次。实属不划算。

## 组件级 CSS-in-JS

在 [组件级别的 CSS-in-JS](/docs/blog/css-in-js) 一文中，我们提过。Ant Design 的 Cache 机制并不需要计算出完整的样式。对于组件库而言，只要通过 Token 和 ComponentName 就可以确定生成样式一致性，所以我们可以提前计算出 hash 值：

![Component CSS-in-JS](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yZMNSYVtxnAAAAAAAAAAAAAADrJ8AQ/original)

也因此，我们发现可以复用这套机制，实现在在客户端侧感知组件样式是否已经注入过。

## SSR HashMap

在 `@ant-design/cssinjs` 中，Cache 本身包含了每个元素对应的 style 和 hash 信息。过去的 `extractStyle` 方法只取 Cache 中 style 的内容进行封装：

```json
// e.g. Real world path is much more complex
{
  "bAMbOo|Button": ["LItTlE", ":where(.bAMbOo).ant-btn { color: red }"],
  "bAMbOo|Spin": ["liGHt", ":where(.bAMbOo).ant-spin { color: blue }"]
}
```

提取：

```css
:where(.bAMbOo).ant-btn {
  color: red;
}
:where(.bAMbOo).ant-spin {
  color: blue;
}
```

为了复用样式，我们更进一步。将 path 和 hash 值也进行了抽取：

```json
{
  "bAMbOo|Button": "LItTlE",
  "bAMbOo|Spin": "liGHt"
}
```

并且也打成 css 样式：

```less
// Just example. Not real world code
.cssinjs-cache-path {
  content: 'bAMbOo|Button:LItTlE;bAMbOo|Spin:liGHt';
}
```

这样 SSR 侧就将我们所需的信息全部留存了下来，接下去只需要在客户端进行提取即可。

## CSR HashMap

在客户端则简单的多，我们通过 `getComputedStyle` 提取 HashMap 信息留存即可：

```tsx
// Just example. Not real world code
const measure = document.createElement('div');
measure.className = 'cssinjs-cache-path';
document.body.appendChild(measure);

// Now let's parse the `content`
const { content } = getComputedStyle(measure);
```

在组件渲染阶段，`useStyleRegister` 在计算 CSS Object 之前，会先在 HashMap 中查找 path 是否存在。如果存在，则说明该数据已经通过服务端生成。我们只需要将样式从现有的 `<style />` 里提取出来即可：

```json
// e.g. Real world path is much more complex
{
  "bAMbOo|Button": ["LItTlE", "READ_FROM_INLINE_STYLE"],
  "bAMbOo|Spin": ["liGHt", "READ_FROM_INLINE_STYLE"]
}
```

而对于 CSS 文件提供的样式（比如官网的使用方式），它不像 `<style />` 会被移除，我们直接标记为来自于 CSS 文件即可。和 inline style 一样，它们会在 `useInsertionEffect` 阶段被跳过。

```json
// e.g. Real world path is much more complex
{
  "bAMbOo|Button": ["LItTlE", "__FROM_CSS_FILE__"],
  "bAMbOo|Spin": ["liGHt", "__FROM_CSS_FILE__"]
}
```

## 总结

CSS-in-JS 因为运行时的性能损耗而被人诟病。而在 Ant Design 中，如果你的应用使用了 SSR，那么在客户端侧就可以直接跳过运行时生成样式的阶段从而提升性能。当然，我们会继续跟进 CSS-in-JS 的发展，为你带来更好的体验。
