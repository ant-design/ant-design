## Calendar

### Semantic Parts

- root（`semantic-mark-root`）: Root element containing background, border, border-radius and overall layout structure of the calendar component
- header（`semantic-mark-header`）: Header element with layout and style control for year selector, month selector and mode switcher
- body（`semantic-mark-body`）: Body element with padding and layout control for the calendar table that contains the calendar grid
- content（`semantic-mark-content`）: Content element with width, height and table styling control for the calendar table
- item（`semantic-mark-item`）: Item element with background, border, hover state, selected state and other interactive styles for calendar cells

### Usage Example

```tsx
<Calendar
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    header: "semantic-mark-header",
    body: "semantic-mark-body",
    content: "semantic-mark-content",
    item: "semantic-mark-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="ant-picker-calendar ant-picker-calendar-full semantic-mark-root css-var-test-id">
        <div class="ant-picker-calendar-header semantic-mark-header">
          <div class="ant-select ant-select-outlined ant-picker-calendar-year-select css-var-test-id ant-select-css-var ant-select-single ant-select-show-arrow">
            <div class="ant-select-content ant-select-content-has-value" title="2016">
              2016
              <input aria-autocomplete="list" aria-expanded="false" aria-haspopup="listbox" autocomplete="off" class="ant-select-input" id="test-id" readonly="" role="combobox" type="search" value="">
            </div>
            <div class="ant-select-suffix">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="ant-select ant-select-outlined ant-picker-calendar-month-select css-var-test-id ant-select-css-var ant-select-single ant-select-show-arrow">
            <div class="ant-select-content ant-select-content-has-value" title="Nov">
              Nov
              <input aria-autocomplete="list" aria-expanded="false" aria-haspopup="listbox" autocomplete="off" class="ant-select-input" id="test-id" readonly="" role="combobox" type="search" value="">
            </div>
            <div class="ant-select-suffix">
              <span aria-label="down" class="anticon anticon-down" role="img">
                <svg aria-hidden="true" data-icon="down" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div class="ant-radio-group ant-radio-group-outline ant-picker-calendar-mode-switch css-var-test-id ant-radio-css-var" role="radiogroup">
            <label class="ant-radio-button-wrapper ant-radio-button-wrapper-checked css-var-test-id ant-radio-css-var">
              <span class="ant-radio-button ant-radio-button-checked">
                <input checked="" class="ant-radio-button-input" name="test-id" type="radio" value="month">
              </span>
              <span class="ant-radio-button-label">
                Month
              </span>
            </label>
            <label class="ant-radio-button-wrapper css-var-test-id ant-radio-css-var">
              <span class="ant-radio-button">
                <input class="ant-radio-button-input" name="test-id" type="radio" value="year">
              </span>
              <span class="ant-radio-button-label">
                Year
              </span>
            </label>
          </div>
        </div>
        <div class="ant-picker-panel" tabindex="0">
          <div class="ant-picker-date-panel">
            <div class="ant-picker-body semantic-mark-body">
              <table class="ant-picker-content semantic-mark-content">
                <thead>
                  <tr>
                    <th>
                      Su
                    </th>
                    <th>
                      Mo
                    </th>
                    <th>
                      Tu
                    </th>
                    <th>
                      We
                    </th>
                    <th>
                      Th
                    </th>
                    <th>
                      Fr
                    </th>
                    <th>
                      Sa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-10-30">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          30
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-10-31">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          31
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-01">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          01
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-02">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          02
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-03">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          03
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-04">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          04
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-05">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          05
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-06">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          06
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-07">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          07
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-08">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          08
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-09">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          09
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-10">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          10
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-11">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          11
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-12">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          12
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-13">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          13
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-14">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          14
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-15">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          15
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-16">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          16
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-17">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          17
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-18">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          18
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-19">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          19
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-20">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          20
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-21">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          21
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-selected ant-picker-cell-in-view ant-picker-cell-today" title="2016-11-22">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date ant-picker-calendar-date-today">
                        <div class="ant-picker-calendar-date-value">
                          22
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-23">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          23
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-24">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          24
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-25">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          25
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-26">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          26
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-27">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          27
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-28">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          28
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-29">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          29
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item ant-picker-cell-in-view" title="2016-11-30">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          30
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-01">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          01
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-02">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          02
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-03">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          03
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                  <tr>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-04">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          04
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-05">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          05
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-06">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          06
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-07">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          07
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-08">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          08
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-09">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          09
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                    <td class="ant-picker-cell semantic-mark-item" title="2016-12-10">
                      <div class="ant-picker-cell-inner ant-picker-calendar-date">
                        <div class="ant-picker-calendar-date-value">
                          10
                        </div>
                        <div class="ant-picker-calendar-date-content">
                      </div>
                    </div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
```
