## Progress

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置相对定位和基础容器样式
- body（`semantic-mark-body`）: 主体元素，设置进度条的布局和尺寸样式
- rail（`semantic-mark-rail`）: 导轨元素，设置背景轨道的颜色和圆角样式，steps 模式下没有该元素
- track（`semantic-mark-track`）: 轨迹元素，设置进度填充部分的颜色和过渡动画样式
- indicator（`semantic-mark-indicator`）: 指示器元素，设置百分比文本或图标的位置和字体样式

### 使用案例

```tsx
<Progress
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    body: "semantic-mark-body",
    rail: "semantic-mark-rail",
    track: "semantic-mark-track",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle ant-flex-vertical" style="width: 100%;">
        <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-middle">
          <div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented css-var-test-id" role="radiogroup" tabindex="0">
            <div class="ant-segmented-group">
              <label class="ant-segmented-item ant-segmented-item-selected">
                <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="line">
                  line
                </div>
              </label>
              <label class="ant-segmented-item">
                <input class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="steps">
                  steps
                </div>
              </label>
              <label class="ant-segmented-item">
                <input class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="circle">
                  circle
                </div>
              </label>
              <label class="ant-segmented-item">
                <input class="ant-segmented-item-input" name="test-id" type="radio">
                <div class="ant-segmented-item-label" title="dashboard">
                  dashboard
                </div>
              </label>
            </div>
          </div>
          <button aria-checked="false" class="ant-switch css-var-test-id" role="switch" type="button">
            <div class="ant-switch-handle">
            <span class="ant-switch-inner">
              <span class="ant-switch-inner-checked">
                Gradient
              </span>
              <span class="ant-switch-inner-unchecked">
                Gradient
              </span>
            </span>
          </div></button>
        </div>
        <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-vertical" style="height: 200px; width: 100%;">
          <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="80" class="ant-progress ant-progress-status-normal ant-progress-line ant-progress-line-align-end ant-progress-line-position-outer ant-progress-show-info ant-progress-default semantic-mark-root css-var-test-id" role="progressbar">
            <div class="ant-progress-body semantic-mark-body" style="width: 100%;">
              <div class="ant-progress-rail semantic-mark-rail" style="height: 8px;">
                <div class="ant-progress-track semantic-mark-track" style="width: 80%; height: 8px;">
              </div>
              <span class="ant-progress-indicator ant-progress-indicator-end ant-progress-indicator-outer semantic-mark-indicator" title="80%">
                80%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
```
