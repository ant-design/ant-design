## Input.Otp

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置行内flex布局、对齐方式、列间距和包装样式
- input（`semantic-mark-input`）: 输入框元素，设置文本居中、内边距和数字输入样式
- separator（`semantic-mark-separator`）: 分隔符元素，设置OTP输入框之间的分隔符显示样式

### 使用案例

```tsx
<Input.Otp
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    separator: "semantic-mark-separator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-otp css-var-test-id semantic-mark-root" role="group">
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 1" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 2" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 3" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 4" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 5" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
        <span class="ant-otp-separator semantic-mark-separator">
          -
        </span>
        <span class="ant-otp-input-wrapper" role="presentation">
          <input aria-label="OTP Input 6" class="ant-input ant-input-outlined semantic-mark-input ant-otp-input css-var-test-id ant-input-css-var" size="1" type="text" value="">
        </span>
      </div>
```
