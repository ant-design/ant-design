---
category: Components
group: Other
title: App
description: Application wrapper for some global usages.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HJz8SZos2wgAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*oC92TK44Ex8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 5.1.0
---

## When To Use

- Provide reset styles based on `.ant-app` element.
- You could use static methods of `message/notification/Modal` from `useApp` without writing `contextHolder` manually.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/config.tsx">Hooks config</code>

## How to use

### Basic usage

App provides upstream and downstream method calls through `Context`, because useApp needs to be used as a subcomponent, we recommend encapsulating App at the top level in the application.

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

Note: App.useApp must be available under App.

### Sequence with ConfigProvider

The App component can only use the token in the `ConfigProvider`, if you need to use the Token, the ConfigProvider and the App component must appear in pairs.

```tsx
<ConfigProvider theme={{ ... }}>
  <App>
    ...
  </App>
</ConfigProvider>
```

### Embedded usage scenarios (if not necessary, try not to do nesting)

```tsx
<App>
  <Space>
    ...
    <App>...</App>
  </Space>
</App>
```

### Global scene (redux scene)

```tsx
// Entry component
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export { message, modal, notification };
```

```tsx
// sub page
import React from 'react';
import { Button, Space } from 'antd';

import { message } from './store';

export default () => {
  const showMessage = () => {
    message.success('Success!');
  };

  return (
    <Space>
      <Button type="primary" onClick={showMessage}>
        Open message
      </Button>
    </Space>
  );
};
```

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.1.0`.

### App

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| component | Config render element, if `false` will not create DOM node | ComponentType \| false | div | 5.11.0 |
| message | Global config for Message | [MessageConfig](/components/message/#messageconfig) | - | 5.3.0 |
| notification | Global config for Notification | [NotificationConfig](/components/notification/#notificationconfig) | - | 5.3.0 |

## Design Token

<ComponentTokenTable component="App"></ComponentTokenTable>

## FAQ

### CSS Var doesn't work inside `<App component={false}>`

Make sure the App `component` is a legit React component string, so when you're turning on CSS variables, there's a container to hold the CSS class name.
