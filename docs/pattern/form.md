---
order: 2
title:
  zh-CN: 表单
  en-US: Form
---

作为获取用户输入的重要交互方式，表单也承担将问题和答案进行配对的角色。

设计者进行表单设计时，应当注意这几点：

1. 确保用户了解要提供什么信息，以及为什么要提供这些信息。

  为初级用户／偶尔访问的用户提供白话作为『标签』；为领域专家提供专业术语作为『标签』。当需要用户提供敏感信息时，通过『输入提示』来说明系统为什么要这么做，eg：需要获取身份证号码、手机号码时。

2. 让用户能在上下文中获取信息，帮助他完成输入。

  使用『良好的默认值』、『结构化的格式』、『输入提示』、『输入提醒』等方式，避免让用户在空白中完成输入。

3. 对错误敏感，并尽可能宽容。

  通过不同的『校验』规则和形式进行反馈，避免用户在点击提交后才刚刚开始『校验』，让用户提前纠正错误；依据『容错格式』，允许用户以多种格式和语法输入，eg：用户在电话号码输入框中多输入了一个空格，系统存储时可以主动删掉空格，但是不需要告诉用户这是一个错误。

4. 不要提出不必要的问题。

---

## 内容

<img class="preview-img" align="right" alt="结构示例" src="https://os.alipayobjects.com/rmsportal/mLkQbODgVsdGUTe.png">

通常表单会有四个部分组成。

1. 标签
2. 输入框
3. 校验反馈
4. 动作

> 注：`*` 表明该项为必填项。

## 交互

### 填空

<img class="preview-img" align="right" alt="填空示例" src="https://os.alipayobjects.com/rmsportal/SdzCTaevNMvJFBR.png">

在一种描述性的上下文中出现输入项，可以帮助用户理解当前的状况，以及需要提供什么数据。

### 组合输入框

<img class="preview-img" align="right" alt="组合输入框示例" src="https://os.alipayobjects.com/rmsportal/waStvhMnuoqqsCE.png">

当两个输入框关联性很强时，可以前后拼接，减少页面空间。

### 对齐方式

<img class="preview-img" align="right" alt="对齐方式示例" src="https://os.alipayobjects.com/rmsportal/cjHTEtXFxUSdHnE.png">

在页面设计表单时，按钮组必须和输入框左对齐。

### 禁用主按钮

当输入框非常少时（一般少于 3 个），如果用户没有在必填项中输入内容，可禁用『提交』等主按钮；当输入框非常多时（超过 5 项以上），不建议禁用主按钮。

<br>

<img class="preview-img" align="right" alt="未达字符标准时，主按钮禁用状态" src="https://os.alipayobjects.com/rmsportal/VabHKlbouFxSQXz.png">

<img class="preview-img" align="right" alt="达到字符标准时，主按钮可用状态" src="https://os.alipayobjects.com/rmsportal/usdFxJmWDawqUuq.png">

当输入框非常少时，用户一输入就会有反馈，因而主按钮的禁用规则非常清晰，容易被用户理解。

<br>

<img class="preview-img" align="right" alt="不禁用示例" src="https://os.alipayobjects.com/rmsportal/GwZhvOuXmwqUIUW.png">

当输入框非常多时（尤其是输入项中交叉了必填项和非必填项），整个反馈链路冗长又复杂，禁用规则难以被识别，容易引起困惑。

### 结构化的格式

<img class="preview-img" align="right" alt="结构化的格式示例" src="https://os.alipayobjects.com/rmsportal/SQgGfreRAqPZPsm.png">

用户对输入的内容很熟悉，且系统不希望接受任何偏离期望的格式。

### 输入提示 & 输入提醒

<img class="preview-img" align="right" alt="输入提示示例" description="在输入框激活后，输入提示一直出现至该输入框失去焦点。" src="https://os.alipayobjects.com/rmsportal/cTlmdEprGSzMZfs.png">
<img class="preview-img" align="right" alt="输入提醒示例" description="在输入框激活后，输入提醒不要马上消失，等用户完成第一个词输入后再消失。" src="https://os.alipayobjects.com/rmsportal/QPhvLWfMbLTvjRw.png">

输入提示：不希望在标签上放置太多文字进行解释，同时只有标签又会引起误解。

输入提醒：提醒用户该控件的目的或所需格式，由于在用户输入后提醒就会消失，所以适用在用户对内容比较熟悉时。

### 密码加强计

<img class="preview-img" align="right" alt="密码强度示例" src="https://os.alipayobjects.com/rmsportal/wKpOgeyyoOUeCrk.png">

提供关于密码强度和有效性的及时反馈，适用在注册页面时的密码输入框。

### 校验

<img class="preview-img" align="right" description="输入时的实时校验。" src="https://os.alipayobjects.com/rmsportal/urCdIJFuNYCenqH.png">
<img class="preview-img" align="right" description="输入框失去焦点后的校验。" src="https://os.alipayobjects.com/rmsportal/KkcSBkbTJirIxCw.png">

<img class="preview-img" align="right" description="点击『提交』后，系统将处理结果直接在页面上进行反馈（统计错误数量和标记错误内容）。" src="https://zos.alipayobjects.com/rmsportal/xTtVSREbASRMstTggVGD.png">

通过不同的『校验』规则和形式进行反馈，避免用户在点击提交后才刚刚开始『校验』，让用户提前纠正错误。

### 字数校验框

<img class="preview-img" align="right" alt="字数校验框示例" src="https://os.alipayobjects.com/rmsportal/JxzQIRfMCtMjuaH.png">

用于统计当前输入长度，以及是否超过系统阈值。


## 规格

### 间距

<img class="preview-img" align="right" alt="间隔示例" src="https://os.alipayobjects.com/rmsportal/dlTiHzZvCGRbMzL.png">

典型表单的间隔规范。

### 输入框宽度

<img class="preview-img good" align="right" alt="正确示例" src="https://os.alipayobjects.com/rmsportal/vypllNQZsEHRszB.png">
<img class="preview-img bad" align="right" alt="错误示例" src="https://os.alipayobjects.com/rmsportal/XSLwnrlLbKFjiNj.png">

当内容可预知，可以根据内容长短进行定义其落在多少个栅格上。

<br>

### 对齐方式

无论左对齐、右对齐还是顶部对齐，都有其优缺点和应用场景，所以正确的解决方案取决于具体目标和制约因素，诸如：希望用户加快或者降低填写速度（有时设计者希望用户深思熟虑每个输入）、屏幕显示的限制、本地化考虑等多种因素。

<br>

<img class="preview-img" align="right" alt="右对齐（推荐）" src="https://os.alipayobjects.com/rmsportal/UxGJfenYBKvkEEB.png">

右对齐（推荐）。

- 优点：节约垂直空间。
- 缺点：降低可读性；标签长度和输入框弹性小。
- 场景：既要减少垂直空间，又要加快填写速度。

<br>

<img class="preview-img" align="right" alt="顶部对齐" src="https://os.alipayobjects.com/rmsportal/AsyyNKormNdEMLi.png">

顶部对齐。

- 优点：有最快的浏览和处理速度；标签长度弹性大。
- 缺点：非常占垂直空间。
- 场景：希望用户快速填写表单，完成任务。

<br>

<img class="preview-img" align="right" alt="左对齐" src="https://os.alipayobjects.com/rmsportal/eqUyDExbRlAQoas.png">

左对齐。

- 优点：文字开头按阅读视线对齐，方便阅读；节约垂直空间。
- 缺点：填写速度慢；标签长度和输入框弹性小。
- 场景：希望用户放慢速度，仔细思考表单中的每个输入框。
