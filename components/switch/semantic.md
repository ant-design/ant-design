## Switch

### Semantic Parts

- root（`semantic-mark-root`）: Root element with min-width, height, line-height, vertical alignment, background color, border, border radius, cursor style, transition animations, user selection and other basic switch container styles
- content（`semantic-mark-content`）: Content element with block display, overflow hidden, border radius, height, padding, transition animations and other switch content area layout and styles
- indicator（`semantic-mark-indicator`）: Indicator element with absolute positioning, width, height, background color, border radius, shadow, transition animations and other switch handle styles and interactive effects

### Usage Example

```tsx
<Switch
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<button aria-checked="true" class="ant-switch semantic-mark-root css-var-test-id ant-switch-checked" role="switch" type="button">
        <div class="ant-switch-handle semantic-mark-indicator">
        <span class="ant-switch-inner">
          <span class="ant-switch-inner-checked semantic-mark-content">
            ON
          </span>
          <span class="ant-switch-inner-unchecked semantic-mark-content">
            OFF
          </span>
        </span>
      </div></button>
```
