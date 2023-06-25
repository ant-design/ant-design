---
category: Components
group: Other
title: App
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HJz8SZos2wgAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*oC92TK44Ex8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

Application wrapper for some global usages.

## When To Use

- Provide reset styles based on `.ant-app` element.
- You could use static methods of `message/notification/Modal` form `useApp` without put `contextHolder` mannully.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">basic</code>

## How to use

### Basic usage

App provides upstream and downstream method calls through `Context`, because useApp needs to be used as a subcomponent, we recommend encapsulating App at the top level in the application.

```tsx
import { App } from 'antd';
import React from 'react';

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

export { message, notification, modal };
```

```tsx
// sub page
import { Button, Space } from 'antd';
import React from 'react';
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

### App

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| message | Global config for Message | [MessageConfig](/components/message/#messageconfig) | - | 5.3.0 |
| notification | Global config for Notification | [NotificationConfig](/components/notification/#notificationconfig) | - | 5.3.0 |

## Design Token

<ComponentTokenTable component="App"></ComponentTokenTable>
