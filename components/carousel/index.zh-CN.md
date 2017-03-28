---
category: Components
type: Data Display
title: Carousel
subtitle: 走马灯
---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| effect           | 动画效果函数，可取 scrollx, fade | string | scrollx |
| dots | 是否显示面板指示点 | boolean   | true |
| vertical | 垂直显示 | boolean   | false |
| autoplay | 是否自动切换 | boolean   | false |
| easing | 动画效果 | string   | linear |
| beforeChange      | 切换面板的回调                              | function(from, to) | 无
| afterChange       | 切换面板的回调                              | function(current)  | 无

更多参数可参考：https://github.com/akiran/react-slick
