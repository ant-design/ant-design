---
category: 设计模式
type: 模板文档
order: 2
title: 数据可视化页
---

数据可视化类的页面通过一系列图表展现及辅助解读，用户通过浏览和操作数据图表，来实现特定分析目的，制定数据驱动型决策。

## 设计目标

让使用者快速、清晰地理解数据意义，快速进行分析趋势，驱动决策。

---

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*v6FAS7wJ4TUAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>组织性</h4>
      <p>有逻辑地定义布局，有组织地排布内容。通常使用从上到下和从左到右的结构排列，或递进的交互形式，来凸显常用分析思路：概览第一，聚焦过滤，再按需查看详情。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P1YtSIk6Xq0AAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>突出重点</h4>
      <p>将最重要的视图、最关键的指标放在此类型页面的顶部或左上方。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*MBJwRr8vL3oAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>信息准确</h4>
      <p>保证数据的准确性、清晰度和完整性<br />1、使用正确的图表类型。<br />2、在必要的时候对数据的定义作出解释。</p>
    </div>
  </div>
</div>

### Do&Don’t

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*D4AHQ434LjgAAAAAAAAAAABkARQnAQ" alt="正确示范">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*qUCwTKf_bV8AAAAAAAAAAABkARQnAQ" alt="错误示范">

在对数据进行高度概括时，展示指示卡+数值，比图表更直接。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*YhWnS73vVvIAAAAAAAAAAABkARQnAQ" alt="正确示范">

尽量在一屏中突出核心指示，将总模块数量控制在 5-9 个，避免信息过载。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Ym8CSoOMN1EAAAAAAAAAAABkARQnAQ" alt="正确示范">

善于使用筛选、过滤功能，可以让用户在观察全局的同时，还可以查看数据细节，用户在有疑问时能够快速得到方向。

## 典型模板

### 概览

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*wM0lTJPh4tcAAAAAAAAAAABkARQnAQ">

将全局视角中最关键的指标，以平铺的方式展现在整个页面中，帮助决策者做决策。当指标重要性平均时采用左图布局，需要强调主题时采用右图布局

#### 模板 - 指标大盘

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3penRKSd5AkAAAAAAAAAAABkARQnAQ">

**什么时候用**

决策层用户用来监控全局数据，并附带图表来辅助解读。

**涉及哪些功能**

核心数据；指标卡模块；筛选器；图表区；

#### [模板 - 监控](https://preview.pro.ant.design/dashboard/monitor)

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gbuDRaK1whcAAAAAAAAAAABkARQnAQ">

**什么时候用**

决策层用户用来监控全局数据，通常是围绕着一个主题，展现多个维度的关键指标，并帮助用户快速发现异常。

**涉及哪些功能**

核心数据；指标卡模块；图表区；地图；仪表盘；

### 分析

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*FSvoSbvL89YAAAAAAAAAAABkARQnAQ">

将数据分析类型页面拆解为多个部分，通常为“总 - 分”的结构，多维度地展示数据的全貌，帮助使用者发现当前问题。

#### 模板 - 多维分析

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*IljpTbaOEOoAAAAAAAAAAABkARQnAQ">

**什么时候用**

针对同一主题的多个维度分析。

**涉及哪些模块**

核心数据；指标卡模块；筛选器；图表区；

### 明细

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ihooQ69yX18AAAAAAAAAAABkARQnAQ">

数据明细用来展示单个指标总览和明细。常用于数据报表细节信息的展示，根据业务诉求可配置文本、列表、可视化图表等。

#### 模板 - 数据明细

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DjmzQKHxa9AAAAAAAAAAAABkARQnAQ">

**什么时候用**

常用于数据报表细节信息的展示

**涉及哪些模块**

筛选器；图表区；数据明细表；

### 设计建议

#### 串联分析思路

- 明确此类页面的使用者身份，以及分析目的，从而选择对应的页面类型.  划分用户。不同业务线间，关注的核心指标不同，常见的指标类型有：宏观的大盘数据，具体的业务指标。

  - 针对决策者，可以选择描述型的指标结果页面；
  - 针对执行者，可以选择有更多分析功能的分析、详情页面。

- 确定核心指标间的联系及优先级，合理地进行页面布局，把结论和最重要的指标放在最醒目的位置；

- 请记住，您可以将以上页面通过交互方式串联起来，讲述你的数据故事。（见下图）

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PbVhQo0Jyo4AAAAAAAAAAABkARQnAQ">
</div>

#### 卡片的组合方式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*0UoySagZKGsAAAAAAAAAAABkARQnAQ">

1、一张卡片放置一个主题内容。

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*k-omRZK0t4IAAAAAAAAAAABkARQnAQ">

2、也可将相关性高的数据组合呈现在一个卡片中，并使用通栏分割线区隔。

#### 选择正确的可视化组件

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*J1P7TbuZ5O8AAAAAAAAAAABkARQnAQ">

当设计者对页面的结构有初步的思路之后，可根据信息粒度的大小来选择不同的可视化组件。信息粒度从大到小对应：指标卡和排行榜、图表、文本明细。

#### 选择正确的色板

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Skn6TZsQ7ksAAAAAAAAAAABkARQnAQ">

## 延伸阅读

### 会用到哪些全局规则

- [AntV 可视化设计原则](https://www.yuque.com/mo-college/vis-design/pwh679)
- [AntV 可视化色彩体系](https://www.yuque.com/mo-college/vis-design/ugbofr)
- [AntV 可视化交互设计指引](https://www.yuque.com/mo-college/vis-design/yygtlg)

### 会用到哪些模块或组件

- [AntV 图表示例](https://g2plot.antv.vision/zh/examples/gallery)
