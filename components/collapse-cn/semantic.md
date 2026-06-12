## Collapse

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含折叠面板的边框、圆角、背景色等容器样式，控制面板的整体布局和外观
- header（`semantic-mark-header`）: 头部元素，包含flex布局、内边距、颜色、行高、光标样式、过渡动画等面板头部的交互和样式
- title（`semantic-mark-title`）: 标题元素，包含flex自适应布局、右边距等标题文字的布局和排版样式
- body（`semantic-mark-body`）: 内容元素，包含内边距、颜色、背景色等面板内容区域的展示样式
- icon（`semantic-mark-icon`）: 图标元素，包含字体大小、过渡动画、旋转变换等展开收起箭头的样式和动效

### 使用案例

```tsx
<Collapse
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    icon: "semantic-mark-icon"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; inset: 0; margin: 32px;">
        <div class="ant-collapse ant-collapse-icon-placement-start css-var-test-id semantic-mark-root">
          <div class="ant-collapse-item ant-collapse-item-active">
            <div aria-disabled="false" aria-expanded="true" class="ant-collapse-header semantic-mark-header" role="button" tabindex="0">
              <div class="ant-collapse-expand-icon semantic-mark-icon">
                <span aria-label="expanded" class="anticon anticon-right ant-collapse-arrow" role="img">
                  <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" style="transform: rotate(90deg);" viewBox="64 64 896 896" width="1em">
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                  </svg>
                </span>
              </div>
              <span class="ant-collapse-title semantic-mark-title">
                This is panel header
              </span>
            </div>
            <div class="ant-collapse-panel ant-collapse-panel-active">
              <div class="ant-collapse-body semantic-mark-body">
                <p>
                  This is panel body
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
```
