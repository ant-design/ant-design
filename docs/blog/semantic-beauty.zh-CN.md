---
title: 语义化发现组件精致的美
date: 2025-11-22
author: meet-student,thinkasany
---

在 Ant Design v6 之前，在样式的定制上基于开放的 token 已经有了非常好的体验，但是依然存在一些难以解决的痛点。而 Ant Design v6 为此做了诸多的改变和设计。今天我们来聊聊语义化是如何让你发现精致的组件的。

---

## v6 之前

在过去的日子里，我们调整样式一般怎么写呢?

### 方式一 (props)

- 在 `className` 和 `style` 上写上大量的拼接组合的逻辑判断。
- 在修改组件的不同区域的样式的时候充斥着大量的类似 `wrapClassName` 的 props。

代码可能长这样

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

采用 Ant Design v5 的主题 token 设计：

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

### 方式三 (css)

除去这两种方式，你可能还写过更不为推荐的 css 样式的覆盖：

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

以上方式都存在许多不同的痛点：

- 使用的 `props` 参数有限导致部分区域的样式无法更改，逻辑不够聚合。
- 配置的 `token` 能力有限导致无法根据类型/变体做差异化的样式修改。
- 样式覆盖的方式存在心智负担和维护成本高，维护性和语义化非常差。

## v6 现在

为了规避 `token` 泛滥和添加大量的 `api props`，因为这会导致维护成本升高，从而聚合成了语义化。

- `DOM` 的结构也得到了非常好的简化和调整
- 根据不同的 `props` 更灵活的、更加可维护的定制样式/主题，
- 可以定义 `semantic` 区域的样式/类名，更加友好的定制局部样式/主题

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

更令人兴奋的是，`classNames` 属性可以与 [Tailwind CSS](https://tailwindcss.com/) 这类原子化 CSS 框架完美结合。这赋予了开发者前所未有的自由度：你可以在享受 antd 组件预设行为和语义化结构的同时，利用 Tailwind 的功能类快速构建出任何想要的视觉风格。语义化 + Tailwind CSS 让组件定制变得极其自由。

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

用户可以根据自己喜爱的配色赋予组件不同状态精致设计，发挥你的想象让你的页面更加丰富多彩吧，如果你在使用过程中遇到任何问题或有更好的想法，欢迎提交反馈，一起让 Ant Design 变得更好。

---

<code src="./semantic-beauty/demos.tsx" simplify="true" iframe="430"></code>

## token 和语义化的关系

在 Ant Design 的设计中 token 定位设计变量（Design Tokens），可以理解为设计能力中的原子原料。而语义化样式是样式定义用途，更多是使用 token 设计变量组合加上私有定制达到更自由的定制场景，且语义化作是组件维度的可以更好的控制范围，如果你想设计覆盖场景全的 Ant Design 主题，token 和语义化的能力是你的利器，两者搭配能自由的定制更精致的主题。
