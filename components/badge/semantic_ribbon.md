## Badge.Ribbon

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set relative positioning and wrapper container styles
- indicator（`semantic-mark-indicator`）: Indicator element, set absolute positioning, padding, background color, border radius and ribbon styles
- content（`semantic-mark-content`）: Content element, set text color and ribbon content display styles

### Usage Example

```tsx
<Badge.Ribbon
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    indicator: "semantic-mark-indicator",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%;">
        <div class="ant-ribbon-wrapper css-var-test-id semantic-mark-root">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id">
            <div class="ant-card-head">
              <div class="ant-card-head-wrapper">
                <div class="ant-card-head-title">
                  Pushes open the window
                </div>
              </div>
            </div>
            <div class="ant-card-body">
              and raises the spyglass.
            </div>
          </div>
          <div class="ant-ribbon ant-ribbon-placement-end ant-ribbon-color-pink semantic-mark-indicator">
            <span class="ant-ribbon-content semantic-mark-content">
              Hippies
            </span>
            <div class="ant-ribbon-corner">
          </div>
        </div>
      </div>
    </div>
```
