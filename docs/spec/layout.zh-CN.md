---
order: 7
title:
  zh-CN: 布局
  en-US: Layout
---

布局是页面构成的前提，是后续展开交互和视觉设计的基础。Ant Design 提供了常用的布局模板来保证同类产品间的一致性，设计者在选择布局之前，需要注意以下几点原则：

- 明确用户在此场景中完成的主要任务和需获取的决策信息。
- 明确决策信息和操作的优先级及内容特点，选择合理布局。

---

## 常用布局

通过大量的中台设计实践，Ant Design 总结了六类常用的页面布局模板：网站展示页、Dashboard、列表页、表格页、详情页、表单页。在设计前先了解这些模板有助于让用户快速找到适合自己产品的页面布局。

### 网站展示页

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/olHkTiGQqfwThlgPIXzx.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/uxbNrsFCmPFjYdhDowky.png">

网站展示页（即官网页）通常是用户了解网站或产品的第一步。这类页面通常会包含产品展示图，简短的产品介绍信息，以及用户登录入口等。在设计时我们建议：

- 明确你要传达的内容，保持简短而清晰的文案。
- 搭配清晰、直观的产品图片，有助于加深用户对产品的理解和记忆。

### 控制台页

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/fCVwqOiItdbzyZkQOOiQ.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/LvYKhbKsPzIRLGsBxUJA.png">

控制台页（Dashboard）集合了大量多样化的信息（如数字，图形，文案等），需要一目了然地将关键信息展示给用户。因此，如何将庞大复杂的信息精简清晰地展示出来，是设计此类页面的关键。在设计时要注意以下几点：

- 按照信息的重要程度来组织页面排版，突出展示关键信息。
- 将数据可视化，让用户可以直观地了解关键信息及整体情况。
- 合理地使用颜色及栅格排版，减轻用户的视觉负担。

### 列表页

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/GSIyiSRJmxUhmxpMoyrj.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/VyFWYXzkQYYzMzqBXfzO.png">

列表设计是并列式展现信息，方便用户能快速查看基本信息及操作。因此，信息的「可阅读性」及「可操作性」是设计的关键。在设计时要注意以下几点：

- 根据用户需求来定义信息展示的等级，仅展示关键信息及操作。
- 当信息内容较为复杂时，可将次要的信息折叠或放到详情页面中，以递进的方式让用户获得更多的信息。

## 表格页

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/ArRESSbBrLJWhjscKiZh.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/gDwAZagDBphbcePRDnBZ.png">

表格作为多维信息展示的载体，使复杂的信息更易于阅读与理解。它的易读性，便捷性，易操作性对产品的体验起着举足轻重的作用。因此，我们在设计时要注意以下几点：

- 构造清晰的表格布局，有利于提升读者对信息的接收速度和理解程度。
- 更多地展示用户所必须的信息，通过视觉上的调优突出展示重点信息。
- 当界面需要在一个很大的多纵行表格中展示数据，或每一横列数据有多行信息时，可以巧妙地运用横向或纵向斑马条，使得信息条目之间更为分明，视觉上更易区分。

### 详情页

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/wRdLpkIoTNfxOvNOqKyf.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/IWXpmErtdIHzDYbtNohi.png">

详情页面一般会承载大量的基本信息，扩展信息，或者状态信息。对于信息效率和优先级判定的要求会比较高。清晰的布局能帮助快速看到关键信息，提高决策效率。这设计时有以下几点需要注意：

- 清晰的排版格式，易于阅读的文本大小及间距，都是影响用户获取信息效率的关键因素。
- 图文搭配比单文本展示信息能更好地提高用户的理解。

### 表单页

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/AVxFnNgjBPIaxLnCOxJv.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/sqeTZuWlqiGboOITncCh.png">

表单页通常用来执行登录、注册、预定、下单、评论等任务，是产品中数据录入必不可少的页面模式。因此，舒适的表单设计，可以引导用户高效地完成表单背后的工作流程：

- 考虑用户的浏览方式，提供清晰的用户视线浏览路径；
- 内容是表单的核心，保证表单的内容精简（尽量避免多余的输入项）；
- 标签的命名要易于用户阅读和理解，避免模糊的描述给用户造成困扰；
- 醒目的提交或完成按钮，放在用户的浏览线的终点更有利于用户的完成操作。

---

## 栅格

我们通过定义网格、间距来呈现产品布局的最佳效果，设计师在设计时可按『页面总宽 1440px，内容区 1208px』来设定，并在此基础上以 24 等分的栅格来划分整个设计建议区域。

![](https://os.alipayobjects.com/rmsportal/bohSixChLxFkwsOEiNaF.png)

建议横向排列的区块数量最多四个，最少一个，以保证视觉层面的舒适感。

![](https://os.alipayobjects.com/rmsportal/JmrNLpHxwcLebVpBIGqD.png)

> 注：图中灰色部分为栅格的列，定义为『Column』，白色部分为栅格的间隔，定义为『Gutter』。

### 栅格公式

<img class="preview-img no-padding" align="right" src="https://os.alipayobjects.com/rmsportal/htXqyMPydaagYLdAGEJK.png">

我们为页面中栅格的 Gutter 设定了定值，即浏览器在一定范围扩大或缩小，栅格的 Column 宽度会随之扩大或缩小，但 Gutter 的宽度值固定不变。

在 Ant Design 中，我们定义了两种 Gutter：

- 网站展示页和 Dashboard 的 Gutter 宽度为 24px。
- 列表、表格、详情和表单页面的 Gutter 宽度为 16px。

> [设置栅格的小技巧](https://zos.alipayobjects.com/rmsportal/cbxeMLaFnqQEvFgmhSTS.png)。
