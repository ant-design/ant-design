## Radio

### Semantic Parts

- root（`semantic-mark-root`）: Root element with layout styles, cursor styles, disabled text color and other basic container styles
- icon（`semantic-mark-icon`）: Icon element with border radius, transition animations, border styles, hover states, focus states and other interactive styles
- label（`semantic-mark-label`）: Label element with padding, text color, disabled states, alignment and other text styles

### Usage Example

```tsx
<Radio
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<label class="ant-radio-wrapper semantic-mark-root css-var-test-id ant-radio-css-var">
        <span class="ant-radio semantic-mark-icon ant-wave-target">
          <input class="ant-radio-input" type="radio">
        </span>
        <span class="ant-radio-label semantic-mark-label">
          Radio
        </span>
      </label>
```
