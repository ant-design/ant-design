---
order: -3
title:
  en-US: Body
---

## en-US

Body and notification copy uses Lato Regular and Bold.

```jsx
import { Typography } from '@allenai/varnish';

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
  <div>
    <BodyJumbo>BodyJumbo. {text}</BodyJumbo>
    <br />
    <BodyBig>BodyBig. {text}</BodyBig>
    <br />
    <Body>Body. {text}</Body>
    <br />
    <BodyBold>BodyBold. {text}</BodyBold>
    <br />
    <BodySmall>BodySmall. {text}</BodySmall>
    <br />
    <BodySmallBold>BodySmallBold. {text}</BodySmallBold>
    <br />
    <BodyMicro>BodyMicro. {text}</BodyMicro>
    <br />
    <Notification>Notification. {text2}</Notification>
    <br />
    <NotificationBold>NotificationBold. {text2}</NotificationBold>
  </div>,
  mountNode,
);
```
