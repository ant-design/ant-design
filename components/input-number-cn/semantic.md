## InputNumber

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置行内块布局、宽度、边框圆角和重置样式
- input（`semantic-mark-input`）: 输入框元素，设置字体、行高、文本输入和交互样式
- prefix（`semantic-mark-prefix`）: 前缀的包裹元素，设置flex布局、对齐方式和右边距样式
- suffix（`semantic-mark-suffix`）: 后缀的包裹元素，设置flex布局、边距和过渡动画样式
- action（`semantic-mark-action`）: 单个操作按钮元素，设置按钮的样式、悬浮效果和点击交互
- actions（`semantic-mark-actions`）: 操作元素，设置绝对定位、宽度、flex布局和数值调节按钮样式

### 使用案例

```tsx
<InputNumber
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    input: "semantic-mark-input",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix",
    action: "semantic-mark-action",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="display: flex; flex-direction: column; gap: 16px;">
        <div class="ant-input-number ant-input-number-mode-input css-var-test-id ant-input-number-css-var semantic-mark-root ant-input-number-outlined semantic-mark-root" style="width: 200px;">
          <div class="ant-input-number-prefix semantic-mark-prefix">
            ￥
          </div>
          <input aria-valuenow="100" autocomplete="off" class="ant-input-number-input semantic-mark-input" role="spinbutton" step="1" value="100">
          <div class="ant-input-number-suffix semantic-mark-suffix" style="margin-right: 28px;">
            RMB
          </div>
          <div class="ant-input-number-actions semantic-mark-actions" style="opacity: 1; width: 24px;">
            <span aria-disabled="false" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up semantic-mark-action" role="button" unselectable="on">
              <span aria-label="up" class="anticon anticon-up" role="img">
                <svg aria-hidden="true" data-icon="up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
                </svg>
              </span>
            </span>
            <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down semantic-mark-action" role="button" unselectable="on">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
        <div class="ant-input-number ant-input-number-mode-spinner css-var-test-id ant-input-number-css-var semantic-mark-root ant-input-number-outlined semantic-mark-root" style="width: 200px;">
          <span aria-disabled="false" aria-label="Decrease Value" class="ant-input-number-action ant-input-number-action-down semantic-mark-action" role="button" unselectable="on">
            <span aria-label="minus" class="anticon anticon-minus" role="img">
              <svg aria-hidden="true" data-icon="minus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </span>
          </span>
          <input aria-valuenow="100" autocomplete="off" class="ant-input-number-input semantic-mark-input" role="spinbutton" step="1" value="100">
          <span aria-disabled="false" aria-label="Increase Value" class="ant-input-number-action ant-input-number-action-up semantic-mark-action" role="button" unselectable="on">
            <span aria-label="plus" class="anticon anticon-plus" role="img">
              <svg aria-hidden="true" data-icon="plus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
```
