## Button

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含边框样式、背景色、内边距、圆角、阴影效果、过渡动画、光标样式、文字权重、对齐方式等完整的按钮外观样式
- content（`semantic-mark-content`）: 内容元素，包装按钮文本内容，控制文本的不换行显示、居中对齐、中文字符间距优化等文本排版样式
- icon（`semantic-mark-icon`）: 图标元素，包含图标的字体大小、颜色继承、SVG 样式重置等图标显示相关样式

### 使用案例

```tsx
<Button
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    content: "semantic-mark-content",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid semantic-mark-root" type="button">
        <span class="ant-btn-icon semantic-mark-icon">
          <span aria-label="ant-design" class="anticon anticon-ant-design" role="img">
            <svg aria-hidden="true" data-icon="ant-design" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M716.3 313.8c19-18.9 19-49.7 0-68.6l-69.9-69.9.1.1c-18.5-18.5-50.3-50.3-95.3-95.2-21.2-20.7-55.5-20.5-76.5.5L80.9 474.2a53.84 53.84 0 000 76.4L474.6 944a54.14 54.14 0 0076.5 0l165.1-165c19-18.9 19-49.7 0-68.6a48.7 48.7 0 00-68.7 0l-125 125.2c-5.2 5.2-13.3 5.2-18.5 0L189.5 521.4c-5.2-5.2-5.2-13.3 0-18.5l314.4-314.2c.4-.4.9-.7 1.3-1.1 5.2-4.1 12.4-3.7 17.2 1.1l125.2 125.1c19 19 49.8 19 68.7 0zM408.6 514.4a106.3 106.2 0 10212.6 0 106.3 106.2 0 10-212.6 0zm536.2-38.6L821.9 353.5c-19-18.9-49.8-18.9-68.7.1a48.4 48.4 0 000 68.6l83 82.9c5.2 5.2 5.2 13.3 0 18.5l-81.8 81.7a48.4 48.4 0 000 68.6 48.7 48.7 0 0068.7 0l121.8-121.7a53.93 53.93 0 00-.1-76.4z"></path>
            </svg>
          </span>
        </span>
        <span class="semantic-mark-content">
          Ant Design
        </span>
      </button>
```
