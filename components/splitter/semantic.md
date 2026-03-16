## Splitter

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, width and height, alignment and stretch styles
- panel（`semantic-mark-panel`）: Panel element with flex basis, grow ratio and panel container styles
- dragger（`semantic-mark-dragger`）: Drag control element with absolute positioning, user selection, z-index, center alignment, background color, hover and active states styles

### Usage Example

```tsx
<Splitter
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    panel: "semantic-mark-panel",
    dragger: "semantic-mark-dragger"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-splitter ant-splitter-horizontal semantic-mark-root css-var-test-id ant-splitter-css-var" style="height: 200px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div class="ant-splitter-panel semantic-mark-panel" style="flex-basis: auto; flex-grow: 1;">
          <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-center" style="height: 100%;">
            <h5 class="ant-typography ant-typography-secondary css-var-test-id" style="white-space: nowrap;">
              First
            </h5>
          </div>
        </div>
        <div aria-valuemax="0" aria-valuemin="0" aria-valuenow="50" class="ant-splitter-bar" role="separator">
          <div class="ant-splitter-bar-dragger semantic-mark-dragger">
        </div>
        <div class="ant-splitter-panel semantic-mark-panel" style="flex-basis: auto; flex-grow: 1;">
          <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-center" style="height: 100%;">
            <h5 class="ant-typography ant-typography-secondary css-var-test-id" style="white-space: nowrap;">
              Second
            </h5>
          </div>
        </div>
      </div>
    </div>
```
