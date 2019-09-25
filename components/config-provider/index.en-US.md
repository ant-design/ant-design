---
category: Components
type: Other
cols: 1
title: ConfigProvider
---

`ConfigProvider` provides a uniform configuration support for components.

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://facebook.github.io/react/docs/context.html), In the render tree all components will have access to the provided config.

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider {...yourConfig}>
    <App />
  </ConfigProvider>
);
```

### Content Security Policy

Some component use dynamic style to support wave effect. You can config `csp` prop if Content Security Policy (CSP) is enabled:

```jsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | Set `false` to remove space between 2 chinese characters on Button | boolean | true | 3.13.0 |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - | 3.13.1 |
| renderEmpty | set empty content of components. Ref [Empty](/components/empty/) | Function(componentName: string): ReactNode | - | 3.12.2 |
| getPopupContainer | to set the container of the popup element. The default is to create a `div` element in `body`. | Function(triggerNode) | `() => document.body` | 3.11.0 |
| locale | language package setting, you can find the packages in [antd/es/locale](http://unpkg.com/antd/es/locale/) | object | 3.21.0 |
| prefixCls | set prefix class | string | ant | 3.12.0 |
