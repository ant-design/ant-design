## Radio

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含布局样式、鼠标样式、禁用状态文字颜色等基础容器样式
- icon（`semantic-mark-icon`）: 选中框元素，包含圆角样式、过渡动画、边框样式、悬停状态、焦点状态等交互样式
- label（`semantic-mark-label`）: 文本元素，包含内边距、文字颜色、禁用状态、对齐方式等文本样式

### 使用案例

```tsx
<Radio
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
<label class="ant-radio-wrapper semantic-mark-root css-var-test-id ant-radio-css-var">
        <span class="ant-radio semantic-mark-icon ant-wave-target">
          <input class="ant-radio-input" type="radio">
        </span>
        <span class="ant-radio-label semantic-mark-label">
          Radio
        </span>
      </label>
```
