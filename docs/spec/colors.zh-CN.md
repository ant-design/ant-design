---
order: 3
title: 色彩
---

设计中对色彩的运用不仅应考虑品牌的识别性，还需达到信息传递、操作指引、交互反馈，或是强化和凸显某一个元素的目的。基于操作系统更注重高效、清晰等特点，Ant Design 的用色上更偏向简洁实用一些。在选择色彩时有以下三个注意点：

- 色彩应与产品定位相匹配，且符合用户心理认知；
- 视觉层次应清晰分明，为重要行动点或关键信息定义一个主色，并建立视觉连续性；
- 遵守 WCAG 2.0 的 标准，保证足够的对比度，让色彩更容易被视障碍（色盲）用户识别。

---

## 色板

Ant Design PC 端的色板由 10 个由浅至深的色彩单元格组成，我们为部分色彩格定义了默认使用场景，用户在进行色彩配色时只需根据关键词选择一条色板即可得到一套完整的系统配色方案。在理论上，在 UI 设计中的色彩都应取自这份色板。

经过设计师和程序员的精心调教，结合了色彩加白、加黑、加深，贝塞尔曲线，以及针对冷暖色的不同旋转角度，得出一套[色板生成算法](https://github.com/ant-design/ant-design/blob/734beb84ffc3f0469fbae1566aa8450f966cb261/components/style/color/colorPalette.less)（用以取代我们原来的 tint/shade 色彩系统）。使用者只需指定主色，便可导出一条完整的渐变色板。

Ant Design 的色板由 8 种基本色彩组成，每种基本色（第 6 格）又按上述算法衍生出 10 种渐变色。

> 注：在由浅至深的色板里，第 6 格色彩单元格普遍满足 [WCAG 2.0](http://leaverou.github.io/contrast-ratio/) 的 4.5:1 最小对比度（AA 级），我们将其定义为色板的默认品牌色。

`````__react
import ColorPalettes from '../../site/theme/template/Color/ColorPalettes';

ReactDOM.render(<ColorPalettes />, mountNode);
`````

为了考虑文本在不同颜色背景下的呈现，我们选择了『White #FFFFFF』和『Black #000000』并配以透明度来区分文本的等级层次。详情请查看 [字体颜色](/docs/spec/font#字体颜色)。

### 色板生成工具

如果上面的色板不能满足你的需求，你可以选择一个主色，Ant Design 的色彩生成算法会为你生成完整的色板。

`````__react
import ColorPaletteTool from '../../site/theme/template/Color/ColorPaletteTool';

ReactDOM.render(<ColorPaletteTool />, mountNode);
`````

---

## 色彩应用

### 品牌色的应用

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/lVKfKMuLmaTlnTDitPEJ.png" alt="Ant Design 品牌色常用色值">

品牌色是体现产品特性和传播理念最直观的视觉元素之一。在色彩选取时，需先了解品牌色在界面中的使用场景及选色范围。以 Ant Design 网页组件的默认样式为例，品牌色主要体现在关键行动点及操作状态、重要信息高亮等场景。

> 注：图形插画和 logo 可以不必遵循色板，但需保持相近的色系。

### 中性色的应用

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/AmXwsVOWrLxDfwLNlyvL.png" alt="Ant Design 中性色常用色值">

灰色作为中性色在 Ant Design 的网页设计中被大量使用到，它的使用有利于关键内容的衬托和功能的引导。这类色彩主要体现在导航框架、背景底色、描边、或次级操作等等。

### 功能色的应用

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/mewwdThVwyTQzpZQtYXw.png" alt="Ant Design 功能色卡">

UI 设计中，比较稳定的色彩除了中性色外还有具备特定含义的功能色，这类色彩起到传递功能信息、代表某种状态等作用。主要应用于消息通知、反馈提醒、表单校验这类场景中的成功、出错、失败、提醒、链接等状态。

### 视觉层次

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/ADUfVlZwjziJRUQSMbMt.png" alt="正确示例" description="通过品牌色引导用户的视线路径">

将品牌色赋予在重要信息或关键主动点上，并衬以大面积的中性色，可以让用户更聚焦到任务本身，从而提高任务的执行效率。

<br />

<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/RmSDSeAAYphuiDFszIMa.png" alt="错误示例" description="操作界面使用的色彩应尽量避免面积过大或种类过多而造成用户视觉疲劳">

> 注：界面用色建议不超过三种（数据图表和图形类插画除外）。

### 色彩的易识别性

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/jeyvhMIQgoPUotNerRGy.png" alt="正确示例">
<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/ppdlrVnFCsYVicjDrnzi.png" alt="错误示例" description="当对比度数值低于 3:1 时，弱视用户将很难识别">

Ant Design 的色板颜色遵守 WCAG 2.0 的标准，操作类的色彩搭配都应满足颜色对比值 3:1 的最低标准。

- [色彩对比值校验工具](http://leaverou.github.io/contrast-ratio/#%23454545-on-%23fff)
