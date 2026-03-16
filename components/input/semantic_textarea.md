## Input.Textarea

### Semantic Parts

- root（`semantic-mark-root`）: Root element with textarea wrapper styles, border, border radius, transition animation and state control
- textarea（`semantic-mark-textarea`）: Textarea element with font, line height, padding, color, background, border, text input and multi-line text display styles
- count（`semantic-mark-count`）: Count element with character count display position, font, color and numeric statistics styles

### Usage Example

```tsx
<Input.Textarea
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    textarea: "semantic-mark-textarea",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-textarea-affix-wrapper ant-input-textarea-show-count ant-input-outlined css-var-test-id ant-input-css-var semantic-mark-root" data-count="17 / 100">
        <textarea class="ant-input semantic-mark-textarea" rows="3">          Hello, Ant Design
        </textarea>
        <span class="ant-input-suffix">
          <span class="ant-input-data-count semantic-mark-count">
            17 / 100
          </span>
        </span>
      </span>
```
