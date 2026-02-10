## Table

### Semantic Parts

- root（`semantic-mark-root`）: Root element with font-size, background, border-radius, scrollbar-color and other basic table container styles
- section（`semantic-mark-section`）: Container element with clear-fix, max-width, scrollbar background and other table wrapper styles
- header.wrapper（`semantic-mark-header-wrapper`）: Header wrapper element with table header layout and container styles
- header.row（`semantic-mark-header-row`）: Header row element with table header row layout and styling
- header.cell（`semantic-mark-header-cell`）: Header cell element with relative positioning, padding, word-wrap, background, text color, font-weight and other header cell styles
- title（`semantic-mark-title`）: Title element with table title styling and layout
- body.wrapper（`semantic-mark-body-wrapper`）: Body wrapper element with table body layout and container styles
- body.row（`semantic-mark-body-row`）: Body row element with hover effects, selected states, expanded states and other interactive row styles
- body.cell（`semantic-mark-body-cell`）: Body cell element with relative positioning, padding, word-wrap and other basic data cell styles
- footer（`semantic-mark-footer`）: Footer element with table footer background color, text color and other footer styles
- content（`semantic-mark-content`）: Content element with table content area styling and layout
- pagination.root（`semantic-mark-pagination-root`）: Pagination root element with pagination component basic styles and layout
- pagination.item（`semantic-mark-pagination-item`）: Pagination item element with pagination item styling and interactive effects

### Usage Example

```tsx
<Table
  {...otherProps}
  classNames={{
    root: "semantic-mark-root",
    section: "semantic-mark-section",
    header.wrapper: "semantic-mark-header-wrapper",
    header.row: "semantic-mark-header-row",
    header.cell: "semantic-mark-header-cell",
    title: "semantic-mark-title",
    body.wrapper: "semantic-mark-body-wrapper",
    body.row: "semantic-mark-body-row",
    body.cell: "semantic-mark-body-cell",
    footer: "semantic-mark-footer",
    content: "semantic-mark-content",
    pagination.root: "semantic-mark-pagination-root",
    pagination.item: "semantic-mark-pagination-item"
  }}
/>
```

### Abstract DOM Structure

```html
<div class="css-var-test-id ant-table-css-var ant-table-wrapper semantic-mark-root" style="width: 100%;">
        <div aria-busy="false" aria-live="polite" class="ant-spin css-var-test-id">
          <div class="ant-spin-container">
            <div class="ant-table ant-table-middle ant-table-bordered css-var-test-id ant-table-css-var">
              <div class="ant-table-title semantic-mark-title">
                table title
              </div>
              <div class="ant-table-container semantic-mark-section">
                <div class="ant-table-content semantic-mark-content">
                  <table style="table-layout: auto;">
                    <thead class="ant-table-thead semantic-mark-header-wrapper">
                      <tr class="semantic-mark-header-row">
                        <th class="ant-table-cell semantic-mark-header-cell" colspan="2" scope="colgroup">
                          Personal Info
                        </th>
                        <th class="ant-table-cell semantic-mark-header-cell" rowspan="2" scope="col">
                          Address
                        </th>
                      </tr>
                      <tr class="semantic-mark-header-row">
                        <th class="ant-table-cell semantic-mark-header-cell" scope="col">
                          Name
                        </th>
                        <th class="ant-table-cell semantic-mark-header-cell" scope="col">
                          Age
                        </th>
                      </tr>
                    </thead>
                    <tbody class="ant-table-tbody semantic-mark-body-wrapper">
                      <tr class="ant-table-row ant-table-row-level-0 semantic-mark-body-row" data-row-key="1">
                        <td class="ant-table-cell semantic-mark-body-cell">
                          thinkasany
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          24
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          New York No. 1 Lake Park
                        </td>
                      </tr>
                      <tr class="ant-table-row ant-table-row-level-0 semantic-mark-body-row" data-row-key="2">
                        <td class="ant-table-cell semantic-mark-body-cell">
                          Jim Green
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          42
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          London No. 1 Lake Park
                        </td>
                      </tr>
                      <tr class="ant-table-row ant-table-row-level-0 semantic-mark-body-row" data-row-key="3">
                        <td class="ant-table-cell semantic-mark-body-cell">
                          Joe Black
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          32
                        </td>
                        <td class="ant-table-cell semantic-mark-body-cell">
                          Sydney No. 1 Lake Park
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="ant-table-footer semantic-mark-footer">
                table footer
              </div>
            </div>
            <ul class="ant-pagination ant-pagination-small ant-pagination-mini ant-table-pagination ant-table-pagination-end semantic-mark-pagination-root css-var-test-id">
              <li aria-disabled="true" class="ant-pagination-prev semantic-mark-pagination-item ant-pagination-disabled" title="Previous Page">
                <button class="ant-pagination-item-link" disabled="" tabindex="-1" type="button">
                  <span aria-label="left" class="anticon anticon-left" role="img">
                    <svg aria-hidden="true" data-icon="left" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                    </svg>
                  </span>
                </button>
              </li>
              <li class="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active semantic-mark-pagination-item" tabindex="0" title="1">
                <a rel="nofollow">
                  1
                </a>
              </li>
              <li class="ant-pagination-item ant-pagination-item-2 semantic-mark-pagination-item" tabindex="0" title="2">
                <a rel="nofollow">
                  2
                </a>
              </li>
              <li aria-disabled="false" class="ant-pagination-next semantic-mark-pagination-item" tabindex="0" title="Next Page">
                <button class="ant-pagination-item-link" tabindex="-1" type="button">
                  <span aria-label="right" class="anticon anticon-right" role="img">
                    <svg aria-hidden="true" data-icon="right" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                    </svg>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
```
