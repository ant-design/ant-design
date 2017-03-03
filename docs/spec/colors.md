---
category:
  zh-CN: 设计基础
  en-US: Design Fundamental
order: 2
title:
  zh-CN: 色彩
  en-US: Colors
---

设计中对色彩的运用不仅应考虑品牌的识别性，还需达到信息传递、操作指引、交互反馈，或是强化和凸显某一个元素的目的。基于操作系统更注重高效、清晰等特点，Ant Design 的用色上更偏向简洁实用一些。在选择色彩时有以下三个注意点：

- 色彩应与产品定位相匹配，且符合用户心理认知；
- 视觉层次应清晰分明，为重要行动点或关键信息定义一个主色，并建立视觉连续性；
- 遵守 WCAG 2.0 的 标准，保证足够的对比度，让色彩更容易被视障碍（色盲）用户识别。

## Ant Design Colors

Ant Design PC 端的色板由 10 个由浅至深的色彩单元格组成，我们为部分色彩格定义了默认使用场景，用户在进行色彩配色时只需根据关键词选择一条色板即可得到一套完整的系统配色方案。在理论上，在 UI 设计中的色彩都应取自这份色板。

经过设计师和程序员的精心调教，结合了色彩加白、加黑、加深，贝塞尔曲线，以及针对冷暖色的不同旋转角度，得出一套[色板生成算法](https://github.com/ant-design/ant-design/blob/734beb84ffc3f0469fbae1566aa8450f966cb261/components/style/color/colorPalette.less)。使用者只需指定主色，便可导出一条完整的渐变色板。

Ant Design 的色板由 8 种基本色彩组成，每种基本色（第 6 格）又按上述算法衍生出 10 种渐变色。

> 注：在由浅至深的色板里，第 6 格色彩单元格普遍满足 [WCAG 2.0](http://leaverou.github.io/contrast-ratio/) 的 4.5:1 最小对比度（AA 级），我们将其定义为色板的默认品牌色。


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
