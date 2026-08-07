## Notification

### Semantic Parts

- list（`semantic-mark-list`）: Notification list root element, set positioning, z-index, width, scroll area and placement styles
- listContent（`semantic-mark-listContent`）: Notification list content element, set notice layout, gap and height transition styles
- root（`semantic-mark-root`）: Notice root element, set background color, border radius, shadow, padding and animation styles
- wrapper（`semantic-mark-wrapper`）: Wrapper element for icon and content with content layout styles
- icon（`semantic-mark-icon`）: Icon element, set absolute positioning, font size, line height and status color styles
- section（`semantic-mark-section`）: Content section element that contains title and description
- title（`semantic-mark-title`）: Title element, set color, font size, line height and margin styles
- description（`semantic-mark-description`）: Description element, set font size, color and margin styles
- actions（`semantic-mark-actions`）: Actions element, set float right, top margin and action button layout styles
- close（`semantic-mark-close`）: Close button element, set position, size and interaction styles
- progress（`semantic-mark-progress`）: Progress element, set progress styles for auto-closing notifications

### Usage Example

```tsx
<Notification
  {...otherProps}
  classNames={{
    list: "semantic-mark-list",
    listContent: "semantic-mark-listContent",
    root: "semantic-mark-root",
    wrapper: "semantic-mark-wrapper",
    icon: "semantic-mark-icon",
    section: "semantic-mark-section",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    actions: "semantic-mark-actions",
    close: "semantic-mark-close",
    progress: "semantic-mark-progress"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-notification ant-notification-list ant-notification-topRight css-var-test-id ant-notification-css-var semantic-mark-list" style="position: relative; inset: auto; width: 432px; max-width: 100%; height: auto; padding: 24px; transform: none;">
        <div class="ant-notification-list-content ant-notification-list-content-increase semantic-mark-listContent" style="height: 0px; --top-notificiation-height: 0px; --top-notificiation-width: 0px;">
          <div class="ant-notification-notice ant-notification-notice-success semantic-mark-root ant-notification-notice-closable" data-notification-index="1" role="alert" style="--notification-index: 1; --notification-y: 0px;">
            <div class="ant-notification-notice-wrapper semantic-mark-wrapper">
              <div class="ant-notification-notice-icon semantic-mark-icon ant-notification-notice-icon-success">
                <span aria-label="check-circle" class="anticon anticon-check-circle" role="img">
                  <svg aria-hidden="true" data-icon="check-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-notification-notice-section semantic-mark-section">
                <div class="ant-notification-notice-title semantic-mark-title">
                  Hello World!
                </div>
                <div class="ant-notification-notice-description semantic-mark-description">
                  Hello World?
                </div>
              </div>
            </div>
            <div class="ant-notification-notice-actions semantic-mark-actions">
              <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm" type="button">
                <span>
                  My Button
                </span>
              </button>
            </div>
            <button aria-label="Close" class="ant-notification-notice-close semantic-mark-close">
              <span aria-label="close" class="anticon anticon-close ant-notification-notice-close-icon" role="img">
                <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="ant-notification-notice ant-notification-notice-info semantic-mark-root ant-notification-notice-closable" data-notification-index="0" role="alert" style="--notification-index: 0; --notification-y: 0px;">
            <div class="ant-notification-notice-wrapper semantic-mark-wrapper">
              <div class="ant-notification-notice-icon semantic-mark-icon ant-notification-notice-icon-info">
                <span aria-label="info-circle" class="anticon anticon-info-circle" role="img">
                  <svg aria-hidden="true" data-icon="info-circle" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
                  </svg>
                </span>
              </div>
              <div class="ant-notification-notice-section semantic-mark-section">
                <div class="ant-notification-notice-title semantic-mark-title">
                  Welcome back!
                </div>
                <div class="ant-notification-notice-description semantic-mark-description">
                  This is another notification.
                </div>
              </div>
            </div>
            <button aria-label="Close" class="ant-notification-notice-close semantic-mark-close">
              <span aria-label="close" class="anticon anticon-close ant-notification-notice-close-icon" role="img">
                <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </span>
            </button>
            <progress class="ant-notification-notice-progress semantic-mark-progress" max="100" value="100">
          </progress></div>
        </div>
      </div>
```
