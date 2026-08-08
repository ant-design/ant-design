## zh-CN

使用 `virtual` 启用虚拟化渲染，适合大量图片或卡片场景。虚拟模式要求每个 item 具有已知高度（包含完整渲染高度），可通过 `MasonryItem.height` 或 `itemHeight` 提供。建议为容器设置固定高度（如 `style={{ height: 600 }}`），以获得稳定滚动体验。

## en-US

Enable virtual rendering with `virtual` for large image or card lists. Virtual mode requires a known height for each item (the full rendered height), provided via `MasonryItem.height` or `itemHeight`. Set a fixed container height (for example `style={{ height: 600 }}`) for stable scrolling.
