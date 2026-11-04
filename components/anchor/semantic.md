## Anchor

### Semantic Parts

- root（`semantic-mark-root`）: Root element with layout positioning, padding, margin, background color and other basic styles
- item（`semantic-mark-item`）: Link item element with padding, text color, hover states, transition animations and other styles
- itemTitle（`semantic-mark-itemTitle`）: Title text element with font styles, color changes, text decoration, transition effects and other styles
- indicator（`semantic-mark-indicator`）: Indicator element with width, height, background color, position changes, transition animations and other styles

### Usage Example

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
