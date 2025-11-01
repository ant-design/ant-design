---
title: 语义化发现组件精致的美
date: 2025-11-03
author: meet-student, thinkasany
---

在 Ant Design v6 之前，在样式的定制上基于开放的 token 已经有了非常好的体验, 但是依然存在一些难以解决的痛点。而 Ant Design v6 为此做了诸多的改变和设计。今天我们来聊聊语义化是如何让你发现精致的组件的。

---

## v6 之前

在过去的日子里，我们调整样式一般怎么写呢?

### 方式一（props）

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

除去这两种方式, 你可能还写过更不为推荐的 css 样式的覆盖：

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

以上方式都存许多不同的痛点：

- 使用的 `props` 参数有限导致部分区域的样式无法更改，逻辑不够聚合。
- 配置的 `token` 能力有限导致无法根据类型/变体做差异化的样式修改。
- 样式覆盖的方式存在心智负担和维护成本高，维护性和语义化非常差。

## v6 现在

- 可以定义 `semantic` 区域的样式/类名，更加友好的定制局部样式/主题
- 根据不同的 `props` 更灵活的、更加可维护的定制样式/主题
- `DOM` 的结构也得到了非常好的简化和调整

```tsx
const classNamesFn: ButtonProps['classNames'] = (info) => {
  if (info.props.type === 'primary') {
    return {
      root: 'demo-btn-root--primary',
    } satisfies ButtonProps['classNames'];
  }
  return {
    root: 'demo-btn-root--default',
  };
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

<video src="https://github-production-user-asset-6210df.s3.amazonaws.com/59312002/508546689-0df4b356-209b-42d1-907e-c253d5b7220d.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251101%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251101T132121Z&X-Amz-Expires=300&X-Amz-Signature=3d66c73eb40fd31661188230d19384afa9fcf698002710f27033d54af7481d8a&X-Amz-SignedHeaders=host" autoplay="true" muted="true" loop="true" playsinline="true" controls="true"></video>

## 发现组件精致的美

用户可以根据自己喜爱的配色赋予组件不同状态精致设计，发挥你的想象让你的页面更加丰富多彩吧，如果你在使用过程中遇到任何问题或有更好的想法，欢迎提交反馈，一起让 Ant Design 变得更好。

---

<code src="./semantic-beauty/demos.tsx" simplify="true" iframe="430"></code>
