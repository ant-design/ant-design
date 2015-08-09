# 色彩

- category: 色彩
- order: 0
- disabled: true

---

## 有意义的颜色

色彩在界面设计中的使用应同时具备品牌识别性以及界面设计功能性。众所周知色彩是相当感性的东西，设计中对色彩的运用首要应考虑到品牌层面的表达，另外很重要的一点是色彩的运用应达到信息传递，动作指引，交互反馈，或是强化和凸现某一个元素的目的。任何颜色的选取和使用应该是有意义的。

## 色板

Ant Design 的色板由 16 种基本色彩以及通过黑白叠加的方式扩展的色板组成。

### 主色

<script src="https://t.alipayobjects.com/images/T12b4hXcdhXXXXXXXX.js"></script>
<span class="donut" data-peity='{ "fill": ["#ED1C1C", "#E75B10", "#FF6600", "#FDBF06", "#F1E60E", "#96DA19", "#31C009", "#06D9CF", "#0EC4DF", "#2DB7F5", "#1062CE", "#3344D8", "#582DAA", "#BC1ACD", "#FB1479", "#C21D63"],  "innerRadius": 70, "radius": 110 }'>1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1</span>
<script>$('.donut').peity('donut');</script>


### 扩展色板

Ant Design 提供了16 种主色。每一种颜色都按照添加白色或者黑色 5％ 的规则，可以延展出 40 种颜色，由于 100% 的白色覆盖，90-100% 之间的黑色覆盖在视觉上看不出太多的差别，因此每种颜色省略前后4种颜色保留 36 色的衍生色，基本已经可以满足日常系统设计的需求。

<div id="extend-palettes"></div>

### 灰色

灰色是中性化的颜色，通常传递出来的感觉是沉稳，在配色心理学中描述“专业化、系统化”的词条中灰色的使用占了较高的比例。同时灰色也是一种比较百搭的颜色，和很多颜色都可以很好的进行搭配使用。实际设计的过程中，常常用于字体颜色、边界色、阴影色以及界面中大面积背景的底色搭配。

<div id="grey-palette"></div>

## 交互

设计元素本身由于交互行为会引发一系列细微的视觉变化，而元素本身的颜色变化有时也能很好的实现这一目的。在进行这类设计的同时，建议采取在颜色上添加黑色或者白色并按照 nX5% 的规律递增的方式来实现。以下图为例，当鼠标移动到某个特定元素，就视为浮起，对应颜色就相应增加白色叠加，相反点击的行为可以理解为按下去，在颜色上就相应的增加黑色的叠加。

<img src="https://t.alipayobjects.com/images/T1fZJhXahgXXXXXXXX.png" width="100%">

<img src="https://t.alipayobjects.com/images/T1ZHxhXdNmXXXXXXXX.png" width="100%">

<style>
.color-palette {
  margin: 32px 0;
  overflow: hidden;
  width: 800px;
}
.color-palette div {
  float: left;
  width: 33px;
  height: 33px;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
}
.color-palette .main-color {
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  color: #fff;
  font-size: 12px;
}
</style>
<script src="https://t.alipayobjects.com/images/T1DrxhXe0mXXXXXXXX.js"></script>

`````jsx
let Palette = React.createClass({
  render() {
    let color = this.props.color;
    let values = new Values(color).all(5);
    let extendTintColors = values.map((value, i) => {
      if (i >= (values.length-1)/2) {
        return null;
      }
      return <div style={{backgroundColor: '#' + value.hex}}></div>;
    }).reverse();
    let extendShadeColors = values.map((value, i) => {
      if (i <= (values.length-1)/2 || i >= values.length-3) {
        return null;
      }
      return <div style={{backgroundColor: '#' + value.hex}}></div>;
    });
    return <div className="color-palette">
      <div className="main-color" style={{backgroundColor: color}}>{color}</div>
      {extendTintColors}
      {extendShadeColors}
    </div>;
  }
});
let ExtendPalettes = React.createClass({
  render() {
    var colors = ["#ED1C1C", "#E75B10", "#FF6600", "#FDBF06", "#F1E60E", "#96DA19", "#31C009", "#06D9CF", "#0EC4DF", "#2DB7F5", "#1062CE", "#3344D8", "#582DAA", "#BC1ACD", "#FB1479", "#C21D63"];
    return <div>
      {colors.map((color) => {
        return <Palette color={color} />;
      })}
    </div>;
  }
});
let GreyPalette = React.createClass({
  render() {
    var colors = ["#ED1C1C", "#E75B10", "#FF6600", "#FDBF06", "#F1E60E", "#96DA19", "#31C009", "#06D9CF", "#0EC4DF", "#2DB7F5", "#1062CE", "#3344D8", "#582DAA", "#BC1ACD", "#FB1479", "#C21D63"];
    return <Palette color="#808080" />;
  }
});
React.render(<GreyPalette />, document.getElementById('grey-palette'));
React.render(<ExtendPalettes />, document.getElementById('extend-palettes'));
`````
