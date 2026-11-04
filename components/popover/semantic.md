## Popover

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set absolute positioning, z-index, transform origin, arrow direction and popover container styles
- container（`semantic-mark-container`）: Container element, set background color, padding, border radius, shadow, border and content display styles
- arrow（`semantic-mark-arrow`）: Arrow element with width, height, position, color and border styles
- title（`semantic-mark-title`）: Title element, set title text styles and spacing
- content（`semantic-mark-content`）: Content element, set content text styles and layout

### Usage Example

```tsx
<Popover
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    container: "semantic-mark-container",
    arrow: "semantic-mark-arrow",
    title: "semantic-mark-title",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; margin-top: 60px;">
        <span aria-describedby="test-id" class="ant-popover-open">
        <div class="ant-popover ant-zoom-big-appear ant-zoom-big-appear-prepare ant-zoom-big ant-popover-css-var css-var-test-id css-var-test-id semantic-mark-root ant-popover-placement-top" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-popover-arrow semantic-mark-arrow" style="position: absolute; bottom: 0px; left: 0px;">
            <span class="ant-popover-arrow-content">
          </span></div>
          <div class="ant-popover-container semantic-mark-container" id="test-id" role="tooltip">
            <div class="ant-popover-title semantic-mark-title">
              Hello
            </div>
            <div class="ant-popover-content semantic-mark-content">
              Ant Design love you!
            </div>
          </div>
        </div>
      </span></div>
```
