## Form

### Semantic Parts

- root（`semantic-mark-root`）: Root element with form item margin-bottom, vertical-align, transitions, hidden states, error/warning states and other basic form item container styles
- label（`semantic-mark-label`）: Label element with flex layout, overflow hidden, whitespace nowrap, text alignment, vertical alignment, plus label color, font size, height, required marks and other label display styles
- content（`semantic-mark-content`）: Content element with form content area layout, styling and control container related styles

### Usage Example

```tsx
<Form
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    label: "semantic-mark-label",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<form autocomplete="off" class="ant-form ant-form-horizontal css-var-test-id ant-form-css-var semantic-mark-root" id="basic" style="max-width: 600px;">
        <div class="ant-form-item css-var-test-id ant-form-css-var ant-form-item-horizontal">
          <div class="ant-row ant-form-item-row css-var-test-id">
            <div class="ant-col ant-col-8 ant-form-item-label css-var-test-id">
              <label class="semantic-mark-label ant-form-item-required" for="basic_username" title="Username">
                Username
              </label>
            </div>
            <div class="ant-col ant-col-16 ant-form-item-control css-var-test-id">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content semantic-mark-content">
                  <input aria-required="true" class="ant-input ant-input-outlined css-var-test-id ant-input-css-var" id="basic_username" type="text" value="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-form-item css-var-test-id ant-form-css-var ant-form-item-horizontal">
          <div class="ant-row ant-form-item-row css-var-test-id">
            <div class="ant-col ant-col-8 ant-form-item-label css-var-test-id">
              <label class="semantic-mark-label ant-form-item-required" for="basic_password" title="Password">
                Password
              </label>
            </div>
            <div class="ant-col ant-col-16 ant-form-item-control css-var-test-id">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content semantic-mark-content">
                  <span class="ant-input-affix-wrapper ant-input-outlined ant-input-password css-var-test-id ant-input-css-var">
                    <input aria-required="true" class="ant-input" id="basic_password" type="password" value="">
                    <span class="ant-input-suffix">
                      <span aria-label="eye-invisible" class="anticon anticon-eye-invisible ant-input-password-icon" role="img" tabindex="-1">
                        <svg aria-hidden="true" data-icon="eye-invisible" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                          <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                          <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                        </svg>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
```
