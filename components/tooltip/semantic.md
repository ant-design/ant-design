## Tooltip

### Semantic Parts

- root（`semantic-mark-root`）: Root element (including arrows, content elements) with absolute positioning, z-index, block display, max width, visibility, transform origin and arrow background color
- container（`semantic-mark-container`）: Content element with min width and height, padding, color, text alignment, background color, border radius, shadow and border styles
- arrow（`semantic-mark-arrow`）: Arrow element with width, height, position, color and border styles

### Usage Example

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
