## Table

### Semantic Parts

- root（`semantic-mark-root`）: 根元素，包含字体大小、背景色、圆角、滚动条颜色等表格容器的基础样式
- section（`semantic-mark-section`）: 容器元素，包含清除浮动、最大宽度、滚动条背景等表格包装容器样式
- header.wrapper（`semantic-mark-header-wrapper`）: 头部容器元素，包含表头的布局和容器样式
- header.row（`semantic-mark-header-row`）: 头部行元素，包含表头行的布局和样式
- header.cell（`semantic-mark-header-cell`）: 头部单元格元素，包含相对定位、内边距、文字换行、背景色、文字颜色、字体权重等表头单元格样式
- title（`semantic-mark-title`）: 标题元素，包含表格标题的样式和布局
- body.wrapper（`semantic-mark-body-wrapper`）: 主体容器元素，包含表格主体的布局和容器样式
- body.row（`semantic-mark-body-row`）: 主体行元素，包含数据行的悬浮效果、选中状态、展开状态等交互样式
- body.cell（`semantic-mark-body-cell`）: 主体单元格元素，包含相对定位、内边距、文字换行等数据单元格的基础样式
- footer（`semantic-mark-footer`）: 底部元素，包含表格底部的背景色、文字颜色等样式
- content（`semantic-mark-content`）: 内容元素，包含表格内容区域的样式和布局
- pagination.root（`semantic-mark-pagination-root`）: 分页根元素，包含分页组件的基础样式和布局
- pagination.item（`semantic-mark-pagination-item`）: 分页单项元素，包含分页项的样式和交互效果

### 使用案例

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
