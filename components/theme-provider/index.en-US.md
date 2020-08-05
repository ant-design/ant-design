---
category: Components
type: General
title: Theme Provider
cols: 1
cover: https://allenai.org/favicon.ico
---

Theme Provider for Varnish Theming.

## When To Use

- All Varnish Apps need to be wrapped with the ThemeProvider.

```jsx
import { Header, Button, ThemeProvider } from '@allenai/varnish';
import '@allenai/varnish/dist/varnish.css';

ReactDOM.render(
  <ThemeProvider>
    <Header>
        <h1>My Application!</h1>
    </Header>
    <Button type="primary">Click Me!</Button>
  </ThemeProvider>,
  mountNode,
);
```
