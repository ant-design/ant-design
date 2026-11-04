## Radio.Group

### Semantic Parts

- root（`semantic-mark-root`）: Root element of the radio group container, including layout direction, spacing, button style and other group layout styles
- item（`semantic-mark-item`）: Item element wrapping a single Radio, including checked, disabled, block layout and other option styles
- itemIcon（`semantic-mark-itemIcon`）: Item icon element with border radius, border, transition animations, hover and focus interactive styles
- itemLabel（`semantic-mark-itemLabel`）: Item label element with padding, text color, disabled states, alignment and other text styles

### Usage Example

```tsx
<Radio.Group
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
<div class="ant-radio-group ant-radio-group-outline semantic-mark-root css-var-test-id ant-radio-css-var" role="radiogroup">
        <label class="ant-radio-wrapper ant-radio-wrapper-checked semantic-mark-item css-var-test-id ant-radio-css-var">
          <span class="ant-radio semantic-mark-itemIcon ant-wave-target ant-radio-checked">
            <input checked="" class="ant-radio-input" name="test-id" type="radio" value="apple">
          </span>
          <span class="ant-radio-label semantic-mark-itemLabel">
            Apple
          </span>
        </label>
        <label class="ant-radio-wrapper semantic-mark-item css-var-test-id ant-radio-css-var">
          <span class="ant-radio semantic-mark-itemIcon ant-wave-target">
            <input class="ant-radio-input" name="test-id" type="radio" value="pear">
          </span>
          <span class="ant-radio-label semantic-mark-itemLabel">
            Pear
          </span>
        </label>
      </div>
```
