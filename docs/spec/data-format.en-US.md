---
category: Design Patterns
type: Global Rules
order: 5
title: Data format
---

## Design Goals

Standardize data expression to ensure intuitive, accurate and consistent understanding of data.

## Types

### Numerical

The numerical value is used to indicate the measurement size, it can be used alone or with digital symbols.

| Symbol Format | How and When to Use | Example |
| --- | --- | --- |
| Decimal separator | Use commas to separate groups of thousands to help users read. | 123,123,220 |
| Unit of measurement | Put units of measurement in lowercase. | 123,220kg |
| Percentage | To present proportionality, etc. | 12.32% |
| Forward slash | To express progress with fractions. | 12/30 |

<br />

<img class="preview-img good" align="right" alt="Do" src="https://gw.alipayobjects.com/zos/antfincdn/8QPU0UKlAA/ebba34c8-c7c0-4dc7-a3a6-e486b118b5fd.png">

<img class="preview-img bad" align="right" alt="Don't" src="https://gw.alipayobjects.com/zos/antfincdn/jvsJ7TbQM%26/8cb7388a-7224-48cd-9672-a1cd1882b060.png">

**Position**: To let users read the data intuitively and accurately, it is necessary to make it clear and concise. In a table with numerical values, "right-aligned" method is usually adopted, which not only facilitates the user to quickly read, but also allows the user to compare the longitudinal data.

### Amount

**Amount Format**: The standard format is "currency symbol + number". For example, "CNY1,123.00". **Currency Symbol**: There are two types: abbreviations letters and characters. You can check symbols for different currencies from [CURRENCY SYMBOLS](https://www.iban.com/currency-codes).

| Currency Symbol | How and When to Use | Example |
| --- | --- | --- |
| Character | Take RMB as example, its character symbol is "¥", placed in front of the amount. | ¥123.00 |
| Letter | Take RMB as example, it is recommended to use CNY, which is the international currency code. | CNY123.00 |

Large amount: If an amount is large, "M/Mill." (abbreviation of million) and "B/Bill." (abbreviation of billion) can be used.

### Date/Time

#### Absolute Time

Absolute time is for users with high time accuracy requirements, it emphasizes the precise time point of information release. Through absolute time, users can retrieve information and review the past content.

**Date Format:**

We suggest the following formats:

| Format | How and when to use | Examples |
| --- | --- | --- |
| Year, month, day | In China「yyyy-mm-dd」format is used by default. | 2019-12-08 |
| Terms | When a special term containing a date expressed with numbers，display a "." between the month and the day, and quotation marks should be added before and after the term. | "6.1 儿童节" |
| Date range | Put "~" or "-" between the date or time range (space is required before and after). | 2018-12-08 ～ 2019-12-07 |

**Time Format:**

| Time System | How and when to use | Examples |
| --- | --- | --- |
| 24-hour clock | The format is HH:MM:SS. Omit hours or second if not apply. Use the 24-hour clock by default. | 14:08:00 |
| 12-hour clock | Use the format H:MM:SS AM/PM (or am/pm).  | 2:08:00 PM &#124; 2:08:00 AM |

**Standard format**: When put a date and a time together, show a space between them, e.g. "2019-12-08 06:00:00".

#### Relative Time

To the users, the accuracy of time is not so important as the immediacy of the information. In the console platform, relative time is generally used for message and notification. And users tend to pay more attention to the unit of time, instead of working out the specific time point of publication.

| Time                 | Display form                              |
| -------------------- | ----------------------------------------- |
| Less than 1 minute   | just now                                  |
| Less than 1 hour     | N minutes ago                             |
| Within 24 hours      | N hours ago                               |
| Longer than 24 hours | MM-DD HH:MM, e.g. "12-08 08:00"           |
| Longer than one year | YYYY-MM-DD HH:MM，e.g. "2019-12-08 08:00" |

### Data Redaction

Data redaction refers to representing truncated data to protect sensitive privacy information. The rules presented here are general guidelines, which can be adjusted according to business scenarios with strong data security.

#### Complete Redaction

<img class="preview-img good" align="right" alt="Do" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NJs8QYejQyEAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="Don't" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*JvI4T5SXvIYAAAAAAAAAAABkARQnAQ">

Generally used for particularly important and sensitive information such as amount and time. All the numbers need to be hidden. And the data is replaced by "\*\*\*".

#### Partial Redaction

Generally used for situations that require partial information for identification. In such cases, some part of the information is truncated, but the numerical digits of the numbers need to retain. The truncated data is replaced by "\*".

| Data Type | How and When to Use | Example |
| --- | --- | --- |
| Name | Two-character name: display the first character, followed by a "\*". | 仲\* |
|  | Names with three characters or more: display the first character and the last character, replace the middle character(s) with "\*". | 仲\*妮 <br /> 仲\*\*妮 |
| Mobile number | Keep the first three and the last four digits of the mobile number. | 186\*\*\*\*1402 |
| ID number | The Chinese citizenship number consists of six address codes, eight birthdate codes, three sequential codes and one check code.<br /><br />Redaction rules are classified into high, medium and low levels: <br />High: Show the first and last digits, and replace the others with "_".<br />Medium: Show the first three and the last three. Replace the others with "_".<br />Low: Show the first six and the last four. Replace the others with "\*". | High:<br />`6*************2`<br />Medium:<br />`213***********203`<br />Low:<br />`212912******2233` |
| Address | Keep the provinces, cities and district information, followed by several "\*". | 浙江省杭州市 西湖区 \***\*\*\*\*** |
| Email | Keep the host name of the mail and the first three characters, indicate the rest information with "\*". | 123\***\*\*\*\*\*\***@163.com |
| Bank card number | The bank card number consists of the issuing bank identification code (ranging from 6 to 12 digits), personal account identification (ranging from 6 to 12 digits), and a check code. <br />Redaction rules are classified into high, medium and low levels: <br />High: Display the last four digits, and replace the others with "_".<br />Medium: Display the first six and the last four digits, replace the others with "_". <br />Low: Display the first six and the last six digits, display the remaining digits with "\*". | \***\*\*\*\*\*\*\***1208<br />620121**\*\***1208<br />620121\*\*\*\*111208 |

### Data Status

#### Empty State

<img class="preview-img good" align="right" alt="Do" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*o0duS6P8WUEAAAAAAAAAAABkARQnAQ">
<img class="preview-img bad" align="right" alt="Don't" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ssPWRaVkIy8AAAAAAAAAAABkARQnAQ">

Display "--" to express no-data status.

#### Loading

<img class="preview-img" align="right" src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*E6pGTJYEh-gAAAAAAAAAAABkARQnAQ">

Use Skeleton screen when loading data.

## Reference

- [Currency Symbol List](https://baike.baidu.com/item/%E8%B4%A7%E5%B8%81%E4%BB%A3%E7%A0%81/7467182?fr=aladdin)
- [Time Data Formats for Different Countries](https://zh.wikipedia.org/wiki/%E5%90%84%E5%9C%B0%E6%97%A5%E6%9C%9F%E5%92%8C%E6%97%B6%E9%97%B4%E8%A1%A8%E7%A4%BA%E6%B3%95)
- [Digital Specification for Publications](http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113091154536.pdf)
