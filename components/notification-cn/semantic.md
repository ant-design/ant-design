## Notification

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置固定定位、层级、内边距、背景色、圆角、阴影和动画样式
- icon（`semantic-mark-icon`）: 图标元素，设置绝对定位、字体大小、行高和状态颜色样式
- title（`semantic-mark-title`）: 标题元素，设置颜色、字体大小、行高和外边距样式
- description（`semantic-mark-description`）: 描述元素，设置字体大小、颜色和外边距样式
- actions（`semantic-mark-actions`）: 操作组元素，设置右浮动、上边距和操作按钮布局样式

### 使用案例

```tsx
<Notification
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    actions: "semantic-mark-actions"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-notification-notice-pure-panel css-var-test-id ant-notification-css-var semantic-mark-root">
        <div class="ant-notification-notice ant-notification-notice-closable">
          <div class="ant-notification-notice-content">
            <div class="ant-notification-notice-with-icon" role="alert">
              <span aria-label="check-circle" class="anticon anticon-check-circle ant-notification-notice-icon semantic-mark-icon ant-notification-notice-icon-success" role="img">
                <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                </svg>
              </span>
              <div class="ant-notification-notice-title semantic-mark-title">
                Hello World!
              </div>
              <div class="ant-notification-notice-description semantic-mark-description">
                Hello World?
              </div>
              <div class="ant-notification-notice-actions semantic-mark-actions">
                <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                  <span>
                    My Button
                  </span>
                </button>
              </div>
            </div>
          </div>
          <button aria-label="Close" class="ant-notification-notice-close">
            <span aria-label="Close" class="anticon anticon-close ant-notification-close-icon" role="img">
              <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
```
