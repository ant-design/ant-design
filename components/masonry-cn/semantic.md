## Masonry

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置相对定位、flex布局和瀑布流容器样式
- item（`semantic-mark-item`）: 条目元素，设置绝对定位、宽度计算、过渡动画和瀑布流项目样式

### 使用案例

```tsx
<Masonry
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-masonry semantic-mark-root css-var-test-id" style="height: 0px; width: 100%;">
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 75px;">
            <div class="ant-card-body">
              1
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 50px;">
            <div class="ant-card-body">
              2
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 70px;">
            <div class="ant-card-body">
              3
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 60px;">
            <div class="ant-card-body">
              4
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 85px;">
            <div class="ant-card-body">
              5
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 75px;">
            <div class="ant-card-body">
              6
            </div>
          </div>
        </div>
        <div class="ant-masonry-item semantic-mark-item" style="--ant-masonry-item-width: calc((100% + 16px) / 3); inset-inline-start: calc(var(--ant-masonry-item-width) * 0); width: calc(var(--ant-masonry-item-width) - 16px); position: absolute;">
          <div class="ant-card ant-card-bordered ant-card-small css-var-test-id" style="height: 50px;">
            <div class="ant-card-body">
              7
            </div>
          </div>
        </div>
      </div>
```
