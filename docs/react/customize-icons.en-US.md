---
group:
  title: Advanced
  order: 1
order: 0.5
title: Customize Icons
---

By default, Ant Design uses the `@ant-design/icons` package to provide icons. You can customize the icons by overriding the icon props in the `ConfigProvider` component.

## Prerequisites

To make sure the icons have correct color and size, your custom icons must inherit `color` and `fontSize` styles.

```css
svg.my-icon {
  fill: currentColor;
  width: 1em;
  height: 1em;
}
```

## Bootstrap Icons

[Bootstrap Icons](https://icons.getbootstrap.com/) is an icon library that provides a lot of icons. You can use it to customize the icons in Ant Design.

```sandpack
const sandpackConfig = {
  autorun: true,
  dependencies: JSON.stringify({
    "react-bootstrap-icons": "^1.10.0",
  }),
};

import { Alert, Breadcrumb, Button, ConfigProvider, Collapse, Drawer, Flex, FloatButton, Image, Modal, Notification } from 'antd';
import React, { useState } from 'react';
import { CheckCircle, InfoCircle, ExclamationCircle, XCircle, XLg, ArrowRight, ChevronDown, ArrowUp } from "react-bootstrap-icons";

const Demo: React.FC = () => {
  const [notificationApi, notificationContextHolder] = Notification.useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ConfigProvider
      alert={{
        successIcon: <CheckCircle />,
        infoIcon: <InfoCircle />,
        warningIcon: <ExclamationCircle />,
        errorIcon: <XCircle />,
        closeIcon: <XLg />,
      }}
      breadcrumb={{
        separator: <ArrowRight />,
        dropdownIcon: <ChevronDown />,
      }}
      collapse={{
        expandIcon: <ChevronDown />,
      }}
      drawer={{
        closeIcon: <XLg />,
      }}
      floatButton={{
        backTopIcon: <ArrowUp />,
      }}
      floatButtonGroup={{
        closeIcon: <XLg />,
      }}
      image={{
        preview: {
          closeIcon: <XLg />,
        }
      }}
      modal={{
        closeIcon: <XLg />,
      }}
      notification={{
        closeIcon: <XLg />,
      }}
    >
      {notificationContextHolder}
      <Flex vertical gap="middle">
        <Alert type="success" showIcon title="Success" closable />
        <Alert type="info" showIcon title="Info" closable />
        <Alert type="warning" showIcon title="Warning" closable />
        <Alert type="error" showIcon title="Error" closable />
        <Breadcrumb items={[{ title: 'Home' }, { title: 'List', menu: { items: [{ title: 'Item 1' }, { title: 'Item 2' }] } }, { title: 'Item' }]} />
        <Collapse items={[{ key: '1', label: 'Item 1', children: <div>Content 1</div> }, { key: '2', label: 'Item 2', children: <div>Content 2</div> }]} />
        <div>
          <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Drawer title="Drawer" open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
        <FloatButton.BackTop />
        <Image.PreviewGroup>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" width={100} height={100} />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" width={100} height={100} />
        </Image.PreviewGroup>
        <div>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal title="Modal" open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
        <div>
          <Button onClick={() => notificationApi.info({ title: 'Notification', description: 'This is a notification' })}>Open Notification</Button>
        </div>
      </Flex>
    </ConfigProvider>
  );
};

export default Demo;
```

## Remix Icon

[Remix Icon](https://remixicon.com/) is an icon library that provides a lot of icons. You can use it to customize the icons in Ant Design.

```sandpack
const sandpackConfig = {
  dependencies: JSON.stringify({
    "@remixicon/react": "^4.8.0",
  }),
};

import { Alert, Breadcrumb, Button, ConfigProvider, Collapse, Drawer, Flex, FloatButton, Image, Modal, Notification } from 'antd';
import React, { useState } from 'react';
import { RiCheckboxCircleLine, RiInformationLine, RiAlertLine, RiCloseCircleLine, RiCloseLine, RiArrowRightLine, RiArrowDropDownLine, RiArrowUpLine } from "@remixicon/react";

const Demo: React.FC = () => {
  const [notificationApi, notificationContextHolder] = Notification.useNotification();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ConfigProvider
      alert={{
        successIcon: <RiCheckboxCircleLine />,
        infoIcon: <RiInformationLine />,
        warningIcon: <RiAlertLine />,
        errorIcon: <RiCloseCircleLine />,
        closeIcon: <RiCloseLine />,
      }}
      breadcrumb={{
        separator: <RiArrowRightLine />,
        dropdownIcon: <RiArrowDropDownLine />,
      }}
      collapse={{
        expandIcon: <RiArrowDropDownLine />,
      }}
      drawer={{
        closeIcon: <RiCloseLine />,
      }}
      floatButton={{
        backTopIcon: <RiArrowUpLine />,
      }}
      floatButtonGroup={{
        closeIcon: <RiCloseLine />,
      }}
      image={{
        preview: {
          closeIcon: <RiCloseLine />,
        }
      }}
    >
      {notificationContextHolder}
      <Flex vertical gap="middle">
        <Alert type="success" showIcon title="Success" closable />
        <Alert type="info" showIcon title="Info" closable />
        <Alert type="warning" showIcon title="Warning" closable />
        <Alert type="error" showIcon title="Error" closable />
        <Breadcrumb items={[{ title: 'Home' }, { title: 'List', menu: { items: [{ title: 'Item 1' }, { title: 'Item 2' }] } }, { title: 'Item' }]} />
        <Collapse items={[{ key: '1', label: 'Item 1', children: <div>Content 1</div> }, { key: '2', label: 'Item 2', children: <div>Content 2</div> }]} />
        <div>
          <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Drawer title="Drawer" open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>
        <FloatButton.BackTop />
        <Image.PreviewGroup>
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" width={100} height={100} />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" width={100} height={100} />
        </Image.PreviewGroup>
        <div>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal title="Modal" open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
        <div>
          <Button onClick={() => notificationApi.info({ title: 'Notification', description: 'This is a notification' })}>Open Notification</Button>
        </div>
      </Flex>
    </ConfigProvider>
  );
};

export default Demo;
```
