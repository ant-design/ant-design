---
category: 设计模式
type: 全局规则
order: 5
title: 数据格式
---

## 设计目标

规范数据表达，保证直观准确一致地理解数据。

## 类型

### 数值

数值用来表示计量大小，可单独出现或搭配数字符号进行使用。

| 符号格式 | 如何使用及何时使用           | 例子      |
| -------- | ---------------------------- | --------- |
| 千分位   | 默认使用千分位帮助用户阅读。 | 123,220   |
| 计量单位 | 计量单位默认用小写字母。     | 123,220kg |
| 百分比   | 比例问题等。                 | 12.32%    |
| 正斜杠   | 用分数的形式表示事项进展。   | 12/30     |

<br />

<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*vjAcTqS6VKoAAAAAAAAAAABkARQnAQ">

<img class="preview-img bad" align="right" alt="不推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3CXaSK6NcrwAAAAAAAAAAABkARQnAQ">

**位置排列**：便于用户直观而又准确地读取数据，要做到一眼观定、简洁明了。在表格中，诸如金额、数量等数值分布排列时，通常采用“右对齐”方式，既方便用户快捷读取数据，还可以使用户进行纵向数据对比。

<br />

<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*5ymtS5WU83EAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="不推荐示例" description="单位统一放在表头上，表格里不带单位，金额默认右对齐" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*qjzFQL3CqiQAAAAAAAAAAABkARQnAQ">

**计量单位**：在表格中，计量单位默认放在表头，并默认右对齐。

### 金额

**小写金额：**规范格式为「货币符号+数字」的格式，例如“CNY1,123.00"。 **货币符号**：表示货币种类的符号代码（[货币符号表](https://baike.baidu.com/item/%E8%B4%A7%E5%B8%81%E4%BB%A3%E7%A0%81/7467182?fr=aladdin)），分为字母和字符两种：

| 货币符号 | 如何使用及何时使用                                       | 例子      |
| -------- | -------------------------------------------------------- | --------- |
| 字符     | 以人民币为例，金额前带货币单位标志`¥`                  | ¥123.00   |
| 字母     | 以人民币为例，推荐使用 CNY，CNY 为国际上通用的货币代码。 | CNY123.00 |

<br />

<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*FGtoQIKHySkAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="不推荐示例" description="金额数字到「元」为止的，在「元」之后，应写「整」字，在「角」之后可以不写「整」字。金额数字有「分」的，「分」后面不写「整」字。" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*adz2QIF8umQAAAAAAAAAAABkARQnAQ">

**大写金额：**一般用于银行、公司或个人的重要结算凭证和各种交易票据，需要使用大写数字以确保数据无法涂改，规范格式为「货币名称+金额数字」。

<br />

<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*dHYhQ4iqnJkAAAAAAAAAAABkARQnAQ">
<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*T6hbQJdz5usAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="不推荐示例" description="“千”不能以单位的形式展示。" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*iuEARoq_-o0AAAAAAAAAAABkARQnAQ">

**大额计量：**如果一个金额很大，那么数值中的“万”“亿”单位可采用汉字。如果一个数值很大，那么数值中的“万”“亿”单位可采用汉字。

### 日期时间

#### 绝对时间

针对时间精确度要求较高的用户，强调信息发布的精确时间点，有回顾过去内容并通过绝对时间用来检索信息的诉求。

**日期格式：**可用如下标准化计法：

| 格式 | 如何使用及何时使用 | 例子 |
| --- | --- | --- |
| 年、月、日 | 中国默认使用「yyyy-mm-dd」格式。（[其它国家参考链接）](https://zh.wikipedia.org/wiki/%E5%90%84%E5%9C%B0%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E8%A1%A8%E7%A4%BA%E6%B3%95)。 | 2019-12-08 |
| 专用名词 | 含有月日的专用名词采用阿拉伯数字表示时，应采用间隔号 `·` 将月、日分开，并在数字前后加引号。 | “6.1 儿童节” |
| 日期范围 | 在日期或时间范围之间显示一个波浪号 （前后需要空格）。 | 2018-12-08 ～ 2019-12-07 |

**时间格式**：默认使用二十四小时制：

| 时间制       | 如何使用及何时使用              | 例子                     |
| ------------ | ------------------------------- | ------------------------ |
| 二十四小时制 | 二十四小时时间格式  HH:mm:ss 。 | 14:08:00                 |
| 十二小时制   | 十二小时时间格式 h:mm:ss 。     | 2:08:00 PM \| 2:08:00 AM |

**标准格式**：日期与时间连在一起时，两者之间用「空格」隔开，如“2019-12-08 06:00:00”。

#### 相对时间

时间的精确度对于用户并不十分重要，重要的是信息的即时性。在中后台中，相对时间一般用于消息、通知类功能，用户往往更关注于书面形式的时间单位，而不必去往前推算出发布的具体时间点。

| 时间              | 展示形式                                               |
| ----------------- | ------------------------------------------------------ |
| 1 分钟以内的时间  | 刚刚                                                   |
| 1 小时以内的时间  | N 分钟前                                               |
| 24 小时以内的时间 | N 小时前                                               |
| 24 小时以外的时间 | 用 mm-dd HH:mm 的形式表示，即「12-08 08:00」           |
| 超过一年的时间    | 用 yyyy-mm-dd HH:mm 的形式表示，即「2019-12-08 08:00」 |

### 数字脱敏

数据脱敏是指对某些敏感信息通过脱敏规则进行数据变形，实现敏感隐私数据的可靠保护。此处给出的脱敏规则为通用产品规范，遇到数据安全性较强的业务场景，可根据业务场景自行调整。

#### 全部脱敏

<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NJs8QYejQyEAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="不推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*JvI4T5SXvIYAAAAAAAAAAABkARQnAQ">

一般用于金额、时间等特别重要敏感的信息，需要对所有数字进行脱敏。数据用一个 `***` 代替。

#### 部分脱敏

一般用于需要部分信息进行识别的状况，只需要对部分信息进行脱敏处理，但数字真实位数保留。数据脱敏部分用「\*」代替。

| 脱敏类型 | 如何使用 | 例子 |
| --- | --- | --- |
| 姓名 | 两个字的姓名：显示第一个字符，后面的隐藏为 `*`。 | 仲\* |
|  | 三个字及三个字以上的姓名：显示第一个字符和最后一个字符，中间字符为 `*`。 | 仲\*妮<br />仲\*\*妮 |
| 手机号码 | 保留手机号码前 3 位与后 4 位。 | 186 \*\*\*\* 1402 |
| 身份证号码 | 公民身份号码由六位地址码，八位出生日期码，三位顺序码和一位校验码组成。脱敏规则分为高、中、低级：<br />**高级**：保留前一位与后一位，其余 `*` 表示，仅能识别该人属于哪个地区。<br />**中级**：保留前三位与后三位，其余 `*` 表示，仅能识别该人的省市与是男是女。<br />**低级**：保留前六位与后四位，其余 `*` 表示，仅能识别该人的省市区与是男是女。 | 6\*\*\*\*\*\*\*\*\*\*\*\*\*2<br />213\*\*\*\*\*\*\*\*\*\*\*203<br />212912\*\*\*\*\*\*2233 |
| 联系地址 | 保留省市区，后面的用 `*` 表述。 | 浙江省杭州市 西湖区 \***\*\*\*\*** |
| 邮箱 | 保留邮箱主机名与前三位字符，其余 `*` 表示。 | 123\***\*\*\*\*\*\***@163.com |
| 银行卡号码 | 银行卡号码由发卡行标识代码（六到十二位不等），个人账号标识（六到十二位不等），一位校验码组成。脱敏规则分为高、中、低级：<br />**高级**：保留后四位，其余 `*` 表示，仅能识别部份个人账号标识。<br />**中级**：保留前六位与后位，其余 `*` 表示，仅能识别发卡行与小部份个人账号标识。<br />**低级**：保留前四位与后六位，其余 `*` 表示。仅能识别发卡行与大部份个人账号标识。 | \***\*\*\*\*\*\*\***1208<br />620121**\*\***1208<br />620121\*\*\*\*111208 |

### 数据状态

#### 无数据

<img class="preview-img good" align="right" alt="推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*o0duS6P8WUEAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="不推荐示例" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ssPWRaVkIy8AAAAAAAAAAABkARQnAQ">

无数据用 `--` 表述。

#### 数据加载

<img class="preview-img" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*E6pGTJYEh-gAAAAAAAAAAABkARQnAQ">

数据加载用「骨架屏」表示。

## 参考文档

- [货币符号表](https://baike.baidu.com/item/%E8%B4%A7%E5%B8%81%E4%BB%A3%E7%A0%81/7467182?fr=aladdin)
- [其它国家时间规范参考链接](https://zh.wikipedia.org/wiki/%E5%90%84%E5%9C%B0%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E8%A1%A8%E7%A4%BA%E6%B3%95)
- [出版物数字规范](http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113091154536.pdf)
