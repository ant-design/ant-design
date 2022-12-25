---
group: 设计模式
type: 模板文档
order: 3
title: 详情页
---

详情页向用户展示一个对象的完整信息，主要用与信息浏览，允许对该对象发起编辑等操作。

---

## 设计目标

提高信息浏览和搜寻效率，便捷执行操作。

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3CfhSZLxsIEAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>直截了当</h4>
      <p>信息尽量平铺展示，如无必要，不要做大量隐藏、折叠等操作。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lN6IRbhv8fIAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>层次分明</h4>
      <p>按照接近原则，对信息分层分组展示，降低单个页面内信息复杂度。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jXDwQ6NF7dIAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>化繁为简</h4>
      <p>减少复杂结构的使用，尽量使用相似结构和模块，降低结构差异对用户的干扰，让用户更聚焦于信息本身。</p>
    </div>
  </div>
</div>

## 如何设计

### 基础布局

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tKooSqMRdTEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

基础详情单页直接平铺所有需要展示的的信息，推荐使用这种详情展示方式。

#### [模板 -  基础详情](https://preview.pro.ant.design/profile/basic)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Z78YSLlHYFUAAAAAAAAAAABkARQnAQ">
</ImagePreview>

将主体内容呈现于一整张卡片中，使用不通栏分割线将相关内容分组。

**什么时候使用**

需要展示内容量少，复杂度低的信息。

#### 模板 - 单据详情

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*51LGQopcBQgAAAAAAAAAAABkARQnAQ">
</ImagePreview>

展示某个审批单据的详细信息，将内容复杂度较高的各模块使用卡片区割开来。

**什么时候使用**

适用于审批流程和审批明细展示，以及部分审批操作。

**涉及哪些操作**

通过、驳回、转交、加签、挂起、撤回。

### 复杂布局

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*BBAlT7zwS0gAAAAAAAAAAABkARQnAQ">
</ImagePreview>

将信息复杂度较高、相关性较弱的信息拆分为多个部分，并通过 页签 、分步、卡片分区、卡片内分组等形式按照相关性分组，用来处理复杂度较高的详情内容。

#### [模板 -  高级详情](https://preview.pro.ant.design/profile/advanced)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*772pTpKDNkwAAAAAAAAAAABkARQnAQ">
</ImagePreview>

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*12bBR7yx30wAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

当详情页内容量大复杂度高时，不得不拆分为多个页签，作为辅助导航引导用户浏览信息。

#### 模板 - 发布流程

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*0IGLSaqstRoAAAAAAAAAAABkARQnAQ">
</ImagePreview>

将内容分阶段组织，了解不同阶段的事项。

**什么时候使用**

适用于开发协作流程。

## 设计建议

### 选择模板

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*kC5tQbp8A60AAAAAAAAAAABkARQnAQ">
</ImagePreview>

根据信息的复杂度和相关性模型，选用相应的信息呈现方式，选用合理的布局方案来承载详情页的内容。

### 区隔方式

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3jPZSa8n2g4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

根据各个信息之间的相关性，判断各个信息模块之间的亲密度，通常情况下，相关性强的内容尽量靠近，相关性弱的的内容尽量拉开层次。

- 不通栏分割线：将相关内容分开；
- 通栏分割线：将内容分成多个部分；
- 卡片：放置一个主题；
- 页签：对象描述信息最顶层组织方式，如按版本组织、按意图组织、按阶段组织；

### 内容组件

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ZRvkTYUMKLQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

根据不同的信息类型和复杂度选用对应的信息呈现方式。按复杂度由低至高，提供以下组件供选择：

## 扩展阅读

### 会用到哪些全局规则

- [数据格式](/docs/spec/data-format)
- [按钮](/docs/spec/buttons)

### 会用到哪些模块或组件

- [描述列表](/components/descriptions-cn/#header)
- [折叠面板](/components/collapse-cn/)
- [表格](/components/table-cn/)

### 外部参考文章

- [Fiori – How to Design an Object Page](https://blogs.sap.com/2017/08/06/fiori-elements-how-to-design-an-object-page/)
- [SAP Fiori 2.0: The Object Page —— Part 1: It's History](https://experience.sap.com/skillup/sap-fiori-2-0-the-object-page-part-1-its-history/)
- [Fiori 详情页汇总](https://experience.sap.com/fiori-design-web/?s=Details+page)
- [Object Page Floorplan](https://experience.sap.com/fiori-design-web/object-page/)
- [超市商品陈列原则](https://wiki.mbalib.com/wiki/%E8%B6%85%E5%B8%82%E5%95%86%E5%93%81%E9%99%88%E5%88%97%E5%8E%9F%E5%88%99)
