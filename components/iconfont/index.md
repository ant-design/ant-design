# Iconfont

- category: Components
- chinese: 字体图标
- type: 基本

---

有含义的矢量图形，每一个图标打倒一个敌人。

## 图标的命名规范

我们为每个图标赋予了语义化的命名。只需在 <Icon> 标签内，制定对应的 type 属性即可。

不同 type 命名规则如下:

- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`(实心) 和 `question-circle-o`(描线)；

- 命名顺序：`[icon名]-[形状可选]-[描线与否]-[方向可选]`。

## 实现原理

所有的 Icon 标签最终会渲染为

```html
<i class="anticon anticon-${type}"></i>
```

## 如何使用

使用 <Icon> 标签申明组件，设置对应的 type 设置需要渲染的图标，示例代码如下:

```html
<Icon type="link" />
```

> 点击图标复制代码。

## 图标列表

### 一. 方向性图标

<div id="iconset-direction"></div>

### 二. 提示建议性图标

<div id="iconset-hint"></div>

### 三. 网站通用图标

<div id="iconset-common"></div>

<style>
ul.anticons-list {
  margin: 20px 0;
  list-style: none;
  width: 120%;
  overflow: hidden;
}
ul.anticons-list li {
  float: left;
  margin: 5px 5px 5px 0;
  width: 155px;
  text-align: center;
  list-style: none;
  cursor: pointer;
  height: 110px;
  color: #5C6B77;
  transition: all 0.2s ease;
  position: relative;
  padding: 0;
}
ul.anticons-list li:hover {
  background-color: #4BB8FF;
  color: #fff;
  border-radius: 4px;
}
ul.anticons-list li.copied:hover {
  color: rgba(255,255,255,0.2);
}
ul.anticons-list li:after {
  position: absolute;
  top: 10px;
  left: 0;
  height: 100%;
  width: 100%;
  content: "Copied!";
  text-align: center;
  line-height: 110px;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  opacity: 0;
}
ul.anticons-list li.copied:after {
  opacity: 1;
  top: 0;
}
.anticon {
  font-size: 26px;
  margin: 12px 0 16px;
}
.anticon-class {
  display: block;
  text-align: center;
  word-wrap: break-word;
  transform: scale(0.83);
  font-family: Consolas;
}
</style>

`````jsx
const Icon = antd.Icon;

const CopyableIcon = React.createClass({
  getInitialState() {
    return {
      justCopied: false
    };
  },
  onCopied(e) {
    this.setState({ justCopied: true }, () => {
      setTimeout(() => {
        this.setState({ justCopied: false });
      }, 1000);
    });
  },
  getCopyCode(type) {
    return '<Icon type="' + type + '" />';
  },
  render() {
    return (
      <Clip component="li" data-clipboard-text={this.getCopyCode(this.props.type)}
        onSuccess={this.onCopied} className={this.state.justCopied ? 'copied' : ''}>
        <Icon type={this.props.type} />
        <span className="anticon-class">{this.props.type}</span>
      </Clip>
    );
  }
});

const IconSet = React.createClass({
  getDefaultProps() {
    return {
      icons: []
    };
  },
  render() {
    return (
      <ul className="anticons-list clearfix">
        {this.props.icons.map((type, i) => <CopyableIcon key={i} type={type} />)}
      </ul>
    );
  }
});

const icons1 = ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrow-salt', 'down', 'up', 'left', 'right', 'caret-down', 'caret-up', 'caret-left', 'caret-right', 'caret-circle-right', 'caret-circle-left', 'caret-circle-o-right', 'caret-circle-o-left', 'circle-right', 'circle-left', 'circle-o-right', 'circle-o-left', 'double-right', 'double-left', 'verticle-right', 'verticle-left', 'forward', 'backward', 'rollback', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-right', 'arrow-up', 'arrow-down', 'arrow-left', 'play-circle', 'play-circle-o', 'circle-up', 'circle-down', 'circle-o-up', 'circle-o-down', 'caret-circle-o-down', 'caret-circle-up', 'caret-circle-down'];

const icons2 = ['question', 'question-circle-o', 'question-circle', 'plus', 'plus-circle-o', 'plus-circle', 'pause', 'pause-circle-o', 'pause-circle', 'minus', 'minus-circle-o', 'minus-circle', 'info', 'info-circle-o', 'info-circle', 'exclamation', 'exclamation-circle-o', 'exclamation-circle', 'cross', 'cross-circle-o', 'cross-circle', 'check', 'check-circle-o', 'check-circle', 'clock-circle-o', 'clock-circle'];

const icons3 = ['lock', 'unlock', 'android', 'apple', 'area-chart', 'bar-chart', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'copy', 'credit-card', 'delete', 'desktop', 'download-line', 'edit', 'ellipsis', 'environment', 'file', 'file-text', 'folder', 'folder-open', 'github', 'hdd', 'frown', 'meh', 'inbox', 'laptop', 'appstore', 'line-chart', 'link', 'logout', 'mail', 'menu-fold', 'menu-unfold', 'mobile', 'notification', 'paper-clip', 'picture', 'pie-chart', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'smile', 'tablet', 'tag', 'tags', 'to-top', 'upload', 'user', 'video-camera', 'windows', 'ie', 'chrome', 'home', 'loading', 'iconfont-caretcircle-o-up', 'smile-circle', 'meh-circle', 'frown-circle', 'tags-o', 'tag-o', 'cloud-upload-o', 'cloud-download-o', 'cloud-upload', 'cloud-o', 'star-o', 'star', 'enviroment', 'enviroment-o', 'eye', 'eye-o', 'camera', 'camera-o', 'aliwangwang', 'aliwangwang-o', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customerservice'];

ReactDOM.render(<IconSet icons={icons1} />, document.getElementById('iconset-direction'));
ReactDOM.render(<IconSet icons={icons2} />, document.getElementById('iconset-hint'));
ReactDOM.render(<IconSet icons={icons3} />, document.getElementById('iconset-common'));
`````
