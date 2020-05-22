---
order: 0
title:
  en-US: Default
---

Simplest Usage.

```jsx
import { Header } from '@allenai/varnish';

const { HeaderColumns, HeaderTitle } = Header;

ReactDOM.render(
  <Header>
    <HeaderColumns gridTemplateColumns="auto 1fr">
      <HeaderTitle>Title</HeaderTitle>
    </HeaderColumns>
  </Header>,
  mountNode,
);
```
