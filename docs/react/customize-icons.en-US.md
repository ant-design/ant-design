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
.my-icon {
  color: inherit;
  width: 1em;
  height: 1em;
}
```

## Bootstrap Icons

[Bootstrap Icons](https://icons.getbootstrap.com/) is a icon library that provides a lot of icons. You can use it to customize the icons in Ant Design.

```sandpack
const sandpackConfig = {
  autorun: true,
  dependencies: JSON.stringify({
    "react-bootstrap-icons": "^1.10.0",
  }),
};

import { Alert, Breadcrumb, ConfigProvider, Flex } from 'antd';
import React from 'react';
import { CheckCircle, InfoCircle, ExclamationCircle, XCircle, XLg, ArrowRight, ChevronDown } from "react-bootstrap-icons";

const App: React.FC = () => (
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
  >
    <Flex vertical gap="middle">
      <Alert type="success" showIcon message="Success" closable />
      <Alert type="info" showIcon message="Info" closable />
      <Alert type="warning" showIcon message="Warning" closable />
      <Alert type="error" showIcon message="Error" closable />
      <Breadcrumb items={[{ title: 'Home' }, { title: 'List', menu: { items: [{ title: 'Item 1' }, { title: 'Item 2' }] } }, { title: 'Item' }]} />
    </Flex>
  </ConfigProvider>
);

export default App;
```

## Remix Icon

[Remix Icon](https://remixicon.com/) is a icon library that provides a lot of icons. You can use it to customize the icons in Ant Design.

```sandpack
const sandpackConfig = {
  autorun: true,
  dependencies: JSON.stringify({
    "@remixicon/react": "^4.8.0",
  }),
};

import { Alert, Breadcrumb, ConfigProvider, Flex } from 'antd';
import React from 'react';
import { RiCheckboxCircleLine, RiInformationLine, RiAlertLine, RiCloseCircleLine, RiCloseLine, RiArrowRightLine, RiArrowDropDownLine } from "@remixicon/react";

const App: React.FC = () => (
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
  >
    <Flex vertical gap="middle">
      <Alert type="success" showIcon message="Success" closable />
      <Alert type="info" showIcon message="Info" closable />
      <Alert type="warning" showIcon message="Warning" closable />
      <Alert type="error" showIcon message="Error" closable />
      <Breadcrumb items={[{ title: 'Home' }, { title: 'List', menu: { items: [{ title: 'Item 1' }, { title: 'Item 2' }] } }, { title: 'Item' }]} />
    </Flex>
  </ConfigProvider>
);

export default App;
```
