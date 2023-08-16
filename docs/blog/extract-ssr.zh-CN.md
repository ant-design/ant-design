---
title: SSR 静态样式导出
date: 2023-04-25
author: zombieJ
---

传统的 js + css 网站，SSR 一般只需要处理好首次渲染的注水问题。而当 CSS-in-JS 技术的引入，开发者则需要额外关注如何将样式导出到 HTML 中，以保证首次渲染的正确性。我们提供了非常多的实现方式，也正好在此聊聊其中的思路。如果你需要完整的文档或者示例欢迎查阅[《定制主题》](/docs/react/customize-theme-cn)。

### Inline Style

> 最简单的方式就是将样式直接内联到 HTML 中，这样就不需要额外的请求。这种方式的缺点是，样式无法被浏览器缓存，每次请求都需要重新下载。而且，如果样式过多，会导致 HTML 文件过大，影响首次渲染的速度。

在 v5 alpha 版本中，为了兜底 SSR 样式渲染，我们参考 `Emotion` 的实现，为每个元素前都加上对应的内联样式：

```html
<div>
  <style>
    :where(.css-bAmBOo).ant-btn {
      // ...
    }
  </style>
  <button className="ant-btn css-bAmBOo">Hello World</button>
</div>
```

这个实现简单有效，唯一的缺点则是对于 `:nth` 选择会有样式污染。但是考虑到 antd 组件其实很少使用这个样式，副作用对我们没什么影响。

开始的时候运行良好，antd 的官网几乎无需改造就直接支持 SSR 样式满足了 SEO 需求。但是随着我们组件逐渐迁移到 CSS-in-JS 版本后，我们发现站点的构建产物变得十分巨大，慢慢的变得不可用。在查看 HTML 后，我们发现默认内联方式并不好，它会导致样式被成倍的内联，例如一个页面里有 3 个 Button，那它就会重复内联 3 次：

```html
<div>
  <style>
    :where(.css-bAmBOo).ant-btn {
      // ...
    }
  </style>
  <button className="ant-btn css-bAmBOo">Hello World 1</button>
  <style>
    :where(.css-bAmBOo).ant-btn {
      // ...
    }
  </style>
  <button className="ant-btn css-bAmBOo">Hello World 2</button>
  <style>
    :where(.css-bAmBOo).ant-btn {
      // ...
    }
  </style>
  <button className="ant-btn css-bAmBOo">Hello World 3</button>
</div>
```

而当大部分组件都转成 CSS-in-JS 后，内联样式会变得十分巨大。所以我们在后期移除了自动内联的功能，转成了需要手工收取的形式：

```tsx
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';

const cache = createCache();

// HTML Content
const html = renderToString(
  <StyleProvider cache={cache}>
    <MyApp />
  </StyleProvider>,
);

// Style Content
const styleText = extractStyle(cache);
```

这是传统的 CSS-in-JS 注入实现。就如引言所述，内联样式无法缓存会造成额外的加载开销。也因此，我们尝试探索一些新的实现方式，可以获得如原生 CSS 的加载体验。

### Static Extract Style

我们在思考是否可以如 v4 版本一样，预先烘焙组件的样式来使前端消费，所以提出了 [\[RFC\] Static Extract style](https://github.com/ant-design/ant-design/discussions/40985)。它的思路很简单，我们只需要提前将所有的组件进行一次渲染就可以从 cache 中获得完整的样式，然后将其写入到 css 文件中即可。

```tsx
const cache = createCache();

// HTML Content
renderToString(
  <StyleProvider cache={cache}>
    <Button />
    <Switch />
    <Input />
    {/* Rest antd components */}
  </StyleProvider>,
);

// Style Content
const styleText = extractStyle(cache);
```

当然，这对于开发者而言稍微有点麻烦。所以我们提取了一个三方包来实现该需求：

```tsx
import { extractStyle } from '@ant-design/static-style-extract';
import fs from 'fs';

// `extractStyle` containers all the antd component
// excludes popup like component which is no need in ssr: Modal, message, notification, etc.
const css = extractStyle();

fs.writeFile(...);
```

如果开发者使用了混合主题，也可以自行实现混合需求：

```tsx
// `node` is the components set we prepared
const css = extractStyle((node) => (
  <>
    <ConfigProvider theme={theme1}>{node}</ConfigProvider>
    <ConfigProvider theme={theme2}>{node}</ConfigProvider>
    <ConfigProvider theme={theme3}>{node}</ConfigProvider>
  </>
));
```

### Part Static Extract Style

在大部分情况下，上面的用法已经满足了需求。但是有时候，我们会希望兼顾 CSS-in-JS 的灵活性，又获得静态文件缓存的好处。那么这个时候我们就需要在应用层面进行下手，在渲染导出所需的内容后，不同于 Inline Style，而是将其转为文件存储。通过简单的 hash 就可以实现文件的缓存：

```tsx
import { createHash } from 'crypto';

// Get Style content like above
const styleText = extractStyle(cache);

const hash = createHash('md5').update(styleText).digest('hex');
const cssFileName = `css-${hash.substring(0, 8)}.css`;

if (!fs.existsSync(cssFileName)) {
  fs.writeFileSync(cssFileName, styleText);
}
```

然后在 HTML 模板侧添加对应的 CSS 文件：

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="${hashCssFileUrl}" />
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
```

完整实现点击[此处](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-generate-css-on-demand)查阅。

访问不同的页面时会生成对应的 CSS，每个 CSS 都会有其对应的 Hash 值。当 Hash 命中时，则说明该 CSS 文件已经被落盘，可以直接使用。继而对于客户端而言就是一次正常的 CSS 文件访问，同样享受缓存能力。

对于不同的用户访问相同的页面所需的样式不同或者说自定义主题不同，都可以通过该 Hash 作区分。

## 总结

对于不复杂的应用而言，我们更推荐使用前者 Static Extract Style。它已经足够简单，但是对于想更细粒度控制 SSR 样式渲染以获得更好的访问速度体验的开发者，则可以试试部分静态化的能力。以上。
