---
category: Components
chinese: 走马灯
type: Presentation
english: Carousel
---

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## API

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| effect           | 动画效果函数，可取 scrollx, fade | String | scrollx |
| dots | 是否显示面板指示点 | Boolean   | true |
| vertical | 垂直显示 | Boolean   | false |
| autoplay | 是否自动切换 | Boolean   | false |
| easing | 动画效果 | String   | linear |
| beforeChange      | 切换面板的回调                              | function(from, to) | 无
| afterChange       | 切换面板的回调                              | function(current)  | 无

更多参数可参考：https://github.com/akiran/react-slick

<style>
.ant-carousel .slick-slide {
  text-align: center;
  height: 100px;
  line-height: 100px;
  background: #71B5DE;
  color: #fff;
  overflow: hidden;
}
#components-carousel-demo-vertical .ant-carousel {
  margin-right: 35px;
}
</style>
