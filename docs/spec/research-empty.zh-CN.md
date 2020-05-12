---
category: 设计模式 - 探索
type: 全局规则
order: 3
title: 空状态
---

任何内容区域（页面、区块、组件、单数据）没有内容/数据显示给用户时，就会出现空状态。

## 设计目标

- 空状态应给予提示，帮助让用户了解空状态原因，避免产生误解与迷失；

- 给予用户推荐操作提示，帮助用户摆脱空状态。

---

## 设计原则

<div class="design-inline-cards">
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*q5MRQ6TBR0EAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>明确</h4>
      <p>通过使用清晰明了的语言、插画等形式告知用户空状态的具体原因。</p>
    </div>
  </div>
  <div>
    <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*wOoaT6juZqwAAAAAAAAAAABkARQnAQ" />
    <div>
      <h4>提供邀请</h4>
      <p>提供帮助文案、建议操作等解决方案，表明在下一个界面可以做什么，引导用户进行操作。</p>
    </div>
  </div>
</div>

### Do&Don’t

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Bh_yRKPOByUAAAAAAAAAAABkARQnAQ" alt="正确示范" description="展示明确空状态提示。">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*yiIXR4u8s2wAAAAAAAAAAABkARQnAQ" alt="错误示范" description="空状态没有任何提示。">

---

## 使用场景

### 新手引导

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*UyVCTaiJ3icAAAAAAAAAAABkARQnAQ">

一般来说，新用户希望空状态具有帮助说明和推荐操作。首次使用应用或功能场景的空状态非常有用，因为它向用户展示了该功能和流程，并且可以帮助用户快速上手。为了帮助首次使用新用户，空状态可以使用功能引导、帮助文档等方式填充原本为空的页面。

#### 使用引导变形

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Pf8HSa477DQAAAAAAAAAAABkARQnAQ">

使用引导由状态提示、帮助引导、建议操作三个部分组成，设计时可根据业务流程选择模块来构成页面和变形。针对处于复杂流程中某一环的空状态页面，也可提供流程引导模块帮助用户全局理解操作流程，同时可提供文字按钮进行流程相关的快捷操作。

### 完成或清空

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*SIZBTJs3O4kAAAAAAAAAAABkARQnAQ">

这种空状态是用户自愿从功能上删除数据的情况。例如，客户完成了任务清单上的所有项目，阅读了所有通知。一般此类场景不需要进行操作引导，只需要用图形元素或提示信息进行空状态说明。

### 无数据

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*utf3Qr-9VssAAAAAAAAAAABkARQnAQ">

内容区域无数据的场景使用，由图形元素、提示信息、建议操作三类元素组合展示，根据使用场景决定是否提供建议操作。

---

## 扩展阅读

### 外部参考文章

- [Salesforce 空状态设计准则](https://www.lightningdesignsystem.com/guidelines/empty-state/#Message)
- [PREDIX 空状态设计准则](https://www.predix-ui.com/#/design/communication/empty-states)
- [Material Design 空状态设计准则](https://material.io/design/communication/empty-states.html#content)
