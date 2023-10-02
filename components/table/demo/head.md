## zh-CN

对某一列数据进行筛选，使用列的 `filters` 属性来指定需要筛选菜单的列，`onFilter` 用于筛选当前数据，`filterMultiple` 用于指定多选和单选。

使用 `defaultFilteredValue` 属性，设置列的默认筛选项。

对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。`sorter: function(rowA, rowB) { ... }`， rowA、rowB 为比较的两个行数据。

`sortDirections: ['ascend' | 'descend']`改变每列可用的排序方式，切换排序时按数组内容依次切换，设置在 table props 上时对所有列生效。你可以通过设置 `['ascend', 'descend', 'ascend']` 禁止排序恢复到默认状态。

使用 `defaultSortOrder` 属性，设置列的默认排序顺序。

如果 `sortOrder` 或者 `defaultSortOrder` 的值为 `ascend` 或者 `descend`，则可以通过 `sorter` 的函数第三个参数获取当前排序的状态。该函数可以是 `function(a, b, sortOrder) { ... }` 的形式。

## en-US

Use `filters` to generate filter menu in columns, `onFilter` to determine filtered result, and `filterMultiple` to indicate whether it's multiple or single selection.

Use `defaultFilteredValue` to make a column filtered by default.

Use `sorter` to make a column sortable. `sorter` can be a function of the type `sorter: function(rowA, rowB) { ... }` for sorting data locally.

`sortDirections: ['ascend' | 'descend']` defines available sort methods for each columns, effective for all columns when set on table props. You can set as `['ascend', 'descend', 'ascend']` to prevent sorter back to default status.

Use `defaultSortOrder` to make a column sorted by default.

If a `sortOrder` or `defaultSortOrder` is specified with the value `ascend` or `descend`, you can access this value from within the function passed to the `sorter` as explained above. Such a function can take the form: `function(a, b, sortOrder) { ... }`.
