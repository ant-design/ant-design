## Input.Input

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, inline-block display, width, min-width, padding, colors, fonts, line-height, border-radius, transitions and other input container basic styles
- input（`semantic-mark-input`）: Input element with core interactive styles and text input related styling
- prefix（`semantic-mark-prefix`）: Prefix wrapper element with layout and styling for prefix content
- suffix（`semantic-mark-suffix`）: Suffix wrapper element with layout and styling for suffix content
- count（`semantic-mark-count`）: Character count element with font and color styles for count display

### Usage Example

```tsx
<Input.Input
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    count: "semantic-mark-count"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-input-affix-wrapper ant-input-outlined css-var-test-id ant-input-css-var semantic-mark-root">
        <span class="ant-input-prefix semantic-mark-prefix">
          <span aria-label="user" class="anticon anticon-user" role="img">
            <svg aria-hidden="true" data-icon="user" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
            </svg>
          </span>
        </span>
        <input class="ant-input semantic-mark-input" type="text" value="Hello, Ant Design">
        <span class="ant-input-suffix semantic-mark-suffix">
          <span class="ant-input-show-count-suffix ant-input-show-count-has-suffix semantic-mark-count">
            17
          </span>
          <span aria-label="edit" class="anticon anticon-edit" role="img">
            <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
            </svg>
          </span>
        </span>
      </span>
```
