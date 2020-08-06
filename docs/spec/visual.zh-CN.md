---
order: 3
title: 可视化
---

可视化语言是基于 Ant Design 衍生的一套具有数据可视化特性的设计指导原则，让数据表达更符合用户心理，以帮助『设计者』孵化出更具业务特性的数据可视化解决方案，屏蔽不必要的设计差异和实现成本，从而解放『设计者』和前端的生产力，实现数据图表的研发效能全面提高。

同时，这是一份动态更新的设计文档，你的阅读和互动正是我们不断前进的动力，[GitHub 反馈地址](https://github.com/antvis/site/issues)。

## 前端实现

[AntV](https://antv.vision/zh) 是基于原生 JavaScipt 封装的可视化组件库，包含高交互基础图表库 G2Plot，流程与关系分析的图表库 G6，专注解决地理空间数据可视分析的 L7，适用于移动端的高性能图表库 F2，欢迎社区贡献其他框架的实现版本。

- [G2 可视化引擎](https://g2.antv.vision/zh)
- [G2Plot 开箱即用的图表库](https://g2plot.antv.vision/zh) 🔥
- [G2Plot React 版](https://charts.ant.design)
- [G6 图可视化引擎](https://g6.antv.vision/zh)
- [L7 地理空间数据可视分析引擎](https://l7.antv.vision/zh)
- [F2 移动端可视化方案](https://f2.antv.vision/zh)

## 如何设计

### 了解用户

用户是谁？他们要从可视化作品上获取什么信息？在企业级产品中，用户可能是公司高层、BI 分析师、运营、数据开发等不同角色，不一样的角色在使用可视化作品时，其目的以及使用路径会有所不同。建议在设计开始前对使用者进行充分剖析，以便完整地讲述你的数据故事，准确呈现你的数据见解。

### 设计原则

- 准确：从数据转化到可视表达时不歪曲，不误导，不遗漏，忠实反映数据里包含的信息；
- 有效：信息传达有重点，克制不冗余，避免信息过载，用最适量的数据-油墨比（Data-ink Ratio）表达对用户最有用的信息；
- 清晰：表现方式清楚易读，具条理性，可以帮助用户快速达成目标，在最少的时间内获取更多的信息；
- 美：对数据的完美表达，合理利用视觉元素进行艺术创作，不过度修饰，给用户优雅的体验。

## 图表用法

### 选择正确的图表类型

我们提供了完整的图表用法说明，帮助您更正确地选择图表类型。

#### 时间类

<img class="preview-img no-padding" align="right" description="代表类型：折线图、面积图等" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*z0ZSRabgdpQAAAAAAAAAAABkARQnAQ" />

通常用于表现数据在时间维度上的趋势和变化。

#### 比较类

<img class="preview-img no-padding" align="right" description="代表类型：柱状图、气泡图等" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*mvE4T6jti5QAAAAAAAAAAABkARQnAQ" />

使用图形的长度、宽度、位置、面积、角度和颜色来比较数值的大小，通常用于展示不同分类间的数值对比。

#### 分布类

<img class="preview-img no-padding" align="right" description="代表类型：散点图、箱形图等" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_ft8Soe5p6EAAAAAAAAAAABkARQnAQ" />

通常用于展示连续数据上数值的分布情况。

#### 流程类

<img class="preview-img no-padding" align="right" description="代表类型：漏斗图等" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kJj6Qo3-UFIAAAAAAAAAAABkARQnAQ" />

通常用于表示流程流转、流量关系。

#### 占比类

<img class="preview-img no-padding" align="right" description="代表类型：环图、饼图、百分比堆叠类型图表等" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*52XJRK9B0KUAAAAAAAAAAABkARQnAQ" />

显示同一维度上占比关系。

获取更多图表用法内容，请前往 [AntV 图表用法](https://antv-2018.alipay.com/zh-cn/vis/chart/index.html)

### 色板

<img class="preview-img no-padding" align="right" description="AntV 官方默认色板示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Skn6TZsQ7ksAAAAAAAAAAABkARQnAQ" />

AntV 提供了一套默认的图表颜色，包括颜色的用法，

获取更多色板，请前往 [AntV - 设计语言 - 视觉](https://antv.vision/zh/docs/specification/principles/visual/)

### 组件使用建议

#### 标题与注释

标题是对图表的主题进行阐述的一段话；注释是表明数据来源，让图表看起来来源清晰、可靠。

#### 轴

<img class="preview-img no-padding" align="right" description="轴的元素" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*i4tXQZkMGrMAAAAAAAAAAABkARQnAQ" />

<img class="preview-img no-padding" align="right" description="轴的分类" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*-ycMQZ48GykAAAAAAAAAAABkARQnAQ" />

用来定义坐标系中数据在方向和值的映射关系。

#### 图例

<img class="preview-img no-padding" align="right" description="图例的元素" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8oYwRJbGmhMAAAAAAAAAAABkARQnAQ" />

<img class="preview-img no-padding" align="right" description="图例的分类" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*sSGjRJGyrqQAAAAAAAAAAABkARQnAQ" />

用来解释图表区域中包含的所有视觉元素的含义。

#### 标签

<img class="preview-img no-padding" align="right" description="标签的分类" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*j2gNQ4E-wAoAAAAAAAAAAABkARQnAQ" />

对当前的一组数据进行的内容标注。

#### 提示信息

<img class="preview-img no-padding" align="right" description="提示信息的元素" src="https://gw.alipayobjects.com/zos/basement_prod/f9683e72-81a4-47cc-a208-6570187cce11.svg" />

指当鼠标悬停在图表上或者手指点按移动设备的某个数据点时，以交互提示信息的形式展示该点的数据，比如该点的值，数据单位等。

#### 图形

<img class="preview-img no-padding" align="right" description="图形的分类" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*itDLQb2fXpkAAAAAAAAAAABkARQnAQ" />

图形是统计图表的视觉通道在形状上映射的视觉展现，是图表的主体部分，其他图表组件的目的是帮助读者更好地理解数据在图形上的映射关系。

获取组件使用建议，请前往 [AntV - 设计语言 - 图表组件设计指引](https://antv.vision/zh/docs/specification/components/titlenotes)

### 图表布局适应

<img class="preview-img no-padding" align="right" description="图表响应式示意" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*0vfXTIlbSXwAAAAAAAAAAABkARQnAQ" />

数据可视化始终面对海量数据量与有限屏幕空间的冲突，如何解决不同端、不同屏幕尺寸下内容的适配问题，在有限的空间内帮助用户更快地理解信息和更快地分析洞察，是我们一直致力研究的问题。

<img class="preview-img no-padding" align="right" description="设计思路" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*WsO3T5klNMIAAAAAAAAAAABkARQnAQ" />

在 Ant Design 的可视化体系中，我们发展出一套适用于全量图表的布局适应规则，从整体图表、图表内原子组件梳理了适用于所有图表的布局适应体系。以右侧动图为例，图中横轴的轴标签跟随具体尺寸发生了旋转。更多内容即将发布，敬请期待。

### 交互

<div style="text-align:center;">
  <img alt="Background" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QXtKSIMgaOUAAAAAAAAAAABkARQnAQ" />
</div>

区别于传统数据报表相对静态的表现形式，交互式图表并不停留在信息展示层面。用户通过与图不断产生交互，从数据中获取更深层次的分析和信息。

在数据可视化中，我们根据用户的意识层次及每层次对应的目标，将交互动作拆解成“数据获取、信息加工、知识流转”三层。其匹配“概览第一，聚焦过滤，再按需查看详情”的可视化信息检索箴言。亦符合人类寻求信息的基本逻辑：先大体，再局部，然后聚焦兴趣点进行探索，这是一个由表及里的过程。

更多交互式图表内容请前往 [AntV -- 设计语言 -- 交互](https://antv.vision/zh/docs/specification/principles/interact)

## 设计资源

- 最新的图表资产已登陆 「AntDesign 官网 -- 资源 -- AntDesign Chart 资源包」
- 也可以访问 [Kitchen](https://kitchen.alipay.com/) 官网下载 Sketch 插件，除了可以直接使用源文件之外，还可以使用 Kitchen「📈 图表生成器」，用保真数据动态生成图表。
