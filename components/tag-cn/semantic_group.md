## Tag.Group

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置标签组的容器样式和布局
- item（`semantic-mark-item`）: 标签项元素，设置行内块显示、高度、内边距、字体大小、行高、背景色、边框、圆角、透明度、过渡动画、可选中状态等样式

### 使用案例

```tsx
<Tag.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tag-checkable-group css-var-test-id semantic-mark-root">
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Movies
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-checked ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Books
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Music
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Sports
          </span>
        </span>
      </div>
```
