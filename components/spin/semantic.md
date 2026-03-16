## Spin

### Semantic Parts

- root（`semantic-mark-root`）: The root element, which sets absolute positioning, display control, color, font size, text alignment, vertical alignment, opacity, and transition animation (only effective when fullscreen is false)
- section（`semantic-mark-section`）: The loading element area, which sets relative positioning, flexbox layout, alignment, and color
- indicator（`semantic-mark-indicator`）: The indicator element, which sets width, height, font size, inline-block display, transition animation, transform origin, and line height
- description（`semantic-mark-description`）: The description element, which sets font size and line height
- container（`semantic-mark-container`）: The container element that holds the child elements wrapped by Spin, setting opacity and transition animation

### Usage Example

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
