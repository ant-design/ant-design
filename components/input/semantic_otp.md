## Input.Otp

### Semantic Parts

- root（`semantic-mark-root`）: Root element, set inline flex layout, alignment, column gap and wrapper styles
- input（`semantic-mark-input`）: Input element, set text center, padding and number input styles
- separator（`semantic-mark-separator`）: Separator element, set separator display styles between OTP input boxes

### Usage Example

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
