## Timeline

### Semantic Parts

- root（`semantic-mark-root`）: Root element with timeline container list style reset, vertical layout, dot icon, outlined style, alternate layout and other basic container styles
- item（`semantic-mark-item`）: Item element with single timeline node relative positioning, margin, padding, font size, finish state, color theme, layout direction and other node basic styles
- itemWrapper（`semantic-mark-itemWrapper`）: Item wrapper element with timeline node content wrapping container styles
- itemIcon（`semantic-mark-itemIcon`）: Item icon element with node head icon absolute positioning, width/height size, background color, border, border radius, wave animation and other icon styles
- itemHeader（`semantic-mark-itemHeader`）: Item header element with header area layout containing title and rail, alignment, text direction and other styles
- itemTitle（`semantic-mark-itemTitle`）: Item title element with node title text font size, line height, color and other text styles
- itemSection（`semantic-mark-itemSection`）: Item section element with section container containing header and content flex layout, wrap, gap and other layout styles
- itemContent（`semantic-mark-itemContent`）: Item content element with node detail content relative positioning, top offset, left margin, text color, word break and other content styles
- itemRail（`semantic-mark-itemRail`）: Item rail element with timeline node connection track line absolute positioning, top offset, left offset, height, border color, width, style and other connection line styles

### Usage Example

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
