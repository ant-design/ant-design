## zh-CN

使用 `virtual` 属性启用虚拟滚动，可高效渲染大量数据（如 100k 项），只渲染可视区域内的元素。

- `virtual.height`：容器高度（必填）
- `virtual.itemHeight`：预估的项目高度（必填）
- `virtual.buffer`：可视区域外额外渲染的项目数量（可选，默认为 `columnCount * 2`）

配合 `onScrollEnd` 可实现无限滚动加载。

## en-US

Use the `virtual` prop to enable virtual scrolling, efficiently rendering large datasets (e.g., 100k items) by only rendering elements within the visible area.

- `virtual.height`: Container height (required)
- `virtual.itemHeight`: Estimated item height (required)
- `virtual.buffer`: Number of items to render outside visible area (optional, defaults to `columnCount * 2`)

Use `onScrollEnd` to implement infinite scroll loading.
