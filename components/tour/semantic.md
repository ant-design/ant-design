## Tour

### Semantic Parts

- root（`semantic-mark-root`）: Tour root container with absolute positioning, z-index control, max width, visibility, arrow background color variable, theme styles and other container styles
- cover（`semantic-mark-cover`）: Card cover area with text center alignment, padding, image width and other image display styles
- section（`semantic-mark-section`）: Card main content area with text alignment, border radius, box shadow, relative positioning, background color, border, background clip and other card styles
- footer（`semantic-mark-footer`）: Card bottom action area with padding, text right alignment, border radius, flex layout and other bottom container styles
- actions（`semantic-mark-actions`）: Action button group container with left auto margin, button spacing and other button group layout styles
- indicator（`semantic-mark-indicator`）: Single indicator element with width/height size, inline-block display, border radius, background color, right margin, active state and other dot styles
- indicators（`semantic-mark-indicators`）: Indicator group container with inline-block display and other indicator container styles
- header（`semantic-mark-header`）: Card header area with padding, width calculation, word break and other header container styles
- title（`semantic-mark-title`）: Guide title text with font weight and other title text styles
- description（`semantic-mark-description`）: Guide description text with padding, word wrap and other description text styles
- mask（`semantic-mark-mask`）: Mask layer element with fixed positioning, full screen coverage, z-index, pointer events, transition animation and other mask styles

### Usage Example

```tsx
<Tour
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    cover: "semantic-mark-cover",
    section: "semantic-mark-section",
    footer: "semantic-mark-footer",
    actions: "semantic-mark-actions",
    indicator: "semantic-mark-indicator",
    indicators: "semantic-mark-indicators",
    header: "semantic-mark-header",
    title: "semantic-mark-title",
    description: "semantic-mark-description",
    mask: "semantic-mark-mask"
  }}
/>
```

### Abstract DOM Structure

```html
<div style="width: 100%; height: 825px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        <button class="ant-btn css-var-test-id ant-btn-default ant-btn-color-default ant-btn-variant-outlined" type="button">
          <span>
            Show
          </span>
        </button>
        <div class="ant-tour css-var-test-id semantic-mark-root ant-tour-placement-bottom" style="--arrow-x: 0px; --arrow-y: 0px; left: -1000vw; top: -1000vh; right: auto; bottom: auto; box-sizing: border-box; z-index: 1;">
          <div class="ant-tour-arrow" style="position: absolute; top: 0px; left: 0px;">
          <div class="ant-tour-panel">
            <div class="ant-tour-section semantic-mark-section">
              <button aria-label="Close" class="ant-tour-close" type="button">
                <span aria-label="close" class="anticon anticon-close ant-tour-close-icon" role="img">
                  <svg aria-hidden="true" data-icon="close" fill="currentColor" fill-rule="evenodd" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                  </svg>
                </span>
              </button>
              <div class="ant-tour-cover semantic-mark-cover">
                <img alt="tour.png" src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png">
              </div>
              <div class="ant-tour-header semantic-mark-header">
                <div class="ant-tour-title semantic-mark-title">
                  Hello World!
                </div>
              </div>
              <div class="ant-tour-description semantic-mark-description">
                Hello World?!
              </div>
              <div class="ant-tour-footer semantic-mark-footer">
                <div class="ant-tour-indicators semantic-mark-indicators">
                  <span class="ant-tour-indicator-active ant-tour-indicator semantic-mark-indicator">
                  <span class="ant-tour-indicator semantic-mark-indicator">
                </span></span></div>
                <div class="ant-tour-actions semantic-mark-actions">
                  <button class="ant-btn css-var-test-id ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-sm ant-tour-next-btn" type="button">
                    <span>
                      Next
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
```
