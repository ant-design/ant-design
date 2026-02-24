## Steps

### Semantic Parts

- root（`semantic-mark-root`）: Root element with flex layout, nowrap, alignment, CSS variables and other basic step container styles
- item（`semantic-mark-item`）: Step item element with flex layout, relative positioning and other basic step item container styles
- itemWrapper（`semantic-mark-itemWrapper`）: Step item wrapper element with flex layout, nowrap, top padding and other step content wrapping styles
- itemIcon（`semantic-mark-itemIcon`）: Step item icon element with icon size, positioning, font-size and other icon display related styles
- itemHeader（`semantic-mark-itemHeader`）: Step item header element with flex layout, nowrap, alignment and other header area layout styles
- itemTitle（`semantic-mark-itemTitle`）: Step item title element with color, font-size, line-height, word-break, transitions and other title text styles
- itemSubtitle（`semantic-mark-itemSubtitle`）: Step item subtitle element with color, font-weight, font-size, line-height, margin, word-break and other subtitle styles
- itemSection（`semantic-mark-itemSection`）: Step item section element with step content area layout and styling
- itemContent（`semantic-mark-itemContent`）: Step item content element with color, font-size, line-height, word-break, transitions and other content text styles
- itemRail（`semantic-mark-itemRail`）: Step item rail element with border-style, border-width, transitions and other connecting line styles

### Usage Example

```tsx
<Steps
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    itemWrapper: "semantic-mark-itemWrapper",
    itemIcon: "semantic-mark-itemIcon",
    itemHeader: "semantic-mark-itemHeader",
    itemTitle: "semantic-mark-itemTitle",
    itemSubtitle: "semantic-mark-itemSubtitle",
    itemSection: "semantic-mark-itemSection",
    itemContent: "semantic-mark-itemContent",
    itemRail: "semantic-mark-itemRail"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-large ant-flex-vertical" style="width: 100%;">
        <div class="ant-steps ant-steps-vertical ant-steps-title-horizontal ant-steps-filled css-var-test-id semantic-mark-root" style="--ant-cmp-steps-items-offset: 0; width: 100%;">
          <div class="ant-steps-item ant-steps-item-finish semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span aria-label="check" class="anticon anticon-check ant-steps-item-icon-finish" role="img">
                  <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 1
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:00">
                    00:00
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-process semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
          <div class="ant-steps-item ant-steps-item-process ant-steps-item-active semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  2
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 2
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:01">
                    00:01
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-wait semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
          <div class="ant-steps-item ant-steps-item-wait semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  3
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 3
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:02">
                    00:02
                  </div>
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-steps ant-steps-horizontal ant-steps-title-horizontal ant-steps-filled ant-steps-panel ant-steps-small css-var-test-id semantic-mark-root" style="--ant-cmp-steps-items-offset: 0; width: 100%;">
          <div class="ant-steps-item ant-steps-item-finish semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span aria-label="check" class="anticon anticon-check ant-steps-item-icon-finish" role="img">
                  <svg aria-hidden="true" data-icon="check" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 1
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:00">
                    00:00
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-process semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
          <div class="ant-steps-item ant-steps-item-process ant-steps-item-active semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  2
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 2
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:01">
                    00:01
                  </div>
                  <div class="ant-steps-item-rail ant-steps-item-rail-wait semantic-mark-itemRail">
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
          <div class="ant-steps-item ant-steps-item-wait semantic-mark-item">
            <div class="ant-steps-item-wrapper semantic-mark-itemWrapper">
              <div class="ant-steps-item-icon ant-wave-target semantic-mark-itemIcon">
                <span class="ant-steps-item-icon-number">
                  3
                </span>
              </div>
              <div class="ant-steps-item-section semantic-mark-itemSection">
                <div class="ant-steps-item-header semantic-mark-itemHeader">
                  <div class="ant-steps-item-title semantic-mark-itemTitle">
                    Step 3
                  </div>
                  <div class="ant-steps-item-subtitle semantic-mark-itemSubtitle" title="00:02">
                    00:02
                  </div>
                </div>
                <div class="ant-steps-item-content semantic-mark-itemContent">
                  This is a content.
                </div>
              </div>
            </div>
            <svg class="ant-steps-panel-arrow" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <title>
                Arrow
              </title>
              <path d="M 0 0 L 100 50 L 0 100"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-col ant-col-8 css-var-test-id">
      <ul class="acss-1ry21g5">
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  root
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              根元素，包含 flex 布局、禁止换行、对齐方式、CSS 变量等步骤条容器的基础样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  item
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项元素，包含 flex 布局、相对定位等单个步骤项的基础容器样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemWrapper
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项内裹元素，包含 flex 布局、禁止换行、顶部内边距等步骤项内容的包装样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemIcon
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项图标元素，包含图标的尺寸、定位、字体大小等图标显示相关样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemHeader
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项头部元素，包含 flex 布局、禁止换行、对齐方式等头部区域的布局样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemTitle
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项标题元素，包含颜色、字体大小、行高、文字换行、过渡动画等标题文字样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemSubtitle
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项副标题元素，包含颜色、字体权重、字体大小、行高、外边距、文字换行等副标题样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemSection
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项区域元素，包含步骤项内容区域的布局和样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemContent
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项内容元素，包含颜色、字体大小、行高、文字换行、过渡动画等内容文字样式
            </div>
          </div>
        </li>
        <li class="acss-1ehfz5v">
          <div class="ant-flex css-var-test-id ant-flex-align-stretch ant-flex-gap-small ant-flex-vertical">
            <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-justify-space-between ant-flex-gap-small">
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <h5 class="ant-typography css-var-test-id" style="margin: 0px;">
                  itemRail
                </h5>
              </div>
              <div class="ant-flex css-var-test-id ant-flex-align-center ant-flex-gap-small">
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="pushpin" class="anticon anticon-pushpin" role="img">
                      <svg aria-hidden="true" data-icon="pushpin" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 00-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 00-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 01-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
                <button aria-hidden="true" class="ant-btn css-var-test-id ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-sm ant-btn-icon-only" type="button">
                  <span class="ant-btn-icon">
                    <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                      <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
            <div class="ant-typography css-var-test-id" style="margin: 0px; font-size: 12px;">
              步骤项连接线元素，包含边框样式、边框宽度、过渡动画等连接线的样式
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div></div>
```
