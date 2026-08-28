## Tabs

### Semantic Parts

- root（`semantic-mark-root`）: Root element with basic tab container styles, layout and direction control
- item（`semantic-mark-item`）: Item element with relative positioning, padding, colors, text ellipsis, border-radius, transitions and other tab item styles and interactive effects
- remove（`semantic-mark-remove`）: Remove button element with editable tab close button size, color, hover state and other interactive feedback styles
- header（`semantic-mark-header`）: Header element with tab navigation header layout, background, borders and other styles
- indicator（`semantic-mark-indicator`）: Indicator element with indicator bar color, position, dimensions, transitions and other active state indication styles
- body（`semantic-mark-body`）: Body element with tab panel container layout, animation and size control styles
- content（`semantic-mark-content`）: Content element with single tab panel layout, padding and other content display styles
- popup.root（`semantic-mark-popup-root`）: Popup menu element with dropdown absolute positioning, z-index, display control, max-height, scrolling and other styles

### Usage Example

```tsx
<Tabs
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    item: "semantic-mark-item",
    remove: "semantic-mark-remove",
    header: "semantic-mark-header",
    indicator: "semantic-mark-indicator",
    body: "semantic-mark-body",
    content: "semantic-mark-content",
    popup.root: "semantic-mark-popup-root"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-tabs ant-tabs-top ant-tabs-editable ant-tabs-card ant-tabs-editable-card semantic-mark-root css-var-test-id ant-tabs-css-var" style="height: 220px; width: 100%;">
        <div aria-orientation="horizontal" class="ant-tabs-nav semantic-mark-header" role="tablist">
          <div class="ant-tabs-nav-wrap">
            <div class="ant-tabs-nav-list" style="transform: translate(0px, 0px);">
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="0">
                <div aria-controls="rc-tabs-test-panel-0" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-0" role="tab" tabindex="-1">
                  Tab-0
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove ant-tabs-tab-active" data-node-key="1">
                <div aria-controls="rc-tabs-test-panel-1" aria-disabled="false" aria-selected="true" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-1" role="tab" tabindex="0">
                  Tab-1
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="0" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="2">
                <div aria-controls="rc-tabs-test-panel-2" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-2" role="tab" tabindex="-1">
                  Tab-2
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="3">
                <div aria-controls="rc-tabs-test-panel-3" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-3" role="tab" tabindex="-1">
                  Tab-3
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="4">
                <div aria-controls="rc-tabs-test-panel-4" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-4" role="tab" tabindex="-1">
                  Tab-4
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="5">
                <div aria-controls="rc-tabs-test-panel-5" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-5" role="tab" tabindex="-1">
                  Tab-5
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="6">
                <div aria-controls="rc-tabs-test-panel-6" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-6" role="tab" tabindex="-1">
                  Tab-6
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="7">
                <div aria-controls="rc-tabs-test-panel-7" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-7" role="tab" tabindex="-1">
                  Tab-7
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="8">
                <div aria-controls="rc-tabs-test-panel-8" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-8" role="tab" tabindex="-1">
                  Tab-8
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="9">
                <div aria-controls="rc-tabs-test-panel-9" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-9" role="tab" tabindex="-1">
                  Tab-9
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="10">
                <div aria-controls="rc-tabs-test-panel-10" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-10" role="tab" tabindex="-1">
                  Tab-10
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="11">
                <div aria-controls="rc-tabs-test-panel-11" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-11" role="tab" tabindex="-1">
                  Tab-11
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="12">
                <div aria-controls="rc-tabs-test-panel-12" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-12" role="tab" tabindex="-1">
                  Tab-12
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="13">
                <div aria-controls="rc-tabs-test-panel-13" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-13" role="tab" tabindex="-1">
                  Tab-13
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="14">
                <div aria-controls="rc-tabs-test-panel-14" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-14" role="tab" tabindex="-1">
                  Tab-14
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="15">
                <div aria-controls="rc-tabs-test-panel-15" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-15" role="tab" tabindex="-1">
                  Tab-15
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="16">
                <div aria-controls="rc-tabs-test-panel-16" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-16" role="tab" tabindex="-1">
                  Tab-16
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="17">
                <div aria-controls="rc-tabs-test-panel-17" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-17" role="tab" tabindex="-1">
                  Tab-17
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="18">
                <div aria-controls="rc-tabs-test-panel-18" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-18" role="tab" tabindex="-1">
                  Tab-18
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="19">
                <div aria-controls="rc-tabs-test-panel-19" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-19" role="tab" tabindex="-1">
                  Tab-19
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="20">
                <div aria-controls="rc-tabs-test-panel-20" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-20" role="tab" tabindex="-1">
                  Tab-20
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="21">
                <div aria-controls="rc-tabs-test-panel-21" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-21" role="tab" tabindex="-1">
                  Tab-21
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="22">
                <div aria-controls="rc-tabs-test-panel-22" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-22" role="tab" tabindex="-1">
                  Tab-22
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="23">
                <div aria-controls="rc-tabs-test-panel-23" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-23" role="tab" tabindex="-1">
                  Tab-23
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="24">
                <div aria-controls="rc-tabs-test-panel-24" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-24" role="tab" tabindex="-1">
                  Tab-24
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="25">
                <div aria-controls="rc-tabs-test-panel-25" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-25" role="tab" tabindex="-1">
                  Tab-25
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="26">
                <div aria-controls="rc-tabs-test-panel-26" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-26" role="tab" tabindex="-1">
                  Tab-26
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="27">
                <div aria-controls="rc-tabs-test-panel-27" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-27" role="tab" tabindex="-1">
                  Tab-27
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-disabled" data-node-key="28">
                <div aria-controls="rc-tabs-test-panel-28" aria-disabled="true" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-28" role="tab">
                  Tab-28
                </div>
              </div>
              <div class="ant-tabs-tab semantic-mark-item ant-tabs-tab-with-remove" data-node-key="29">
                <div aria-controls="rc-tabs-test-panel-29" aria-disabled="false" aria-selected="false" class="ant-tabs-tab-btn" id="rc-tabs-test-tab-29" role="tab" tabindex="-1">
                  Tab-29
                </div>
                <button aria-label="remove" class="ant-tabs-tab-remove semantic-mark-remove" tabindex="-1" type="button">
                  <span aria-label="close" class="anticon anticon-close" role="img">
                    <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <button aria-label="Add tab" class="ant-tabs-nav-add" type="button">
                <span aria-label="plus" class="anticon anticon-plus" role="img">
                  <svg aria-hidden="true" data-icon="plus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                    <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
                  </svg>
                </span>
              </button>
              <div class="ant-tabs-ink-bar semantic-mark-indicator ant-tabs-ink-bar-animated" style="visibility: visible;">
            </div>
          </div>
          <div class="ant-tabs-nav-operations ant-tabs-nav-operations-hidden">
            <button aria-controls="rc-tabs-test-more-popup" aria-expanded="false" aria-haspopup="listbox" class="ant-tabs-nav-more" id="rc-tabs-test-more" style="visibility: hidden; order: 1;" type="button">
              <span aria-label="ellipsis" class="anticon anticon-ellipsis" role="img">
                <svg aria-hidden="true" data-icon="ellipsis" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                </svg>
              </span>
            </button>
            <button aria-label="Add tab" class="ant-tabs-nav-add" type="button">
              <span aria-label="plus" class="anticon anticon-plus" role="img">
                <svg aria-hidden="true" data-icon="plus" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                  <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div class="ant-tabs-body-holder">
          <div class="ant-tabs-body ant-tabs-body-top semantic-mark-body">
            <div aria-hidden="false" aria-labelledby="rc-tabs-test-tab-1" class="ant-tabs-content ant-tabs-content-active semantic-mark-content" id="rc-tabs-test-panel-1" role="tabpanel" tabindex="0">
              Content of tab 1
            </div>
          </div>
        </div>
      </div>
    </div>
```
