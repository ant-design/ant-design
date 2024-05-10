## 组件定义

Breadcrumb的本质是了解当前所处页面的位置，并能向上导航。

<code src="./design/behavior-pattern.tsx" inline></code>

## 基础使用

<code src="./demo/basic" description="当用户需要了解当前页面在系统层级结构中的位置，或需要向上导航时使用，是最基础的使用方式">确定位置并向上导航</code>

## 交互变体

<code src="./demo/overlay" description="带有下拉菜单，下拉菜单中的内容可以承载该一级面包屑同级别内容，也可以承载该面包屑的子级内容，便于进行快速切换">快捷导航</code>

## 样式变体

<code src="./demo/withIcon" description="图标替代部分文字，或在文字前增加图标">图标样式</code>

<code src="./demo/separator" description="分割线可以采用数学中的大于符号">自定义分隔符样式</code>
