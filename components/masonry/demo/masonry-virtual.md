## zh-CN

使用 `virtual` 启用窗口化渲染，适合大量图片或卡片场景。虚拟模式要求：

1. 每个 item 具有已知高度（完整渲染高度），通过 `MasonryItem.height` 或 `itemHeight` 提供
2. 为容器设置明确高度（例如 `style={{ height: 600 }}`），否则视口无法约束，窗口化会失效

当前实现按稳定 `key` 仅挂载视口内节点（窗口化），不会复用/回收已有 DOM 节点。

## en-US

Enable windowed rendering with `virtual` for large image or card lists. Virtual mode requires:

1. A known height for each item (the full rendered height), provided via `MasonryItem.height` or `itemHeight`
2. An explicit container height (for example `style={{ height: 600 }}`); without it the viewport is unconstrained and windowing cannot work

The current implementation mounts only in-view nodes by stable `key` (windowing). It does not recycle existing DOM nodes.
