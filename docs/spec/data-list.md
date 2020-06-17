---
category:
  zh-CN: 设计模式
  en-US: Design Patterns
type:
  zh-CN: 全局规则
  en-US: Global Rules
order: 7
skip: true
title:
  zh-CN: 数据列表
  en-US: Data List
---

## 设计目标

- 让列表易于扫读。
- 快速查找列表中的对象。

## 列表类型

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*60WRRKpliSIAAAAAAAAAAABkARQnAQ" />
</div>

### 表格 Table

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VrOkRbo_Uc4AAAAAAAAAAABkARQnAQ">

强调浏览性。矩阵布局，趋向于展示复杂数据，数据按照矩阵布局对齐，方便横纵浏览数据，研究数据之间的关系。特别当用户受益于更多的数据外露，而无需进入该对象详情时，使用表格。

### 列表 List

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*D-8wTbCA1REAAAAAAAAAAABkARQnAQ">

兼顾浏览性与展示性。垂直排列，趋向于展示对象的基础概述，有层次地展示内容，适合快速扫读。特别当展示空间存在限制，如较小的弹窗、侧栏、下拉面板等容器中，使用列表。

### 卡片列表 Card list

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*fu2gQ6DQaGgAAAAAAAAAAABkARQnAQ">

强调展示性。网格布局无特定浏览顺序，每个对象拥有更平等的展示机会，网格布局在页面中更具吸引力，适合突出对象时使用。

## 操作行为

### 搜寻数据

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*pEyLSJsDgYIAAAAAAAAAAABkARQnAQ">

选择适合的搜寻组件。

**1）明确用户主要的搜寻模式。**

- 已知项探索：从可言语描述的已知项开始搜寻。
- 探索性查询：对需求确定但范围宽泛的目标进行搜寻。

**2）搜寻频次越高对效率的要求越高。**

**3）与开发做好沟通，了解系统性能， 选择合适的组件。**

#### 查询

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gHgBRofoBDQAAAAAAAAAAABkARQnAQ">

按照预设的条件，选择多个查询条件后一次性提交获取查询。

#### 筛选

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*oECHSpfxwPAAAAAAAAAAAABkARQnAQ">

用户调整筛选项，结果即随之调整。

### 搜索

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*agcCS5eHy2UAAAAAAAAAAABkARQnAQ">

更智能的查找，输入关键词一次性在多种数据属性中查询后，展示结果。

### 分页

默认使用分页加载，用于减少用户等待。应缓存用户在原列表中的浏览位置，并标记列表中已浏览项，当用户返回上级页面是回到原浏览位置。

#### 分页器

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1sIoQKjspJIAAAAAAAAAAABkARQnAQ">

默认推荐使用。使用时，当页面内容不足一页时，不展示分页器。

#### 同页加载

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ejtTTo4E0A4AAAAAAAAAAABkARQnAQ">

当用户常常能够在列表靠前位置找到所需条目，且无定位特定列表项的需求时可以考虑使用这种模式，如动态、邮件。

#### 查看全部

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*cgIlQJUC2_kAAAAAAAAAAABkARQnAQ">

当需跳转页面查看完整列表时使用。

### 导航至详情

<div>
  <img alt="mainly" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*nSsBTZlxihsAAAAAAAAAAABkARQnAQ">
<div>

#### 默认点击标题导航至详情，可以从以下几个角度判断如何打开详情：

- 自然交互的角度，**同页展开列表**更自然，需注意展开的内容区高度不要超过一屏；
- 详情的信息量大小角度，如果信息展示超过一屏，使用展开的方式不便于用户操作，此时使用**抽屉展开**更好；
- 详情需要被单独分享给他人，或复杂的沉浸式任务，**跳转独立页**更合适；
- 每条详情中都可能有用户感兴趣的内容，以方便切换的导航，快速查看和处理不同的项目，可以使用**双栏展示。**

### 批量操作

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*i6PJT6ArtcgAAAAAAAAAAABkARQnAQ">

当用户勾选条目后，触发批量操作模式，列表工具栏呼出批量操作工具条。

### 新建

#### 右上角新建按钮

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*HeQwR4Dc5aEAAAAAAAAAAABkARQnAQ">

点击触发新建表单弹窗、抽屉、页面等，完成创建后新创建的内容出现在列表的第一条，并短暂地高亮展示。

#### 虚线新建按钮

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*2OsyRpOCCIYAAAAAAAAAAABkARQnAQ">

点击新建，在按钮位置出现对象编辑区，完成新建后即在该位置展示该新建对象。虚线新建按钮位置放在列表首或尾。

### 删除

#### 直接删除

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*rPUVTqeMzzgAAAAAAAAAAABkARQnAQ">

删除后，允许用户撤销。

#### 二次确认

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kYkSRKhHbIoAAAAAAAAAAABkARQnAQ">

点击删除操作时，需要二次确认。

#### 安全校验

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vkUuTYWLRCMAAAAAAAAAAABkARQnAQ">

破坏性操作需高安全级别验证确认操作。

### 列表工具栏

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*cPBwQ74TTFQAAAAAAAAAAABkARQnAQ">

在较小的空间中集成列表所需的常用功能，非常推荐使用。

## 布局

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*y6PZQpyrFXUAAAAAAAAAAABkARQnAQ">

列表布局通常从上往下平铺，按照以下顺序排列。其中独占式区域提供了一个扩展空间，用于解决无法集成于工具栏中的复杂数据搜寻、数据统计类内容。

## 空状态

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*8iBER4YJmdQAAAAAAAAAAABkARQnAQ">

当列表无数据或无搜索结果时，应展示空状态。
