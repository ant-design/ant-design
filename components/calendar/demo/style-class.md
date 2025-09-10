## zh-CN

通过 `classNames` 和 `styles` 属性为 Calendar 的各个部分设置样式。

- `classNames` 和 `styles` 支持对象和函数两种形式
- 对象形式：直接设置各个语义化 DOM 的类名和样式
- 函数形式：`(info: { props }) => Record<SemanticDOM, string | CSSProperties>`，可以根据组件的 props 动态设置样式

### 语义化 DOM 结构

- `root`：根元素，包含日历组件的背景色、边框、圆角等基础样式和整体布局结构
- `header`：头部元素，包含年份选择器、月份选择器、模式切换器的布局和样式控制
- `body`：主体元素，包含日历表格的内边距、布局控制等样式，用于容纳日历网格
- `content`：内容元素，包含日历表格的宽度、高度等尺寸控制和表格样式
- `item`：条目元素，包含日历单元格的背景色、边框、悬停态、选中态等交互样式

## en-US

Set styles for different parts of Calendar through `classNames` and `styles` properties.

- `classNames` and `styles` support both object and function forms
- Object form: directly set class names and styles for each semantic DOM
- Function form: `(info: { props }) => Record<SemanticDOM, string | CSSProperties>`, can dynamically set styles based on component props

### Semantic DOM Structure

- `root`: Root element containing background, border, border-radius and overall layout structure of the calendar component
- `header`: Header element with layout and style control for year selector, month selector and mode switcher
- `body`: Body element with padding and layout control for the calendar table that contains the calendar grid
- `content`: Content element with width, height and table styling control for the calendar table
- `item`: Item element with background, border, hover state, selected state and other interactive styles for calendar cells
