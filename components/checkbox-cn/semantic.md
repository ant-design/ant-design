## Checkbox

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含行内 flex 布局、基线对齐、光标样式、重置样式等复选框容器的基础样式
- icon（`semantic-mark-icon`）: 选中框元素，包含尺寸、方向、背景色、边框、圆角、过渡动画，以及选中状态的勾选标记样式
- label（`semantic-mark-label`）: 文本元素，包含文本的内边距和与复选框的间距样式

### 使用案例

```tsx
<Checkbox
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<label class="ant-checkbox-wrapper semantic-mark-root css-var-test-id ant-checkbox-css-var">
        <span class="ant-checkbox semantic-mark-icon ant-wave-target">
          <input class="ant-checkbox-input" type="checkbox">
        </span>
        <span class="ant-checkbox-label semantic-mark-label">
          Checkbox
        </span>
      </label>
```
