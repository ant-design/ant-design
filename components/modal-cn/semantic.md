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
- close（`semantic-mark-close`）: 预览关闭按钮元素，设置按钮的基础样式

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
    footer: "semantic-mark-footer",
    close: "semantic-mark-close"
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
                <button aria-label="Close" class="ant-modal-close semantic-mark-close" type="button">
                  <span aria-label="Close" class="ant-modal-close-x">
                    <span aria-label="close" class="anticon anticon-close ant-modal-close-icon" role="img">
                      <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
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
