## Checkbox

### Semantic Parts

- root（`semantic-mark-root`）: Root element with inline-flex layout, baseline alignment, cursor style, reset styles and other basic checkbox container styles
- icon（`semantic-mark-icon`）: Checkbox icon element with size, direction, background, border, border-radius, transitions, and checked state checkmark styles
- label（`semantic-mark-label`）: Label text element with padding and spacing styles relative to the checkbox

### Usage Example

```tsx
<Checkbox
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
<label class="ant-checkbox-wrapper semantic-mark-root css-var-test-id ant-checkbox-css-var">
        <span class="ant-checkbox semantic-mark-icon ant-wave-target">
          <input class="ant-checkbox-input" type="checkbox">
        </span>
        <span class="ant-checkbox-label semantic-mark-label">
          Checkbox
        </span>
      </label>
```
