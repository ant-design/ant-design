## Message

### Semantic Parts

- list（`semantic-mark-list`）: 消息列表根元素，设置定位、层级、宽度、滚动区域和位置样式
- listContent（`semantic-mark-listContent`）: 消息列表内容元素，设置消息项排列、间距和高度动画样式
- root（`semantic-mark-root`）: 消息项根元素，设置背景色、圆角、阴影、内边距和动画样式
- wrapper（`semantic-mark-wrapper`）: 图标与标题的包裹元素，设置内容布局、间距和对齐样式
- icon（`semantic-mark-icon`）: 图标元素，设置字体大小、行高和状态颜色样式
- title（`semantic-mark-title`）: 标题元素，设置文本颜色、字号、行高和内容展示样式

### 使用案例

```tsx
<Message
  {...otherProps}
  classNames={{
    list: "semantic-mark-list",
    listContent: "semantic-mark-listContent",
    root: "semantic-mark-root",
    wrapper: "semantic-mark-wrapper",
    icon: "semantic-mark-icon",
    title: "semantic-mark-title"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-message ant-message-list ant-message-top css-var-test-id ant-message-css-var semantic-mark-list" style="position: relative; inset: auto; width: 100%; max-width: 100%; height: auto; padding: 24px; overflow: visible; transform: none;">
        <div class="ant-message-list-content ant-message-list-content-increase semantic-mark-listContent" style="height: 0px; --top-notificiation-height: 0px; --top-notificiation-width: 0px;">
          <div class="ant-message-notice ant-message-notice-success semantic-mark-root" data-notification-index="1" role="alert" style="--notification-index: 1; --notification-y: 0px;">
            <div class="ant-message-notice-wrapper semantic-mark-wrapper ant-message-success">
              <div class="ant-message-notice-icon semantic-mark-icon ant-message-notice-icon-success">
                <span aria-label="check-circle" class="anticon anticon-check-circle" role="img">
                  <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-message-notice-title semantic-mark-title">
                Hello, Ant Design!
              </div>
            </div>
          </div>
          <div class="ant-message-notice ant-message-notice-info semantic-mark-root" data-notification-index="0" role="alert" style="--notification-index: 0; --notification-y: 0px;">
            <div class="ant-message-notice-wrapper semantic-mark-wrapper ant-message-info">
              <div class="ant-message-notice-icon semantic-mark-icon ant-message-notice-icon-info">
                <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                  <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-message-notice-title semantic-mark-title">
                Welcome back!
              </div>
            </div>
          </div>
        </div>
      </div>
```
