## Tag

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含行内块布局、自动高度、内边距、字体大小、行高、禁止换行、背景色、边框、圆角、透明度、过渡动画、文本对齐、相对定位等标签的基础样式
- icon（`semantic-mark-icon`）: 图标元素，包含字体大小、颜色、光标样式、过渡动画等图标的显示样式
- content（`semantic-mark-content`）: 内容元素，包含文本内容的颜色、字体样式等内容区域的样式

### 使用案例

```tsx
<Tag
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    icon: "semantic-mark-icon",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-tag semantic-mark-root ant-tag-filled css-var-test-id">
        <span aria-label="ant-design" class="anticon anticon-ant-design semantic-mark-icon" role="img">
          <svg aria-hidden="true" data-icon="ant-design" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
            <path d="M716.3 313.8c19-18.9 19-49.7 0-68.6l-69.9-69.9.1.1c-18.5-18.5-50.3-50.3-95.3-95.2-21.2-20.7-55.5-20.5-76.5.5L80.9 474.2a53.84 53.84 0 000 76.4L474.6 944a54.14 54.14 0 0076.5 0l165.1-165c19-18.9 19-49.7 0-68.6a48.7 48.7 0 00-68.7 0l-125 125.2c-5.2 5.2-13.3 5.2-18.5 0L189.5 521.4c-5.2-5.2-5.2-13.3 0-18.5l314.4-314.2c.4-.4.9-.7 1.3-1.1 5.2-4.1 12.4-3.7 17.2 1.1l125.2 125.1c19 19 49.8 19 68.7 0zM408.6 514.4a106.3 106.2 0 10212.6 0 106.3 106.2 0 10-212.6 0zm536.2-38.6L821.9 353.5c-19-18.9-49.8-18.9-68.7.1a48.4 48.4 0 000 68.6l83 82.9c5.2 5.2 5.2 13.3 0 18.5l-81.8 81.7a48.4 48.4 0 000 68.6 48.7 48.7 0 0068.7 0l121.8-121.7a53.93 53.93 0 00-.1-76.4z"></path>
          </svg>
        </span>
        <span class="semantic-mark-content">
          Ant Design
        </span>
      </span>
```
