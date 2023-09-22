---
title: SSR Static style export
date: 2023-04-25
author: zombieJ
---

For traditional js + css websites, SSR only needs to deal with the hydrate problem of the first rendering. With the introduction of CSS-in-JS technology, developers need to pay additional attention to how to export styles to HTML to ensure the correctness of the view. We provide a lot of implementation methods, and we just talk about the ideas here. If you need complete documentation or examples, please refer to [Customize Theme](/docs/react/customize-theme-cn).

### Inline Style

> The easiest way is to inline the styles directly into the HTML so that no extra requests. The disadvantage of this method is that the style cannot be cached by the browser and needs to be downloaded again for each request. Moreover, if there are too many styles, the HTML file will be too large, which will affect the speed of the first rendering.

In the v5 alpha version, in order to cover the SSR style rendering, we refer to the implementation of `Emotion` and add the corresponding inline style before each element:

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

This implementation is simple and effective, the only downside is style pollution for `:nth` selections. But considering that antd components rarely use this selector, the side effects can be ignored.

It worked well at the beginning, and the official website of antd directly supports the SSR style without modification and meet the SEO needs. But as our components gradually migrated to the CSS-in-JS version, we found that the site's bundle size became very large and slowly became unusable. After looking at the HTML, we found that the default inline method is not good, it will cause the style to be doubled inline, for example, if there are 3 Buttons in a page, then it will repeat the inline 3 times:

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

And when most components are converted to CSS-in-JS, inline styles can become huge. So we removed the automatic inlining function in the later stage, and converted it to a form that needs to be collected manually:

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

This is the traditional CSS-in-JS injection implementation. As mentioned in the introduction, inline styles cannot be cached and cause additional loading overhead. Therefore, we try to explore some new implementation methods to obtain a loading experience like native CSS.

### Static Extract Style

We are thinking about whether we can pre-bake the style of the component for front-end consumption like the v4 version, so we proposed [\[RFC\] Static Extract style](https://github.com/ant-design/ant-design/discussions/40985). Its idea is very simple that only need to render all the components once in advance to get the complete style from the cache, and then write it into the css file.

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

Of course, this is a little cumbersome for developers. So we extracted a three-party package to achieve this requirement:

```tsx
import { extractStyle } from '@ant-design/static-style-extract';
import fs from 'fs';

// `extractStyle` containers all the antd component
// excludes popup like component which is no need in ssr: Modal, message, notification, etc.
const css = extractStyle();

fs.writeFile(...);
```

If developers use a hybrid theme, they can also implement the hybrid requirements by themselves:

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

In most cases, the above usage has met the needs. But sometimes, we want to combine the flexibility of CSS-in-JS with the benefits of static file caching. Then at this time we need to start at the application level. After rendering and exporting the required content, it is different from the Inline Style, but converts it to file storage. File caching can be achieved through a simple hash:

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

Then add the corresponding CSS file on the HTML template side:

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

Click [here](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-generate-css-on-demand) for complete implementation.

Corresponding CSS will be generated when visiting different pages, and each CSS will have its corresponding Hash value. When the Hash hits, it means that the CSS file has been placed on the disk and can be used directly. Then, for the client, it is a normal CSS file access and also enjoys the caching capability.

Different styles or custom themes required by different users to access the same page can be distinguished through this Hash.

## Finally

For uncomplicated applications, we recommend using the former Static Extract Style. It is simple enough, but for developers who want finer-grained control over SSR-style rendering for a better access speed experience, you can try the partial static capability. Thanks.
