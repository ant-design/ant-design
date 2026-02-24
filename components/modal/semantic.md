## Modal

### Semantic Parts

- root（`semantic-mark-root`）: Root element with relative positioning, top position, width, max-width, margins, bottom padding and other basic layout styles for modal container
- mask（`semantic-mark-mask`）: Mask element with fixed positioning, z-index, background color, animation transitions and other mask layer styles
- wrapper（`semantic-mark-wrapper`）: Wrapper element used for motion container with animation and transition effect styles
- container（`semantic-mark-container`）: Modal container element with relative positioning, background, background-clip, border, border-radius, box-shadow, pointer-events, padding and other modal body styles
- header（`semantic-mark-header`）: Header element with padding, bottom border and other header area styles
- title（`semantic-mark-title`）: Title element with margin, color, font-weight, font-size, line-height, word-wrap and other title text styles
- body（`semantic-mark-body`）: Body element with content area background color, padding and other content display styles
- footer（`semantic-mark-footer`）: Footer element with footer background color, padding, top border, border-radius and other footer area styles

### Usage Example

```tsx
<Modal
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    mask: "semantic-mark-mask",
    wrapper: "semantic-mark-wrapper",
    container: "semantic-mark-container",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    footer: "semantic-mark-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; inset: 0;">
        <div class="ant-modal-root css-var-test-id ant-modal-css-var semantic-mark-root">
          <div class="ant-modal-mask semantic-mark-mask" style="z-index: 1; position: absolute;">
          <div class="ant-modal-wrap semantic-mark-wrapper" style="z-index: 1; position: absolute;">
            <div aria-labelledby="test-id" aria-modal="true" class="ant-modal ant-zoom-appear ant-zoom-appear-prepare ant-zoom" role="dialog" style="top: 50%; transform: translateY(-50%); margin-bottom: 0px; padding-bottom: 0px; width: 400px;" tabindex="-1">
              <div class="ant-modal-container semantic-mark-container">
                <div class="ant-modal-header semantic-mark-header">
                  <div class="ant-modal-title semantic-mark-title" id="test-id">
                    Title
                  </div>
                </div>
                <div class="ant-modal-body semantic-mark-body">
                  <p>
                    Some contents...
                  </p>
                </div>
                <div class="ant-modal-footer semantic-mark-footer">
                  <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
                    <span>
                      Cancel
                    </span>
                  </button>
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
                    <span>
                      OK
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```
