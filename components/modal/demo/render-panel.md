---
order: 99
title:
  zh-CN: _DoNotUseOrYouWillBeFired
  en-US: _DoNotUseOrYouWillBeFired
debug: true
---

## zh-CN

调试用组件，请勿直接使用。

## en-US

Debug usage. Do not use in your production.

```tsx
import { Modal } from 'antd';

/** Test usage. Do not use in your production. */
const { _DoNotUseOrYouWillBeFired: InternalPanel } = Modal;

export default () => <InternalPanel title="Hello World!">Hello World?!</InternalPanel>;
```
