---
group:
  title: 进阶使用
  order: 1
order: 0.5
title: 定制图标
---

默认情况下，Ant Design 使用 `@ant-design/icons` 包提供图标。您可以通过在 `ConfigProvider` 组件中重写图标属性来定制图标。

## 前提条件

为了确保图标具有正确的颜色和大小，您的自定义图标必须继承 `color` 和 `fontSize` 样式。

```css
svg.my-icon {
  fill: currentColor;
  width: 1em;
  height: 1em;
}
```

## Bootstrap Icons

[Bootstrap Icons](https://icons.getbootstrap.com/) 是一个图标库，提供了大量的图标。您可以使用它来定制 Ant Design 的图标。

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

[Remix Icon](https://remixicon.com/) 是一个图标库，提供了大量的图标。您可以使用它来定制 Ant Design 的图标。

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
