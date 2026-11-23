## FloatButton

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置悬浮按钮的基础样式、形状尺寸、类型主题、固定定位、层级、阴影、间距等容器样式
- content（`semantic-mark-content`）: 内容元素，设置按钮内文字内容的字体大小、颜色、对齐、换行等文本显示样式
- icon（`semantic-mark-icon`）: 图标元素，设置按钮内图标的尺寸、颜色、行高、对齐等图标显示样式

### 使用案例

```tsx
<FloatButton
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
<button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-lg css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-pure ant-float-btn-primary ant-float-btn-square ant-float-btn-individual semantic-mark-root" type="button">
        <span class="ant-btn-icon ant-float-btn-icon semantic-mark-icon">
          <span aria-label="question-circle" class="anticon anticon-question-circle" role="img">
            <svg aria-hidden="true" data-icon="question-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path>
            </svg>
          </span>
        </span>
        <span class="ant-float-btn-content semantic-mark-content">
          HELP
        </span>
      </button>
```
