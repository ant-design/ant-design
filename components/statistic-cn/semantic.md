## Statistic

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含统计数值组件的重置样式和整体容器样式
- header（`semantic-mark-header`）: 头部元素，包含下内边距和标题区域的布局样式
- title（`semantic-mark-title`）: 标题元素，包含文字颜色、字体大小等标题文字的显示样式
- content（`semantic-mark-content`）: 内容元素，包含文字颜色、字体大小、字体族等数值内容的展示样式
- prefix（`semantic-mark-prefix`）: 前缀元素，包含行内块显示、右外边距等前缀内容的布局样式
- suffix（`semantic-mark-suffix`）: 后缀元素，包含行内块显示、左外边距等后缀内容的布局样式

### 使用案例

```tsx
<Statistic
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    content: "semantic-mark-content",
    prefix: "semantic-mark-prefix",
    suffix: "semantic-mark-suffix"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-statistic semantic-mark-root css-var-test-id">
          <div class="ant-statistic-header semantic-mark-header">
            <div class="ant-statistic-title semantic-mark-title">
              Active
            </div>
          </div>
          <div class="ant-statistic-content semantic-mark-content" style="color: rgb(63, 134, 0);">
            <span class="ant-statistic-content-prefix semantic-mark-prefix">
              <span aria-label="arrow-up" class="anticon anticon-arrow-up" role="img">
                <svg aria-hidden="true" data-icon="arrow-up" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-statistic-content-value">
              <span class="ant-statistic-content-value-int">
                11
              </span>
              <span class="ant-statistic-content-value-decimal">
                .28
              </span>
            </span>
            <span class="ant-statistic-content-suffix semantic-mark-suffix">
              %
            </span>
          </div>
        </div>
      </div>
```
