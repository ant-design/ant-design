---
order: 7
title:
  zh-CN: 布局
  en-US: Layout
---

布局是页面构成的前提，是后续展开交互和视觉设计的基础。Ant Design 提供了常用的布局模板来保证同类产品间的一致性，设计者在选择布局之前，需要注意以下几点原则：

Layout is the prerequisite for a webpage. It's also the foundation of follow-up interactive and visual design. In order to guarantee consistency among similar products, Ant Design provides some common layout templates. Before choosing one of these templates, you need to have a clear mind about:

- 明确用户在此场景中完成的主要任务和需获取的决策信息。
- the main tasks that a user needs to accomplish and all necessary information for making such decisions.
- 明确决策信息和操作的优先级及内容特点，选择合理布局。
- the priorities and features of those tasks and information, so as to select a reasonable layout

---

## 常用布局
## Commonly used layout

通过大量的中台设计实践，Ant Design 总结了六类常用的页面布局模板：网站展示页、Dashboard、列表页、表格页、详情页、表单页。在设计前先了解这些模板有助于让用户快速找到适合自己产品的页面布局。

Through a large number of practices, Ant Design summarized six commonly used layout templates. There are home page, dashboard, list page, table page, details page and form page. Knowing these templates helps to find out a suitable layout for your product quickly.

### 网站展示页
### Home page


<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/olHkTiGQqfwThlgPIXzx.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/uxbNrsFCmPFjYdhDowky.png">

网站展示页（即官网页）通常是用户了解网站或产品的第一步。这类页面通常会包含产品展示图，简短的产品介绍信息，以及用户登录入口等。在设计时我们建议：
Homepage is usually the first step for a user to understand a website or the products. Generally, home page consists of product drawings, brief product introductions, and user login interfaces. In the design, we recommend you to:

- 明确你要传达的内容，保持简短而清晰的文案。
- keep the copywriting clear and simply, which helps you better express the ideas.
- 搭配清晰、直观的产品图片，有助于加深用户对产品的理解和记忆。
- use intuitive pictures for a product, which helps to deepen a user's understanding and impression.

### 控制台页
### Dashboard

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/fCVwqOiItdbzyZkQOOiQ.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/LvYKhbKsPzIRLGsBxUJA.png">

控制台页（Dashboard）集合了大量多样化的信息（如数字，图形，文案等），需要一目了然地将关键信息展示给用户。因此，如何将庞大复杂的信息精简清晰地展示出来，是设计此类页面的关键。在设计时要注意以下几点：
Dashboard collects a variety of information, such as digitals, graphics, copywriting, etc. Key information should be clearly represented and easily understood. Thus, displaying the complex information in a clear way is important in the design. For this propose, we recommend you to:

- 按照信息的重要程度来组织页面排版，突出展示关键信息。
- organize the page layout according to the importance of information, so as to highlight key points.
- 将数据可视化，让用户可以直观地了解关键信息及整体情况。
- visualize the data, which allows users to understand key information as well as the overall situation in an intuitive way.
- 合理地使用颜色及栅格排版，减轻用户的视觉负担。
- use color and grid layout logically, which helps to reduce a user's visual fatigue.


### 列表页
### List page

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/GSIyiSRJmxUhmxpMoyrj.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/VyFWYXzkQYYzMzqBXfzO.png">

列表设计是并列式展现信息，方便用户能快速查看基本信息及操作。因此，信息的「可阅读性」及「可操作性」是设计的关键。在设计时要注意以下几点：
List is a way to display information in parallel. A well designed list can be helpful for users to read basic information and perform corresponding operations quickly. Therefore, the "readability" and "operability" of a list are the keys to the design. For this propose, we recommend you to:

- 根据用户需求来定义信息展示的等级，仅展示关键信息及操作。
- identify the importance of information accordingly and show nothing but key information as well as the corresponding operations.
- 当信息内容较为复杂时，可将次要的信息折叠或放到详情页面中，以递进的方式让用户获得更多的信息。
- fold secondary information or put it into the details page. It allows a user to access information in a progressive way when the content is too complex.

### 表格页
### Table page

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/ArRESSbBrLJWhjscKiZh.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/gDwAZagDBphbcePRDnBZ.png">

表格作为多维信息展示的载体，使复杂的信息更易于阅读与理解。它的易读性，便捷性，易操作性对产品的体验起着举足轻重的作用。因此，我们在设计时要注意以下几点：
Table is a carrier for multi-dimensional information. It can make complex information to be read and understood easier. Its readability, convenience and operability play an essential role in the user experience. Therefore, we should pay attention to the following points in the design:

- 构造清晰的表格布局，有利于提升读者对信息的接收速度和理解程度。
- construct a clear table layout. It can be helpful for a user to receive and understand information.
- 更多地展示用户所必须的信息，通过视觉上的调优突出展示重点信息。
- highlight key information through some visual adjustments.
- 当界面需要在一个很大的多纵行表格中展示数据，或每一横列数据有多行信息时，可以巧妙地运用横向或纵向斑马条，使得信息条目之间更为分明，视觉上更易区分。
- use the horizontal or vertical zebra strip smartly when there is a large multi-row table or there are multiple columns in each row. By doing so, information is more distinguishable and easier to be identified.

### 详情页
### Details page

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/wRdLpkIoTNfxOvNOqKyf.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/IWXpmErtdIHzDYbtNohi.png">

详情页面一般会承载大量的基本信息，扩展信息，或者状态信息。对于信息效率和优先级判定的要求会比较高。清晰的布局能帮助快速看到关键信息，提高决策效率。这设计时有以下几点需要注意：
Details page usually carries a large amount of basic information, extended information as well as status information. It's important to identify priorities of the information. A clear layout can be helpful for a user to get key information at a glance and make decisions efficiently. In the design, it's worth noting that:

- 清晰的排版格式，易于阅读的文本大小及间距，都是影响用户获取信息效率的关键因素。
- layout format, text size and text spacing, are the key factors that affect a user's efficiency to access to information.
- 图文搭配比单文本展示信息能更好地提高用户的理解。
- text with graphic can be better understood than pure text.

### 表单页
### Form page

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/AVxFnNgjBPIaxLnCOxJv.png">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/sqeTZuWlqiGboOITncCh.png">

表单页通常用来执行登录、注册、预定、下单、评论等任务，是产品中数据录入必不可少的页面模式。因此，舒适的表单设计，可以引导用户高效地完成表单背后的工作流程：
Form page is often used for tasks such as login, register, booking, comment, etc. Form page is indispensable when you need to record a user's information. Therefore, a well designed form page can guide a user to complete the data recording workflow behind the form efficiently. We recommended you to:

- 考虑用户的浏览方式，提供清晰的用户视线浏览路径；
- provide a clear user's view path, in consideration of how a user will browse the information;
- 内容是表单的核心，保证表单的内容精简（尽量避免多余的输入项）；
- simplify the content of a form (try to avoid redundant inputs)
- 标签的命名要易于用户阅读和理解，避免模糊的描述给用户造成困扰；
- name the tags that can be easy to read and understand. Avoid confusions caused by ambiguous descriptions;
- 醒目的提交或完成按钮，放在用户的浏览线的终点更有利于用户的完成操作。
- place eye-catching submit buttons on the end of a user's view path. It's more conducive for the user to complete all the operations.

---

## 栅格
## Grid

我们通过定义网格、间距来呈现产品布局的最佳效果，设计师在设计时可按『页面总宽 1440px，内容区 1208px』来设定，并在此基础上以 24 等分的栅格来划分整个设计建议区域。
There are `Grid` and `Gutter` in AntD. During the design, you can make an assumption that the "total page width is 1440px, and the "content area width is 1208px". Based on this assumption, you can design the page in 24 evenly divided columns. 

![](https://os.alipayobjects.com/rmsportal/bohSixChLxFkwsOEiNaF.png)

建议横向排列的区块数量最多四个，最少一个，以保证视觉层面的舒适感。
It is recommended that the number of blocks arranged in the horizontal direction be at most four, at least one, so as to guarantee the comfort of view.

![](https://os.alipayobjects.com/rmsportal/JmrNLpHxwcLebVpBIGqD.png)

> 注：图中灰色部分为栅格的列，定义为『Column』，白色部分为栅格的间隔，定义为『Gutter』。
> Note: The gray parts are called "Column", and the white parts are called "Gutter".

### 栅格公式
### Grid formula

<img class="preview-img no-padding" align="right" src="https://os.alipayobjects.com/rmsportal/htXqyMPydaagYLdAGEJK.png">

我们为页面中栅格的 Gutter 设定了定值，即浏览器在一定范围扩大或缩小，栅格的 Column 宽度会随之扩大或缩小，但 Gutter 的宽度值固定不变。
The `Gutter` value in ant design is fixed. When the width of a browser decrease or increase within a certain range, the width of `grids` will be changed accordingly, but the width of `Gutter` remains unchanged.

在 Ant Design 中，我们定义了两种 Gutter：
There are two `Gutter`s in Ant Design

- 网站展示页和 Dashboard 的 Gutter 宽度为 24px。
- 24px width `Gutter`, which is used in home page and Dashboard
- 列表、表格、详情和表单页面的 Gutter 宽度为 16px。
- 16px width `Gutter`, which is used in list Page, table page, details page and form page.

> [设置栅格的小技巧](https://zos.alipayobjects.com/rmsportal/cbxeMLaFnqQEvFgmhSTS.png)。
