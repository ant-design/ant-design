## Tag.Group

### Semantic Parts

- root（`semantic-mark-root`）: Root element with tag group container styles and layout
- item（`semantic-mark-item`）: Tag item element with inline-block display, height, padding, font size, line height, background color, border, border radius, opacity, transition animation, checkable state and other styles

### Usage Example

```tsx
<Tag.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tag-checkable-group css-var-test-id semantic-mark-root">
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Movies
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-checked ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Books
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Music
          </span>
        </span>
        <span class="ant-tag ant-tag-checkable ant-tag-checkable-group-item semantic-mark-item css-var-test-id">
          <span>
            Sports
          </span>
        </span>
      </div>
```
