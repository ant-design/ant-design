---
order: 2
title:
  zh-CN: 带 icon 的滑块
  en-US: Slider with icon
---

## zh-CN

滑块左右可以设置图标来表达业务含义。

## en-US

You can add an icon beside the slider to make it meaningful.

````jsx
import { Slider, Icon } from 'antd';

class IconSlider extends React.Component {
  constructor(props) {
    super(props);
    const { max, min } = props;
    const mid = ((max - min) / 2).toFixed(5);
    this.state = {
      preIconClass: this.props.value >= mid ? '' : 'anticon-highlight',
      nextIconClass: this.props.value >= mid ? 'anticon-highlight' : '',
      mid,
      sliderValue: this.props.value,
    };
  }
  handleChange = (v) => {
    this.setState({
      preIconClass: v >= this.state.mid ? '' : 'anticon-highlight',
      nextIconClass: v >= this.state.mid ? 'anticon-highlight' : '',
      sliderValue: v,
    });
  }
  render() {
    return (
      <div className="icon-wrapper">
        <Icon className={this.state.preIconClass} type={this.props.icon[0]} />
        <Slider {...this.props} onChange={this.handleChange} value={this.state.sliderValue} />
        <Icon className={this.state.nextIconClass} type={this.props.icon[1]} />
      </div>
    );
  }
}

ReactDOM.render(<IconSlider min={0} max={20} value={0} icon={['frown-o', 'smile-o']} />, mountNode);
````

````css
.icon-wrapper {
  position: relative;
  padding: 0px 30px;
}

.icon-wrapper .anticon {
  position: absolute;
  top: -3px;
  width: 16px;
  height: 16px;
  line-height: 1;
  font-size: 16px;
  color: @disabled-color;
}

.icon-wrapper .anticon:first-child {
  left: 0;
}

.icon-wrapper .anticon:last-child {
  right: 0;
}

.anticon.anticon-highlight {
  color: #666;
}
````
