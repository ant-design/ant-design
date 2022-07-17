---
category: 设计模式
type: 全局规则
order: 6
title: 按钮
---

## 设计目标

- 指导用户采取你希望他们采取的行动。
- 帮助用户避免犯错。

## 类型

### 常规按钮

<div>
  <img alt="buttons" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*wsXrT7yQH2MAAAAAAAAAAABkARQnAQ">
</div>

#### ① 次按钮

常规按钮，用于非主要动作。如果不确定选择哪种按钮，次按钮永远是最安全的选择。

#### ② 主按钮

突出“完成”、“推荐”类操作；一个按钮区最多使用一个主按钮。

#### ③ 文字按钮

弱化的按钮，采用更轻量的按钮样式，可用于需大面积展示按钮场景，例如表格组件中的操作列。

#### ④ 图标按钮

图标提供视觉线索，避免逐字阅读按钮文案，更高效地使用界面。

- 需要在较小的空间内展示尽量多的按钮。
- 使用纯图标按钮必须有 Tooltip 提示按钮含义。

#### ⑤ 在按钮中添加图标

用于对按钮含义补充解释，提高按钮识别效率。

### 按钮强调

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*guusTZ6ZPxkAAAAAAAAAAABkARQnAQ">

常规按钮类型呈现出不同的**强调程度**，使用者可以据此变化出合适的按钮类型：

### Do&Don't

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*di8jS5EWYSIAAAAAAAAAAABkARQnAQ" alt="错误示范" description="不要在一个按钮区放置超过一个主按钮。">
<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3WUkT5pD1SUAAAAAAAAAAABkARQnAQ" alt="正确示范" description="1、强调一个主要操作；<br/>2、操作无主次，次按钮是最安全的选择。">

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zBtTRq2xbTYAAAAAAAAAAABkARQnAQ" alt="错误示范" description="不要在按钮中放置两个图标。">
<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EpwSTpaGPBgAAAAAAAAAAABkARQnAQ" alt="正确示范" description="1、1按照主次展示全部操作。<br/>2、将次要操作收纳至右侧下拉按钮中。">

### 特殊按钮

#### 虚线按钮  Dashed button

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*gPmNQ6_YCcoAAAAAAAAAAABkARQnAQ">

用于引导用户在一个区域中添加内容。

#### 危险按钮 Danger button

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*OvNaQJrmqVMAAAAAAAAAAABkARQnAQ">

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ujcXTqJ_IwwAAAAAAAAAAABkARQnAQ" alt="正确示范" description="用户的主要意图是删除，通过红色警示该操作存在风险。">

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*o7EySrBPX9oAAAAAAAAAAABkARQnAQ" alt="正确示范" description="当系统不推荐用户执行删除操作时，可将取消按钮设置为主按钮。">

警示用户该操作存在风险。

#### 幽灵按钮 Ghost button

置于复杂或较深的背景中，避免按钮突兀地破坏背景的整体性。该场景下可灵活定制样式。

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*-wORTrNJ6YUAAAAAAAAAAABkARQnAQ">

#### 行动号召按钮 Call to action

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*32zdRqTjDhYAAAAAAAAAAABkARQnAQ">

经常独立出现，行动号召按钮就像是电脑在对用户大声说“跟我来吧”，有点命令用户点击的意味，通常出现于 landing page 或者 一些引导性场景。最大可以将按钮放宽到与父区域等宽。一个屏幕空间中，建议只有一个行动号召按钮。

## 位置

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*B8D0RJnirLkAAAAAAAAAAABkARQnAQ">

将按钮区放置于用户浏览路径中，便于被用户发现，如 “F 浏览模式” 和 “Z 浏览模式” 。

### 如何确定按钮区的放置位置？

#### 页面/卡片/一组信息都能够呈现一个主题，主题的描述可以抽象为三个区域：

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*iVZpRpdN_2AAAAAAAAAAAABkARQnAQ">

- Header：主题的标题和摘要信息内容区的导航等
- Body：具体内容
- Footer：主题的补充信息和工具栏等

将按钮区放置在不同的区域，有不同的含义：见右图。

也存在一些特殊情况，将“完成”主题类的动作放在 Header 区。例如，编辑器中为了最大化编辑空间，将“完成”类动作放到了右上角。

### 什么时候需要在 Footer 中放置按钮区？

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*KGGWQLCBfm0AAAAAAAAAAABkARQnAQ">

- Body 区部分内容被折叠或隐藏，例如单屏无法展示完整内容；
- Body 区的内容复杂度高，例如有多个分组，分组中又有独立的按钮区，这时候需要将该主题的“完成”操作从 body 区区分出来，避免混淆按钮所能影响的内容范围。

简而言之，Footer 的存在就是为了要和 Body 区区分开来。

## 按钮顺序

### 按钮顺序

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NcPDQI3IX8YAAAAAAAAAAABkARQnAQ">

推荐操作是阅读的起点，折叠内容始终在最右侧。

**如何确定按钮顺序？**

- 对话习惯：按钮放置顺序类似于电脑和用户的对话，**优先询问用户可能需要执行的操作，或你希望用户执行的操作，最后向用户提供存在风险的操作**。
- 方向性含义：例如，具有返回意义的按钮，应该放在左侧，暗示其方向是回到之前，例如上一步。

### 按钮组

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*tK-AQaE5h1YAAAAAAAAAAABkARQnAQ" alt="正确示范">

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*_gU7ToHiZz4AAAAAAAAAAABkARQnAQ" alt="错误示范" description="连在一起的按钮组在外观上易与 Toggle Button 切换按钮混淆。">

多个按钮形成一组时，将按钮排列在一起即可。

### 按钮分组

当需要布置的按钮数量过多，可以把相关的动作组成一组，并采用相似的视觉设计。当某一个按钮是首要动作时仍可使用主按钮强调。

<img class="preview-img no-padding" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*x7YsTafH5osAAAAAAAAAAABkARQnAQ">

**按主次折叠部分按钮**

<br />

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Qn-mQKxaQ5kAAAAAAAAAAABkARQnAQ" alt="正确示范">
<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3bUZRbPiVBEAAAAAAAAAAABkARQnAQ" alt="错误示范" description="无需分组时不要使用短竖线分割">

**平铺每个按钮**：优先推荐通过间距来区隔分组，也可以使用分割线来区隔视觉相似的按钮组。

## 文案

<img class="preview-img no-padding good" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*33KsR66zTY8AAAAAAAAAAABkARQnAQ" alt="正确示范">

<img class="preview-img no-padding bad" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*238RTb4kaPwAAAAAAAAAAABkARQnAQ" alt="错误示范" description="应使用动词">

文案需清楚传达用户按下按钮时系统将执行的操作。

- 必须使用动词。（下拉按钮除外）
- 与语境紧密关联，用语简练。

Ant Design 组件中默认使用 “确定 / 取消”文案 ，但你仍然可以通过以下方式优化按钮文案：

- 描述任务结果。

  > 发布、登录、注册

- 主要操作也为否定含义时，强调后果。
  > 你确定要删除它吗？删除 / 取消
