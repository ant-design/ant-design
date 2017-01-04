---
category:
  zh-CN: 设计基础
  en-US: Design Fundamental
order: 2
title:
  zh-CN: 色彩
  en-US: Colors
---

## 有意义的色彩

色彩在界面设计中的使用应同时具备品牌识别性以及界面设计功能性。色彩是相当感性的东西，设计中对色彩的运用首要应考虑到品牌层面的表达，另外很重要的一点是色彩的运用应达到信息传递，动作指引，交互反馈，或是强化和凸现某一个元素的目的。任何颜色的选取和使用应该是有意义的。

## Ant Design Colors

Ant Design 的色板由 8 种基本色彩组成，通过一套[精心设计的色彩算法](https://github.com/ant-design/ant-design/blob/734beb84ffc3f0469fbae1566aa8450f966cb261/components/style/color/colorPalette.less)，每种基本色又自动衍生出 10 种渐变色，其中第 6 种为基本色。

> 我们结合了色彩加白、加黑、加深，贝塞尔曲线，以及针对冷暖色的不同旋转角度，调教出一套色彩算法。使用者只需指定主色，便可导出一条完整的渐变色板。

`````__react
const rgbToHex = (rgbString) => {
  const hexChars = '0123456789ABCDEF';
  const rgb = rgbString.match(/\d+/g);
  let r = parseInt(rgb[0]).toString(16);
  let g = parseInt(rgb[1]).toString(16);
  let b = parseInt(rgb[2]).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b =  b.length === 1 ? `0${ b}` : b;
  return '#' + r + g + b;
};
const Palette = React.createClass({
  getInitialState() {
    return { hexColors: null };
  },
  componentDidMount() {
    const hexColors = {};
    Object.keys(this.colorNodes).forEach(key => {
      hexColors[key] = rgbToHex(getComputedStyle(this.colorNodes[key])['background-color'])
    });
    this.setState({ hexColors });
  },
  render() {
    this.colorNodes = this.colorNodes || {};
    const { name, description, color } = this.props.color;
    const { hexColors } = this.state;
    const colors = [];
    for (let i = 1; i <= 10; i++) {
      colors.push(
        <div
          key={i}
          ref={node => { this.colorNodes[`${name}-${i}`] = node; } }
          className={`main-color-item palatte-${name}-${i}`}
          style={{
            color: i > 5 ? '#fff' : 'unset',
            fontWeight: i === 6 ? 'bold' : 'normal',
          }}
        >
          {name}-{i}
          {hexColors ? <span className="main-color-value">{hexColors[`${name}-${i}`]}</span> : null}
        </div>
      );
    }
    return (
      <div className="color-palette">
        <div className="color-title">
          {name}
          <span className="color-description">{description}</span>
        </div>
        <div className="main-color">{colors}</div>
      </div>
    );
  }
});
const ExtendPalettes = React.createClass({
  render() {
    const colors = [
      {
        name: 'red',
        description: '热情、警示',
      },
      {
        name: 'green',
        description: '成功、通过、安全',
      },
      {
        name: 'blue',
        description: '专业、科技',
      },
      {
        name: 'pink',
        description: '典雅、明快、女性',
      },
      {
        name: 'orange',
        description: '醒目、温暖',
      },
      {
        name: 'purple',
        description: '高雅、浪漫',
      },
      {
        name: 'yellow',
        description: '活力、提示',
      },
      {
        name: 'cyan',
        description: '清新、冷静、结构化',
      }
    ];
    return (
      <div>
        {colors.map((color, i) => <Palette key={color.name} color={color} />)}
      </div>
    );
  }
});
ReactDOM.render(<ExtendPalettes key="palettes" />, mountNode);
`````

## 色彩和交互

设计元素本身由于交互行为会引发一系列细微的视觉变化，而元素本身的颜色变化有时也能很好的实现这一目的。在进行这类设计的同时，建议采取在颜色上添加黑色或者白色并按照 `n+5%` 的规律递增的方式来实现。以下图为例，当鼠标 hover 某个特定元素，就视为浮起，对应颜色就相应增加白色叠加，相反点击的行为可以理解为按下去，在颜色上就相应的增加黑色的叠加。

<img src="https://t.alipayobjects.com/images/T1ZHxhXdNmXXXXXXXX.png" width="100%">

<img src="https://t.alipayobjects.com/images/T1fZJhXahgXXXXXXXX.png" width="100%">

## 色彩识别

合适的色彩对比为信息传达加分，同时也应放考虑到有颜色识别障碍人群的需求。我们将每种主色衍生出来的颜色进行了打标，在考虑对比颜色的选择时建议两种颜色对应标签数值的差要大于等于 5。

<img src="https://t.alipayobjects.com/images/rmsweb/T1hLphXgXcXXXXXXXX.png" width="100%">

<img src="https://t.alipayobjects.com/images/rmsweb/T1v2phXj8bXXXXXXXX.png" width="100%">

## 色彩换算工具

> 正数为变淡 `tint` ，负数为加深 `shade`。

`````__react
const Values = require('values.js');
const CopyToClipboard = require('react-copy-to-clipboard');
const classNames = require('classnames');
const antd = require('antd');
const Button = antd.Button;
const InputNumber = antd.InputNumber;
const Slider = antd.Slider;
const Tooltip = antd.Tooltip;
const TintShadeTool = React.createClass({
  getInitialState() {
    return {
      result: '#2db7f5',
      color: '#2db7f5',
      justCopied: false,
      darkBackground: false,
      value: 80
    };
  },
  handleChangeColor(e) {
    this.setState({
      color: e.target.value
    }, this.calculate);
  },
  handleChangeValue(value) {
    this.setState({
      value: value
    }, this.calculate);
  },
  componentDidMount() {
    this.calculate();
  },
  calculate() {
    if (this.state.value === 0) {
      this.setState({
        result: this.state.color
      });
      return;
    }
    const tintOrShade = this.state.value > 0 ? 'tint' : 'shade';
    const c = new Values(this.state.color);
    const resultColor = c[tintOrShade](Math.abs(this.state.value));
    this.setState({
      result: '#' + resultColor.hex,
      darkBackground: resultColor.getBrightness() < 50
    });
  },
  copySuccess(e) {
    this.setState({ justCopied: true }, () => {
      setTimeout(() => {
        this.setState({ justCopied: false });
      }, 1000);
    });
  },
  render() {
    const marks = {
      '-100': '加黑',
      '0': '原色',
      '100': '加白'
    };
    const className = classNames({
      'color-block': true,
      copied: this.state.justCopied,
      dark: this.state.darkBackground,
    });
    return <div style={{margin: '40px 0'}}>
      <div>
        <Tooltip title="点击色块复制色值">
          <CopyToClipboard
            className={className}
            onCopy={this.copySuccess}
            text={this.state.result}
          >
            <div style={{backgroundColor: this.state.result}} />
          </CopyToClipboard>
        </Tooltip>
        <span style={{width: 188, display: 'inline-block', fontFamily: 'Consolas'}}>{this.state.result}</span>
        <input className="ant-input" style={{width: 80, color: this.state.color, marginRight: 8}} value={this.state.color} onChange={this.handleChangeColor} />
        <InputNumber style={{width: 70}} value={this.state.value} onChange={this.handleChangeValue} min={-100} max={100} step={5} />
        <span style={{margin: '0 0 0 8px'}}>%</span>
      </div>
      <div style={{width: 420, margin: '40px 10px 60px'}}>
        <Slider value={this.state.value} onChange={this.handleChangeValue} min={-100} max={100} step={5} marks={marks} />
      </div>
    </div>;
  }
});

ReactDOM.render(<TintShadeTool key="tintShadeTool" />, mountNode);
`````

Ant Design 专用色彩换算工具，用于解析类似 `#2db7f5 tint 80%` 的色彩标注。

less 或 scss 语言可以直接使用 `tint(#2db7f5, 80%)` 和  `shade(#2db7f5, 80%)` 的语法。
