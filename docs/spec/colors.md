# 色彩

- category: 基础
- order: 2

---

## 有意义的色彩

色彩在界面设计中的使用应同时具备品牌识别性以及界面设计功能性。众所周知色彩是相当感性的东西，设计中对色彩的运用首要应考虑到品牌层面的表达，另外很重要的一点是色彩的运用应达到信息传递，动作指引，交互反馈，或是强化和凸现某一个元素的目的。任何颜色的选取和使用应该是有意义的。众所周知色彩是相当感性的东西，设计中对色彩的运用首要应考虑到品牌层面的表达，另外很重要的一点是色彩的运用应达到信息传递，动作指引，交互反馈，或是强化和凸现某一个元素的目的。任何颜色的选取和使用应该是有意义的。

## ANTD Color

Ant Design 的色板由 9 种基本色彩组成，每种基本色又衍生出九宫格色板，在此基础上还可以通过黑白叠加的方式实现色彩明暗的效果。

<div id="extend-palettes"></div>

## 色彩和交互

设计元素本身由于交互行为会引发一系列细微的视觉变化，而元素本身的颜色变化有时也能很好的实现这一目的。在进行这类设计的同时，建议采取在颜色上添加黑色或者白色并按照 `n+5%` 的规律递增的方式来实现。以下图为例，当鼠标 hover 某个特定元素，就视为浮起，对应颜色就相应增加白色叠加，相反点击的行为可以理解为按下去，在颜色上就相应的增加黑色的叠加。

<img src="https://t.alipayobjects.com/images/T1ZHxhXdNmXXXXXXXX.png" width="100%">

<img src="https://t.alipayobjects.com/images/T1fZJhXahgXXXXXXXX.png" width="100%">

## 色彩识别

合适的色彩对比为信息传达加分，同时也应放考虑到有颜色识别障碍人群的需求。我们将每种主色衍生出来的颜色进行了打标，在考虑对比颜色的选择时建议两种颜色对应标签数值的差要大于等于 5。

<img src="https://t.alipayobjects.com/images/rmsweb/T1hLphXgXcXXXXXXXX.png" width="100%">

<img src="https://t.alipayobjects.com/images/rmsweb/T1v2phXj8bXXXXXXXX.png" width="100%">

<style>
.color-palette {
  margin: 45px 0;
  overflow: hidden;
  width: 100%;
  height: 165px;
}
.main-color {
  width: 165px;
  height: 165px;
  float: left;
}
.main-color div {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  float: left;
  margin: 0 5px 5px 0;
}

.color-palette .color-msg {
  margin-left: 180px;
}

.color-msg .color-msg-title {
  margin: 0;
  font-weight: 600;
  color: #5C6B77;
  line-height: 1.8;
  font-size: 21px;
}

.color-msg .color-msg-description {
  color: #777;
  font-size: 14px;
  line-height: 1.8;
  margin-top: 16px;
}
</style>

`````jsx
let Palette = React.createClass({
  render() {
    let color = this.props.color;
    return <div className="color-palette">
      <div className="main-color">
        {color.colors.map(function(color) {
          return (<div key={color} style={{backgroundColor:color}}></div>);
        })}
      </div>
      <div className={"color-msg"}>
        <p className={"color-msg-title"}>{color.title}</p>
        <p className={"color-msg-description"}>{color.description}</p>
      </div>
    </div>;
  }
});
let ExtendPalettes = React.createClass({
  render() {
    let colors = [
      {
        'title': 'Primary Color',
        'description': '尽管同一种颜色传达的含义会因人而异，受到文化和地域的影响。但颜色还是可以提取出一些共通的特性，例如暖色系的红、橙、黄通常用于象征活力，激情，积极；而冷色系的绿、蓝、紫通常给人感觉是安全、稳定、专业。',
        'colors': [
          "#E01515", "#FF6600", "#FAC450",
          "#E4249B", "#CCCCCC", "#5FBC29",
          "#582DAA", "#0097DA", "#01B3CA"
        ]
      },
      {
        'title': 'Grey #CCCCCC',
        'description': '灰色是中性化的颜色，通常传递出来的感觉是沉稳，在配色心理学中描述 “专业化、系统化”的词条中灰色的使用占了较高的比例。建议可用于字体颜色的选择以及界面中大面积背景的底色搭配。',
        'colors': [
          "#FFFFFF", "#FCFCFC", "#ECECEC",
          "#989898", "#CCCCCC", "#D9D9D9",
          "#666666", "#323232", "#000000"
        ]
      },
      {
        'title': 'Red #E01515',
        'description': '红色是具有强烈情感因素的颜色，通常红色传递的心理暗示有激情、欲望、战争以及危险。考虑到红色的特性，在后台系统的设计中建议作为辅助色来突出元素特性或是强化信息，常见的有图表元素，状态，危险信号，错误提示等。',
        'colors': [
          "#F9CCD6", "#FFA5B4", "#FA727D",
          "#BB0606", "#E01515", "#FF3858",
          "#881414", "#4E1212", "#260404"
        ]
      },
      {
        'title': 'Green #60BE29',
        'description': '绿色是非常务实的颜色，它吸收了蓝色的沉稳同时具备黄色的活力。绿色蕴含着和平、生命、希望、轻松、富饶的含义。在我们的设计实例中绿色可用来传达任务完成、健康状态以及安全感等状态。',
        'colors': [
          "#E2F582", "#D0EE9C", "#A6E33C",
          "#39A30E", "#60BE29", "#70D445",
          "#18791B", "#1F4A12", "#102803"
        ]
      },
      {
        'title': 'Blue #00A0E8',
        'description': '这里的蓝色沿用的是蚂蚁金服的品牌色，深蓝色的运用可以传递出可靠和稳定的情绪，而浅蓝色系则更为友好和清新，同时还代表了科技感与想象力。在很多专业类、管理类的后台系统设计中蓝色系常常会被选择作为设计的主色来使用。',
        'colors': [
          "#CCE4F6", "#95CCF5", "#6AC2F5",
          "#1D80D3", "#00A0E8", "#2DB7F5",
          "#1F5AA3", "#0B366A", "#08172F"
        ]
      },
      {
        'title': 'Magenta #E9259',
        'description': '玫红色是较为正面的色彩，含有鼓励、友好、活力的意义。但考虑到洋红色的特性，建议作为辅助色来使用。',
        'colors': [
          "#F8C5ED", "#F5A6D3", "#F387C0",
          "#BC0F69", "#E9259E", "#F056AD",
          "#890B4C", "#5E0B36", "#230213"
        ]
      },
      {
        'title': 'Orange #FF6100',
        'description': '介于红色和黄色之间，传达愉悦，创造力，热情，吸引力。但橙色又不如红色那样具侵略性，同时又能够很好的引起视觉的注意力。可以作为设计的主色也可以用于辅助色。但大面积使用时需要慎重。',
        'colors': [
          "#F1DDBD", "#FBCA72", "#FDAC23",
          "#CE630F", "#FF6100", "#FF8A0C",
          "#8B4A04", "#523A13", "#341F0B"
        ]
      },
      {
        'title': 'Purple #5E30B5',
        'description': '紫色是赤黄黄绿青蓝紫中最后一名，也是人类可见光谱中波长最短的光，有华贵、信仰、神秘等含义，同时是红与蓝的结合体，传达中性、中立等信息。在界面设计中建议作为辅助颜色使用。',
        'colors': [
          "#E8DFFA", "#B196EE", "#8867D2",
          "#581CB6", "#5E30B5", "#7A43E2",
          "#3F187D", "#2B1845", "#0F061B"
        ]
      },
      {
        'title': 'Yellow #FAC450',
        'description': '黄色传达了愉悦，活力，创造力等正面的情绪，是具正能量的色彩。在具体设计中黄色常常于表达警示性的信息。建议作为辅助色来使用。',
        'colors': [
          "#FAF4B2", "#FDF161", "#FDE023",
          "#D9B416", "#FAC450", "#F7CD07",
          "#B48513", "#6B4C01", "#241A06"
        ]
      },
      {
        'title': 'Cyan #01BAD2',
        'description': '介于蓝色和绿色之间，带有专业、冷静、从容的心理暗示。在体验专业化和结构化的设计中常常被用到，可以作为系统主色来使用。',
        'colors': [
          "#E0F7FA", "#B2EBF2", "#80DEEA",
          "#00ACC2", "#01BAD2", "#26C6DA",
          "#00708F", "#014B62", "#031213"
        ]
      }
    ];
    return <div>
      {colors.map((color, i) => {
        return <Palette key={i} color={color} />;
      })}
    </div>;
  }
});
ReactDOM.render(<ExtendPalettes />, document.getElementById('extend-palettes'));
`````

## 色彩换算工具

> 正数为变淡 `tint` ，负数为加深 `shade`。

<div id="color-tint-shade-tool"></div>

Ant Design 专用色彩换算工具，用于解析类似 `#2db7f5 tint 80%` 的色彩标注。

less 或 scss 语言可以直接使用 `tint(#2db7f5, 80%)` 和  `shade(#2db7f5, 80%)` 的语法。


`````jsx
let Button = antd.Button;
let InputNumber = antd.InputNumber;
let Slider = antd.Slider;
let Tooltip = antd.Tooltip;
let TintShadeTool = React.createClass({
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
    let tintOrShade = this.state.value > 0 ? 'tint' : 'shade';
    let c = new Values(this.state.color);
    let resultColor = c[tintOrShade](Math.abs(this.state.value));
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
    var marks = {
      '-100': '加黑',
      '0': '原色',
      '100': '加白'
    };
    return <div style={{margin: '40px 0'}}>
      <div>
        <Tooltip title="点击色块复制色值">
          <CopyToClipboard onCopy={this.copySuccess} text={this.state.result}>
            <div style={{backgroundColor: this.state.result}} className={'color-block ' + (this.state.justCopied ? 'copied' : '') + (this.state.darkBackground ? ' dark' : '')}></div>
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

ReactDOM.render(<TintShadeTool />, document.getElementById('color-tint-shade-tool'));
`````

<style>
.color-block {
  position: relative;
  width: 60px;
  border-radius: 6px;
  height: 28px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  cursor: pointer;
}
.color-block:after {
  position: absolute;
  top: 10px;
  left: 0;
  height: 100%;
  width: 100%;
  content: "Copied!";
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  color: #444;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  opacity: 0;
}
.color-block.copied:after {
  opacity: 1;
  top: 0;
}
.color-block.dark:after {
  color: #fff;
}
</style>
