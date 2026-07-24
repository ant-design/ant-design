## Segmented

### Semantic Parts

- root（`semantic-mark-root`）: Root element with inline-block layout, padding, background, border radius, transition and container styles
- item（`semantic-mark-item`）: Option element with relative positioning, text alignment, cursor style, transition, selected state background and hover styles
- icon（`semantic-mark-icon`）: Icon element with icon size, color and text spacing styles
- label（`semantic-mark-label`）: Label content element with min height, line height, padding, text ellipsis and content layout styles

### Usage Example

```tsx
<Segmented
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented semantic-mark-root css-var-test-id" role="radiogroup" tabindex="0">
        <div class="ant-segmented-group">
          <label class="ant-segmented-item semantic-mark-item ant-segmented-item-selected">
            <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
            <div class="ant-segmented-item-label semantic-mark-label">
              <span class="ant-segmented-item-icon semantic-mark-icon">
                <span aria-label="bars" class="anticon anticon-bars" role="img">
                  <svg aria-hidden="true" data-icon="bars" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                    <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                  </svg>
                </span>
              </span>
              <span>
                List
              </span>
            </div>
          </label>
          <label class="ant-segmented-item semantic-mark-item">
            <input class="ant-segmented-item-input" name="test-id" type="radio">
            <div class="ant-segmented-item-label semantic-mark-label">
              <span class="ant-segmented-item-icon semantic-mark-icon">
                <span aria-label="appstore" class="anticon anticon-appstore" role="img">
                  <svg aria-hidden="true" data-icon="appstore" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"></path>
                  </svg>
                </span>
              </span>
              <span>
                Kanban
              </span>
            </div>
          </label>
        </div>
      </div>
```
