## Card

### Semantic Parts

- root（`semantic-mark-root`）: Card root element with positioning, background, border, border-radius, box-shadow, padding and other container styles
- header（`semantic-mark-header`）: Card header area with flex layout, min-height, padding, text color, font-weight, font-size, background, bottom border and top border-radius
- body（`semantic-mark-body`）: Card content area with padding, font-size and other content display styles
- extra（`semantic-mark-extra`）: Card extra operation area in top-right corner with text color and layout styles for additional content
- title（`semantic-mark-title`）: Card title with inline-block display, flex-grow, text ellipsis and other title display styles
- actions（`semantic-mark-actions`）: Card bottom action group with flex layout, list-style reset, background, top border and bottom border-radius for action buttons container
- cover（`semantic-mark-cover`）: Title cover with styles for cover image display and layout

### Usage Example

```tsx
<Card
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    body: "semantic-mark-body",
    extra: "semantic-mark-extra",
    title: "semantic-mark-title",
    actions: "semantic-mark-actions",
    cover: "semantic-mark-cover"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="position: absolute;">
        <div class="ant-card ant-card-bordered css-var-test-id semantic-mark-root" style="width: 300px;">
          <div class="ant-card-head semantic-mark-header">
            <div class="ant-card-head-wrapper">
              <div class="ant-card-head-title semantic-mark-title">
                Card title
              </div>
              <div class="ant-card-extra semantic-mark-extra">
                More
              </div>
            </div>
          </div>
          <div class="ant-card-cover semantic-mark-cover">
            <img alt="example" draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png">
          </div>
          <div class="ant-card-body semantic-mark-body">
            <div class="ant-card-meta">
              <div class="ant-card-meta-avatar">
                <span class="ant-avatar ant-avatar-circle ant-avatar-image css-var-test-id ant-avatar-css-var">
                  <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=8">
                </span>
              </div>
              <div class="ant-card-meta-section">
                <div class="ant-card-meta-title">
                  Card Meta title
                </div>
                <div class="ant-card-meta-description">
                  This is the description
                </div>
              </div>
            </div>
          </div>
          <ul class="ant-card-actions semantic-mark-actions">
            <li style="width: 33.333333333333336%;">
              <span>
                <span aria-label="setting" class="anticon anticon-setting" role="img">
                  <svg aria-hidden="true" data-icon="setting" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path>
                  </svg>
                </span>
              </span>
            </li>
            <li style="width: 33.333333333333336%;">
              <span>
                <span aria-label="edit" class="anticon anticon-edit" role="img">
                  <svg aria-hidden="true" data-icon="edit" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
                  </svg>
                </span>
              </span>
            </li>
            <li style="width: 33.333333333333336%;">
              <span>
                <span aria-label="ellipsis" class="anticon anticon-ellipsis" role="img">
                  <svg aria-hidden="true" data-icon="ellipsis" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                  </svg>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
```
