---
order: 5
title:
  zh-CN: 字体
  en-US: Font
---

跨平台的字体设定，力求在各个操作系统下都有最佳展示效果。

字体是界面设计中最重要的基本构成之一，用户通过文本来消化内容和完成工作，优雅的字体将大大提升用户的阅读体验及工作效率。Ant Design 的字体方案，在满足不同终端始终保持良好的阅读体验的同时，使页面的视觉层次更加清晰。使用时有以下三点需要注意：

- 合理的使用不同的字重、字号和颜色来强调界面中最重要的信息；
- 尽可能的使用单种字体，混合使用多种字体会让界面看起来零散和草率；
- 遵循 WCAG 2.0 标准，字体在使用时与背景颜色的对比值满足无障碍阅读的最低标准。

---

## 字体家族

字体家族 css 代码如下：

优秀的字体系统的核心是选择一个好的字体。Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下字体始终保持良好的易读性和可读性，体现了友好，稳定和专业的特性。

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
             SimSun, sans-serif;
```

> 参考自：https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/

另外，在中后台系统中，数字经常需要进行纵向对比展示，我们单独将数字的字体设置为 `Helvetica Neue`，使其为等宽字体。

> 技术方案：http://stackoverflow.com/questions/13611420/set-a-font-specifically-for-all-numbers-on-the-page

## 字号

Ant Design 使用不同的字号和字重来传递视觉的信息层次。默认字体为 `12pt`，展示型页面可以设置为 `14pt`，其他字体字号相应升级。

![](https://zos.alipayobjects.com/rmsportal/UkvKkdJgvFqlewCWFyQE.png)

## 行高

行高会影响阅读的体验，西文的基本行高通常是字号的 `1.2em` 上下，而中文因为字符密实且高度一致，所以一般行高需要更大，`1.5em` 至 `1.8em` 之间是一个比较好的视觉阅读效果，Ant Design 规定默认文案字体行高为 `1.5em`，展示型页面可根据实际情况调整行高。

### 行高公式

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/qFKnfXanJURiDsjJTKDP.png">

字体行高绝对值为『字号 x 1.5倍』。例如：12 号字体的行高为 `18px`，14 号字体的行高为 `21px`。

## 字体颜色

<img class="preview-img no-padding" align="right" src="https://zos.alipayobjects.com/rmsportal/kNFpUKqccPYxzfiQlFTh.png" description="注：表格中 @Black = #000000、@White = #FFFFFF、@Blue-6 = #108EE9">

文本颜色如果和背景颜色太接近就会很难以阅读，这对于深色背景和浅色背景同样适用。

考虑到无障碍设计的需求，帮助那些弱视和色盲的用户也能轻松识别和阅读屏幕上的文字，我们参考了 WACG 2.0 的标准，文本和背景色之间至少保持最小 4.5:1 的对比度（AA 级），正文内容都保持了 7:1 以上的 AAA 级对比度。
