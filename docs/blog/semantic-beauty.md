---
title: Discover the Delicate Beauty of Components with Semantic Design
date: 2025-11-22
author: meet-student,thinkasany
---

Before Ant Design v6, the experience of customizing styles based on open tokens was already great, but there were still some pain points that were difficult to solve. Ant Design v6 made many changes and improvements to address this. Today, let’s talk about how semantic design helps you discover the delicate beauty of components.

---

## Before v6

In the past, how did we typically adjust component styles?

### Method 1 (props)

- Write extensive conditional logic for combinations in `className` and `style` attributes
- Use numerous props like `wrapClassName` when modifying styles of different component regions

The code might look like this:

```tsx
<Button className={variant === 'filled' ? 'btn-filled' : 'btn-outline'}>
  Submit
</Button>

<Modal wrapClassName="wrap-class" style={{ backgroundColor: '#fff' }}>
  Modal
</Modal>

<Menu style={{ backgroundColor: mode === 'horizontal' ? '#fff' : '#000' }}>
  <Menu.SubMenu popupClassName="popup-class">
    <Menu.Item >
      MenuItem
    </Menu.Item>
  </Menu.SubMenu>
</Menu>
```

### Method 2 (ConfigProvider)

Using the theme Design Token design introduced in Ant Design v5:

```tsx
<ConfigProvider
  theme={{
    components: {
      Notification: {
        colorTextHeading: token.blue,
        colorText: token.colorTextSecondary,
      },
    },
  }}
>
  {children}
</ConfigProvider>
```

### Method 3 (CSS)

Apart from these two methods, you might also have written less recommended CSS overrides:

```css
.wrapper-class .ant-table {
  border-radius: 4px;
  overflow: hidden;
}
.wrapper-class .ant-table .ant-table-thead {
  background-color: #f9fafc;
  color: #8b97b6;
}
```

All of the above approaches have various pain points:

- Limited available `props` make it impossible to modify certain regions, and logic is not well-organized
- Limited `Design Token` configuration prevents differentiated styling based on different types/variants
- CSS overrides introduce high cognitive load and maintenance costs, with poor maintainability and semantics

## Now in v6

To avoid token proliferation and the addition of numerous API props — which would increase maintenance costs — these elements were consolidated into a more semantic structure.

- The DOM structure has been greatly simplified and refined.
- Styles and themes can now be customized more flexibly and in a more maintainable way based on different props.
- It’s possible to define styles or class names for specific semantic regions, making it easier to customize local styles or themes.

```tsx
const classNamesFn: ButtonProps['classNames'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: 'demo-btn-root--primary',
    } satisfies ButtonProps['classNames'];
  }
  return {
    root: 'demo-btn-root--default',
  } satisfies ButtonProps['classNames'];
};

const styles: ButtonProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  content: { fontStyle: 'italic' },
  icon: { opacity: 0.85 },
};

return (
  <Button styles={styles} classNames={classNamesFn}>
    Button
  </Button>
);
```

### Combining with Tailwind CSS

What's more exciting is that the `classNames` property integrates perfectly with atomic CSS frameworks like [Tailwind CSS](https://tailwindcss.com/). This provides developers with unprecedented freedom: you can enjoy the preset behavior and semantic structure of antd components while leveraging Tailwind's utility classes to quickly build any visual style you want. Semantic design + Tailwind CSS, makes component customization extremely flexible.

```tsx
return (
  <Button
    classNames={{
      root: 'bg-black text-white border-none hover:bg-[#2e2e2e]',
      icon: 'text-white/90',
    }}
    icon={<GiftOutlined />}
  >
    Ant Design
  </Button>
);
```

<video src="https://gw.alipayobjects.com/v/huamei_iwk9zp/afts/video/Ok8fTIm1TLIAAAAAgCAAAAgAfoeUAQBr" autoplay="true" muted="true" loop="true" playsinline="true" controls="true"></video>

## Discover the Delicate Beauty of Components

Users can give components refined designs for different states based on their preferred color schemes. Let your imagination run wild and make your pages more vibrant and expressive. If you encounter any issues or have better ideas during use, feel free to share feedback — let’s make Ant Design even better together.

---

### demos.tsx



```tsx
import React from 'react';
import { Button, Drawer, Flex, Modal, Switch } from 'antd';

import BreadcrumbPreview from '../../../components/breadcrumb/demo/style-class';
import InputPreview from '../../../components/input/demo/style-class';

const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalDrawer } = Drawer;

const SwitchNode = (
  <Flex orientation="horizontal" gap="middle">
    <Switch styles={{ root: { width: 40, backgroundColor: '#F5D2D2' } }} />
    <Switch styles={{ root: { width: 40, backgroundColor: '#BDE3C3' } }} />
  </Flex>
);

const ModalNode = (
  <InternalPanel
    footer={
      <>
        <Button
          styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          styles={{
            root: { backgroundColor: '#171717', boxShadow: '0 2px 0 rgba(23,23,23,0.31)' },
          }}
        >
          Submit
        </Button>
      </>
    }
    title="Custom Function Modal"
    styles={{
      container: { borderRadius: 14, border: '1px solid #ccc', padding: 0, overflow: 'hidden' },
      header: { padding: 16, margin: 0 },
      body: { padding: '0 16px' },
      footer: { padding: 10, backgroundColor: 'rgba(250,250,250, 0.8)' },
    }}
  >
    <div>🌈 Following the Ant Design specification.</div>
  </InternalPanel>
);

const DrawerNode = (
  <InternalDrawer
    title="Drawer"
    style={{ height: '100%', borderRadius: '10px 0 0 10px', overflow: 'hidden' }}
    styles={{
      header: { padding: 16 },
      body: { padding: 16 },
      footer: { padding: '16px 10px', backgroundColor: 'rgba(250,250,250, 0.8)' },
    }}
    footer={
      <Flex gap="middle" justify="flex-end">
        <Button
          styles={{ root: { borderColor: '#ccc', color: '#171717', backgroundColor: '#fff' } }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          styles={{
            root: { backgroundColor: '#171717', boxShadow: '0 2px 0 rgba(23,23,23,0.31)' },
          }}
        >
          Submit
        </Button>
      </Flex>
    }
  >
    <div>
      🌈 Following the Ant Design specification, we developed a React UI library antd, interactive
      user interfaces.
    </div>
  </InternalDrawer>
);

const h1Style: React.CSSProperties = {
  fontSize: 20,
  lineHeight: 2,
  fontWeight: 'bold',
};

const Demo: React.FC = () => {
  return (
    <Flex orientation="horizontal" gap="middle" style={{ padding: 10 }}>
      <div style={{ width: '35%' }}>
        <h1 style={h1Style}>Input</h1>
        <InputPreview />
      </div>
      <div style={{ width: '35%' }}>
        <h1 style={h1Style}>Switch</h1>
        {SwitchNode}
        <h1 style={h1Style}>Breadcrumb</h1>
        <BreadcrumbPreview />
        <h1 style={h1Style}>Modal</h1>
        {ModalNode}
      </div>
      <div style={{ width: '30%' }}>{DrawerNode}</div>
    </Flex>
  );
};

export default Demo;
```


## The Relationship Between Tokens and Semantic Styling

In Ant Design’s design system, tokens are positioned as design variables — the atomic materials of the design language. Semantic styles, on the other hand, define how those materials are used. They are created by combining design tokens with component-level customizations, allowing for more flexible and expressive styling scenarios. Since semantic styles operate at the component level, they provide better control over styling scope. If you aim to design a fully customized Ant Design theme, the combination of tokens and semantic styling will be your most powerful tool — together, they enable you to craft a more refined and precisely tailored theme.
