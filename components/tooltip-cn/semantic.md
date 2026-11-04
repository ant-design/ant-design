## Tooltip

### Semantic Parts

- root（`semantic-mark-root`）: 根元素 (包含箭头、内容元素)，设置绝对定位、层级、块级显示、最大宽度、可见性、变换原点和箭头背景色
- container（`semantic-mark-container`）: 内容元素，设置最小宽度高度、内边距、颜色、文本对齐、背景色、圆角、阴影和边框样式
- arrow（`semantic-mark-arrow`）: 箭头元素，设置宽高、位置、颜色和边框样式

### 使用案例

```tsx
<Tooltip
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    container: "semantic-mark-container",
    arrow: "semantic-mark-arrow"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; margin-top: 60px;">
        <span aria-describedby="test-id" class="ant-tooltip-open">
        <div class="ant-tooltip ant-zoom-big-fast-appear ant-zoom-big-fast-appear-prepare ant-zoom-big-fast ant-tooltip-css-var css-var-test-id semantic-mark-root ant-tooltip-placement-top" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-tooltip-arrow semantic-mark-arrow" style="position: absolute; bottom: 0px; left: 0px;">
            <span class="ant-tooltip-arrow-content">
          </span></div>
          <div class="ant-tooltip-container semantic-mark-container" id="test-id" role="tooltip">
            tooltip prompt text
          </div>
        </div>
      </span></div>
```
