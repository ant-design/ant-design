---
order: 0
title:
  en-US: count
---

Specify `count` to set number of equal columns.

```jsx
import { Columns } from '..'; // TODO: point this at varnish
import Skeleton from '../../skeleton'; // TODO: point this at varnish

ReactDOM.render(
   <div>
        <Columns count={3}>
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
