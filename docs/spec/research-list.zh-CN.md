---
group: 设计模式 - 探索
type: 模板文档
order: 3
title: 列表页
---

列表页可以查看和处理大量的条目，常有导航至详情的作用。用户可在列表页对条目进行筛选、对比、新增、分析、下钻至条目完整详情页等操作。

---

## 设计目标

帮助用户更高效地查看、处理、查找条目。

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*TZ7wT6tvulkAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>易扫读</h4>
      <p>采用格式一致外观，突出有利于对象识别的关键信息。利用富交互分层展示信息以减少认知负荷。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>可寻性</h4>
      <p>列表以易于浏览的逻辑排序。提供合适的搜寻组件帮助用户快速查找信息。</p>
    </div>
  </div>
</div>

## 如何设计

### 基础布局

#### 单列布局

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*c0iNQIBusPMAAAAAAAAAAABkARQnAQ">
</ImagePreview>

从上往下堆叠，数据过滤模块在最上方，过滤数据后，用户再由总体到具体的浏览逻辑理解和分析。

#### 双栏布局

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*h8MsSr8UXCEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

将数据过滤模块放置在侧栏，当过滤条件过多，横向空间充裕时使用。

#### [模版 - 查询表格](https://preview.pro.ant.design/list/table-list)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*uAGRTY5EMvIAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

每个条目都需要露出很多字段；用户在搜寻条目时有准确的查询范围时使用。

#### 模版 - 标准列表

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3KMbRrbjvzkAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

提供每个条目的概览信息，点击列表可导航至条目详情。页面内常提供统计功能，供用户了解总体进展。可作为简易版的工作台使用。

#### [模板 - 卡片列表](https://preview.pro.ant.design/list/card-list)

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*coEVT7uElCUAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

用户无需以特定顺序浏览条目，将每个条目以富有吸引力的方式呈现。

#### 模版 - 搜索列表

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*yW4QQKNi_0QAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

以搜索为主寻找特定条目信息，通过关键词一次性在众多主题下的条目中搜寻结果。可对大量不同种类的内容进行搜索和筛选，满足对模糊目标的查找需求。

**涉及哪些操作**

筛选、搜索

#### 模版 - 成员管理

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*aJxDR6oP19gAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**什么时候使用**

成员管理是用于展示和管理某对象中所包含的成员的基本信息和权限信息的页面，管理操作通常包括添加成员、删除成员、成员角色与权限赋予等。

**涉及哪些操作**

筛选、删除等

## 设计建议

#### 批量操作

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NvPKR5HZQ9MAAAAAAAAAAABkARQnAQ">
</ImagePreview>

页级的批量操作影响整个页面，可布置于页底。

## 扩展阅读

#### 外部参考文章

- [Canvas 筛选器](https://canvas.hubspot.com/patterns/filters)
- [Canvas 搜索](https://canvas.hubspot.com/patterns/search)
- [Fiori 分析列表页](https://experience.sap.com/fiori-design-web/analytical-list-page/)
- [QuickBook 表格设计规则](https://designsystem.quickbooks.com/component/tables/)
- [文章：数据表格设计](https://medium.com/@taras.bakusevych/data-tables-design-3c705b106a64)
- [文章：Designing Tables for Reusability](https://uxdesign.cc/designing-tables-for-reusability-490a3760533)
- [文章：可供性与设计](http://www.woshipm.com/pd/1479.html)
