---
category: 设计模式
type: 全局规则
order: 2
title: 导航
---

在广义上，任何告知用户他在哪里，他能去什么地方以及如何到达那里的方式，都可以称之为导航。当设计者使用导航或者自定义一些导航结构时，请注意：

- 尽可能提供标识、上下文线索，避免用户迷路；
- 保持导航样式和行为一致或者减少导航数量，降低用户学习成本；
- 尽可能减少页面间的跳转（例如：一个常见任务需要多个页面跳转时，请减少至一到两次），让用户移动距离保持简短。

---

## 导航菜单（Menu）

导航菜单是将内容信息友好地展示给用户的有效方式。在确定好网站的信息架构后，应当按需选取适当的导航菜单样式。

### 顶部导航菜单

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/pWbHrSnmicFxcgmWIFst.png">

顶部导航菜单的形式就是把超链接连成一行，信息内容层级比较简单明了，适用在浏览性强的门户性质以及比较前台化的应用。一级类目建议在 2-7 个以内。标题长度 4-15 个字符长度为好，中文字长 2-6 个。

### 侧边导航菜单

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/VvajPSfjYcVNiNoxZFVH.png">

垂直导航较横向的导航更灵活，易于向下扩展， 且允许的标签长度较长。类目数量不限，可配合滚动条使用，适合信息层级多、操作切换频率高的管理性质的应用。

- 更多常用导航布局可以参考 [Layout 组件](/components/layout/)。

---

## 面包屑（Breadcrumb）

面包屑导航的作用是告诉用户当前页面在系统层级结构中的位置以及父子级页面间的关系。

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/ZeChCVQTCUdghxmwqKIO.png">

> 注意事项：
>
> 1. 层级过深时，建议做隐藏处理，页面显示保持在三级以内，最多不宜超过五级；
> 2. 尽可能不使用面包屑，尤其是当前页面的导航能清晰的告诉用户他在哪里时。

---

## 标签页（Tabs）

标签页把大量信息进行分类展示，用户可以方便地切换标签，而不必跳转页面进行比较浏览，可以在有限的显示区域内展示更多信息。分类可根据业务类别、业务状态或者操作类型等并列关系来分，分类标题长度为 2-6 个中文字。

### 基本样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/dPpWpAhQYzJOWMCeKqhe.png">

引领整个页面的内容，用于主功能切换。

### 卡片样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/aJypXYetynQcJxohHefp.png">

用于页面中局部展示，包裹型容器能很好的和其它内容隔离。

### 胶囊型样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/QsgJeCmaQkoRLgGRxUim.png" description="一般用于小版块内，或与基本样式、卡片样式搭配使用。">

用于卡片内的选项切换，经常和其它组件结合使用，让用户快速切换对应内容。

### 竖状样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/WvnEwzlmauGlKByAxZJH.png">

用于分类较多的选项，可以不限制分类数量，具备更好的扩展性。

---

## 步骤条（Steps）

步骤条是引导用户按照流程完成任务的导航条，可以帮助用户对操作流程长度和步骤有个预期，并且知道自己当前在哪个步骤，同时也可以对用户的任务完成度有明确的度量。当任务复杂或者存在先后关系时，将其分解成一系列步骤。

### 横向流程步骤条

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/ugeAGDXQQYkZIbCAGlIP.png">

步骤多于 2 步时使用, 但建议不超过 5 步，每阶段文字长度保持在 12 个字符以内。

### 竖向流程步骤条

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/PnDNqhBRyWLLLgQSVwvF.png">

一般居页面左侧，悬浮固定，可追加多行文字描述，适合较多步骤或步骤数动态变化时使用，例如：时间步骤跟踪描述。

---

## 分页器（Pagination）

当有大量内容需要展现时进行分页加载处理，分页器可以让用户清楚的知道自己所要浏览的内容有多少、已经浏览了多少、还剩余多少。

### 标准样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/MlxHpEgkFHhIVaxpaiYJ.png" description="当页数超过 5 页时，可以提供快速跳转页面的功能。">

当信息条目较多的时候，可以允许用户自定义每页的行数，以提高用户查看和检索信息的效率和灵活性，常与表格、卡片搭配使用。

### 迷你样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/GtIWNdAtogjxXJNuuqTE.png">

一般用于卡片或者浮层。

### 简易样式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/LCUZrQJyHQXplzEzDrub.png">

一般用于卡片或者统计类表格展示，在 10 页之内。
