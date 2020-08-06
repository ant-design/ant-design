---
order: -3
title:
  en-US: Body
---

## en-US

Body and notification copy uses Lato Regular and Bold.

```jsx
import { Typography, Space } from '@allenai/varnish';

const {
  BodyJumbo,
  BodyBig,
  Body,
  BodyBold,
  BodySmall,
  BodySmallBold,
  BodyMicro,
  Notification,
  NotificationBold,
} = Typography;

const text = 'The best way to predict the future is to invent it';
const text2 = 'All your base are belong to us';

ReactDOM.render(
  <Space direction="vertical">
    <BodyJumbo>BodyJumbo. {text}</BodyJumbo>
    <BodyBig>BodyBig. {text}</BodyBig>
    <Body>Body. {text}</Body>
    <BodyBold>BodyBold. {text}</BodyBold>
    <BodySmall>BodySmall. {text}</BodySmall>
    <BodySmallBold>BodySmallBold. {text}</BodySmallBold>
    <BodyMicro>BodyMicro. {text}</BodyMicro>
    <Notification>Notification. {text2}</Notification>
    <NotificationBold>NotificationBold. {text2}</NotificationBold>
  </Space>,
  mountNode,
);
```
