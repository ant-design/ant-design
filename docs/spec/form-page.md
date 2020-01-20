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

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574311351853-033b6079-aa32-4dee-b411-a349ce4f0b3b.png#align=left&display=inline&height=271&name=image.png&originHeight=450&originWidth=1240&size=69733&status=done&style=none&width=746)

### Do & Don't

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1571297420574-d270628f-4eeb-4c79-80fb-1c30cf99e934.png#align=left&display=inline&height=264&name=image.png&originHeight=264&originWidth=568&size=26159&status=done&style=none&width=568)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1571297381128-b22c5cd0-088a-46c2-a5a2-b3811b729e23.png#align=left&display=inline&height=284&name=image.png&originHeight=284&originWidth=568&size=29905&status=done&style=none&width=568)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1571297475106-5376028f-764c-4f93-9855-a32b8ea63d75.png#align=left&display=inline&height=264&name=image.png&originHeight=264&originWidth=568&size=15542&status=done&style=none&width=568)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1571297499650-4fec5e5e-4bf9-46ca-b5a9-13d17985bc3e.png#align=left&display=inline&height=264&name=image.png&originHeight=264&originWidth=568&size=22652&status=done&style=none&width=568)

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

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574311488703-264672b4-efa2-41bd-a7b0-88f8929795c8.png#align=left&display=inline&height=323&name=image.png&originHeight=1291&originWidth=1694&size=190539&status=done&style=none&width=424)

### 任务拆解和编排

将大型、复杂任务拆解为多个部分，并按照相关性分组，减轻用户输入负担。尽管每部分内容单独处理，但最终一起完成提交。适用于大型、复杂表单。通过适当的任务分割，可以降低用户出错率。

#### [模板 - 基础分步表单](http://preview-techui.dockerlab.alipay.net/stepform)

作者：晴风将用户需要填写和确认的信息按照线性流程组织，利用步骤条告知用户完整流程和进度，常常在最后提交前让用户再次确认信息，并在流程结束给与明确的结果反馈。

**什么时候用**

适用于具有明确的线性逻辑的任务。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574312524017-8fe5f244-7377-42d0-bc5f-680e173a0dd7.png#align=left&display=inline&height=563&name=image.png&originHeight=1126&originWidth=4830&size=236444&status=done&style=none&width=2415)

#### 模板 - 同页分步表单  (Coming soon...)

**什么时候用**

用户需要在同一页面查看表单的完整上下文，而不是像基础分步表单那样拆解为多个独立任务。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574357993810-99fbcb07-12e7-40ce-aa01-ae2f8d5d9674.png#align=left&display=inline&height=286&name=image.png&originHeight=572&originWidth=847&size=51276&status=done&style=none&width=423.5)

#### [模板 - 分组表单](http://preview-techui.dockerlab.alipay.net/groupviews)

**什么时候用**

单次任务的表单页中需要填写内容众多，且不同内容之中存在一定可分类归纳性。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574313449192-5b1502cc-faff-4293-a06a-f28094c803b0.png#align=left&display=inline&height=413&name=image.png&originHeight=1649&originWidth=1694&size=157454&status=done&style=none&width=424)

#### 模板 - 分组编辑

**什么时候用**

内容量特别大的表单或常常仅需编辑部分内容的表单，该模式常见于详情页的内容编辑。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574313868617-676253da-b0f5-4260-9fe1-5071c26754ef.png#align=left&display=inline&height=286&name=image.png&originHeight=572&originWidth=847&size=43258&status=done&style=none&width=423.5)

#### 模板 - 可编辑列表 (开发中...)

**什么时候用**

适用于页面中需要添加一个或多个对象，且每个对象都需要添加或编辑多组数据的情况。

**选择合适的模板**

A. 动态增减：建议条目表单数 <=3 项，并且每个输入框不需要单独的标题使用。 B. 可编辑表格：建议条目表单数 2 ～ 5 项 时使用，以使得每行内容可被完整呈现。 C. 折叠面板编辑：建议条目表单数在 6 ～ 8 项 时使用。 D. 抽屉编辑：建议条目表单表单数 >8 项 时使用 E. 规则树：应用于规则编辑场景。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574320088090-3538959e-b415-4858-9274-76d6507f34ed.png#align=left&display=inline&height=1457&name=image.png&originHeight=2914&originWidth=4830&size=775944&status=done&style=none&width=2415)

#### 模板 -  联动表单 (Coming soon...)

**什么时候用**

一般分为显示联动、数据联动、事件联动，当需要展示联动选项的时候使用。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574317965978-c2c8c735-247c-4d34-959d-a26483d0ee94.png#align=left&display=inline&height=286&name=image.png&originHeight=572&originWidth=847&size=45460&status=done&style=none&width=423.5)

### 填写和预览

填写表单的同时提供信息摘要区或实时效果图，便于在提交前预览和确认重要信息，适用于需要提前预知表单生效后关键信息场景。

#### 模板 - 下单页(Coming soon...)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574317642788-d179583a-7017-44c1-aa8d-f791823650c5.png#align=left&display=inline&height=286&name=image.png&originHeight=572&originWidth=847&size=50268&status=done&style=none&width=424)

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

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574320838737-6c1c39c4-2ba6-4efe-9a00-cd52ee61e94f.png#align=left&display=inline&height=1011&name=image.png&originHeight=2022&originWidth=3260&size=284012&status=done&style=none&width=1630)

#### [模板 - 登录](https://preview.pro.ant.design/user/login)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574321400288-b3d2625e-319a-4335-b132-b1b4057d8779.png#align=left&display=inline&height=261&name=image.png&originHeight=1043&originWidth=1694&size=122773&status=done&style=none&width=424)

#### [模板 - 注册](https://preview.pro.ant.design/user/register)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/101/1574321413674-6755ce8b-c5ea-42e6-8940-cf13e4a561e7.png#align=left&display=inline&height=259&name=image.png&originHeight=1035&originWidth=1694&size=117080&status=done&style=none&width=424)

### 设计建议

#### 前期准备

- 表单页的核心由表单项组成，设计前建议先熟悉[表单基础规则](https://yuque.antfin-inc.com/ui-assets/bgt2gr/qhm36a)；
- 梳理用户当前信息录入任务中所涉及的信息类型，并根据 [antd 数据录入规则](https://ant.design/docs/spec/data-entry-cn#header) 确定所使用的组件；

#### 布局方式

在单个表单页中需要根据内容量进行合理地布局，以兼顾页面展示和用户效率。表单页布局可由简到繁划分为 4 个梯度，每一级梯度都兼容前一种布局方式。

**基础布局**

在一个区域内从上到下单列布局，引导用户纵向阅读，据[研究](https://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php)这是能够最高效完成任务的布局方式。

> 以下“区域”特指页面、抽屉、弹窗、卡片内或分组标题下。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574736092458-3657adca-9924-4c16-a572-91aa0f8d0156.png#align=left&display=inline&height=230&name=image.png&originHeight=308&originWidth=750&size=10065&status=done&style=none&width=560)

**弱分组**

在空间有限时，较短宽度且具有相关性的表单项可多个组合在一行中，形成分组的暗示。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574736122151-0ffa03e4-9a3f-4cb9-bb42-a18a3f05ecc1.png#align=left&display=inline&height=209&name=image.png&originHeight=280&originWidth=750&size=15978&status=done&style=none&width=560)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574736007056-7cd51e62-fb5c-4d50-8d34-ccccbf49e858.png#align=left&display=inline&height=233&name=image.png&originHeight=312&originWidth=750&size=14670&status=done&style=none&width=560)

为避免和弱分组布局的阅读顺序混淆，一个区域内禁用多列表单。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574736941043-8aa9ff26-abf7-400d-a2f9-76b8716ab6d6.png#align=left&display=inline&height=334&name=image.png&originHeight=334&originWidth=560&size=14560&status=done&style=none&width=560)

**区域内分组**

当一个区域中内容较多且存在可分类归纳性时，可通过区分标题来进行区域内分组。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574738030270-76103fab-d3ba-40f8-9107-6c4723538aa5.png#align=left&display=inline&height=286&name=image.png&originHeight=378&originWidth=560&size=7283&status=done&style=none&width=424)

**卡片分组**

当一个页面中内容众多（通常大于两屏）且存在可分类归纳性时，可通过卡片分组来承载。每个卡片需要包含一个大标题。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574738079391-28fd1b9b-2d34-4012-98bb-536e886b8330.png#align=left&display=inline&height=286&name=image.png&originHeight=378&originWidth=560&size=7767&status=done&style=none&width=424)

关于使用何种布局方式的判断，和详情页类似，应从信息的复杂度和关联性两个维度去梳理。随后可选择相匹配的模板，进行页面快速搭建。将相关的元素分组到一起。

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/86564/1574738157001-abf07523-31b7-4dcf-b53b-3af11631502a.png#align=left&display=inline&height=975&name=image.png&originHeight=975&originWidth=1140&size=107023&status=done&style=none&width=1140)

## 4. 扩展阅读

### 会用到哪些全局规则

- [表单](https://yuque.antfin-inc.com/ui-assets/bgt2gr/qhm36a)

### 会用到哪些模块或组件

- [数据录入组件](https://ant.design/components/form-cn/#header)
- [步骤条](https://ant.design/components/steps-cn/#header)

### 相关页面

- [列表页](https://yuque.antfin-inc.com/ui-assets/bgt2gr/akzstg)
- [结果页](https://yuque.antfin-inc.com/ui-assets/bgt2gr/mome0a)
- [详情页](https://yuque.antfin-inc.com/ui-assets/bgt2gr/gbucb9)
