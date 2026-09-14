## QrCode

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置flex布局、内边距、背景色、边框、圆角和相对定位样式
- cover（`semantic-mark-cover`）: 遮罩层元素，设置绝对定位、层级、背景色和加载状态覆盖样式

### 使用案例

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
