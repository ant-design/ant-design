---
category: Components
group: Other
title: App
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HJz8SZos2wgAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

New App Component which provide global style & static function replacement.

## When To Use

Static function in React 18 concurrent mode will not well support. In v5, we recommend to use hooks for the static replacement. But it will make user manual work on define this.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">basic</code>

## How to use

```tsx
import React from 'react';
import { App } from 'antd';

const MyPage: React.FC = () => {
  const { message, notification, modal } = App.useApp();
  message.success('Good!');
  notification.info({ message: 'Good' });
  modal.warning({ title: 'Good' });
  // ....
  // other message, notification, modal static function
  return <div>Hello word</div>;
};

const MyApp: React.FC = () => (
  <App>
    <MyPage />
  </App>
);

export default MyApp;
```
