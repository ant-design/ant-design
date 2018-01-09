import React from 'react';
import Color from 'color-standalone';
import ColorBlock from './ColorBlock';

const hueStep = 2; // 色相阶梯
const saturationStep = 16; // 饱和度阶梯，浅色部分
const saturationStep2 = 5; // 饱和度阶梯，深色部分
const brightnessStep1 = 5; // 亮度阶梯，浅色部分
const brightnessStep2 = 15; // 亮度阶梯，深色部分
const lightColorCount = 5; // 浅色数量，主色上
const darkColorCount = 4; // 深色数量，主色下

function getHue(hsv, i, light) {
  let hue;
  // 根据色相不同，色相转向不同
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = light ? hsv.h - (hueStep * i) : hsv.h + (hueStep * i);
  } else {
    hue = light ? hsv.h + (hueStep * i) : hsv.h - (hueStep * i);
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}

function getSaturation(hsv, i, light) {
  let saturation;
  if (light) {
    saturation = hsv.s - (saturationStep * i);
  } else if (i === darkColorCount) {
    saturation = hsv.s + (saturationStep);
  } else {
    saturation = hsv.s + (saturationStep2 * i);
  }
  // 边界值修正
  if (saturation > 100) {
    saturation = 100;
  }
  // 第一格的 s 限制在 6-10 之间
  if (light && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }
  if (saturation < 6) {
    saturation = 6;
  }
  return saturation;
}

function getValue(hsv, i, light) {
  if (light) {
    return hsv.v + (brightnessStep1 * i);
  }
  return hsv.v - (brightnessStep2 * i);
}

export default function ColorPatterns({ color }) {
  const patterns = [];
  const pColor = Color(color);
  let index = 0;
  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsv = pColor.clone().hsv();
    const colorString = Color({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true),
    }).hexString();
    index += 1;
    patterns.push(
      <ColorBlock color={colorString} index={index} key={index} />
    );
  }
  index += 1;
  patterns.push(
    <ColorBlock color={pColor.hexString()} index={index} key={index} />
  );
  for (let i = 1; i <= darkColorCount; i += 1) {
    const hsv = pColor.clone().hsv();
    const colorString = Color({
      h: getHue(hsv, i),
      s: getSaturation(hsv, i),
      v: getValue(hsv, i),
    }).hexString();
    index += 1;
    patterns.push(
      <ColorBlock color={colorString} index={index} key={index} />
    );
  }
  return patterns;
}
