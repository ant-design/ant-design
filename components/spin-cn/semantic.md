## Spin

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置绝对定位、显示控制、颜色、字体大小、文本对齐、垂直对齐、透明度和过渡动画(fullscreen 为 false 时才有效)
- section（`semantic-mark-section`）: 加载元素区域，设置相对定位、弹性盒子布局、对齐方式和颜色
- indicator（`semantic-mark-indicator`）: 指示器元素，设置宽度、高度、字体大小、行内块显示、过渡动画、变换原点、行高
- description（`semantic-mark-description`）: 描述元素，设置字体大小、行高
- container（`semantic-mark-container`）: 容器元素，放置被 Spin 包裹的子元素，设置透明度和过渡动画

### 使用案例

```tsx
<Spin
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    indicator: "semantic-mark-indicator",
    description: "semantic-mark-description",
    container: "semantic-mark-container"
  }}
/>
```

### Abstract DOM Structure

```html
<div aria-busy="true" aria-live="polite" class="ant-spin ant-spin-spinning semantic-mark-root ant-spin-section semantic-mark-section css-var-test-id">
            <span class="ant-spin-dot-holder semantic-mark-indicator">
              <span class="ant-spin-dot ant-spin-dot-spin">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
              </i></i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
            </i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
          </i></i></i></div>
```
