# 基本

- order: 0

基本滑动条

---

````jsx
var Slider = antd.Slider;

React.render(
<div className="sliderContainer">
  <Slider />
  <Slider value={65} disabled />
</div>
, document.getElementById('components-slider-demo-basic'));
````

<style>
/*  .sliderContainer p {
	margin-bottom: 10px;
  }
  .sliderContainer .ant-slider {
	margin-bottom: 45px;
  }
   .sliderContainer .ant-slider:last-child {
	margin-bottom: 0;
  }*/
</style>