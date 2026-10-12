## Timeline.Items

### Semantic Parts

- root（`semantic-mark-root`）: Root element
- wrapper（`semantic-mark-wrapper`）: Item wrapper element
- icon（`semantic-mark-icon`）: Item icon element
- header（`semantic-mark-header`）: Item header element
- title（`semantic-mark-title`）: Item title element
- section（`semantic-mark-section`）: Item section element
- content（`semantic-mark-content`）: Item content element
- rail（`semantic-mark-rail`）: Item rail element

### Usage Example

```tsx
<Timeline.Items
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    wrapper: "semantic-mark-wrapper",
    icon: "semantic-mark-icon",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    section: "semantic-mark-section",
    content: "semantic-mark-content",
    rail: "semantic-mark-rail"
  }}
/>
```

### Abstract DOM Structure

```html
<ol class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-outlined ant-steps-dot ant-timeline css-var-test-id ant-timeline-layout-alternate css-var-test-id" style="--ant-cmp-steps-items-offset: 0;">
        <li class="ant-steps-item ant-steps-item-finish ant-timeline-item-placement-start ant-timeline-item semantic-mark-root">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper semantic-mark-wrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon semantic-mark-icon">
            <div class="ant-steps-item-section ant-timeline-item-section semantic-mark-section">
              <div class="ant-steps-item-header ant-timeline-item-header semantic-mark-header">
                <div class="ant-steps-item-title ant-timeline-item-title semantic-mark-title">
                  2015-09-01 09:12:11
                </div>
                <div class="ant-steps-item-rail ant-steps-item-rail-finish ant-timeline-item-rail semantic-mark-rail">
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content semantic-mark-content">
                Solve initial network problems
              </div>
            </div>
          </div>
        </div></div></li>
        <li class="ant-steps-item ant-steps-item-finish ant-steps-item-active ant-timeline-item-placement-start ant-timeline-item">
          <div class="ant-steps-item-wrapper ant-timeline-item-wrapper">
            <div class="ant-steps-item-icon ant-wave-target ant-timeline-item-icon">
            <div class="ant-steps-item-section ant-timeline-item-section">
              <div class="ant-steps-item-header ant-timeline-item-header">
                <div class="ant-steps-item-title ant-timeline-item-title">
                  2015-09-01 11:11:11
                </div>
              </div>
              <div class="ant-steps-item-content ant-timeline-item-content">
                Technical testing
              </div>
            </div>
          </div>
        </div></li>
      </ol>
```
