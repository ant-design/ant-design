---
title: 语义化发现组件精致的美
date: 2025-11-22
author: meet-student,thinkasany
---

在 Ant Design v6 之前，基于开放的 Design Token 进行样式定制已经带来了非常好的开发体验，但依然存在一些难以解决的痛点。Ant Design v6 为此做了诸多改变和优化。今天，我们来聊聊语义化是如何帮助你发现组件的精致之美。

---

## v6 之前

在过去，我们通常是怎么调整组件样式的呢？

### 方式一 (props)

- 在 `className` 和 `style` 属性上编写大量的拼接组合和逻辑判断
- 在修改组件不同区域的样式时，需要使用大量类似 `wrapClassName` 这样的 props

代码可能是这样的：

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

### 方式二 (ConfigProvider)

采用 Ant Design v5 的主题 Design Token 设计：

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

### 方式三 (CSS)

除了这两种方式，你可能还写过更不推荐的 CSS 样式覆盖：

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

以上方式都存在诸多痛点：

- 可用的 `props` 参数有限，导致部分区域的样式无法更改，逻辑也不够聚合
- `Design Token` 的配置能力有限，无法根据不同的类型/变体做差异化的样式修改
- 样式覆盖的方式存在较高的心智负担和维护成本，可维护性和语义化都很差

## v6 现在

为了避免 `Design Token` 泛滥和添加大量的 `API props`（这会导致维护成本升高），我们将这些能力聚合成了语义化设计。

- DOM 结构得到了显著地简化和优化
- 可以根据不同的 `props` 更灵活、更易维护地定制样式和主题
- 可以为特定的语义区域定义样式和类名，更友好地实现局部样式和主题的定制

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

### 与 Tailwind CSS 结合

更令人兴奋的是，`classNames` 属性可以与 [Tailwind CSS](https://tailwindcss.com/) 这类原子化 CSS 框架完美结合。这为开发者带来了前所未有的自由度：你可以在享受 antd 组件预设行为和语义化结构的同时，利用 Tailwind 的功能类快速构建出任何想要的视觉风格。语义化 + Tailwind CSS，让组件定制变得极其自由。

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

## 发现组件精致的美

用户可以根据自己喜爱的配色为组件的不同状态赋予精致的设计，发挥你的想象力，让页面更加丰富多彩吧！如果你在使用过程中遇到任何问题或有更好的想法，欢迎提交反馈，让我们一起让 Ant Design 变得更好。

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


## Design Token 和语义化的关系

在 Ant Design 的设计体系中，Design Token 定位为设计变量（Design Tokens），可以理解为设计能力中的原子原料。而语义化样式定义了样式的使用方式，它通过组合 Design Token 和组件级的私有定制，实现更自由的定制场景。由于语义化是在组件维度上进行的，因此可以更好地控制样式的作用范围。如果你想设计一套覆盖场景全面的 Ant Design 主题，Design Token 和语义化能力将是你的利器，两者搭配使用，能够自由定制更精致的主题。
