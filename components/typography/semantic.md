## Typography

### Semantic Parts

- root（`semantic-mark-root`）: Root element with base typography styles, layout, and positioning
- actions（`semantic-mark-actions`）: Actions element with layout and spacing styles for copy, edit, expand/collapse buttons
- action（`semantic-mark-action`）: Individual action button element including copy, edit, expand, collapse button styles like padding, border radius, colors, etc.
- textarea（`semantic-mark-textarea`）: TextArea element in editable mode, used to customize className and inline styles for the edit input

### Usage Example

```tsx
<Typography
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    actions: "semantic-mark-actions",
    action: "semantic-mark-action",
    textarea: "semantic-mark-textarea"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-start ant-flex-gap-middle ant-flex-vertical" style="width: 100%; align-self: flex-start;">
        <button aria-checked="false" class="ant-switch css-var-test-id" role="switch" type="button">
          <div class="ant-switch-handle">
          <span class="ant-switch-inner">
            <span class="ant-switch-inner-checked">
              Editing
            </span>
            <span class="ant-switch-inner-unchecked">
              Editing
            </span>
          </span>
        </div></button>
        <div aria-label="Ant Design is a design language for background applications, refined by Ant UED Team. It aims to uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development." class="ant-typography ant-typography-ellipsis css-var-test-id semantic-mark-root" style="width: 100%;">
          Ant Design is a design language for background applications, refined by Ant UED Team. It aims to uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.
          <span class="ant-typography-actions semantic-mark-actions">
            <button aria-label="Edit" class="ant-typography-edit semantic-mark-action" type="button">
              <span aria-label="edit" class="anticon anticon-edit" role="button">
                <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                </svg>
              </span>
            </button>
            <button aria-label="Copy" class="ant-typography-copy semantic-mark-action" type="button">
              <span aria-label="copy" class="anticon anticon-copy" role="img">
                <svg aria-hidden="true" data-icon="copy" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                </svg>
              </span>
            </button>
          </span>
        </div>
      </div>
```
