## Layout

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含 Sider 的布局、主题、宽度和折叠状态样式
- body（`semantic-mark-body`）: 内容包裹元素，包含 Sider 子内容的布局和展示样式

### 使用案例

```tsx
<Layout
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    body: "semantic-mark-body"
  }}
/>
```

### Abstract DOM Structure

