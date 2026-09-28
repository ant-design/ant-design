## QrCode

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set flex layout, padding, background color, border, border radius and relative positioning styles
- cover（`semantic-mark-cover`）: Cover element, set absolute positioning, z-index, background color and loading state overlay styles

### Usage Example

```tsx
<QrCode
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    cover: "semantic-mark-cover"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-qrcode css-var-test-id semantic-mark-root" style="background-color: transparent; width: 160px; height: 160px;">
        <div class="ant-qrcode-cover semantic-mark-cover">
          <div aria-busy="true" aria-live="polite" class="ant-spin ant-spin-spinning ant-spin-section css-var-test-id">
            <span class="ant-spin-dot-holder">
              <span class="ant-spin-dot ant-spin-dot-spin">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
                <i class="ant-spin-dot-item">
              </i></i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
            </i></i></i></span><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
          </i></i></i></div><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
        </i></i></i></div><i class="ant-spin-dot-item"><i class="ant-spin-dot-item"><i class="ant-spin-dot-item">
        <canvas height="160" role="img" width="160">
      </canvas></i></i></i></div>
```
