---
category: Components
type: Other
cols: 1
title: ConfigProvider
---

`ConfigProvider` provides a uniform configuration support for components.

## Usage

`ConfigProvider` takes use of [context](https://facebook.github.io/react/docs/context.html), a feature of React, to accomplish global effectiveness by wrapping the app only once.

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider {...yourConfig}>
    <App />
  </ConfigProvider>
);
```

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| getPopupContainer | to set the container of the popup element. The default is to create a `div` element in `body`. | Function(triggerNode) | `() => document.body` |
