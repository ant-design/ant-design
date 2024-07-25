## 组件定义

Pagination的本质是控制单页内信息数量，可跳转页面。

<code src="./design/behavior-pattern.tsx" inline></code>

## 基础使用

<code src="./design/demo/basic" description="最基础的分页控件，仅展示页码。" tip="建议使用在内容少于10页的轻量化分页场景。">少量页面</code>

<code src="./design/demo/large-amount" description="拥有大量数据需要展示，通过分页能够让用户快速定位当前页码。展示首尾页码，部分页码省略。" tip="建议使用在内容超过10页以上的分页场景。">大量页面</code>

## 交互变体

<code src="./design/demo/page-size" description="可根据用户需求对每页展示条目数进行调整。">调整单页展示条数</code>

<code src="./design/demo/quick-jump" description="当数据有快速定位的需求时，输入页码，可快速跳转到指定页。">快速跳转</code>

<code src="./design/demo/total" description="用户无需全部浏览即可快速了解数据总量。常用于表格内的数据统计。">了解数据总量</code>

## 样式变体

<code src="./design/demo/simple" description="极度简单的分页控件，只展示当前页、总页数及上下翻页。适用于模块内的横向空间较少的场景。">简洁分页</code>

<code src="./design/demo/mini" description="小尺寸的分页控件。适用于模块内的空间较少，需要轻量化的翻页的场景。">迷你版分页</code>

<code src="./demo/itemRender" description="修改上一步和下一步为文字链接。">上一步和下一步</code>
