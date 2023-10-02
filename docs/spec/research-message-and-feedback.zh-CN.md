---
group: 设计模式 - 探索
type: 全局规则
order: 2
title: 消息与反馈
---

用于在必要时向用户反馈操作结果或传达消息。

## 设计目标

在不同事件下用户都能感知与操作场景和紧急程度匹配的结果反馈或消息提示，做到合理有效的信息传达。

## 反馈方式

在设计时需要考虑用户试图完成的任务以及需要引起注意的方式，采用何种反馈方式。反馈方式列举如下图：

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SKfjS7vyRP4AAAAAAAAAAABkARQnAQ">
</div>

## 何时使用

<div>
  <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vv37RaVAXhAAAAAAAAAAAABkARQnAQ">
</div>

### 成功

#### 留在原地

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*qQ8NTKMH-2IAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**对话框 Modal**

在不跳转页面打断用户工作流程的前提下，告知用户重要的成功结果。

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NPVGQr6f5-4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

**全局提示 Message**

在不希望在用户执行操作时中断用户前提下显示一条简短的成功消息。

#### 跳转

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*0EdyRa7WeUAAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**独占式 Inline Text & Illustration**

- 长流程步骤表单在最后告知用户成功结果；
- 需要展示较复杂的补充信息（例如配置信息详情）。

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*524fSKE97wYAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**全局提示 Message**

在不希望在用户执行操作时中断用户前提下显示一条简短的成功消息。

### 失败

#### 留在原地

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*S03WS5uHqDsAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**对话框 Model**

提醒用户完成当前工作流之外的重要操作（例如警告信息不安全）。

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4sHLQowCs6IAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**警告提示 Alert**

提醒用户系统中需要立即引起注意的错误信息。

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Qg51Sq2A_M4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

**表单校验提示**

- 用户输入的内容不符合字段或表单的要求；
- 用户跳过了必填字段；
- 系统检测到表单数据中的错误。

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QeWqTIWqrWEAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**通知提醒框 Notification**

- 向用户告知重要的问题或失败状态，希望用户立马做出决策；
- 反馈后台进程失败&告警结果。

#### 跳转

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*7ES2TrY6UJgAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**独占式 Inline Text & Illustration**

- 长流程步骤表单最后出现第三方原因造成的失败结果（例如应用引擎创建失败）；
- 需要展示失败详情。

### 后台操作

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*owL_SK1xmggAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**通知提醒框 Notification**

- 向用户告知重要的问题或失败状态，希望用户立马做出决策；
- 反馈后台进程结果。

####

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*IGpqRbPGZxQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

**通知中心**

向用户通知相关活动信息（例如用户需要审批的项目或者用户申请的审批进程）。
