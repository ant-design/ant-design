---
title: Discover the Delicate Beauty of Components with Semantic Design
date: 2025-11-03
author: meet-student, thinkasany
---

Before Ant Design v6, the experience of customizing styles based on open tokens was already great, but there were still some pain points that were difficult to solve. Ant Design v6 made many changes and improvements to address this. Today, let’s talk about how semantic design helps you discover the delicate beauty of components.

---

## Before v6

In the past, how did we usually adjust styles?

### Method 1 (props)

- Write a large number of conditional logic combinations in `className` and `style`
- When modifying the styles of different parts of a component, use many props like `wrapClassName`

The code might look like this

```tsx
<Button className={variant === 'filled' ? 'btn-filled' : 'btn-outline'}>
  Submit
</Button>

<Modal wrapClassName="wrap-class" style={{ backgroundColor: "#fff" }}>
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

Using the theme token design introduced in Ant Design v5

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

### Method 3 (css)

Apart from these two methods, you might also have written less recommended CSS overrides like this

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

Each of these methods has its pain points:

- Limited `props` make it difficult to modify certain areas; logic is scattered
- Limited `token` configuration prevents differentiated styling by type/variant
- CSS overrides increase cognitive load and maintenance costs; maintainability and semantics are poor

## Now in v6

- Define `semantic` areas for styles/classNames to customize local styles/themes more easily
- More flexible and maintainable style/theming customization based on different `props`
- The `DOM` structure has been simplified and refined

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

## Discover the Delicate Beauty of Components

Users can give components refined designs for different states based on their preferred color schemes. Let your imagination run wild and make your pages more vibrant and expressive. If you encounter any issues or have better ideas during use, feel free to share feedback — let’s make Ant Design even better together.

---

<code src="./semantic-beauty/demos.tsx" simplify="true" iframe="430"></code>
