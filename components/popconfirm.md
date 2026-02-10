---
category: Components
group: Feedback
title: Popconfirm
description: Pop up a bubble confirmation box for an action.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a7tqQ6wrdeAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*iwYsQpeFcB0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## Examples

### Basic

The basic example supports the title and description props of confirmation.

> `description` is supported in version `5.1.0`.

```tsx
import React from 'react';
import type { PopconfirmProps } from 'antd';
import { Button, message, Popconfirm } from 'antd';

const App: React.FC = () => {
  const [messageApi, holder] = message.useMessage();

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    messageApi.success('Click on Yes');
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    messageApi.error('Click on No');
  };

  return (
    <>
      {holder}
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </>
  );
};

export default App;
```

### Locale text

Set `okText` and `cancelText` props to customize the button's labels.

```tsx
import React from 'react';
import { Button, Popconfirm } from 'antd';

const App: React.FC = () => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);

export default App;
```

### Placement

There are 12 `placement` options available. Use `arrow: { pointAtCenter: true }` if you want the arrow to point at the center of target.

```tsx
import React from 'react';
import { Button, ConfigProvider, Flex, Popconfirm } from 'antd';

const text = 'Are you sure to delete this task?';
const description = 'Delete the task';
const buttonWidth = 80;

const App: React.FC = () => (
  <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
    <Flex vertical justify="center" align="center" className="demo">
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <Popconfirm
          placement="topLeft"
          title={text}
          description={description}
          okText="Yes"
          cancelText="No"
        >
          <Button>TL</Button>
        </Popconfirm>
        <Popconfirm
          placement="top"
          title={text}
          description={description}
          okText="Yes"
          cancelText="No"
        >
          <Button>Top</Button>
        </Popconfirm>
        <Popconfirm
          placement="topRight"
          title={text}
          description={description}
          okText="Yes"
          cancelText="No"
        >
          <Button>TR</Button>
        </Popconfirm>
      </Flex>
      <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
        <Flex align="center" vertical>
          <Popconfirm
            placement="leftTop"
            title={text}
            description={description}
            okText="Yes"
            cancelText="No"
          >
            <Button>LT</Button>
          </Popconfirm>
          <Popconfirm
            placement="left"
            title={text}
            description={description}
            okText="Yes"
            cancelText="No"
          >
            <Button>Left</Button>
          </Popconfirm>
          <Popconfirm
            placement="leftBottom"
            title={text}
            description={description}
            okText="Yes"
            cancelText="No"
          >
            <Button>LB</Button>
          </Popconfirm>
        </Flex>
        <Flex align="center" vertical>
          <Popconfirm
            placement="rightTop"
            title={text}
            description={description}
            okText="Yes"
            cancelText="No"
          >
            <Button>RT</Button>
          </Popconfirm>
          <Popconfirm
            placement="right"
            title={text}
            description={description}
            okText="Yes"
            cancelText="No"
          >
            <Button>Right</Button>
          </Popconfirm>
          <Popconfirm
            placement="rightBottom"
            title={text}
            description={description}
            okText="Yes"
            cancelText="No"
          >
            <Button>RB</Button>
          </Popconfirm>
        </Flex>
      </Flex>
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <Popconfirm
          placement="bottomLeft"
          title={text}
          description={description}
          okText="Yes"
          cancelText="No"
        >
          <Button>BL</Button>
        </Popconfirm>
        <Popconfirm
          placement="bottom"
          title={text}
          description={description}
          okText="Yes"
          cancelText="No"
        >
          <Button>Bottom</Button>
        </Popconfirm>
        <Popconfirm
          placement="bottomRight"
          title={text}
          description={description}
          okText="Yes"
          cancelText="No"
        >
          <Button>BR</Button>
        </Popconfirm>
      </Flex>
    </Flex>
  </ConfigProvider>
);

export default App;
```

### Auto Shift

Auto adjust Popup and arrow position when Popconfirm is close to the edge of the screen. Will be out of screen when exceed limitation.

```tsx
import React from 'react';
import { Button, Popconfirm } from 'antd';

const style: React.CSSProperties = {
  width: '300vw',
  height: '300vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const App: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
  return (
    <div style={style}>
      <Popconfirm title="Thanks for using antd. Have a nice day !" open>
        <Button type="primary">Scroll The Window</Button>
      </Popconfirm>
    </div>
  );
};

export default App;
```

### Conditional trigger

Make it pop up under some conditions.

```tsx
import React, { useState } from 'react';
import { Button, message, Popconfirm, Switch } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(true);

  const changeCondition = (checked: boolean) => {
    setCondition(checked);
  };

  const confirm = () => {
    setOpen(false);
    message.success('Next step.');
  };

  const cancel = () => {
    setOpen(false);
    message.error('Click on cancel.');
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
    // Determining condition before show the popconfirm.
    console.log(condition);
    if (condition) {
      confirm(); // next step
    } else {
      setOpen(newOpen);
    }
  };

  return (
    <div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        open={open}
        onOpenChange={handleOpenChange}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete a task</Button>
      </Popconfirm>
      <br />
      <br />
      Whether directly execute：
      <Switch defaultChecked onChange={changeCondition} />
    </div>
  );
};

export default App;
```

### Customize icon

Set `icon` props to customize the icon.

```tsx
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

const App: React.FC = () => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);

export default App;
```

### Asynchronously close

Asynchronously close a popconfirm when a the OK button is pressed. For example, you can use this pattern when you submit a form.

```tsx
import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Title"
      description="Open Popconfirm with async logic"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        Open Popconfirm with async logic
      </Button>
    </Popconfirm>
  );
};

export default App;
```

### Asynchronously close on Promise

Asynchronously close a popconfirm when the OK button is pressed. For example, you can use this pattern when you submit a form.

```tsx
import React from 'react';
import { Button, Popconfirm } from 'antd';

const App: React.FC = () => {
  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    });

  return (
    <Popconfirm
      title="Title"
      description="Open Popconfirm with Promise"
      onConfirm={confirm}
      onOpenChange={() => console.log('open change')}
    >
      <Button type="primary">Open Popconfirm with Promise</Button>
    </Popconfirm>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Popconfirm by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Button, Flex, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    padding: 10px;
  `,
}));

const styles: PopconfirmProps['styles'] = {
  container: {
    backgroundColor: '#eee',
    boxShadow: 'inset 5px 5px 3px #fff, inset -5px -5px 3px #ddd, 0 0 3px rgba(0,0,0,0.2)',
  },
  title: {
    color: '#262626',
  },
  content: {
    color: '#262626',
  },
};

const stylesFn: PopconfirmProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        borderRadius: 4,
      },
      title: {
        color: '#fff',
      },
      content: {
        color: '#fff',
      },
    } satisfies PopconfirmProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Flex gap="middle">
      <Popconfirm
        title="Object text"
        description="Object description"
        classNames={classNames}
        styles={styles}
        arrow={false}
      >
        <Button>Object Style</Button>
      </Popconfirm>
      <Popconfirm
        title="Function text"
        description="Function description"
        classNames={classNames}
        styles={stylesFn}
        arrow={false}
        okButtonProps={{
          styles: { root: { backgroundColor: 'rgba(53, 71, 125, 0.6)', color: '#fff' } },
        }}
        cancelButtonProps={{
          styles: {
            root: {
              borderColor: 'rgba(53, 71, 125, 0.6)',
              backgroundColor: '#fff',
              color: 'rgba(53, 71, 125, 0.8)',
            },
          },
        }}
      >
        <Button type="primary">Function Style</Button>
      </Popconfirm>
    </Flex>
  );
};

export default App;
```




## API

Common props ref：[Common props](/docs/react/common-props)

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button/#api) | - |  |
| cancelText | The text of the Cancel button | string | `Cancel` |  |
| disabled | Whether show popconfirm when click its childrenNode | boolean | false |  |
| icon | Customize icon of confirmation | ReactNode | &lt;ExclamationCircle /> |  |
| okButtonProps | The ok button props | [ButtonProps](/components/button/#api) | - |  |
| okText | The text of the Confirm button | string | `OK` |  |
| okType | Button `type` of the Confirm button | string | `primary` |  |
| showCancel | Show cancel button | boolean | true | 4.18.0 |
| title | The title of the confirmation box | ReactNode \| () => ReactNode | - |  |
| description | The description of the confirmation box title | ReactNode \| () => ReactNode | - | 5.1.0 |
| onCancel | A callback of cancel | function(e) | - |  |
| onConfirm | A callback of confirmation | function(e) | - |  |
| onPopupClick | A callback of popup click | function(e) | - | 5.5.0 |

<!-- Common API -->

<embed src="../tooltip/shared/sharedProps.en-US.md"></embed>

## Semantic DOM

https://ant.design/components/popconfirm/semantic.md

## Design Token



## Component Token (Popconfirm)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| zIndexPopup | z-index of Popconfirm | number | 1060 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |



## FAQ

<embed src="../tooltip/shared/sharedFAQ.en-US.md"></embed>

For more questions, please refer to [Tooltip FAQ](/components/tooltip#faq).
