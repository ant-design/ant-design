## Layout

### Semantic Parts

- root（`semantic-mark-root`）: Root element with Sider layout, theme, width and collapsed state styles
- body（`semantic-mark-body`）: Body element that wraps Sider children layout and display styles

### Usage Example

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

