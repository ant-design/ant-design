---
category:
  zh-CN: 设计模式
  en-US: Design Patterns
type:
  zh-CN: 模板文档
  en-US: Template Document
order: 1
skip: true
title:
  zh-CN: 表单页
  en-US: Form Page
---

表单页是一种用于信息添加、录入的页面类型。用来确保用户按照要求录入信息提交给系统使用或引导用户进行应用设置。

## 设计目标

帮助用户明确当前页面任务，快速查找和定位修改目标，轻松准确地理解表单项含义及生效后果，同时简化填写流程，确保用户准确、轻松、快速地完成任务。

## 设计原则

![image.png](https://gw.alipayobjects.com/zos/antfincdn/qbgluDd7ko/shejiyuanze.png)

### Do & Don't

![image.png](https://gw.alipayobjects.com/zos/antfincdn/1VLX%24%26lNcF/rule1.png)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/xQckp2tMMQ/rule2.png)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/TdU3YwlK0r/rule3.png)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/hlqQKF2YMA/rule4.png)

## 如何设计

表单类页面模板聚焦于提交一次表单的过程体验。按照任务的复杂度，提供多种解决问题的思路：

- [普通布局](#WdpbA)
- [任务拆解和编排](#IzXxO)
- [填写和预览](#00nna)
- [特定场景](#yToPl)

### 普通布局

平铺所有需要填写的信息，适合内容项较少、内容项无法按照相关性分组的表单。

#### [模板 - 基础表单](http://preview-techui.dockerlab.alipay.net/createProject)

**什么时候用**

当需要完成一个简单快速的任务，例如输入少量信息即可完成创建。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/LZJOdo51Z7/putongbuju.png)

### 任务拆解和编排

将大型、复杂任务拆解为多个部分，并按照相关性分组，减轻用户输入负担。尽管每部分内容单独处理，但最终一起完成提交。适用于大型、复杂表单。通过适当的任务分割，可以降低用户出错率。

#### [模板 - 基础分步表单](http://preview-techui.dockerlab.alipay.net/stepform)

作者：晴风将用户需要填写和确认的信息按照线性流程组织，利用步骤条告知用户完整流程和进度，常常在最后提交前让用户再次确认信息，并在流程结束给与明确的结果反馈。

**什么时候用**

适用于具有明确的线性逻辑的任务。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/2Oh8jRih71/renwuchaijiehebianpai.png)

#### 模板 - 同页分步表单  (Coming soon...)

**什么时候用**

用户需要在同一页面查看表单的完整上下文，而不是像基础分步表单那样拆解为多个独立任务。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/a2m8t1K3wj/tongyefenbubiaodan.png)

#### [模板 - 分组表单](http://preview-techui.dockerlab.alipay.net/groupviews)

**什么时候用**

单次任务的表单页中需要填写内容众多，且不同内容之中存在一定可分类归纳性。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/qALbGC%26UWd/fenzubiaodan.png)

#### 模板 - 分组编辑

**什么时候用**

内容量特别大的表单或常常仅需编辑部分内容的表单，该模式常见于详情页的内容编辑。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/6T4ATJ08Cx/fenzubianji.png)

#### 模板 - 可编辑列表 (开发中...)

**什么时候用**

适用于页面中需要添加一个或多个对象，且每个对象都需要添加或编辑多组数据的情况。

**选择合适的模板**

A. 动态增减：建议条目表单数 <=3 项，并且每个输入框不需要单独的标题使用。 B. 可编辑表格：建议条目表单数 2 ～ 5 项 时使用，以使得每行内容可被完整呈现。 C. 折叠面板编辑：建议条目表单数在 6 ～ 8 项 时使用。 D. 抽屉编辑：建议条目表单表单数 >8 项 时使用 E. 规则树：应用于规则编辑场景。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/c90pFAXI29/kebianjiliebiao.png)

#### 模板 -  联动表单 (Coming soon...)

**什么时候用**

一般分为显示联动、数据联动、事件联动，当需要展示联动选项的时候使用。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/gEk0Lsc48%24/liandongbiaodan.png)

### 填写和预览

填写表单的同时提供信息摘要区或实时效果图，便于在提交前预览和确认重要信息，适用于需要提前预知表单生效后关键信息场景。

#### 模板 - 下单页(Coming soon...)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/oLIvbWHkLr/xiadanye.png)

### 特定场景模板

#### [模板 - 设置](http://preview-techui.dockerlab.alipay.net/settingform)

**什么时候用**

个人档案、应用配置等设置类页面，使用频率较低，一般用户操作后不会频繁修改。

**使用建议**

- 每个页面选择一种设置模式：
  - **即时生效模式：**用户在修改选项即生效；
  - 提交生效模式：当设置项之间有关联关系，使用提交生效模式。
- 根据设置项数量确定是否需要分组：
  - 数量 <7 项，不建议分组；
  - 数量 7~ 15 个建议分组；
  - 数量 >15 个建议使用页签分组；

![image.png](https://gw.alipayobjects.com/zos/antfincdn/jHVAIq%26wAV/shezhi.png)

#### [模板 - 登录](https://preview.pro.ant.design/user/login)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/PzIlaIzCXP/denglu.png)

#### [模板 - 注册](https://preview.pro.ant.design/user/register)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/e1%26%264knIYi/zhuce.png)

### 设计建议

#### 前期准备

- 表单页的核心由表单项组成，设计前建议先熟悉表单基础规则；
- 梳理用户当前信息录入任务中所涉及的信息类型，并根据 [antd 数据录入规则](/docs/spec/data-entry-cn#header) 确定所使用的组件；

#### 布局方式

在单个表单页中需要根据内容量进行合理地布局，以兼顾页面展示和用户效率。表单页布局可由简到繁划分为 4 个梯度，每一级梯度都兼容前一种布局方式。

**基础布局**

在一个区域内从上到下单列布局，引导用户纵向阅读，据[研究](https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php)这是能够最高效完成任务的布局方式。

> 以下“区域”特指页面、抽屉、弹窗、卡片内或分组标题下。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/LVM7Wacqsw/jichubuju.png)

**弱分组**

在空间有限时，较短宽度且具有相关性的表单项可多个组合在一行中，形成分组的暗示。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/5D%24GIinshq/ruofenzu1.png)

![image.png](https://gw.alipayobjects.com/zos/antfincdn/mCxfEh3T%24B/ruofenzu2.png)

为避免和弱分组布局的阅读顺序混淆，一个区域内禁用多列表单。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/G78FNhcfYa/ruofenzu3.png)

**区域内分组**

当一个区域中内容较多且存在可分类归纳性时，可通过区分标题来进行区域内分组。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/ECga%24A1EgS/quyuneifenzu.png)

**卡片分组**

当一个页面中内容众多（通常大于两屏）且存在可分类归纳性时，可通过卡片分组来承载。每个卡片需要包含一个大标题。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/OM9iaWOM48/qiapianfenzu1.png)

关于使用何种布局方式的判断，和详情页类似，应从信息的复杂度和关联性两个维度去梳理。随后可选择相匹配的模板，进行页面快速搭建。将相关的元素分组到一起。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/GccgrpeoPm/qiapianfenzu2.png)

## 4. 扩展阅读

### 会用到哪些模块或组件

- [数据录入组件](/components/form-cn/#header)
- [步骤条](/components/steps-cn/#header)

### 相关页面

- [列表页](/docs/spec/research-list)
- [结果页](/docs/spec/research-result)
- [详情页](/docs/spec/detail-page)
