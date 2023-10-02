## zh-CN

带单元格编辑功能的表格。当配合 `shouldCellUpdate` 使用时请注意[闭包问题](https://github.com/ant-design/ant-design/issues/29243)。

## en-US

Table with editable cells. When work with `shouldCellUpdate`, please take care of [closure](https://github.com/ant-design/ant-design/issues/29243).

```css
.editable-cell {
  position: relative;
}

.editable-cell-value-wrap {
  padding: 5px 12px;
  cursor: pointer;
}

.editable-row:hover .editable-cell-value-wrap {
  padding: 4px 11px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}
```
