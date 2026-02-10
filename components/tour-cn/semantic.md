## Tour

### Semantic Parts

- root（`semantic-mark-root`）: 引导根容器，设置绝对定位、层级控制、最大宽度、可见性、箭头背景色变量、主题样式等容器样式
- cover（`semantic-mark-cover`）: 卡片封面区域，设置文本居中对齐、内边距、图片宽度等图片展示样式
- section（`semantic-mark-section`）: 卡片主要内容区域，设置文本对齐、边框圆角、盒阴影、相对定位、背景色、边框、背景裁剪等卡片样式
- footer（`semantic-mark-footer`）: 卡片底部操作区域，设置内边距、文本右对齐、边框圆角、Flex布局等底部容器样式
- actions（`semantic-mark-actions`）: 操作按钮组容器，设置左侧自动外边距、按钮间距等按钮组布局样式
- indicator（`semantic-mark-indicator`）: 单个指示器元素，设置宽高尺寸、行内块显示、圆角、背景色、右外边距、激活状态等圆点样式
- indicators（`semantic-mark-indicators`）: 指示器组容器，设置行内块显示等指示器容器样式
- header（`semantic-mark-header`）: 卡片头部区域，设置内边距、宽度计算、词汇换行等头部容器样式
- title（`semantic-mark-title`）: 引导标题文字，设置字体粗细等标题文本样式
- description（`semantic-mark-description`）: 引导描述文字，设置内边距、词汇换行等描述文本样式
- mask（`semantic-mark-mask`）: 遮罩层元素，设置固定定位、全屏覆盖、层级、指针事件、过渡动画等遮罩样式

### 使用案例

```tsx
<Tour
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    cover: "semantic-mark-cover",
    section: "semantic-mark-section",
    footer: "semantic-mark-footer",
    actions: "semantic-mark-actions",
    indicator: "semantic-mark-indicator",
    indicators: "semantic-mark-indicators",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    mask: "semantic-mark-mask"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%; height: 825px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
          <span>
            Show
          </span>
        </button>
        <div class="ant-tour css-var-test-id semantic-mark-root ant-tour-placement-bottom" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1;">
          <div class="ant-tour-arrow" style="position: absolute; top: 0px; left: 0px;">
          <div class="ant-tour-panel">
            <div class="ant-tour-section semantic-mark-section">
              <button aria-label="Close" class="ant-tour-close" type="button">
                <span aria-label="close" class="anticon anticon-close ant-tour-close-icon" role="img">
                  <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                  </svg>
                </span>
              </button>
              <div class="ant-tour-cover semantic-mark-cover">
                <img alt="tour.png" src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png">
              </div>
              <div class="ant-tour-header semantic-mark-header">
                <div class="ant-tour-title semantic-mark-title">
                  Hello World!
                </div>
              </div>
              <div class="ant-tour-description semantic-mark-description">
                Hello World?!
              </div>
              <div class="ant-tour-footer semantic-mark-footer">
                <div class="ant-tour-indicators semantic-mark-indicators">
                  <span class="ant-tour-indicator-active ant-tour-indicator semantic-mark-indicator">
                  <span class="ant-tour-indicator semantic-mark-indicator">
                </span></span></div>
                <div class="ant-tour-actions semantic-mark-actions">
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-tour-next-btn" type="button">
                    <span>
                      Next
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
