## Badge.Ribbon

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置相对定位和包装容器样式
- indicator（`semantic-mark-indicator`）: 指示器元素，设置绝对定位、内边距、背景色、圆角和缎带样式
- content（`semantic-mark-content`）: 文本元素，设置文本颜色和缎带内容显示样式

### 使用案例

```tsx
<Badge.Ribbon
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    indicator: "semantic-mark-indicator",
    content: "semantic-mark-content"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%;">
        <div class="ant-ribbon-wrapper css-var-test-id semantic-mark-root">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id">
            <div class="ant-card-head">
              <div class="ant-card-head-wrapper">
                <div class="ant-card-head-title">
                  Pushes open the window
                </div>
              </div>
            </div>
            <div class="ant-card-body">
              and raises the spyglass.
            </div>
          </div>
          <div class="ant-ribbon ant-ribbon-placement-end ant-ribbon-color-pink semantic-mark-indicator">
            <span class="ant-ribbon-content semantic-mark-content">
              Hippies
            </span>
            <div class="ant-ribbon-corner">
          </div>
        </div>
      </div>
    </div>
```
