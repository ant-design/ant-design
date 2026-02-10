---
category: Components
title: Alert
description: Display warning messages that require attention.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QsvtS41m45UAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gOTISoMFZV0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Feedback
  order: 6
---

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

## Examples

### Basic

The simplest usage for short messages.

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => <Alert title="Success Text" type="success" />;

export default App;
```

### More types

There are 4 types of Alert: `success`, `info`, `warning`, `error`.

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Success Text" type="success" />
    <br />
    <Alert title="Info Text" type="info" />
    <br />
    <Alert title="Warning Text" type="warning" />
    <br />
    <Alert title="Error Text" type="error" />
  </>
);

export default App;
```

### Closable

To show close button.

```tsx
import React from 'react';
import { Alert } from 'antd';

const onClose: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  console.log(e, 'I was closed.');
};

const App: React.FC = () => (
  <>
    <Alert
      title="Warning Title"
      type="warning"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
    <br />
    <Alert
      title="Success Title"
      type="success"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
    <br />
    <Alert
      title="Info Title"
      type="info"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
    <br />
    <Alert
      title="Error Title"
      type="error"
      closable={{ closeIcon: true, onClose, 'aria-label': 'close' }}
    />
  </>
);

export default App;
```

### Description

Additional description for alert message.

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      title="Success Text"
      description="Success Description Success Description Success Description"
      type="success"
    />
    <br />
    <Alert
      title="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <br />
    <Alert
      title="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <br />
    <Alert
      title="Error Text"
      description="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </>
);

export default App;
```

### Icon

A relevant icon will make information clearer and more friendly.

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Success Tips" type="success" showIcon />
    <br />
    <Alert title="Informational Notes" type="info" showIcon />
    <br />
    <Alert title="Warning" type="warning" showIcon closable />
    <br />
    <Alert title="Error" type="error" showIcon />
    <br />
    <Alert
      title="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <br />
    <Alert
      title="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <br />
    <Alert
      title="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
      closable
    />
    <br />
    <Alert
      title="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </>
);

export default App;
```

### Banner

Display Alert as a banner at top of page.

```tsx
import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Warning text" banner />
    <br />
    <Alert
      title="Very long warning text warning text text text text text text text"
      banner
      closable
    />
    <br />
    <Alert showIcon={false} title="Warning text without icon" banner />
    <br />
    <Alert type="error" title="Error text" banner />
  </>
);

export default App;
```

### Loop Banner

Show a loop banner by using with [react-text-loop-next](https://npmjs.com/package/react-text-loop-next) or [react-fast-marquee](https://npmjs.com/package/react-fast-marquee).

```tsx
import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

const App: React.FC = () => (
  <Alert
    banner
    title={
      <Marquee pauseOnHover gradient={false}>
        I can be a React component, multiple React components, or just some text.
      </Marquee>
    }
  />
);

export default App;
```

### Smoothly Unmount

Smoothly unmount Alert upon close.

```tsx
import React, { useState } from 'react';
import { Alert, Switch } from 'antd';

const App: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <Alert
          title="Alert Message Text"
          type="success"
          closable={{ closeIcon: true, afterClose: handleClose }}
        />
      )}
      <p>click the close button to see the effect</p>
      <Switch onChange={setVisible} checked={visible} disabled={visible} />
    </>
  );
};

export default App;
```

### ErrorBoundary

ErrorBoundary Component for making error handling easier in [React](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

```tsx
import React, { useState } from 'react';
import { Alert, Button } from 'antd';

const { ErrorBoundary } = Alert;

const ThrowError: React.FC = () => {
  const [error, setError] = useState<Error>();
  const onClick = () => {
    setError(new Error('An Uncaught Error'));
  };

  if (error) {
    throw error;
  }
  return (
    <Button danger onClick={onClick}>
      Click me to throw a error
    </Button>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
);

export default App;
```


### Custom action

Custom action.

```tsx
import React from 'react';
import { Alert, Button, Space } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      title="Success Tips"
      type="success"
      showIcon
      action={
        <Button size="small" type="text">
          UNDO
        </Button>
      }
      closable
    />
    <br />
    <Alert
      title="Error Text"
      showIcon
      description="Error Description Error Description Error Description Error Description"
      type="error"
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />
    <br />
    <Alert
      title="Warning Text"
      type="warning"
      action={
        <Space>
          <Button type="text" size="small">
            Done
          </Button>
        </Space>
      }
      closable
    />
    <br />
    <Alert
      title="Info Text"
      description="Info Description Info Description Info Description Info Description"
      type="info"
      action={
        <Space vertical>
          <Button size="small" type="primary">
            Accept
          </Button>
          <Button size="small" danger ghost>
            Decline
          </Button>
        </Space>
      }
      closable
    />
  </>
);

export default App;
```


### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Alert by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Alert, Button, Flex } from 'antd';
import type { AlertProps, AlertSemanticType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 12px;
  `,
}));

const styleFn: AlertProps['styles'] = ({ props: { type } }): AlertSemanticType['styles'] => {
  if (type === 'success') {
    return {
      root: {
        backgroundColor: 'rgba(82, 196, 26, 0.1)',
        borderColor: '#b7eb8f',
      },
      icon: {
        color: '#52c41a',
      },
    };
  }

  if (type === 'warning') {
    return {
      root: {
        backgroundColor: 'rgba(250, 173, 20, 0.1)',
        borderColor: '#ffe58f',
      },
      icon: {
        color: '#faad14',
      },
    };
  }

  return {};
};

const App: React.FC = () => {
  const alertSharedProps: AlertProps = {
    showIcon: true,
    classNames: {
      root: classNames.root,
    },
  };

  return (
    <Flex vertical gap="middle">
      <Alert
        {...alertSharedProps}
        title="Object styles"
        type="info"
        styles={{
          icon: {
            fontSize: 18,
          },
          section: {
            fontWeight: 500,
          },
        }}
        action={<Button size="small">Action</Button>}
      />
      <Alert {...alertSharedProps} title="Function styles" type="success" styles={styleFn} />
    </Flex>
  );
};

export default App;
```


## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| action | The action of Alert | ReactNode | - | 4.9.0 |
| ~~afterClose~~ | Called when close animation is finished, please use `closable.afterClose` instead | () => void | - |  |
| banner | Whether to show as banner | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| closable | The config of closable, >=5.15.0: support `aria-*` | boolean \| [ClosableType](#closabletype) & React.AriaAttributes | `false` |  |
| description | Additional content of Alert | ReactNode | - |  |
| icon | Custom icon, effective when `showIcon` is true | ReactNode | - |  |
| ~~message~~ | Content of Alert, please use `title` instead | ReactNode | - |  |
| title | Content of Alert | ReactNode | - |  |
| showIcon | Whether to show icon | boolean | false, in `banner` mode default is true |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| type | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string | `info`, in `banner` mode default is `warning` |  |
| ~~onClose~~ | Callback when Alert is closed, please use `closable.onClose` instead | (e: MouseEvent) => void | - |  |

### ClosableType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| afterClose | Called when close animation is finished | function | - | - |
| closeIcon | Custom close icon | ReactNode | - | - |
| onClose | Callback when Alert is closed | (e: MouseEvent) => void | - | - |

### Alert.ErrorBoundary

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| description | Custom error description to show | ReactNode | {{ error stack }} |  |
| ~~message~~ | Custom error message to show, please use `title` instead | ReactNode | {{ error }} |  |
| title | Custom error title to show | ReactNode | {{ error }} |  |

## Semantic DOM

https://ant.design/components/alert/semantic.md

## Design Token



## Component Token (Alert)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| defaultPadding | Default padding | Padding<string \| number> \| undefined | 8px 12px |
| withDescriptionIconSize | Icon size with description | number | 24 |
| withDescriptionPadding | Padding with description | Padding<string \| number> \| undefined | 20px 24px |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBorder | The border color of the error state. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorIconHover | Weak action hover color. Such as `allowClear` or Alert close button | string |  |
| colorInfo | Used to represent the operation information of the Token sequence, such as Alert, Tag, Progress, and other components use these map tokens. | string |  |
| colorInfoBg | Light background color of information color. | string |  |
| colorInfoBorder | Border color of information color. | string |  |
| colorSuccess | Used to represent the token sequence of operation success, such as Result, Progress and other components will use these map tokens. | string |  |
| colorSuccessBg | Light background color of success color, used for Tag and Alert success state background color | string |  |
| colorSuccessBorder | Border color of success color, used for Tag and Alert success state border color | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningBorder | The border color of the warning state. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| fontSizeLG | Large font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| marginSM | Control the margin of an element, with a medium-small size. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |


