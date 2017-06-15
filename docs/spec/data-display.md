---
order: 10
title:
  zh-CN: 数据展示
  en-US: Data Display
---

合适的数据展示方式可以帮助用户快速地定位和浏览数据，以及更高效得协同工作。在设计时有以下几点需要注意：

- 依据信息的重要等级、操作频率和关联程度来编排展示的顺序。
- 注意极端情况下的引导。如数据信息过长，内容为空的初始化状态等。

---

## 表格（Table）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/OGkfpUVQFWqlioeslvue.png">

表格被公认为是展现数据最为清晰、高效的形式之一。它常和排序、搜索、筛选、分页等其他界面元素一起协同，适用于信息的收集和展示、数据的分析和归纳整理、以及操作结构化数据。它结构简单，分隔归纳明确，使信息之间更易于对比，大大提升了用户对信息的接收效率和理解程度。

> 注：
> 1. 表格中的时间、状态、操作栏需保持词语完整不过行。
> 2. 当数据为空时，可使用『- -』来表示暂无数据。

## 折叠面板（Collapse）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/UzmOpWyvIZmFibFPOjuo.png">

折叠面板通过对信息的分组和收纳，指引用户递进式的获取信息，使界面保持整洁的同时增加空间的有效利用率。

这类组件在导航中大量使用，同时也适合冗长的、无规则的内容管理。

> 注：
> 若折叠内容彼此之间关联度较低时，可使用更为节省空间的『手风琴』模式——『手风琴』是一种特殊的折叠面板，只允许单项内容区域展开。

---

## 卡片（Card）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/fpXuAguWCWWbmQNzOmnM.png" description="如页面内容加载过慢时，可采用『预加载』或『分步获取』的方式来缓解用户在等待时间中的焦虑感。">

卡片是一种承载信息的容器，对可承载的内容类型无过多限制，它让一类信息集中化，增强区块感的同时更易于操作；卡片通常以网格或矩阵的方式排列，传达相互之间的层级关系。适合较为轻量级和个性化较强的信息区块展示。

> 注：
> 1.  卡片通常根据栅格进行排列，建议一行最多不超过四个
> 2. 在有限的卡片空间内需注意信息之间的间距，若信息过长可做截断处理。例如『Ant Design 适用用于中台…』

---

## 走马灯（Carousel）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/fELwaApwGyZoUDCZQtLb.png">

作为一组平级内容的并列展示模式，常用于图片或卡片轮播，可由用户主动触发或者系统自动轮播。适合用于官网首页、产品介绍页等展示型区块。

> 注：
> 1. 轮播的数量不宜过多以免造成用户厌烦，控制在 3~5 个之间为最佳
> 2. 建议在设计上提供暗示，让用户对轮播的数量和方向保持清晰的认知

---

## 树形控件（Tree）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/iIicElfzdIoNzyRJXlqx.png">

『树形控件』通过逐级大纲的形式来展现信息的层级关系，高效且具有极佳的视觉可视性，使得整体信息框架一目了然。

用户可同时浏览与处理多个树状层级的内容。适用于任何需要通过层级组织的信息场景，如文件夹、组织架构、生物分类、国家地区等等。

---

## 时间轴（Timeline）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/bIYaUSPaBWSzXEpRsIjO.png">

垂直展示的时间流信息，一般按照时间倒叙记录事件，追踪用户当下以及过去做了什么。

每一条信息以时间为主轴，内容可涵盖主题、类型、相关的附加内容等等。适用于包括事件、任务、日历标注以及其他相关的数据展示。
