---
title: Color Models and Color Picker
date: 2023-09-07
author: Redjue
---

Hello everyone, I'm [Redjue](https://github.com/Redjue), and I'm honored to have the opportunity to contribute the [ColorPicker](/components/color-picker) component to **Ant Design** this year. It's been a great learning experience and has given me a deeper understanding of the development process of **Ant Design**. In this article, I will share the specific implementation process.

## Color Models

Before we start implementing, we need to understand a concept: color models. A color model is a mathematical model used to describe colors. Common color models include `RGB`, `HSV`, `HEX`, etc. Among these color models, `RGB` is the most common and easiest to understand, so let's start with the `RGB` color model.

### RGB Color Model

The `RGB` color model represents colors by the combination of three primary colors (red, green, and blue). The value range of each primary color is 0-255, and the combination of the three primary colors can represent 256<sup>3</sup> colors. These colors can form a cube, as shown in the following figure: ![RGB](https://user-images.githubusercontent.com/21119589/268834307-79fca808-d3a3-4fe8-b370-ea1ec472023c.png)

In the `RGB` color model, each color can be represented by a triplet `(R, G, B)`, where `R` represents the value of red, `G` represents the value of green, and `B` represents the value of blue. For example, red can be represented as `rgb(255, 0, 0)`, green can be represented as `rgb(0, 255, 0)`, and blue can be represented as `rgb(0, 0, 255)`.

### HSV/HSB Color Model

The `HSV` color model represents colors by hue, saturation, and value. The value range of hue is 0-360, and the value range of saturation and value is 0-100. The `HSV` color model can be represented by a cone, as shown in the following figure: ![HSV](https://user-images.githubusercontent.com/21119589/268834741-83940b90-c709-492b-8a7e-f59d317411e9.png)

In the `HSV` color model, each color can be represented by a triplet `(H, S, V)`, where `H` represents the value of hue, `S` represents the value of saturation, and `V` represents the value of value. For example, red can be represented as `hsv(0, 100, 100)`, green can be represented as `hsv(120, 100, 100)`, and blue can be represented as `hsv(240, 100, 100)`.

### HEX Color Model

The `HEX` color model represents colors by hexadecimal numbers. The first two digits represent the value of red, the middle two digits represent the value of green, and the last two digits represent the value of blue. For example, red can be represented as `#FF0000`, green can be represented as `#00FF00`, and blue can be represented as `#0000FF`. As shown in the following figure: ![HEX](https://user-images.githubusercontent.com/21119589/268841812-1b8310f5-322b-45ec-b768-d4115cf7091d.png)

This is also the most common way of representing colors because it can be used directly in CSS. Moreover, the representation is very simple, just convert the three numbers in the RGB color model to hexadecimal numbers.

## Conversion of Color Models

Different algorithms are needed for the conversion of color models. There are many mature libraries on the market that can be selected. In the implementation, we chose the library [tinycolor](https://github.com/scttcper/tinycolor), which supports the conversion of multiple color models such as `RGB`, `HSL`, `HSV`, `HEX`, etc. Moreover, its size is very small, only about 10KB, which is very suitable for use in browsers.

## Selection of Color Models

Since we need to implement a color picker, we need to choose a color model to represent colors. In terms of complexity, the `RGB` color model is the simplest because it only needs three numbers to represent a color, and its value range is 0-255, which is very easy to understand. However, the disadvantage of the `RGB` color model is also very obvious. Its color space is a cube, and the color change at the edge of the cube is very obvious. This color space is not suitable for human visual perception.

Therefore, we need to choose a color model that is more suitable for human visual perception. Here we chose the `HSV` color model, which represents colors through hue, saturation, and value. This color space is more in line with human visual perception, and the color change at the edge of the color space is not too obvious.

## Implementation Details

The implementation mainly consists of three parts: the color panel, the selection anchor, and sliders.

### Color Panel

Since we are using the `HSV` color model, we need to represent hue, saturation, and value on the panel.

1. Hue

```css
background-color: rgb(0, 106, 255);
```

This way we get a blue color with both saturation and brightness set to 100% <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266240524-e40a2df7-c3c8-4ecc-aff9-10a4b2d645d7.png"/>

2. Add brightness overlay

```css
background-color: rgb(0, 106, 255);
background-image: linear-gradient(0deg, rgb(0, 0, 0), transparent);
```

After adding the brightness overlay, we get a blue color with brightness variation <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266242191-e31fd6e2-675b-455c-bc98-9df3b3c8be7f.png"/>

3. Add saturation overlay

```css
background-color: rgb(0, 106, 255);
background-image: linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
```

After adding the saturation overlay, we get a blue color with brightness variation <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266243231-6d682bf5-fb74-4a8e-9930-19a604d1203f.png"/>

So far, we have obtained a color panel with complete hue, saturation, and brightness.

### Selection Anchor

The implementation of the selection anchor is relatively simple. We only need to correspond the offset position of the anchor to the saturation and brightness of the color panel.

```ts
...
const { width, height } = containerRef.current.getBoundingClientRect();
const { width: targetWidth, height: targetHeight } = targetRef.current.getBoundingClientRect();
const centerOffsetX = targetWidth / 2;
const centerOffsetY = targetHeight / 2;
// Saturation
const saturation = (offset.x + centerOffsetX) / width;
// Brightness
const bright = 1 - (offset.y + centerOffsetY) / height;
```

### Hue and Alpha Sliders

The logic is the same as above, we just need to correspond the offset position of the sliders to the hue or alpha of the color.

```ts
...
const { width, height } = containerRef.current.getBoundingClientRect();
const { width: targetWidth, height: targetHeight } = targetRef.current.getBoundingClientRect();
const centerOffsetX = targetWidth / 2;
const centerOffsetY = targetHeight / 2;
// Hue
const hue = ((offset.x + centerOffsetX) / width) * 360;
// Opacity
const alpha = (offset.x + centerOffsetX) / width;
```

So far, we have obtained a color picker with complete hue, saturation, and brightness, as shown in the following figure: <img style="width:auto" src="https://user-images.githubusercontent.com/21119589/266269086-3dacf4e6-f799-4cb1-b81a-fd4930d7063f.png"/>

## Summary

Through this development journey, I have gained a deeper understanding of color models and the development process of Ant Design. Thanks to the Ant Design team for giving me this opportunity, and thank you all for reading. If you are interested in the implementation details, you can check out the source code implementation at [@rc-component/color-picker](https://github.com/react-component/color-picker).

## References

- https://zh.wikipedia.org/wiki/%E4%B8%89%E5%8E%9F%E8%89%B2%E5%85%89%E6%A8%A1%E5%BC%8F#/media/File:RGB_color_solid_cube.png
- https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4#/media/File:HSV_cone.png
- https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2#/media/File:Web_Color_Charts.svg
