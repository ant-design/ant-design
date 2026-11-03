## zh-CN

结合远程搜索与滚动加载的示例。输入时进行防抖的服务端搜索，下拉列表滚动到底部时通过 `onPopupScroll` 请求下一页并追加到 `options` 中。借助单调递增的请求序号丢弃过期响应，避免乱序结果覆盖最新数据，适合数据量较大的远程列表。

## en-US

Combine remote search with infinite scroll. Typing triggers a debounced server-side search, and scrolling the dropdown to the bottom requests the next page via `onPopupScroll` and appends it to `options`. A monotonically increasing request id discards stale responses so out-of-order results never overwrite the latest data, which suits remote lists with a large amount of data.
