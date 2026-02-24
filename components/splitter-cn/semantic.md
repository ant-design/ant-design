## Splitter

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置flex布局、宽度高度、对齐方式和拉伸样式
- panel（`semantic-mark-panel`）: 面板元素，设置flex基础值、增长比例和面板容器样式
- dragger（`semantic-mark-dragger`）: 拖拽控制元素，设置绝对定位、用户选择、层级、居中对齐、背景色、悬停态和激活态样式

### 使用案例

```tsx
<Splitter
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    panel: "semantic-mark-panel",
    dragger: "semantic-mark-dragger"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-splitter ant-splitter-horizontal semantic-mark-root css-var-test-id ant-splitter-css-var" style="height: 200px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div class="ant-splitter-panel semantic-mark-panel" style="flex-basis: auto; flex-grow: 1;">
          <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-center" style="height: 100%;">
            <h5 class="ant-typography ant-typography-secondary css-var-test-id" style="white-space: nowrap;">
              First
            </h5>
          </div>
        </div>
        <div aria-valuemax="0" aria-valuemin="0" aria-valuenow="50" class="ant-splitter-bar" role="separator">
          <div class="ant-splitter-bar-dragger semantic-mark-dragger">
        </div>
        <div class="ant-splitter-panel semantic-mark-panel" style="flex-basis: auto; flex-grow: 1;">
          <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-center" style="height: 100%;">
            <h5 class="ant-typography ant-typography-secondary css-var-test-id" style="white-space: nowrap;">
              Second
            </h5>
          </div>
        </div>
      </div>
    </div>
```
