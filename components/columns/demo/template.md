---
order: 1
title:
  en-US: gridTemplateColumns
---

Specify `gridTemplateColumns` to specify number and size of columns.

```jsx
import { Columns, Skeleton } from '@allenai/varnish';

ReactDOM.render(
  <div>
    <Columns gridTemplateColumns="3fr 1fr 3fr">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Columns>
  </div>,
  mountNode,
);
```
