# Carousel

- category: Components
- chinese: 走马灯

---

旋转木马，轮播组件。

## 何时使用


## API

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| effect           | 动画效果函数，可取 scrollx, fade | String | scrollx |
| arrow | 是否显示前后翻页箭头 | Boolean   | false |
| dots | 是否显示面板指示点 | Boolean   | true |
| vertical | 垂直显示 | Boolean   | false |
| autoplay | 是否自动切换 | Boolean   | false |
| easing | 动画效果 | String   | linear |
| onChange         | 切换面板的回调                               | Function | 无

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
