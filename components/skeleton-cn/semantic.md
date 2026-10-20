## Skeleton

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含表格显示、宽度、动画效果、圆角等骨架屏容器的基础样式
- header（`semantic-mark-header`）: 头部元素，包含表格单元格、内边距、垂直对齐等头像占位区域的布局样式
- section（`semantic-mark-section`）: 区块元素，包含骨架屏内容区域的布局样式
- avatar（`semantic-mark-avatar`）: 头像元素，包含行内块显示、垂直对齐、背景色、尺寸、圆角等头像占位的样式
- title（`semantic-mark-title`）: 标题元素，包含宽度、高度、背景色、圆角等标题占位的样式
- paragraph（`semantic-mark-paragraph`）: 段落元素，包含内边距、列表项样式、背景色、圆角等段落占位的样式

### 使用案例

```tsx
<Skeleton
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    section: "semantic-mark-section",
    avatar: "semantic-mark-avatar",
    title: "semantic-mark-title",
    paragraph: "semantic-mark-paragraph"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-skeleton ant-skeleton-with-avatar semantic-mark-root css-var-test-id">
        <div class="semantic-mark-header ant-skeleton-header">
          <span class="ant-skeleton-avatar ant-skeleton-avatar-lg ant-skeleton-avatar-circle semantic-mark-avatar">
        </span></div>
        <div class="semantic-mark-section ant-skeleton-section">
          <h3 class="ant-skeleton-title semantic-mark-title" style="width: 50%;">
          <ul class="ant-skeleton-paragraph semantic-mark-paragraph">
            <li>
            </li><li>
            </li><li>
            </li><li>
          </li></ul>
        </h3></div>
      </div>
```
