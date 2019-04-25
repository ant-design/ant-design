---
category: 模式
order: 11
title: 反馈
---

为了帮助用户了解应用当前要做什么，也给用户的下一步行为做参考，以及了解操作后所产生的结果 ，当用户和系统需要交互时，使用不同的模式来反馈信息或结果。当设计者使用反馈或者自定义一些反馈时，请注意：

- 为用户在各个阶段提供必要、积极、即时的反馈；
- 避免过度反馈，以免给用户带来不必要的打扰，能够及时看到效果的、简单的操作，可以省略反馈提示。

---

## 提示信息

任何一个产品，即使用户界面做的再好，也离不开用户引导和信息提示。提示信息是用来告诉用户需要知道什么、采取什么样行动的内容。

### 警告

#### 警告提示（Alert）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/eviVRYTdxOxOfVENLnxq.png">

是一种非阻碍式的信息展示，它不打断用户的当前操作，一般停留至页面某个位置（优先顶部），非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

> 注：关闭按钮可根据业务需要增加或隐藏。

### 通知

#### 通知提醒（Notification）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/nElczRfDzAXRZSkpiJBQ.png" description="较为复杂的通知内容时使用。">

系统主动推送的重要的全局性通知信息，在系统右上角显示。

#### 徽标数（Badge）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/bVonmOmmkuvybQxTDGTC.png" description="当有 icon 的情况时一般居于 icon 右上角；无 icon 的情况下一般位于标题后侧。">

用于聚合型的消息提示，一般出现在通知图标或头像的右上角，通过醒目的视觉形式吸引用户眼球。

> 注：相对重要和用户关联度更高的信息提示，使用数字精准提示；权重不高和不是用户特别关心的消息提示，使用红点做提示。

### 帮助

#### 气泡卡片（Popover）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/zsPOjQqkiwMnMhIsbDHz.png">

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

> 注：和 Tooltip 的区别是，Popover 可以承载更复杂的内容，比如链接或按钮等。

#### 文字提示（Tooltip）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/CKDiGEsluwkRRGqujpgv.png">

用于精确地描述被指向的对象，例如图标、图形、链接等，鼠标移入则显示提示，移出消失，不承载复杂文本和操作。

---

## 过程反馈

操作过程中尽可能将状态的反馈给用户，即时的响应会给用户增加信赖感。

### 加载状态进度反馈

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/cHaaqZTvzgCZiYUnfNom.png" description="当用户不必等待较长时间的加载时使用。">

在操作需要一段时间（一般为超过2秒）完成时系统应即时给予提醒，明确告知加载的状态或加载进度条，保持与用户的沟通。

<br />

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/cHaaqZTvzgCZiYUnfNom.png" description="在操作需要较长时间才能完成时使用，显示该操作的当前进度和状态。">

> 注：若加载时间较长，应提供取消操作。

### 录入反馈

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/CCeqqndHQgWnqVqvRptA.png">

操作过程中可通过不同的校验规则和形式，让用户及时发现并纠正错误。

> 注：反馈文字紧跟着要说明的区块（反馈内容一般是错误说明），不自动消失（当用户进行相应的交互操作后才消失）。

#### 气泡确认框（Popconfirm）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/lPZZxOAakfNhwfrpRPht.png" description="和全屏居中模态对话框相比，交互形式更轻量。">

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

---

## 结果反馈

操作过程中尽可能将状态的反馈给用户，即时的响应会给用户增加信赖感。

### 顶部全局提示反馈（Message）

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/pqJMJfJGLkYTDbLyJwIg.png" description="当用户不必等待较长时间的加载时使用。">

通过一个操作引发的反馈浮层位于顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/DrKzGoqfLRtrPuZaHUiq.png" alt="正确示例" description="重要的失败信息建议使用对话框形式提示并告知失败原因。">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/akPBJQUiUWNsULtGOnyx.png" alt="错误示例" description="重要的失败信息时不建议使用轻量级提示方式。">

由于反馈浮层的展示时长较短（默认 3s），对于比较重要的失败通知，建议改用对话框的形式进行通知，以避免用户遗漏信息。

### 对话框反馈

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/zos/rmsportal/OTzldmUjUgERMbUCHwzt.png">

通过一个操作引发的反馈浮层位于页面中心，反馈内容可通过确认或取消按钮进行关闭，用户在反馈层出现时不可进行任何的操作，用于重要的反馈。

> 注：除失败时避免显示不必要的提醒弹窗。弹窗是很强的反馈机制，只有在传递非常重要，且可操作的信息时才需要使用它。
