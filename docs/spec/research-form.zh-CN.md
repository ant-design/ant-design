---
category: 设计模式 - 探索
type: 模板文档
order: 1
title: 表单页
---

表单页是一种用于信息添加、录入的页面类型。用来确保用户按照要求录入信息提交给系统使用或引导用户进行应用设置。

## 设计目标

帮助用户明确当前页面任务，快速查找和定位修改目标，轻松准确地理解表单项含义及生效后果，同时简化填写流程，确保用户准确、轻松、快速地完成任务。

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4IjJTbMSsmEAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>高效</h4>
      <p>通过合理的信息组织形式和表单组件的使用，使用户可以快速完成表单页任务。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lEtuTZi2GvIAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>明确</h4>
      <div>1. 快速定位重要信息和目标选项；</div>
      <div>2. 标题、选项、提示等内容准确传达含义；</div>
      <div>3. 让用户感知不同大小操作的前因后果，并及时响应相关反馈。</div>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*R9PIRbGpFfYAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>安全感</h4>
      <p>合理的操作后果保障机制，例如针对复杂表单提供分布或即时保存机制；针对不同场景任务提供返回、重置、取消、清空、撤销等后悔药和速效药功能。</p>
    </div>
  </div>
</div>

### Do&Don’t

在表单页中组织呈现各表单项时要注意简洁表达，高效准确，避免增加用户录入信息的成本。

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*k9DyRYLzjcoAAAAAAAAAAABkARQnAQ" alt="错误示范" />

一个表单页中针对同一种内容类型的表单项不要使用不同的组件或表现形式，会增加用户理解成本。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*A0EBQ6eAkiwAAAAAAAAAAABkARQnAQ" alt="正确示范" />
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*V56PRpofMRUAAAAAAAAAAABkARQnAQ" alt="错误示范" />

表单项的标题、提示不要使用不易理解的词汇或过长，造成理解成本，如不可避免使用少见词汇，可使用帮助说明等元素辅助设计。

<br />

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EC9uR6LiI0IAAAAAAAAAAABkARQnAQ" alt="错误示范" />

预填提示避免正确的废话，例如一个叫姓名的表单项输入提示是“请输入姓名”。

<br>

## 如何设计

表单类页面模板聚焦于提交一次表单的过程体验。按照任务的复杂度，提供四种解决问题的布局方式：

- 普通布局
- 任务拆解和编排
- 特定场景

### 普通布局

平铺所有需要填写的信息，适合内容项较少、内容项无法按照相关性分组的表单。

#### 模板 - 基础表单

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*c7b6TpKWl-cAAAAAAAAAAABkARQnAQ" />

**什么时候用**

当需要完成一个简单快速的任务，例如输入少量信息即可完成创建。

### 任务拆解和编排

将大型、复杂任务拆解为多个部分，并按照相关性分组，减轻用户输入负担。尽管每部分内容单独处理，但最终一起完成提交。适用于大型、复杂表单。通过适当的任务分割，可以降低用户出错率。

#### 模板 - 基础分步表单

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*E8wRRpLbdyoAAAAAAAAAAABkARQnAQ" />

**什么时候用**

将用户需要填写和确认的信息按照线性流程组织，利用步骤条告知用户完整流程和进度，常常在最后提交前让用户再次确认信息，并在流程结束给与明确的结果反馈。适用于具有明确的线性逻辑的任务。

#### 模板 - 分组表单

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*k6kGSLGZsT0AAAAAAAAAAABkARQnAQ" />

**什么时候用**

单次任务的表单页中需要填写内容众多，且不同内容之中存在一定可分类归纳性。

#### 模板 - 可编辑列表（开发中）

**什么时候用**

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NLEeSLhLA3EAAAAAAAAAAABkARQnAQ" />

动态增减：建议条目表单数 ≤3 项，并且每个输入框不需要单独的标题使用。

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PvoTSbqKywEAAAAAAAAAAABkARQnAQ"/>

可编辑表格：建议条目表单数 2 ~ 5 项 时使用，以使得每行内容可被完整呈现。

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DWlCQazb-HQAAAAAAAAAAABkARQnAQ" />

折叠面板编辑：建议条目表单数在 6 ~ 8 项 时使用。

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ttDGTLid8M4AAAAAAAAAAABkARQnAQ" />

抽屉编辑：建议条目表单表单数 >8 项 时使用。

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*p_wLTJEYOBgAAAAAAAAAAABkARQnAQ" />

规则树：应用于规则编辑场景。

适用于页面中需要添加一个或多个对象，且每个对象都需要添加或编辑多组数据的情况。

### 特定场景模板

#### 模板 - 设置

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*n9zkSKrDU8MAAAAAAAAAAABkARQnAQ" />

**什么时候用**

个人档案、应用配置等设置类页面，使用频率较低，一般用户操作后不会频繁修改。

**使用建议**

每个页面选择一种设置模式：

> - 即时生效模式：用户在修改选项即生效；
> - 提交生效模式：当设置项之间有关联关系，使用提交生效模式。

根据设置项数量确定是否需要分组：

> - 数量 <7 项，不建议分组；
> - 数量 7~ 15 个建议分组；
> - 数量 >15 个建议使用页签分组。

#### [模板 - 登录](https://preview.pro.ant.design/user/login)

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ba6DR5U23nAAAAAAAAAAAABkARQnAQ" />

Ant Design 标准登录模板

#### [模板 - 注册](https://preview.pro.ant.design/user/register)

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*6U_gQ6MbrSYAAAAAAAAAAABkARQnAQ" />

Ant Design 标准注册模板

## 设计建议

### 前期准备

- 表单页的核心由表单项组成，设计前建议先熟悉[表单基础规则](/components/form/)；
- 梳理用户当前信息录入任务中所涉及的信息类型，[并根据 Ant Design 数据录入规则](/docs/spec/data-entry/) 确定所使用的组件。

### 布局方式

在单个表单页中需要根据内容量进行合理地布局，以兼顾页面展示和用户效率。表单页布局可由简到繁划分为 4 个梯度，每一级梯度都兼容前一种布局方式。

#### 基础布局

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lacoSZduvVQAAAAAAAAAAABkARQnAQ" />

在一个区域内从上到下单列布局，引导用户纵向阅读，据[研究](https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php)这是能够最高效完成任务的布局方式。

#### 弱分组

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*E7YuRo094e0AAAAAAAAAAABkARQnAQ" />

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Nd_nQLmFQQwAAAAAAAAAAABkARQnAQ" alt="错误示范" description="为避免和弱分组布局的阅读顺序混淆，一个区域内禁用多列表单。" />

在空间有限时，较短宽度且具有相关性的表单项可多个组合在一行中，形成分组的暗示。

#### 区域内分组

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*eU8dRZUTEM8AAAAAAAAAAABkARQnAQ" />

当一个区域中内容较多且可被分类归纳时，可通过区分标题来进行区域内分组。

#### 卡片分组

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*VPEZRLBm1zwAAAAAAAAAAABkARQnAQ" />

当一个页面中内容众多（通常大于两屏）且可被分类归纳时，可通过卡片分组来承载，每个卡片需要包含一个大标题。

#### 判断布局方式

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*DoKmSYGaYtYAAAAAAAAAAABkARQnAQ" />

关于使用何种布局方式的判断，和[详情页](/docs/spec/detail-page#%E8%AE%BE%E8%AE%A1%E5%BB%BA%E8%AE%AE)类似，应从信息的复杂度和关联性两个维度去梳理。随后可选择相匹配的模板，进行页面快速搭建。

<br>

## 扩展阅读

### 会用到哪些模块或组件

- [表单](/components/form/#header)
- [步骤条](/components/steps/#header)

### 外部参考文章

- [Label Placement in Forms](https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php)
