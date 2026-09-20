## Timeline

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，设置时间轴容器的列表样式重置、垂直布局、点状图标、轮廓样式、交替布局等基础容器样式
- item（`semantic-mark-item`）: 节点元素，设置单个时间节点的相对定位、外边距、内边距、字体大小、完成状态、颜色主题、布局方向等节点基础样式
- itemWrapper（`semantic-mark-itemWrapper`）: 节点包装元素，设置时间节点内容的包装容器样式
- itemIcon（`semantic-mark-itemIcon`）: 节点图标元素，设置节点头部图标的绝对定位、宽高尺寸、背景色、边框、圆角、波纹动画等图标样式
- itemHeader（`semantic-mark-itemHeader`）: 节点头部元素，设置包含标题和连接线的头部区域布局、对齐方式、文本方向等样式
- itemTitle（`semantic-mark-itemTitle`）: 节点标题元素，设置节点标题文字的字体大小、行高、颜色等文本样式
- itemSection（`semantic-mark-itemSection`）: 节点区域元素，设置包含头部和内容的区域容器的Flex布局、换行、间距等布局样式
- itemContent（`semantic-mark-itemContent`）: 节点内容元素，设置节点详细内容的相对定位、顶部偏移、左侧外边距、文字颜色、词汇换行等内容样式
- itemRail（`semantic-mark-itemRail`）: 节点连接线元素，设置连接时间节点的轨道线条的绝对定位、顶部偏移、左侧偏移、高度、边框颜色、宽度、样式等连接线样式

### 使用案例

```tsx
<Timeline
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemWrapper: "semantic-mark-itemWrapper",
    itemIcon: "semantic-mark-itemIcon",
    itemHeader: "semantic-mark-itemHeader",
    itemTitle: "semantic-mark-itemTitle",
    itemSection: "semantic-mark-itemSection",
    itemContent: "semantic-mark-itemContent",
    itemRail: "semantic-mark-itemRail"
  }}
/>
```

### Abstract DOM Structure

```html
<ol class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-outlined ant-steps-dot ant-timeline css-var-test-id ant-timeline-layout-alternate css-var-test-id semantic-mark-root" style="--ant-cmp-steps-items-offset: 0;">
        <li class="ant-steps-item ant-steps-item-finish ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-itemTitle">
                  2015-09-01
                </div>
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-itemRail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Create a services
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-itemTitle">
                  2015-09-01 09:12:11
                </div>
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-itemRail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Solve initial network problems
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-steps-item-empty-header ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-itemRail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Technical testing
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-steps-item-active ant-timeline-item-placement-start ant-timeline-item semantic-mark-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-itemWrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-itemIcon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-itemSection">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-itemHeader">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-itemTitle">
                  2015-09-01 09:12:11
                </div>
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-itemContent">
                Network problems being solved
              </div>
            </div>
          </div>
        </div></li>
      </ol>
```
