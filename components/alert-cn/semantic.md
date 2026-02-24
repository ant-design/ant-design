## Alert

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含边框、背景色、内边距、圆角、位置布局等警告提示框的基础样式
- section（`semantic-mark-section`）: 内容元素，采用 flex 布局控制内容区域的排版和最小宽度
- icon（`semantic-mark-icon`）: 图标元素，包含图标的颜色、行高、外边距等样式，支持不同类型的状态图标
- title（`semantic-mark-title`）: 标题元素，包含标题文字的颜色、字体等样式
- description（`semantic-mark-description`）: 描述元素，包含描述文字的字体大小、行高等排版样式
- actions（`semantic-mark-actions`）: 操作组元素，包含操作按钮的布局和间距样式
- close（`semantic-mark-close`）: 关闭按钮元素，包含按钮的基础样式

### 使用案例

```tsx
<Alert
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    icon: "semantic-mark-icon",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    actions: "semantic-mark-actions",
    close: "semantic-mark-close"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-alert ant-alert-info ant-alert-with-description semantic-mark-root css-var-test-id" data-show="true" role="alert">
        <span class="ant-alert-icon semantic-mark-icon">
          <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
            <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
            </svg>
          </span>
        </span>
        <div class="ant-alert-section semantic-mark-section">
          <div class="ant-alert-title semantic-mark-title">
            Info Text
          </div>
          <div class="ant-alert-description semantic-mark-description">
            Info Description Info Description Info Description Info Description
          </div>
        </div>
        <div class="ant-alert-actions semantic-mark-actions">
          <div class="ant-space ant-space-vertical ant-space-gap-row-small ant-space-gap-col-small css-var-test-id">
            <div class="ant-space-item">
              <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                <span>
                  Accept
                </span>
              </button>
            </div>
            <div class="ant-space-item">
              <button class="ant-btn css-var-test-id ant-btn-default ant-btn-dangerous ant-btn-color-dangerous ant-btn-variant-outlined ant-btn-sm ant-btn-background-ghost" type="button">
                <span>
                  Decline
                </span>
              </button>
            </div>
          </div>
        </div>
        <button class="ant-alert-close-icon semantic-mark-close" tabindex="0" type="button">
          <span aria-label="close" class="anticon anticon-close" role="img">
            <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
            </svg>
          </span>
        </button>
      </div>
```
