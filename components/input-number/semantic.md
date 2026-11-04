## InputNumber

### Semantic Parts

- root（`semantic-mark-root`）: Root element, sets inline-block layout, width, border radius and reset styles
- input（`semantic-mark-input`）: Input element, sets font, line height, text input and interaction styles
- prefix（`semantic-mark-prefix`）: Prefix wrapper element, sets flex layout, alignment and right margin styles
- suffix（`semantic-mark-suffix`）: Suffix wrapper element, sets flex layout, margin and transition animation styles
- action（`semantic-mark-action`）: Single action button element, sets button styling, hover effects and click interactions
- actions（`semantic-mark-actions`）: Actions element, sets absolute positioning, width, flex layout and number adjustment button styles
- clear（`semantic-mark-clear`）: Clear button element, sets icon color, size and interaction styles

### Usage Example

```tsx
<InputNumber
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    action: "semantic-mark-action",
    actions: "semantic-mark-actions",
    clear: "semantic-mark-clear"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="display: flex; flex-direction: column; gap: 16px;">
        <div class="ant-input-number ant-input-number-mode-input css-var-test-id ant-input-number-css-var semantic-mark-root ant-input-number-outlined semantic-mark-root" style="width: 200px;">
          <div class="ant-input-number-prefix semantic-mark-prefix">
            ￥
          </div>
          <input aria-valuenow="100" autocomplete="off" class="ant-input-number-input semantic-mark-input" role="spinbutton" step="1" value="100">
          <div class="ant-input-number-suffix semantic-mark-suffix" style="margin-inline-end: 28px;">
            <button aria-label="Clear" class="ant-input-number-clear-icon ant-input-number-clear-icon-has-suffix semantic-mark-clear" type="button">
              <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                </svg>
              </span>
            </button>
            RMB
          </div>
          <div class="ant-input-number-actions semantic-mark-actions" style="opacity: 1; width: 24px;">
            <span aria-disabled="false" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up semantic-mark-action" role="button" unselectable="on">
              <span aria-label="up" class="anticon anticon-up" role="img">
                <svg aria-hidden="true" data-icon="up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                </svg>
              </span>
            </span>
            <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down semantic-mark-action" role="button" unselectable="on">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
        <div class="ant-input-number ant-input-number-mode-spinner css-var-test-id ant-input-number-css-var semantic-mark-root ant-input-number-outlined semantic-mark-root" style="width: 200px;">
          <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down semantic-mark-action" role="button" unselectable="on">
            <span aria-label="minus" class="anticon anticon-minus" role="img">
              <svg aria-hidden="true" data-icon="minus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </span>
          </span>
          <input aria-valuenow="100" autocomplete="off" class="ant-input-number-input semantic-mark-input" role="spinbutton" step="1" value="100">
          <div class="ant-input-number-suffix semantic-mark-suffix" style="margin-inline-end: 28px;">
            <button aria-label="Clear" class="ant-input-number-clear-icon semantic-mark-clear" type="button">
              <span aria-label="close-circle" class="anticon anticon-close-circle" role="img">
                <svg aria-hidden="true" data-icon="close-circle" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"></path>
                </svg>
              </span>
            </button>
          </div>
          <span aria-disabled="false" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up semantic-mark-action" role="button" unselectable="on">
            <span aria-label="plus" class="anticon anticon-plus" role="img">
              <svg aria-hidden="true" data-icon="plus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
```
