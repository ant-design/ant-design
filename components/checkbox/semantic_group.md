## Checkbox.Group

### Semantic Parts

- root（`semantic-mark-root`）: Root element of the checkbox group container, including layout, spacing and arrangement styles
- item（`semantic-mark-item`）: Item element wrapping a single Checkbox, including checked, disabled and other option styles
- itemIcon（`semantic-mark-itemIcon`）: Item icon element with size, background, border, border radius, checked state and other icon styles
- itemLabel（`semantic-mark-itemLabel`）: Item label element with padding, text color, alignment and other text styles

### Usage Example

```tsx
<Checkbox.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemIcon: "semantic-mark-itemIcon",
    itemLabel: "semantic-mark-itemLabel"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-checkbox-group semantic-mark-root css-var-test-id ant-checkbox-css-var" role="group">
        <label class="ant-checkbox-wrapper ant-checkbox-wrapper-checked ant-checkbox-group-item semantic-mark-item css-var-test-id ant-checkbox-css-var">
          <span class="ant-checkbox semantic-mark-itemIcon ant-wave-target ant-checkbox-checked">
            <input checked="" class="ant-checkbox-input" type="checkbox" value="Apple">
          </span>
          <span class="ant-checkbox-label semantic-mark-itemLabel">
            Apple
          </span>
        </label>
        <label class="ant-checkbox-wrapper ant-checkbox-group-item semantic-mark-item css-var-test-id ant-checkbox-css-var">
          <span class="ant-checkbox semantic-mark-itemIcon ant-wave-target">
            <input class="ant-checkbox-input" type="checkbox" value="Pear">
          </span>
          <span class="ant-checkbox-label semantic-mark-itemLabel">
            Pear
          </span>
        </label>
      </div>
```
