---
category: 设计模式 - 探索
type: 模板文档
order: 4
title: 结果页
---

结果页是用一个页面反馈操作结果，是反馈模式中最强的一种。

## 何时使用

当完成一个流程操作后，需给与用户明确的结果反馈时，例如分步表单的最后一步。<br/> 当有大量的信息需要在结果页展示时。

## 设计目标

向用户传达任务完成结果，引导用户进行下一步操作，通过有效的反馈建立起用户对系统的信任。

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*HHLnR5RgpWQAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>慎重使用</h4>
      <p>结果页是比较重的反馈方式，仅适用于吸引用户注意程度强、信息量较大、页面永久停留的场景中，其余场景不建议使用。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*hglURJfVdHoAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>即时结束</h4>
      <p>当结果状态为成功时，可以默认提供几秒（建议 3-5秒）后自动跳转。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tJC7RZviqzwAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>精简信息</h4>
      <p>结果页信息建议为提交动作触发后的结果，例如校验建议在表单中完成。结果页信息需精简，仅展示结果相关内容，特殊场景可以增加补充信息。</p>
    </div>
  </div>
</div>

## 设计建议

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*98B4QKjg-QoAAAAAAAAAAABkARQnAQ" alt="正确示范">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EgnGQ4zImuMAAAAAAAAAAABkARQnAQ" alt="错误示范">

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*lVo2RKb6mL4AAAAAAAAAAABkARQnAQ" alt="正确示范">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*4RFCTLatKrcAAAAAAAAAAABkARQnAQ" alt="错误示范">

标题构成建议为「对象+动作+结果/状态」或「动作+结果/状态」。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*r7UFSLbqTdYAAAAAAAAAAABkARQnAQ" alt="正确示范">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zXk0SI4qqYMAAAAAAAAAAABkARQnAQ" alt="错误示范">

操作引导建议不超过 2 项，过多操作会对用户选择造成困扰。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*9gvmRq3RmnQAAAAAAAAAAABkARQnAQ" alt="正确示范">

轻量的反馈不建议使用结果页，可以使用全局提示、警告提示、通知提醒框等交互方式，详情参考反馈类设计指南。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*JY1kR4qIR1wAAAAAAAAAAABkARQnAQ" alt="正确示范">

若结果状态为成功时，可在主按钮上告知用户几秒后自动跳转。

## 如何设计

### 基础布局

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*PQotS7GJC1gAAAAAAAAAAABkARQnAQ">

结果页可提供以下内容：

1. 结果反馈：明确告知用户提交结果；

2. 结果解释（可选）：若需要对结果简要解释使用；

3. 建议操作：引导用户继续完成后续工作；

4. 补充信息（可选）：在通知结果的同时，有补充信息需要反馈给用户；营销模块。

#### 模板 - 基础结果页

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*uXFNR4eef2oAAAAAAAAAAABkARQnAQ">

显示结果状态并引导用户进行下一步操作。

#### 模板 - 复杂结果页

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SWabTZptxEcAAAAAAAAAAABkARQnAQ">

除结果状态和引导操作等基础信息外，同时展示相关推荐、流程进度、错误详情等信息。

#### 补充信息类型

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*avS5TZcMawwAAAAAAAAAAABkARQnAQ">

## 延伸阅读

### 会用到哪些全局规则

- [反馈](/docs/spec/research-message-and-feedback)

### 会用到哪些模块或组件

- [表单页](/components/form-cn/)

### 外部参考文章

- [Fiori 消息反馈类组件规则](https://experience.sap.com/fiori-design-web/message-box/)
- [阿里云结果页设计](https://xconsole.aliyun-inc.com/scenes/resultpage)
- [CANVAS 消息反馈类组件规则](https://canvas.hubspot.com/components/alerts-messaging)
- [PREDIX 通知提醒框和警告组件规则](https://www.predix-ui.com/#/design/communication/notifications)
