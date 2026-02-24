## Modal

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含相对定位、顶部位置、宽度、最大宽度、外边距、底部内边距等模态框容器的基础布局样式
- mask（`semantic-mark-mask`）: 遮罩层元素，包含固定定位、层级、背景色、动画过渡等遮罩层的样式
- wrapper（`semantic-mark-wrapper`）: 包裹层元素，一般用于动画容器，包含动画和过渡效果的样式
- container（`semantic-mark-container`）: Modal 容器元素，包含相对定位、背景色、背景裁剪、边框、圆角、阴影、指针事件、内边距等模态框主体样式
- header（`semantic-mark-header`）: 头部元素，包含头部内边距、下边框等头部区域样式
- title（`semantic-mark-title`）: 标题元素，包含外边距、颜色、字体权重、字体大小、行高、文字换行等标题文字样式
- body（`semantic-mark-body`）: 内容元素，包含内容区域的背景色、内边距等内容展示样式
- footer（`semantic-mark-footer`）: 底部元素，包含底部的背景色、内边距、上边框、圆角等底部区域样式

### 使用案例

```tsx
<Modal
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    mask: "semantic-mark-mask",
    wrapper: "semantic-mark-wrapper",
    container: "semantic-mark-container",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    body: "semantic-mark-body",
    footer: "semantic-mark-footer"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute; inset: 0;">
        <div class="ant-modal-root css-var-test-id ant-modal-css-var semantic-mark-root">
          <div class="ant-modal-mask semantic-mark-mask" style="z-index: 1; position: absolute;">
          <div class="ant-modal-wrap semantic-mark-wrapper" style="z-index: 1; position: absolute;">
            <div aria-labelledby="test-id" aria-modal="true" class="ant-modal ant-zoom-appear ant-zoom-appear-prepare ant-zoom" role="dialog" style="top: 50%; transform: translateY(-50%); margin-bottom: 0px; padding-bottom: 0px; width: 400px;" tabindex="-1">
              <div class="ant-modal-container semantic-mark-container">
                <div class="ant-modal-header semantic-mark-header">
                  <div class="ant-modal-title semantic-mark-title" id="test-id">
                    Title
                  </div>
                </div>
                <div class="ant-modal-body semantic-mark-body">
                  <p>
                    Some contents...
                  </p>
                </div>
                <div class="ant-modal-footer semantic-mark-footer">
                  <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
                    <span>
                      Cancel
                    </span>
                  </button>
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid" type="button">
                    <span>
                      OK
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```
