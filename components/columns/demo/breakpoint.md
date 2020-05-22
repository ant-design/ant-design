---
order: 2
title:
  en-US: breakpoint
---

Specify `breakpoint` to force grid into a single columns on small screens.

```jsx
import { Columns, Skeleton } from '@allenai/varnish';

ReactDOM.render(
  <div>
    <Columns count={3} breakpoint="md">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Columns>
  </div>,
  mountNode,
);
```
