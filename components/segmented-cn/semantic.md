## Segmented

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置行内块布局、内边距、背景色、圆角、过渡动画和容器样式
- item（`semantic-mark-item`）: 选项元素，设置相对定位、文本对齐、光标样式、过渡动画、选中态背景色和悬停态样式
- icon（`semantic-mark-icon`）: 图标元素，设置图标的尺寸、颜色和与文本的间距样式
- label（`semantic-mark-label`）: 标签内容元素，设置最小高度、行高、内边距、文本省略和内容布局样式

### 使用案例

```tsx
<Segmented
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    icon: "semantic-mark-icon",
    label: "semantic-mark-label"
  }}
/>
```

### Abstract DOM Structure

```html
<div aria-label="segmented control" aria-orientation="horizontal" class="ant-segmented semantic-mark-root css-var-test-id" role="radiogroup" tabindex="0">
        <div class="ant-segmented-group">
          <label class="ant-segmented-item semantic-mark-item ant-segmented-item-selected">
            <input checked="" class="ant-segmented-item-input" name="test-id" type="radio">
            <div class="ant-segmented-item-label semantic-mark-label">
              <span class="ant-segmented-item-icon semantic-mark-icon">
                <span aria-label="bars" class="anticon anticon-bars" role="img">
                  <svg aria-hidden="true" data-icon="bars" fill="currentColor" focusable="false" height="1em" viewBox="0 0 1024 1024" width="1em">
                    <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                  </svg>
                </span>
              </span>
              <span>
                List
              </span>
            </div>
          </label>
          <label class="ant-segmented-item semantic-mark-item">
            <input class="ant-segmented-item-input" name="test-id" type="radio">
            <div class="ant-segmented-item-label semantic-mark-label">
              <span class="ant-segmented-item-icon semantic-mark-icon">
                <span aria-label="appstore" class="anticon anticon-appstore" role="img">
                  <svg aria-hidden="true" data-icon="appstore" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z"></path>
                  </svg>
                </span>
              </span>
              <span>
                Kanban
              </span>
            </div>
          </label>
        </div>
      </div>
```
