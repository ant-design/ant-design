## Popconfirm

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置绝对定位、层级、变换原点、箭头指向和弹层容器样式
- container（`semantic-mark-container`）: 容器元素，设置背景色、内边距、圆角、阴影、边框和内容展示样式
- arrow（`semantic-mark-arrow`）: 箭头元素，设置宽高、位置、颜色和边框样式
- title（`semantic-mark-title`）: 标题元素，设置标题文本样式和间距
- content（`semantic-mark-content`）: 描述元素，设置描述文本样式和布局

### 使用案例

```tsx
<Popconfirm
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    container: "semantic-mark-container",
    arrow: "semantic-mark-arrow",
    title: "semantic-mark-title",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; margin-top: 60px;">
        <span aria-describedby="test-id" class="ant-popover-open">
        <div class="ant-popover ant-zoom-big-appear ant-zoom-big-appear-prepare ant-zoom-big ant-popover-css-var css-var-test-id css-var-test-id ant-popconfirm semantic-mark-root ant-popover-placement-top" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box;">
          <div class="ant-popover-arrow semantic-mark-arrow" style="position: absolute; bottom: 0px; left: 0px;">
            <span class="ant-popover-arrow-content">
          </span></div>
          <div class="ant-popover-container semantic-mark-container" id="test-id" role="tooltip">
            <div class="ant-popover-content">
              <div class="ant-popconfirm-inner-content">
                <div class="ant-popconfirm-message">
                  <span class="ant-popconfirm-message-icon">
                    <span aria-label="exclamation-circle" class="anticon anticon-exclamation-circle" role="img">
                      <svg aria-hidden="true" data-icon="exclamation-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                      </svg>
                    </span>
                  </span>
                  <div class="ant-popconfirm-message-text">
                    <div class="ant-popconfirm-title semantic-mark-title">
                      Confirm
                    </div>
                    <div class="ant-popconfirm-description semantic-mark-content">
                      Are you sure you want to perform this action?
                    </div>
                  </div>
                </div>
                <div class="ant-popconfirm-buttons">
                  <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-sm" type="button">
                    <span>
                      Cancel
                    </span>
                  </button>
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                    <span>
                      OK
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span></div>
```
