## zh-CN

结合 [dnd-kit](https://github.com/clauderic/dnd-kit) 与 `Form.List` 提供的 `move` 操作，实现动态表单项的拖拽排序。拖拽以每个字段稳定的 `key` 作为标识，结束拖拽时调用 `move(from, to)` 调整顺序，表单数据会随之同步。

## en-US

Combine [dnd-kit](https://github.com/clauderic/dnd-kit) with the `move` operation provided by `Form.List` to drag and sort dynamic form items. Each field's stable `key` is used as the drag identifier, and `move(from, to)` is called on drag end to reorder items while keeping the form values in sync.
