---
group:
  title: 全局样式
  order: 1
order: 0
title: 色彩
---

Ant Design 将色彩体系解读成两个层面：系统级色彩体系和产品级色彩体系。

系统级色彩体系主要定义了蚂蚁中台设计中的基础色板、中性色板和数据可视化色板。产品级色彩体系则是在具体设计过程中，基于系统色彩进一步定义符合产品调性以及功能诉求的颜色。

---

## 设计师专属

安装 [💎 Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，不但可以使用 Ant Design 官方色板库，还可以管理自己的专属色板。

## 色彩模型

Ant Design 的设计团队倾向于采用 HSB 色彩模型进行设计，该模型更便于设计师在调整色彩时对于颜色有明确的心理预期，同时也方便团队间的沟通。

## 系统级色彩体系

Ant Design 系统级色彩体系同样源于「自然」的设计价值观。设计师通过对自然场景的抽象捕捉，结合蚂蚁的技术基因，形成了特有的 12 色。进一步又通过大量的观察，捕捉不同色彩在自然光下的变化规律，借助美术中素描的思路，对 12 个颜色进行了衍生。在中性色板的定义上，则是平衡了可读性、美感以及可用性得出的。

### 基础色板

Ant Design 的基础色板共计 120 个颜色，包含 12 个主色以及衍生色。这些颜色基本可以满足中后台设计中对于颜色的需求。

<ColorPalettes></ColorPalettes>

Ant Design 的色板还具备进一步拓展的能力。经过设计师和程序员的精心调制，结合了色彩自然变化的规律，我们得出了一套色彩生成工具，当有进一步色彩设计需求时，设计者只需按照一定规则定义完毕主色，便可以自动获得一系列完整的衍生色。

> Ant Design 三代色板的历史可以参看社区文章：[Ant Design 色板生成算法演进之路](https://zhuanlan.zhihu.com/p/32422584)。

### 中性色板

中性色包含了黑、白、灰。在蚂蚁中后台的网页设计中被大量使用到，合理地选择中性色能够令页面信息具备良好的主次关系，助力阅读体验。Ant Design 的中性色板一共包含了从白到黑的 13 个颜色。

<Palette direction="horizontal"></Palette>

### 数据可视化色板

数据可视化色板是在基础色板以及中性色板的基础上，融合 AntV 「有效、清晰、准确、美」的原则产生的。[查看色板](https://antv.antgroup.com/specification/language/palette)

### 色板生成工具

如果上面的色板不能满足你的需求，你可以选择一个主色，Ant Design 的色彩生成算法会为你生成完整的色板。

<ColorPaletteTool></ColorPaletteTool>

### 在代码中使用色板

我们为程序员提供了色板的 JavaScript 的使用方式。

```
npm install @ant-design/colors
```

```js
import { blue } from '@ant-design/colors';

console.log(blue); // ['#E6F4FF', '#BAE0FF', '#91CAFF', '#69B1FF', '#4096FF', '#1677FF', '#0958D9', '#003EB3', '#002C8C', '#001D66']
console.log(blue.primary); // '#1677FF'
```

更多使用方式：[@ant-design/colors](https://www.npmjs.com/package/@ant-design/colors)

---

## 产品级色彩体系

### 品牌色的应用

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*1c74TKxuEW4AAAAAAAAAAABkARQnAQ">
</ImagePreview>

品牌色是体现产品特性和传播理念最直观的视觉元素之一。在色彩选取时，需要先明确品牌色在界面中的使用场景及范围。在基础色板中选择主色，我们建议选择色板从浅至深的第六个颜色作为主色。 Ant Design 的品牌色取自基础色板的蓝色，Hex 值为 `#1677ff`，应用场景包括：关键行动点，操作状态、重要信息高亮，图形化等场景。

### 功能色

<ImagePreview>
<img class="preview-img no-padding" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*QY4JRa92gHQAAAAAAAAAAABkARQnAQ">
</ImagePreview>

功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接等。功能色的选取需要遵守用户对色彩的基本认知。我们建议在一套产品体系下，功能色尽量保持一致，不要有过多的自定义干扰用户的认知体验。Ant Design 的功能色板如右图：

### 中性色

<ImagePreview>
  <TokenCompare tokenNames="colorTextHeading|colorText|colorTextSecondary|colorTextDisabled|colorBorder|colorSplit|colorBgLayout"></TokenCompare>
</ImagePreview>

Ant Design 的中性色主要被大量的应用在界面的文字部分，此外背景、边框、分割线等场景中也非常常见。产品中性色的定义需要考虑深色背景以及浅色背景的差异，同时结合 WCAG 2.0 标准。Ant Design 的中性色在落地的时候是按照透明度的方式实现的，具体色板如右图：

---

## 企业级产品设计中的色彩应用

在蚂蚁中后台的设计中，我们对于色彩的态度是克制的。色彩在使用时更多的是基于信息传递、操作引导和交互反馈等目的。在不破坏操作效率，影响信息的清晰传达的这些原则之上，理性的选择颜色是关键。当然在配图插画以及展示性页面中可以适当打破这一思路。
