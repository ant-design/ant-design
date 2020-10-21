---
category: Components
type: 数据展示
title: Carousel
subtitle: 走马灯
cover: https://gw.alipayobjects.com/zos/antfincdn/%24C9tmj978R/Carousel.svg
---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoplay | 是否自动切换 | boolean | false |  |
| dotPosition | 面板指示点位置，可选 `top` `bottom` `left` `right` | string | `bottom` |  |
| dots | 是否显示面板指示点，如果为 `object` 则同时可以指定 `dotsClass` 或者 | boolean \| { className?: string } | true |  |
| easing | 动画效果 | string | `linear` |  |
| effect | 动画效果函数 | `scrollx` \| `fade` | `scrollx` |  |
| afterChange | 切换面板的回调 | function(current) | - |  |
| beforeChange | 切换面板的回调 | function(from, to) | - |  |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber, dontAnimate) | 切换到指定面板, dontAnimate = true 时，不使用动画 |
| next() | 切换到下一面板 |
| prev() | 切换到上一面板 |

更多 API 可参考：<https://react-slick.neostack.com/docs/api>
