## FloatButton.Group

### Semantic Parts

- root（`semantic-mark-root`）: Root element with float button group container styles, fixed positioning, z-index, padding, gap, direction mode and other combined layout styles
- list（`semantic-mark-list`）: List element with button group list flex layout, border radius, shadow, animation transition, vertical alignment and other list container styles
- item（`semantic-mark-item`）: Item element with individual float button styles, size, shape, type, state, icon content and other button base styles
- itemIcon（`semantic-mark-itemIcon`）: Item icon element with float button icon size, color, alignment and other icon display styles
- itemContent（`semantic-mark-itemContent`）: Item content element with float button text content, badge, description and other content area styles
- trigger（`semantic-mark-trigger`）: Trigger element with menu mode trigger button styles, shape, icon, hover state, expand/collapse state and other interaction styles
- triggerIcon（`semantic-mark-triggerIcon`）: Trigger icon element with trigger button icon styles, rotation animation, toggle state and other icon interaction styles
- triggerContent（`semantic-mark-triggerContent`）: Trigger content element with trigger button content area text, identifier, state indicator and other content styles

### Usage Example

```tsx
<FloatButton.Group
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    list: "semantic-mark-list",
    item: "semantic-mark-item",
    itemIcon: "semantic-mark-itemIcon",
    itemContent: "semantic-mark-itemContent",
    trigger: "semantic-mark-trigger",
    triggerIcon: "semantic-mark-triggerIcon",
    triggerContent: "semantic-mark-triggerContent"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-float-btn-group css-var-test-id ant-float-btn-css-var semantic-mark-root ant-float-btn-pure ant-float-btn-group-top ant-float-btn-group-menu-mode">
        <div class="ant-space-compact ant-space-compact-vertical ant-float-btn-group-list semantic-mark-list">
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-lg ant-btn-compact-vertical-item ant-btn-compact-vertical-first-item css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-default ant-float-btn-square semantic-mark-item" type="button">
            <span class="ant-btn-icon ant-float-btn-icon semantic-mark-itemIcon">
              <span aria-label="alert" class="anticon anticon-alert" role="img">
                <svg aria-hidden="true" data-icon="alert" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 00-11.3 0l-39.6 39.6a8.03 8.03 0 000 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 00-11.3 0l-67.9 67.9a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-float-btn-content semantic-mark-itemContent">
              warn
            </span>
          </button>
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-lg ant-btn-compact-vertical-item css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-default ant-float-btn-square semantic-mark-item" type="button">
            <span class="ant-btn-icon ant-float-btn-icon semantic-mark-itemIcon">
              <span aria-label="bug" class="anticon anticon-bug" role="img">
                <svg aria-hidden="true" data-icon="bug" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M304 280h56c4.4 0 8-3.6 8-8 0-28.3 5.9-53.2 17.1-73.5 10.6-19.4 26-34.8 45.4-45.4C450.9 142 475.7 136 504 136h16c28.3 0 53.2 5.9 73.5 17.1 19.4 10.6 34.8 26 45.4 45.4C650 218.9 656 243.7 656 272c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1a184.31 184.31 0 00-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9a184.31 184.31 0 00-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z"></path>
                  <path d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8a63 63 0 01-63 63H232a63 63 0 01-63-63c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5.2 13 .7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7a273 273 0 0022.7 49c24.3 41.5 59 76.2 100.5 100.5S460.5 960 512 960s99.8-13.9 141.3-38.2a281.38 281.38 0 00123.2-149.5A120 120 0 01836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7.4-6.4.7-12.8.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM716 680c0 36.8-9.7 72-27.8 102.9-17.7 30.3-43 55.6-73.3 73.3C584 874.3 548.8 884 512 884s-72-9.7-102.9-27.8c-30.3-17.7-55.6-43-73.3-73.3A202.75 202.75 0 01308 680V412h408v268z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-float-btn-content semantic-mark-itemContent">
              bug
            </span>
          </button>
          <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-lg ant-btn-compact-vertical-item ant-btn-compact-vertical-last-item css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-default ant-float-btn-square semantic-mark-item" type="button">
            <span class="ant-btn-icon ant-float-btn-icon semantic-mark-itemIcon">
              <span aria-label="bulb" class="anticon anticon-bulb" role="img">
                <svg aria-hidden="true" data-icon="bulb" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M632 888H392c-4.4 0-8 3.6-8 8v32c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-32c0-4.4-3.6-8-8-8zM512 64c-181.1 0-328 146.9-328 328 0 121.4 66 227.4 164 284.1V792c0 17.7 14.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98-56.7 164-162.7 164-284.1 0-181.1-146.9-328-328-328zm127.9 549.8L604 634.6V752H420V634.6l-35.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4 114.6-256 256-256s256 114.6 256 256c0 92.5-49.4 176.3-128.1 221.8z"></path>
                </svg>
              </span>
            </span>
            <span class="ant-float-btn-content semantic-mark-itemContent">
              idea
            </span>
          </button>
        </div>
        <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-lg css-var-test-id ant-float-btn-css-var ant-float-btn ant-float-btn-group-trigger ant-float-btn-primary ant-float-btn-square ant-float-btn-individual semantic-mark-trigger" type="button">
          <span class="ant-btn-icon ant-float-btn-icon semantic-mark-triggerIcon">
            <span aria-label="close" class="anticon anticon-close" role="img">
              <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
              </svg>
            </span>
          </span>
          <span class="ant-float-btn-content semantic-mark-triggerContent">
            back
          </span>
        </button>
      </div>
```
