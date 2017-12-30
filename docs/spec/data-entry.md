---
order: 9
title:
  zh-CN: 数据录入
  en-US: Data Entry
---

数据录入是获取对象信息的重要交互方式，用户会频繁的增加、修改或删除信息。多种多样的文本录入和选择录入方式帮助用户更加清晰和高效的完成这项体验。设计者应当注意这几点：

- 为初级用户／偶尔访问的用户提供简单易懂的文案作为『标签（Label） 』；为领域专家提供专业术语作为『标签（Label） 』。当需要用户提供敏感信息时，通过『暗提示』来说明系统为什么要这么做，例如：需要获取身份证号码、手机号码时；
- 让用户能在上下文中获取信息，帮助他完成输入。使用『良好的默认值』、『结构化的格式』、『暗提示』、『输入提醒』等方式，避免让用户在空白中猜测输入。

---

## 文本录入

输入框为用户提供了编辑文本的控件，是录入数据最基础和常见的方式。

### 文本框（Input）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/BPMNkGkHFqbBCRMUdfRh.png">

输入较少的字符总数，使用单行的输入形式。

> 注：可以对一些文本（如数字和网址）运用特别的样式。详见 [输入框（Input）](/components/input/)。

### 文本域（Textarea）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/QVRSSdYrWjthpCOupqON.png">

录入长篇幅的单一的文本使用多行的文本区域。

### 提示与帮助

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/KSWwgpyjPkbwclNvbvvR.png" alt="基本样式">

为提升数据录入效率，通常可以在输入框内增加暗提示以帮助提醒用户。

> 注：输入框通常与标签（label）搭配使用，标签（label）默认放于输入区域的左侧，当文案过长或英文环境下也可放于在上方，但同个系统中需保持统一。

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/RtFCPKSMfRlgISbMJJRy.png" description="当说明文案较长时，你可以使用一个『信息』图标或者提示工具。">

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/rElfIRpcmLsCTFzZDINy.png" description="对于那些短的输入提醒（短于一句），你可以将其放置在输入框的下方。">

### 搜索（Search）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/ycPmRlbZtsoYAibbwMCZ.png">

搜索可以让用户在巨大的信息池中缩小目标范围，并快速获取需要的信息。

---

## 选择录入

让用户在一个预定的范围中进行选择。

#### 单选框（Radio Button）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/EvxgOJzHiQAxpuRaEhbH.png">

单选按钮允许用户从多个选项中选择一个选项。Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

> 注：单选框（Radio Button）一定多于 2 个，一般少于 5 个。

### 复选框（Checkbox）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/duKUrQDKiyPnYaWtvkQK.png">

复选框用于在一组可选项中进行多项选择时。

> 注：
> 1. 复选框（Checkbox）一般用于状态标记，需要和提交操作配合；
> 2. 单个复选框可以表示两种状态之间的切换。

### 开关（Switch）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/aIdIORGzFNjqMwrmiguZ.png">

用于切换单个选项的状态。『开关』的内联标签应该显示清楚，例如：禁用/启用，不允许/允许等。

<br />

<img class="preview-img no-padding good" align="right" src="https://zos.alipayobjects.com/rmsportal/qoqGjsZYATDiXiWEjNIK.png" alt="正确示范">
<img class="preview-img no-padding bad" align="right" src="https://zos.alipayobjects.com/rmsportal/ZcWvStIELApkpnkDOWDG.png" alt="错误示范" description="切换『开关』结果会立即生效，无需与操作按钮搭配使用。">

> 注：当用户切换『开关』按钮将直接触发状态改变。

### 选择列表（Dropdown）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/iGSmUHkADwVyhuTOBkpJ.png">

选择列表（通常称为下拉菜单）允许用户从列表中选择一个选项或多个选项，为用户在选项的数量上提供了更多的灵活性。

> 注：
> 1. 当选项多于 5 项时使用；
> 2. 列表选项按照逻辑排序，并尽量让内容显示完整。

### 滑块选择（Slider）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/JJZycUHtpopKCMxXyQpx.png">

滑块选择可以在连续或间断的区间内，通过滑动锚点来选择一个合适的数值。这种交互特性使得它在设置诸如音量，亮度，色彩饱和度等需要反映强度等级的选项时是一种极好的选择。

<br />

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/hWhUUUzikHarZSBhefDI.png">

> 注：在不要求精准数值的场景下用户使用『连续滑块』可得到更灵活便捷的操作；在用户需要精确数值时，可与『数字输入框』搭配使用。

### 穿梭框（Transfer）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/VpfyicZPlNugqEjQKSDf.png">

穿梭框用直观的方式在两栏中移动元素，完成选择行为。

### 日期选择器（DatePicker）

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/gaaLemRmjgNpcnlthmkr.png">

日期选择器为用户提供了一种可视化的方式去浏览和选择一个日期或者日期范围。

---

## 文件上传（Upload）

上传是将本地的相应信息(包含本地和云储存)通过网页或者上传工具发布到远程服务器上的过程。

### 简单点击上传

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/aqMzAypQRBkmWfMOpOCE.png">

一般用于单个上传且不需要预览效果的文件上传，点击按钮弹出文件选择框。

### 显示缩略图上传

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/oUsyeTsjadJfieTspgVq.png">

一般用于图片文件上传，用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。

### 拖拽上传

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/euEBewdgKmhThFWrWHIm.png">

把文件拖入指定区域，完成上传，同样支持点击上传。

> 注：文件上传需要提供明确的文件大小和文件格式，例如：请选择大小不超过 5M 的文本文件（支持 PDF.ZIP.EXL），上传时需要有明确的进度提示。
