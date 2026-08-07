## Collapse

### Semantic Parts

- root（`semantic-mark-root`）: Root element with border, border-radius, background color and container styles that control the overall layout and appearance of collapse panels
- header（`semantic-mark-header`）: Header element with flex layout, padding, color, line-height, cursor style, transition animations and other interactive styles for panel headers
- title（`semantic-mark-title`）: Title element with flex auto layout and margin styles for title text layout and typography
- body（`semantic-mark-body`）: Body element with padding, color, background color and other styles for panel content area display
- icon（`semantic-mark-icon`）: Icon element with font size, transition animations, rotation transforms and other styles and animations for expand/collapse arrows

### Usage Example

```tsx
<Collapse
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; inset: 0; margin: 32px;">
        <div class="ant-collapse ant-collapse-icon-placement-start css-var-test-id semantic-mark-root">
          <div class="ant-collapse-item ant-collapse-item-active">
            <div aria-disabled="false" aria-expanded="true" class="ant-collapse-header semantic-mark-header" role="button" tabindex="0">
              <div class="ant-collapse-expand-icon semantic-mark-icon">
                <span aria-label="expanded" class="anticon anticon-right ant-collapse-arrow" role="img">
                  <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" style="transform: rotate(90deg);" viewBox="64 64 896 896" width="1em">
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                  </svg>
                </span>
              </div>
              <span class="ant-collapse-title semantic-mark-title">
                This is panel header
              </span>
            </div>
            <div class="ant-collapse-panel ant-collapse-panel-active">
              <div class="ant-collapse-body semantic-mark-body">
                <p>
                  This is panel body
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
```
