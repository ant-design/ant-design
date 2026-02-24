## Message

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set fixed positioning, z-index, padding, background color, border radius, shadow and animation styles
- icon（`semantic-mark-icon`）: Icon element, set font size, right margin and status color styles
- content（`semantic-mark-content`）: Content element, set inline block layout, text color and content display styles

### Usage Example

```tsx
<Message
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-message-notice semantic-mark-root ant-message-notice-pure-panel css-var-test-id ant-message-css-var">
        <div class="ant-message-notice-content">
          <div class="ant-message-custom-content ant-message-success">
            <span aria-label="check-circle" class="anticon anticon-check-circle semantic-mark-icon" role="img">
              <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
              </svg>
            </span>
            <span class="semantic-mark-content">
              Hello, Ant Design!
            </span>
          </div>
        </div>
      </div>
```
