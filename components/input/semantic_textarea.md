## Input.Textarea

### Semantic Parts

- root（`semantic-mark-root`）: Root element with textarea wrapper styles, border, border radius, transition animation and state control
- textarea（`semantic-mark-textarea`）: Textarea element with font, line height, padding, color, background, border, text input and multi-line text display styles
- clear（`semantic-mark-clear`）: Clear button element with layout, visibility, and interaction styles for clearing content
- count（`semantic-mark-count`）: Count element with character count display position, font, color and numeric statistics styles

### Usage Example

```tsx
<Input.Textarea
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    textarea: "semantic-mark-textarea",
    clear: "semantic-mark-clear",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-affix-wrapper-input-with-clear-btn ant-input-textarea-affix-wrapper ant-input-textarea-show-count ant-input-textarea-allow-clear ant-input-outlined css-var-test-id ant-input-css-var semantic-mark-root" data-count="17 / 100">
        <textarea class="ant-input semantic-mark-textarea" rows="3">          Hello, Ant Design
        </textarea>
        <span class="ant-input-suffix">
          <button class="ant-input-clear-icon ant-input-clear-icon-has-suffix semantic-mark-clear" type="button">
            <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
              <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
              </svg>
            </span>
          </button>
          <span class="ant-input-data-count semantic-mark-count">
            17 / 100
          </span>
        </span>
      </span>
```
