## Anchor

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含布局定位、内边距、边距、背景色等基础样式
- item（`semantic-mark-item`）: 链接项元素，包含内边距、文字颜色、悬停状态、过渡动画等样式
- itemTitle（`semantic-mark-itemTitle`）: 标题文字元素，包含字体样式、颜色变化、文本装饰、过渡效果等样式
- indicator（`semantic-mark-indicator`）: 指示器元素，包含宽度、高度、背景色、位置变化、过渡动画等样式

### 使用案例

```tsx
<Anchor
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemTitle: "semantic-mark-itemTitle",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="css-var-test-id ant-anchor-css-var ant-anchor-wrapper semantic-mark-root" style="max-height: 100vh;">
        <div class="ant-anchor ant-anchor-fixed">
          <span class="ant-anchor-ink semantic-mark-indicator">
          <div class="ant-anchor-link semantic-mark-item">
            <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#api" title="API">
              API
            </a>
            <div class="ant-anchor-link semantic-mark-item">
              <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#anchor-props" title="Anchor Props">
                Anchor Props
              </a>
            </div>
            <div class="ant-anchor-link semantic-mark-item">
              <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#link-props" title="Link Props">
                Link Props
              </a>
            </div>
          </div>
          <div class="ant-anchor-link semantic-mark-item">
            <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#anchor-demo-basic" title="Basic demo">
              Basic demo
            </a>
          </div>
          <div class="ant-anchor-link semantic-mark-item">
            <a class="ant-anchor-link-title semantic-mark-itemTitle" href="#anchor-demo-static" title="Static demo">
              Static demo
            </a>
          </div>
        </span></div>
      </div>
```
