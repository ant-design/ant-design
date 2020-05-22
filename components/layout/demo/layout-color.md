---
order: 8
title:
  en-US: Layout Color
---

Layout can specify a background Varnish color.

```jsx
import { Layout } from '@allenai/varnish';

ReactDOM.render(
  <Layout bgcolor="B6">
    Hello Blue World
    <Layout bgcolor="G6">Hello Green World</Layout>
  </Layout>,
  mountNode,
);
```
