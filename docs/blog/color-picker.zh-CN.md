---
title: 色彩模型与颜色选择器
date: 2023-09-07
author: Redjue
---

大家好，我是 [Redjue（红果汁）](https://github.com/Redjue)，很荣幸今年有机会向 **Ant Design** 贡献了颜色选择器组件 [ColorPicker](/components/color-picker-cn)，这是一次很棒的学习机会，也让我对 **Ant Design** 的开发流程有了更深入的了解。在这篇文章中，我将分享一下具体的实现过程。

## 色彩模型

在实现之前我们需要了解一个概念：色彩模型。色彩模型是一种用于描述色彩的数学模型，常见的色彩模型有 `RGB`、`HSV`、`HEX` 等。在这些色彩模型中，`RGB` 是最常见的色彩模型，也是最容易理解的色彩模型，因此我们先来看一下 `RGB` 色彩模型。

### RGB 色彩模型

`RGB` 色彩模型是通过三原色（红、绿、蓝）的不同组合来表示色彩的，每个原色的取值范围是 0-255，三原色的组合可以表示 256<sup>3</sup> 种颜色，这些颜色可以组成一个立方体，如下图所示： ![RGB](https://user-images.githubusercontent.com/21119589/268834307-79fca808-d3a3-4fe8-b370-ea1ec472023c.png)

在 `RGB` 色彩模型中，每个颜色都可以用一个三元组 `(R, G, B)` 来表示，其中 `R` 表示红色的取值，`G` 表示绿色的取值，`B` 表示蓝色的取值。例如，红色可以表示为 `rgb(255, 0, 0)`，绿色可以表示为 `rgb(0, 255, 0)`，蓝色可以表示为 `rgb(0, 0, 255)`。

### HSV/HSB 色彩模型

`HSV` 色彩模型是通过色相（Hue）、饱和度（Saturation）、明度（Value）来表示色彩的，其中色相的取值范围是 0-360，饱和度和明度的取值范围是 0-100。HSV 色彩模型可以用一个圆锥体来表示，如下图所示： ![HSV](https://user-images.githubusercontent.com/21119589/268834741-83940b90-c709-492b-8a7e-f59d317411e9.png)

在 `HSV` 色彩模型中，每个颜色都可以用一个三元组 `(H, S, V)` 来表示，其中 `H` 表示色相的取值，`S` 表示饱和度的取值，`V` 表示明度的取值。例如，红色可以表示为 `hsv(0, 100, 100)`，绿色可以表示为 `hsv(120, 100, 100)`，蓝色可以表示为 `hsv(240, 100, 100)`。

### HEX 色彩模型

`HEX` 色彩模型是通过十六进制数来表示色彩的，其中前两位表示红色的取值，中间两位表示绿色的取值，后两位表示蓝色的取值。例如，红色可以表示为 `#FF0000`，绿色可以表示为 `#00FF00`，蓝色可以表示为 `#0000FF`。如下图所示： ![HEX](https://user-images.githubusercontent.com/21119589/268841812-1b8310f5-322b-45ec-b768-d4115cf7091d.png)

这也是我们最常见的颜色表示方式，因为它可以直接在 CSS 中使用。而且表示方式非常简单，只需要将 RGB 色彩模型中的三个数字转换为十六进制数即可。

## 色彩模型的转换

颜色模型的转换需要不同的算法，市面上已经有很多成熟的类库可以进行选择，在实现上我们选择了 [tinycolor](https://github.com/scttcper/tinycolor) 这个类库，它支持 `RGB`、`HSL`、`HSV`、`HEX` 等多种色彩模型的转换，而且它的体积非常小，只有 10KB 左右，非常适合在浏览器中使用。

## 色彩模型的选择

由于我们需要实现一个颜色选择器，因此我们需要选择一个色彩模型来表示颜色。从复杂度来说，`RGB` 色彩模型是最简单的，因为它只需要三个数字就可以表示一个颜色，而且它的取值范围是 0-255，非常容易理解。但是 `RGB` 色彩模型的缺点也很明显，它的色彩空间是一个立方体，而且在立方体的边缘颜色的变化非常明显，这样的色彩空间并不适合人类的视觉感知。

因此，我们需要选择一个更适合人类视觉感知的色彩模型，这里我们选择了 `HSV` 色彩模型，通过色相、饱和度、明度三个维度来表示颜色，这样的色彩空间更加符合人类的视觉感知，而且在色彩空间的边缘颜色的变化也不会太明显。

## 具体实现

主要分为三部分实现：颜色面板、选择锚点和滑块。

### 颜色面板

由于我们用了 `HSV` 的色彩模型，所以我们的需要将色相、饱和度、明度在面板上表示出来。

1. 色相

```css
background-color: rgb(0, 106, 255);
```

这样我们就得到一个明度和饱和度都为 100% 的蓝色 <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266240524-e40a2df7-c3c8-4ecc-aff9-10a4b2d645d7.png"/>

2. 叠加明度

```css
background-color: rgb(0, 106, 255);
background-image: linear-gradient(0deg, rgb(0, 0, 0), transparent);
```

叠加明度图层后，我们得到了具有明度变化的蓝色 <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266242191-e31fd6e2-675b-455c-bc98-9df3b3c8be7f.png"/>

3. 叠加饱和度

```css
background-color: rgb(0, 106, 255);
background-image: linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
```

叠加饱和度图层后，我们得到了具有明度变化和饱和度变化的蓝色 <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266243231-6d682bf5-fb74-4a8e-9930-19a604d1203f.png"/>

至此我们就得到了一个拥有完整色相、饱和度、明度的颜色面板。

### 选择锚点

选择锚点的实现比较简单，我们只需要将锚点的偏移位置对应到颜色面板的饱和度、明度即可。

```ts
...
const { width, height } = containerRef.current.getBoundingClientRect();
const { width: targetWidth, height: targetHeight } = targetRef.current.getBoundingClientRect();
const centerOffsetX = targetWidth / 2;
const centerOffsetY = targetHeight / 2;
// 饱和度
const saturation = (offset.x + centerOffsetX) / width;
// 明度
const bright = 1 - (offset.y + centerOffsetY) / height;
```

### 色相和不透明度滑块

逻辑同上，我们只需要将滑块的偏移位置对应到颜色的色相或不透明度即可。

```ts
...
const { width, height } = containerRef.current.getBoundingClientRect();
const { width: targetWidth, height: targetHeight } = targetRef.current.getBoundingClientRect();
const centerOffsetX = targetWidth / 2;
const centerOffsetY = targetHeight / 2;
// 色相
const hue = ((offset.x + centerOffsetX) / width) * 360;
// 不透明度
const alpha = (offset.x + centerOffsetX) / width;
```

至此我们得到了一个完整的颜色选择器，如下图所示： <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266269086-3dacf4e6-f799-4cb1-b81a-fd4930d7063f.png"/>

## 总结

通过这次开发之旅，我对色彩模型有了更深入的了解，也对 **Ant Design** 的开发流程有了更深入的了解。感谢 **Ant Design** 团队给我这次机会，也感谢大家的阅读。如果对细节实现感兴趣的童鞋，可以移步 [@rc-component/color-picker](https://github.com/react-component/color-picker) 查看源码实现。

## 图片来源

- https://zh.wikipedia.org/wiki/%E4%B8%89%E5%8E%9F%E8%89%B2%E5%85%89%E6%A8%A1%E5%BC%8F#/media/File:RGB_color_solid_cube.png
- https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4#/media/File:HSV_cone.png
- https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2#/media/File:Web_Color_Charts.svg
