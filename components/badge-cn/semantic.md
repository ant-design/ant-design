## Badge

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含相对定位、行内块布局、适应内容宽度等基础布局样式
- indicator（`semantic-mark-indicator`）: 指示器元素，包含定位、层级、尺寸、颜色、字体、文本对齐、背景、圆角、阴影、过渡动画等完整的徽标样式

### 使用案例

```tsx
<Badge
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    indicator: "semantic-mark-indicator"
  }}
/>
```

### Abstract DOM Structure

```html
<span class="ant-badge semantic-mark-root css-var-test-id">
        <span class="ant-avatar ant-avatar-lg ant-avatar-square css-var-test-id ant-avatar-css-var">
          <span class="ant-avatar-string" style="-webkit-transform: scale(1); transform: scale(1);">
        </span>
        <sup class="ant-scroll-number semantic-mark-indicator ant-badge-count" data-show="true" title="5">
          <bdi>
            <span class="ant-scroll-number-only" style="transition: none;">
              <span class="ant-scroll-number-only-unit current">
                5
              </span>
            </span>
          </bdi>
        </sup>
      </span>
    </span>
```
