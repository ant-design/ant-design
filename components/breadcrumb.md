---
category: Components
group: Navigation
title: Breadcrumb
description: Display the current location within a hierarchy. And allow going back to states higher up in the hierarchy.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*I5a2Tpqs3y0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Tr90QKrE_LcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- When the system has more than two layers in a hierarchy.
- When you need to inform the user of where they are.
- When the user may need to navigate back to a higher level.

```jsx
// works when >=5.3.0, recommended ✅
return <Breadcrumb items={[{ title: 'sample' }]} />;

// works when <5.3.0, deprecated when >=5.3.0 🙅🏻‍♀️
return (
  <Breadcrumb>
    <Breadcrumb.Item>sample</Breadcrumb.Item>
  </Breadcrumb>
);

// or

return <Breadcrumb routes={[{ breadcrumbName: 'sample' }]} />;
```

## Examples

### Basic Usage

The simplest use.

```tsx
import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => {
  return (
    <Breadcrumb
      items={[
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: 'An Application',
        },
      ]}
    />
  );
};

export default App;
```

### With an Icon

The icon should be placed in front of the text.

```tsx
import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        title: 'Application',
      },
    ]}
  />
);

export default App;
```

### With Params

With route params.

```tsx
import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    items={[
      {
        title: 'Users',
      },
      {
        title: ':id',
        href: '',
      },
    ]}
    params={{ id: 1 }}
  />
);

export default App;
```

### Configuring the Separator

The separator can be customized by setting the separator property: `separator=">"`.

```tsx
import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    separator=">"
    items={[
      {
        title: 'Home',
      },
      {
        title: 'Application Center',
        href: '',
      },
      {
        title: 'Application List',
        href: '',
      },
      {
        title: 'An Application',
      },
    ]}
  />
);

export default App;
```

### Bread crumbs with drop down menu

Breadcrumbs support drop down menu.

```tsx
import React from 'react';
import { Breadcrumb } from 'antd';

const menuItems = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        General
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Layout
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];

const App: React.FC = () => (
  <Breadcrumb
    items={[
      {
        title: 'Ant Design',
      },
      {
        title: <a href="">Component</a>,
      },
      {
        title: <a href="">General</a>,
        menu: { items: menuItems },
      },
      {
        title: 'Button',
      },
    ]}
  />
);

export default App;
```

### Configuring the Separator Independently

Customize separator for each other.

```tsx
import React from 'react';
import { Breadcrumb } from 'antd';

const App: React.FC = () => (
  <Breadcrumb
    separator=""
    items={[
      {
        title: 'Location',
      },
      {
        type: 'separator',
        separator: ':',
      },
      {
        href: '',
        title: 'Application Center',
      },
      {
        type: 'separator',
      },
      {
        href: '',
        title: 'Application List',
      },
      {
        type: 'separator',
      },
      {
        title: 'An Application',
      },
    ]}
  />
);

export default App;
```


### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Breadcrumb by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Breadcrumb, Flex } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 8px;
    border-radius: 4px;
  `,
  item: css`
    color: #1890ff;
  `,
  separator: css`
    color: rgba(0, 0, 0, 0.45);
  `,
}));

const styles: BreadcrumbProps['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1890ff' },
  separator: { color: 'rgba(0, 0, 0, 0.45)' },
};

const stylesFn: BreadcrumbProps['styles'] = (info) => {
  const items = info.props.items || [];
  if (items.length > 2) {
    return {
      root: { border: '1px solid #F5EFFF', padding: 8, borderRadius: 4 },
      item: { color: '#8F87F1' },
    } satisfies BreadcrumbProps['styles'];
  }
  return {};
};

const items = [
  { title: 'Ant Design' },
  { title: <a href="">Component</a> },
  { title: 'Breadcrumb' },
];

const App: React.FC = () => {
  return (
    <Flex vertical gap="middle">
      <Breadcrumb
        classNames={classNames}
        items={items.slice(0, 2)}
        styles={styles}
        aria-label="Breadcrumb with Object"
      />
      <Breadcrumb
        classNames={classNames}
        items={items}
        styles={stylesFn}
        aria-label="Breadcrumb with Function"
      />
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

### Breadcrumb

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dropdownIcon | Custom dropdown icon | ReactNode | `<DownOutlined />` | 6.2.0 |
| itemRender | Custom item renderer | (route, params, routes, paths) => ReactNode | - |  |
| params | Routing parameters | object | - |  |
| items | The routing stack information of router | [ItemType\[\]](#itemtype) | - | 5.3.0 |
| separator | Custom separator | ReactNode | `/` |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

### ItemType

> type ItemType = Omit<[RouteItemType](#routeitemtype), 'title' | 'path'> | [SeparatorType](#separatortype)

### RouteItemType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | The additional css class | string | - |  |
| dropdownProps | The dropdown props | [Dropdown](/components/dropdown) | - |  |
| href | Target of hyperlink. Can not work with `path` | string | - |  |
| path | Connected path. Each path will connect with prev one. Can not work with `href` | string | - |  |
| menu | The menu props | [MenuProps](/components/menu/#api) | - | 4.24.0 |
| onClick | Set the handler to handle click event | (e:MouseEvent) => void | - |  |
| title | item name | ReactNode | - |  |

### SeparatorType

```ts
const item = {
  type: 'separator', // Must have
  separator: '/',
};
```

| Property  | Description       | Type        | Default | Version |
| --------- | ----------------- | ----------- | ------- | ------- |
| type      | Mark as separator | `separator` |         | 5.3.0   |
| separator | Custom separator  | ReactNode   | `/`     | 5.3.0   |

### Use with browserHistory

The link of Breadcrumb item targets `#` by default, you can use `itemRender` to make a `browserHistory` Link.

```jsx
import { Link } from 'react-router';

const items = [
  {
    path: '/index',
    title: 'home',
  },
  {
    path: '/first',
    title: 'first',
    children: [
      {
        path: '/general',
        title: 'General',
      },
      {
        path: '/layout',
        title: 'Layout',
      },
      {
        path: '/navigation',
        title: 'Navigation',
      },
    ],
  },
  {
    path: '/second',
    title: 'second',
  },
];

function itemRender(currentRoute, params, items, paths) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>
  );
}

return <Breadcrumb itemRender={itemRender} items={items} />;
```

## Semantic DOM

https://ant.design/components/breadcrumb/semantic.md

## Design Token



## Component Token (Breadcrumb)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| iconFontSize | Icon size | number | 14 |
| itemColor | Text color of Breadcrumb item | string | rgba(0,0,0,0.45) |
| lastItemColor | Text color of the last item | string | rgba(0,0,0,0.88) |
| linkColor | Text color of link | string | rgba(0,0,0,0.45) |
| linkHoverColor | Color of hovered link | string | rgba(0,0,0,0.88) |
| separatorColor | Color of separator | string | rgba(0,0,0,0.45) |
| separatorMargin | Margin of separator | number | 8 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgTextHover | Control the background color of text in hover state. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeIcon | Control the font size of operation icon in Select, Cascader, etc. Normally same as fontSizeSM. | number |  |
| lineHeight | Line height of text. | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |


