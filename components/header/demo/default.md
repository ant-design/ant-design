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
      <a href="http://allenai.org" target="_blank" rel="noopener noreferrer">
        <HeaderTitle>Title</HeaderTitle>
      </a>
    </HeaderColumns>
  </Header>,
  mountNode,
);
```
