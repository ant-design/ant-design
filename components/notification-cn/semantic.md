## Notification

### Semantic Parts

- list（`semantic-mark-list`）: 通知列表根元素，设置定位、层级、宽度、滚动区域和位置样式
- listContent（`semantic-mark-listContent`）: 通知列表内容元素，设置通知项排列、间距和高度动画样式
- root（`semantic-mark-root`）: 通知项根元素，设置背景色、圆角、阴影、内边距和动画样式
- wrapper（`semantic-mark-wrapper`）: 图标与内容的包裹元素，设置内容布局样式
- icon（`semantic-mark-icon`）: 图标元素，设置绝对定位、字体大小、行高和状态颜色样式
- section（`semantic-mark-section`）: 内容区域元素，包含标题和描述内容
- title（`semantic-mark-title`）: 标题元素，设置颜色、字体大小、行高和外边距样式
- description（`semantic-mark-description`）: 描述元素，设置字体大小、颜色和外边距样式
- actions（`semantic-mark-actions`）: 操作组元素，设置右浮动、上边距和操作按钮布局样式
- close（`semantic-mark-close`）: 关闭按钮元素，设置位置、尺寸和交互样式
- progress（`semantic-mark-progress`）: 进度条元素，设置自动关闭通知的进度样式

### 使用案例

```tsx
<Notification
  {...otherProps}
  classNames={{
    list: "semantic-mark-list",
    listContent: "semantic-mark-listContent",
    root: "semantic-mark-root",
    wrapper: "semantic-mark-wrapper",
    icon: "semantic-mark-icon",
    section: "semantic-mark-section",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    actions: "semantic-mark-actions",
    close: "semantic-mark-close",
    progress: "semantic-mark-progress"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-notification ant-notification-list ant-notification-topRight css-var-test-id ant-notification-css-var semantic-mark-list" style="position: relative; inset: auto; width: 432px; max-width: 100%; height: auto; padding: 24px; transform: none;">
        <div class="ant-notification-list-content ant-notification-list-content-increase semantic-mark-listContent" style="height: 0px; --top-notificiation-height: 0px; --top-notificiation-width: 0px;">
          <div class="ant-notification-notice ant-notification-notice-success semantic-mark-root ant-notification-notice-closable" data-notification-index="1" role="alert" style="--notification-index: 1; --notification-y: 0px;">
            <div class="ant-notification-notice-wrapper semantic-mark-wrapper">
              <div class="ant-notification-notice-icon semantic-mark-icon ant-notification-notice-icon-success">
                <span aria-label="check-circle" class="anticon anticon-check-circle" role="img">
                  <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-notification-notice-section semantic-mark-section">
                <div class="ant-notification-notice-title semantic-mark-title">
                  Hello World!
                </div>
                <div class="ant-notification-notice-description semantic-mark-description">
                  Hello World?
                </div>
              </div>
            </div>
            <div class="ant-notification-notice-actions semantic-mark-actions">
              <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                <span>
                  My Button
                </span>
              </button>
            </div>
            <button aria-label="Close" class="ant-notification-notice-close semantic-mark-close">
              <span aria-label="close" class="anticon anticon-close ant-notification-notice-close-icon" role="img">
                <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="ant-notification-notice ant-notification-notice-info semantic-mark-root ant-notification-notice-closable" data-notification-index="0" role="alert" style="--notification-index: 0; --notification-y: 0px;">
            <div class="ant-notification-notice-wrapper semantic-mark-wrapper">
              <div class="ant-notification-notice-icon semantic-mark-icon ant-notification-notice-icon-info">
                <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                  <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-notification-notice-section semantic-mark-section">
                <div class="ant-notification-notice-title semantic-mark-title">
                  Welcome back!
                </div>
                <div class="ant-notification-notice-description semantic-mark-description">
                  This is another notification.
                </div>
              </div>
            </div>
            <button aria-label="Close" class="ant-notification-notice-close semantic-mark-close">
              <span aria-label="close" class="anticon anticon-close ant-notification-notice-close-icon" role="img">
                <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </span>
            </button>
            <progress class="ant-notification-notice-progress semantic-mark-progress" max="100" value="100">
          </progress></div>
        </div>
      </div>
```
