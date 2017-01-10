---
template: component
category: Design Fundamental
order: 4
cols: 1
title: Layout
---

Layout and Navigation is the backbone of productions, it is one of the most important design pattern of a page,
and it is also a base when you create a page, it will establish a interactive and visual style for a production.

The Layout and Navigation design specification for Ant Design are as follows:

### The specification of size

The first level of the navigation is placed near by a logo inclined left, and the secondary menu is placed inclined right. 

- Top Navigation（大部分系统）：一级导航高度 `64px`，二级导航 `48px`。
- Top Navigation（展示类页面）：一级导航高度 `80px`,二级导航 `56px`。
- 顶部导航高度的范围计算公式为：`48+8n`。
- 侧边导航宽度的范围计算公式：`200+8n`。

### The principle of interaction

- 一级导航和末级的导航需要在可视化的层面被强调出来；
- 当前项应该在呈现上优先级最高；
- 当导航收起的时候，当前项的样式自动赋予给它的上一个层级；
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式，根据业务的要求进行适当的选择。

### The principle of visualization

导航样式上需要根据信息层级合理的选择样式：

- **大色块强调**

  建议用于底色为深色系时，当前页面父级的导航项。

- **高亮火柴棍**

  当导航栏底色为浅色系时使用，可用于当前页面对应导航项，建议尽量在导航路径的最终项使用。

- **字体高亮变色**

  从可视化层面，字体高亮的视觉强化力度低于大色块，通常在当前项的上一级使用。

- **字体放大**

  `12px`、`14px` 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。


在大中后台系统中，Ant Design 使用两种常见的布局形式，顶部导航布局和侧边导航布局，以下收集了使用 Ant Design 设计的中后台产品的基本布局。
