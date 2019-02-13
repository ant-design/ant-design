---
category: Visual
order: 3
title: Font
---

Font is one of the most basic foundational part of a interface design system.

Text is the major channel for users to understand application content and complete their work, and a well designed font system will greatly enhance the user's reading experience and work efficiency. The Ant Design typography system is based on the design principle of "dynamic order" combined with the law of natural logarithm and temperament. We strongly recommend it since it has been verified by a large number of Ant products.
While defining the font system for a visual system, we propose to start from the following five aspects:

1. Font Family
2. Base Font Size
3. Font Scale & Line Height
4. Font Weight
5. Font Color

---

## Font Family

In order to implement a good font system, the first thing is to choose an appropriate font family. Ant Design prefers the system default font family and then also provides a set of alternative font libraries to maintain readability for screens on different platforms and browsers and to make sure it's always user friendly, stable and professional to end user.

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,
 "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

> References：https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/ and http://markdotto.com/2018/02/07/github-system-fonts/

In addition, in a lot of applications, numbers often need to be displayed vertically. We set the CSS property `font-variant-numeric` to `tabular-nums;` to use [tabular figures](https://www.fonts.com/content/learning/fontology/level-3/numbers/proportional-vs-tabular-figures).

> References：https://stackoverflow.com/questions/32660748/how-to-use-apples-new-san-francisco-font-on-a-webpage#comment78509178_32660790

## Base Font Size

We have updated Ant Design's base font size from the original 12 to 14 to ensure the best user reading efficiency on most common monitors based on display screen reading distance (50 cm) and optimal reading angle (0.3).

<div style="text-align:center;margin:40px 0;">
  <img width="600" src="https://gw.alipayobjects.com/zos/rmsportal/yriUFbqOPtVniYYiikfb.png">
</div>

## Font Scale & Line Height

The font scale and line height determine the beauty of the dynamics and order of a font system. Font scale refers to a series of font with different sizes. Line height can be understood as an invisible box wrapped outside the font.

<div style="text-align:center;margin:40px 0;">
  <img width="600" src="https://gw.alipayobjects.com/zos/rmsportal/xpykKKFJQorFJltdXkie.png">
</div>

Ant Design was inspired by the pentatonic scale and natural law to define 10 different font sizes and corresponding line heights.

<img src="https://gw.alipayobjects.com/zos/rmsportal/iFjgfIBExksqCqGMwUlw.png" />

In Ant Design's visual system, our recommended base font size is 14, and its corresponding line height is 22. The choice of the rest of the font scale can be freely defined according to the specific circumstances. It is recommended that in a design system (except for display pages), the choice of font scale should be controlled within 3 to 5 types, and the principle of restraint should be maintained.

## Font Weight

The choice of font weight is also based on the principles of order, stability, and restraint. In most cases, just regular(400) and medium(500) should be enough. In the case of bold English words, semibold(600) could be used.

<div class="font-samples">
	<div>
	  <img src="https://gw.alipayobjects.com/zos/rmsportal/orIVrEOZIpjMbqZGiXEi.png" />
	</div>
	<div>
  	<img src="https://gw.alipayobjects.com/zos/rmsportal/sasWhUzTGjlZKftukraH.png" />
	</div>
	<div>
  	<img src="https://gw.alipayobjects.com/zos/rmsportal/QqxifAZlISrSUwnlonyx.png" />
	</div>
</div>

<style>
.font-samples {
  display: flex;
}
</style>

## Font Color

Text will be difficult to read if it is too close to the background color. To achieve barrier-free design, we follow the WCAG standard, which maintains an AAA level of contrast ratio, i.e. 7:1 or more between body text, title, and background color.

<div>
  <img src="https://gw.alipayobjects.com/zos/rmsportal/jPbEabWakVQHosHxhQPR.png" />
</div>

## Advanced Tips

The construction of the font system is the first step to achieve "the beauty of dynamic order". In practical design, we have three more advanced tips：

1. **Establish a systematic design thinking:**
In the UI design of the same system, a systematic design thinking should be first established. The primary, secondary, auxiliary, title, display, and other types of fonts are planned in a unified manner. And then make any necessary fine tuning according to the specific situation. The establishment of a systematic design approach helps to increase the consistency of horizontal font landing, improve the cost-effectiveness of font uses, and avoid unnecessary style waste.
1. **Less is more：**Visual design should be achieved with as few styles as possible. Avoid meaningless use of large numbers of font scales, colors, and font weight to emphasize visual or contrast relationships.
1. **Try to make font scale dance like a note**
When you need to expand any gap, you can try to choose the size of the font to jump in the font scale table, which will create a subtle rhythm between the word scales.
