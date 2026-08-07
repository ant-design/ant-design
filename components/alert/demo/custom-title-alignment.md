## zh-CN

未设置 `description` 时，Alert 会让图标、内容、操作区和关闭按钮作为整体垂直居中。组件库不默认改为 `flex-start` 布局并通过 token 补偿偏移，是因为当 `styles` 自定义字体、行高或操作区尺寸后，token 推导出的偏移量可能不再匹配实际样式。若标题可能换行，并希望这些元素与标题首行对齐，可以通过语义化 `styles` 自行调整。

## en-US

When `description` is not set, Alert vertically centers the icon, content, action, and close button as a group. Ant Design does not switch this default layout to `flex-start` with token-derived offsets because customized `styles` may change font size, line height, or action size, making those offsets no longer match the actual rendered styles. When a wrapping title should align those elements with the first line, adjust them with semantic `styles`.
