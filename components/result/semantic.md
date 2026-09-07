## Result

### Semantic Parts

- root（`semantic-mark-root`）: Root element with text alignment, layout styles and other basic container styles
- title（`semantic-mark-title`）: Title element with font size, text color, line height, text alignment and other text styles
- subTitle（`semantic-mark-subTitle`）: Subtitle element with font size, text color, line height and other text styles
- body（`semantic-mark-body`）: Content element with margin, padding, background color and other content area styles
- extra（`semantic-mark-extra`）: Action area element with margin, text alignment, inner element spacing and other layout styles
- icon（`semantic-mark-icon`）: Icon element with margin, text alignment, font size, status colors and other icon styles

### Usage Example

```tsx
<Result
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    title: "semantic-mark-title",
    subTitle: "semantic-mark-subTitle",
    body: "semantic-mark-body",
    extra: "semantic-mark-extra",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-result ant-result-info css-var-test-id semantic-mark-root">
        <div class="ant-result-icon semantic-mark-icon">
          <span aria-label="exclamation-circle" class="anticon anticon-exclamation-circle" role="img">
            <svg aria-hidden="true" data-icon="exclamation-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
            </svg>
          </span>
        </div>
        <div class="ant-result-title semantic-mark-title">
          title
        </div>
        <div class="ant-result-subtitle semantic-mark-subTitle">
          subTitle
        </div>
        <div class="ant-result-extra semantic-mark-extra">
          <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
            <span>
              extra
            </span>
          </button>
        </div>
        <div class="ant-result-body semantic-mark-body">
          <div style="text-align: center;">
            The Content of Result
          </div>
        </div>
      </div>
```
