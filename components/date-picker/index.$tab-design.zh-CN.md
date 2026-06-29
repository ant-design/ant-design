## 组件定义

DatePicker 的本质是选择（输入）日期型数据。

<code src="./design/behavior-pattern.tsx" inline></code>

## 基础使用

<code src="./design/demo/pick-date.tsx" description="用于具体日期的选择。用户仅需要输入非常具体的日期信息时使用。">选择某天</code>

<code src="./design/demo/pick-week.tsx" description="用于周的选择。用户仅需输入年份 + 周信息时使用。">选择某周</code>

<code src="./design/demo/pick-month.tsx" description="用于月份的选择。用户仅需输入年份 + 月份信息时使用。">选择某月</code>

<code src="./design/demo/pick-quarter.tsx" description="用于季度的选择。用户仅需输入年份 + 季度信息时使用。">选择某季度</code>

<code src="./design/demo/pick-year.tsx" description="用于年的选择。用户仅需输入年份时使用。">选择某年</code>

<code src="./design/demo/pick-time.tsx" description="用于具体时刻的选择。用户需输入年份+月份+日期+时间信息时使用。">选择某时刻</code>

<code src="./design/demo/pick-date-range.tsx" description="用于具体日期范围的选择。">选择某天至某天</code>

<code src="./design/demo/pick-week-range.tsx" description="用于周范围的选择。">选择某周至某周</code>

<code src="./design/demo/pick-month-range.tsx" description="用于月范围的选择。">选择某月至某月</code>

<code src="./design/demo/pick-quarter-range.tsx" description="用于季度范围的选择。">选择某季度至某季度</code>

<code src="./design/demo/pick-year-range.tsx" description="用于年范围的选择。">选择某年至某年</code>

<code src="./design/demo/pick-time-range.tsx" description="用于具体时刻范围的选择。">选择某时刻至某时刻</code>

## 交互变体

<code src="./design/demo/preset-time.tsx" description="通过面板左侧区域提供的预置项，帮助用户快速完成时间点的选择。" tip="根据希克定律，建议快捷选项的个数不超过8个。">快捷选择时间点</code>

<code src="./design/demo/preset-range.tsx" description="通过面板左侧区域提供的预置项，帮助用户快速完成时间段的选择。" tip="根据希克定律，建议快捷选项的个数不超过8个。">快捷选择时间段</code>

<code src="./design/demo/date-extra-info.tsx" description="通过定义日期单元格内容及样式，为用户展示更多业务场景相关信息作为选择参考。">查看日期附属信息</code>
