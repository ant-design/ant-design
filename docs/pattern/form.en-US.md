---
order: 2
title:
  zh-CN: 表单
  en-US: Form
---

作为获取用户输入的重要交互方式，表单也承担将问题和答案进行配对的角色。
A form is an important human machine interface to get user information. It's necessary to consider what questions should be asked according to the expected answers.

设计者进行表单设计时，应当注意这几点：
In the design of a form, it's recommended to:

1. 确保用户了解要提供什么信息，以及为什么要提供这些信息。
1. Let a user knows exactly what and why information is required.

  为初级用户／偶尔访问的用户提供白话作为『标签』；为领域专家提供专业术语作为『标签』。当需要用户提供敏感信息时，通过『输入提示』来说明系统为什么要这么做，eg：需要获取身份证号码、手机号码时。
  Use sample language as `label` for ordinary user but professional terms as `label` for expert. If sensitive information (for example ID card number, mobile phone number) is required, explain to a user why your need it.


2. 让用户能在上下文中获取信息，帮助他完成输入。
2. Provide more context information, which can be helpful for a user to complete the form.

  使用『良好的默认值』、『结构化的格式』、『输入提示』、『输入提醒』等方式，避免让用户在空白中完成输入。
  A "proper default value", a "structured format", a "tooltip" or a "reminder" can be useful for describing the context.


3. 对错误敏感，并尽可能宽容。
3. Be sensitive to errors and be tolerant to a user's input.

  通过不同的『校验』规则和形式进行反馈，避免用户在点击提交后才刚刚开始『校验』，让用户提前纠正错误；依据『容错格式』，允许用户以多种格式和语法输入，eg：用户在电话号码输入框中多输入了一个空格，系统存储时可以主动删掉空格，但是不需要告诉用户这是一个错误。
  Be sensitive to errors means using a variety of rules to validate a user's input and giving feedbacks as soon as possible. If the validation starts only after a form is submitted, it would be too late. Be tolerant to a user's input means using different kinds of formats as well as syntax should be allowed by the system. For example, if a user types in some unnecessary spaces into a phone number input box, the system should delete those spaces automatically instead of telling the user to correct them.

4. 不要提出不必要的问题。
4. Not to ask unnecessary questions.

---

## 内容
## Content

<img class="preview-img" align="right" alt="Example of a form" src="https://os.alipayobjects.com/rmsportal/mLkQbODgVsdGUTe.png">

通常表单会有四个部分组成。
A form is usually consisted of 4 parts, which are

1. 标签
1. Label
2. 输入框
2. Input box
3. 校验反馈
3. Validation feedback
4. 动作
4. Action

> 注：`*` 表明该项为必填项。
> Note: `*` indicates that the item is required.


## 交互
## Interactions

### 填空
### Gap filling input

<img class="preview-img" align="right" alt="Example of gap filling input" src="https://os.alipayobjects.com/rmsportal/SdzCTaevNMvJFBR.png">

在一种描述性的上下文中出现输入项，可以帮助用户理解当前的状况，以及需要提供什么数据。
Gap filling input usually appears in a descriptive context, which can be helpful for a user to understand the current situation and be easier for the user to provide correct information.

### 组合输入框
### Combined input

<img class="preview-img" align="right" alt="Example of combined input" src="https://os.alipayobjects.com/rmsportal/waStvhMnuoqqsCE.png">

当两个输入框关联性很强时，可以前后拼接，减少页面空间。
When two input boxes have strong correlation, they can be combined together so as to save some space

### 对齐方式
### Alignment

<img class="preview-img" align="right" alt="Example of alignment" src="https://os.alipayobjects.com/rmsportal/cjHTEtXFxUSdHnE.png">

在页面设计表单时，按钮组必须和输入框左对齐。
In the design of a form, button groups should be aligned to the left of the input box.

### 禁用主按钮
### Disabled main button

当输入框非常少时（一般少于 3 个），如果用户没有在必填项中输入内容，可禁用『提交』等主按钮；当输入框非常多时（超过 5 项以上），不建议禁用主按钮。
When there are just a few (less than 3) input boxes in a form, "submit" button or other main buttons can be disabled if a user has not yet filled in all required input boxes. However, when there are many input boxes (more than 5), do not disable those main buttons.


<br>

<img class="preview-img" align="right" alt="main button is disabled when there are not enough characters" src="https://os.alipayobjects.com/rmsportal/VabHKlbouFxSQXz.png">

<img class="preview-img" align="right" alt="main button is enabled when there are enough characters" src="https://os.alipayobjects.com/rmsportal/usdFxJmWDawqUuq.png">

当输入框非常少时，用户一输入就会有反馈，因而主按钮的禁用规则非常清晰，容易被用户理解。
When there are just a few input boxes, a user can get feedbacks once he types in something. It's quite easy for the user
to figure out when the main bottom will be disabled.

<br>

<img class="preview-img" align="right" alt="不禁用示例" src="https://os.alipayobjects.com/rmsportal/GwZhvOuXmwqUIUW.png">

当输入框非常多时（尤其是输入项中交叉了必填项和非必填项），整个反馈链路冗长又复杂，禁用规则难以被识别，容易引起困惑。
When there are a lot of input boxes (especially when the required input boxes are altogether with the optional ones), the logic of feedbacks can be very complicated. And thus using disabled main buttons will cause confusion to a user.

### 结构化的格式
### Structured format

<img class="preview-img" align="right" alt="example of a structured format" src="https://os.alipayobjects.com/rmsportal/SQgGfreRAqPZPsm.png">

用户对输入的内容很熟悉，且系统不希望接受任何偏离期望的格式。
Should be used in situation that a user is familiar with the contents of the input and the system doesn't want to accept any deviation from the desired format.

### 输入提示 & 输入提醒
### Tooltip & reminder

<img class="preview-img inline" align="right" alt="Example of tooltip" description="when an input box is focused, the tooltip will appear until the input box loses focus again" src="https://os.alipayobjects.com/rmsportal/cTlmdEprGSzMZfs.png">
<img class="preview-img inline" align="right" alt="Example of reminder" description="when an input box is focused, the reminder will appear until a user types in at least one character" src="https://os.alipayobjects.com/rmsportal/QPhvLWfMbLTvjRw.png">

输入提示：不希望在标签上放置太多文字进行解释，同时只有标签又会引起误解。
When to use a tooltip:

输入提醒：提醒用户该控件的目的或所需格式，由于在用户输入后提醒就会消失，所以适用在用户对内容比较熟悉时。
When to use a reminder:

### 密码加强计
### Password

<img class="preview-img" align="right" alt="密码强度示例" src="https://os.alipayobjects.com/rmsportal/wKpOgeyyoOUeCrk.png">

提供关于密码强度和有效性的及时反馈，适用在注册页面时的密码输入框。
Provides timely feedback on password strength and validity, and applies to the password entry box when registering the page.

### 校验
### Validation

<img class="preview-img inline" align="right" description="Validation in real time" src="https://os.alipayobjects.com/rmsportal/urCdIJFuNYCenqH.png">
<img class="preview-img inline" align="right" description="Validation after losing focus" src="https://os.alipayobjects.com/rmsportal/KkcSBkbTJirIxCw.png">

<img class="preview-img" align="right" description="点击『提交』后，系统将处理结果直接在页面上进行反馈（统计错误数量和标记错误内容）。" src="https://zos.alipayobjects.com/rmsportal/xTtVSREbASRMstTggVGD.png">

通过不同的『校验』规则和形式进行反馈，避免用户在点击提交后才刚刚开始『校验』，让用户提前纠正错误。
Use different validation rules and a variety of feedbacks to help a user correct errors before clicking on the "submit" button.

### 字数校验框
### Word Counting Box

<img class="preview-img" align="right" alt="字数校验框示例" src="https://os.alipayobjects.com/rmsportal/JxzQIRfMCtMjuaH.png">

用于统计当前输入长度，以及是否超过系统阈值。
Used to count the current input length and whether the system threshold is exceeded.


## 规格
## Format

### 间距
### Margin

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
Align right (recommended)

- 优点：节约垂直空间。
- 缺点：降低可读性；标签长度和输入框弹性小。
- 场景：既要减少垂直空间，又要加快填写速度。

<br>

https://www.expedia.co.uk/FlightCheckout?tripid=89e54540-dcf4-4c27-be3f-c9efaae6dac2&c=69c4491d-2d30-406a-9b2c-6ec50a932b48

<img class="preview-img" align="right" alt="顶部对齐" src="https://os.alipayobjects.com/rmsportal/AsyyNKormNdEMLi.png">

顶部对齐。

- 优点：有最快的浏览和处理速度；标签长度弹性大。
- 缺点：非常占垂直空间。
- 场景：希望用户快速填写表单，完成任务。

<br>

<img class="preview-img" align="right" alt="左对齐" src="https://os.alipayobjects.com/rmsportal/eqUyDExbRlAQoas.png">

左对齐。
Align left

- 优点：文字开头按阅读视线对齐，方便阅读；节约垂直空间。
- 缺点：填写速度慢；标签长度和输入框弹性小。
- 场景：希望用户放慢速度，仔细思考表单中的每个输入框。
