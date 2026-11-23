## Switch

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含最小宽度、高度、行高、垂直对齐、背景色、边框、圆角、光标样式、过渡动画、用户选择等开关容器的基础样式
- content（`semantic-mark-content`）: 内容元素，包含块级显示、溢出隐藏、圆角、高度、内边距、过渡动画等开关内容区域的布局和样式
- indicator（`semantic-mark-indicator`）: 指示器元素,包含绝对定位、宽度、高度、背景色、圆角、阴影、过渡动画等开关把手的样式和交互效果

### 使用案例

```tsx
<Switch
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<button aria-checked="true" class="ant-switch semantic-mark-root css-var-test-id ant-switch-checked" role="switch" type="button">
        <div class="ant-switch-handle semantic-mark-indicator">
        <span class="ant-switch-inner">
          <span class="ant-switch-inner-checked semantic-mark-content">
            ON
          </span>
          <span class="ant-switch-inner-unchecked semantic-mark-content">
            OFF
          </span>
        </span>
      </div></button>
```
