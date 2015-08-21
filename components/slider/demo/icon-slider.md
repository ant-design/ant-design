# 带 icon 的滑块

- order: 2

滑块左右可以设置图标来表达业务含义。

---

````jsx
var Slider = antd.Slider;

var IconSlider = React.createClass({
  getInitialState() {
    var max = this.props.max;
    var min = this.props.min;
    var mid = ((max - min) / 2).toFixed(5);

    var preIcon, nextIcon;
    if (this.props.value >= mid) {
      preIcon = this.props.icon[0];
      nextIcon = this.props.icon[1] + ' anticon-highlight';
    } else {
      preIcon = this.props.icon[0] + ' anticon-highlight';
      nextIcon = this.props.icon[1];
    }

    return {
      preIcon: preIcon,
      nextIcon: nextIcon,
      mid: mid,
      sliderValue: this.props.value
    };
  },

  handleChange(v) {
    var preIcon, nextIcon;
    if (v >= this.state.mid) {
      preIcon = this.props.icon[0];
      nextIcon = this.props.icon[1] + ' anticon-highlight';
    } else {
      preIcon = this.props.icon[0] + ' anticon-highlight';
      nextIcon = this.props.icon[1];
    }

    this.setState(
      {
        preIcon: preIcon,
        nextIcon: nextIcon,
        sliderValue: v
      }
    );
  },

  render() {
    return (
      <div className="iconWrapper">
        <i className={this.state.preIcon}></i>
        <i className={this.state.nextIcon}></i>
        <Slider {...this.props} onChange={this.handleChange} value={this.state.sliderValue} />
      </div>
    );
  }
});

React.render(
<IconSlider min={0} max={20} value={0} icon={['anticon anticon-lock', 'anticon anticon-unlock']} />
, document.getElementById('components-slider-demo-icon-slider'));
````

<style>
.iconWrapper {
  position: relative;
  padding: 0 24px 0 9px;
}

.iconWrapper .anticon {
  position: absolute;
  top: -6px;
  width: 16px;
  height: 16px;
  line-height: 1;
  font-size: 16px;
  color: #ccc;
}

.iconWrapper .anticon-lock {
  left: 0;
}
.iconWrapper .anticon-unlock{
  right: 0;
}

.anticon.anticon-highlight {
  color: #666;
}
</style>
