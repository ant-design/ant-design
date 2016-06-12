import React, { createElement } from 'react';
import { findDOMNode } from 'react-dom';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';

function getNumberArray(num) {
  return num ?
    num.toString()
      .split('')
      .reverse()
      .map(i => Number(i)) : [];
}

export default class ScrollNumber extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-scroll-number',
    count: null,
    component: 'sup',
    onAnimated() {},
    height: 18,
  }

  static propTypes = {
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    component: React.PropTypes.string,
    onAnimated: React.PropTypes.func,
    height: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      animateStarted: true,
      count: props.count,
    };
  }

  componentDidMount() {
    if (!isCssAnimationSupported()) {
      findDOMNode(this).className += ' not-support-css-animation';
    }
  }

  getPositionByNum(num, i) {
    if (this.state.animateStarted) {
      return 10 + num;
    }
    const currentDigit = getNumberArray(this.state.count)[i];
    const lastDigit = getNumberArray(this.lastCount)[i];
    // 同方向则在同一侧切换数字
    if (this.state.count > this.lastCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      }
      return 20 + num;
    }
    if (currentDigit <= lastDigit) {
      return 10 + num;
    }
    return num;
  }

  componentWillReceiveProps(nextProps) {
    if ('count' in nextProps) {
      if (this.state.count === nextProps.count) {
        return;
      }
      this.lastCount = this.state.count;
      // 复原数字初始位置
      this.setState({
        animateStarted: true,
      }, () => {
        // 等待数字位置复原完毕
        // 开始设置完整的数字
        setTimeout(() => {
          this.setState({
            animateStarted: false,
            count: nextProps.count,
          }, () => {
            this.props.onAnimated();
          });
        }, 5);
      });
    }
  }

  renderNumberList(position) {
    const childrenToReturn = [];
    for (let i = 0; i < 30; i++) {
      const currentClassName = (position === i) ? 'current' : null;
      childrenToReturn.push(<p key={i} className={currentClassName}>{i % 10}</p>);
    }
    return childrenToReturn;
  }

  renderCurrentNumber(num, i) {
    const position = this.getPositionByNum(num, i);
    const height = this.props.height;
    const removeTransition = this.state.animateStarted ||
      (getNumberArray(this.lastCount)[i] === undefined);
    return createElement('span', {
      className: `${this.props.prefixCls}-only`,
      style: {
        transition: removeTransition && 'none',
        WebkitTransform: `translate3d(0, ${-position * height}px, 0)`,
        transform: `translate3d(0, ${-position * height}px, 0)`,
        height,
      },
      key: i,
    }, this.renderNumberList(position));
  }

  renderNumberElement() {
    const state = this.state;
    if (!state.count || isNaN(state.count)) {
      return state.count;
    }
    return getNumberArray(state.count)
      .map((num, i) => this.renderCurrentNumber(num, i)).reverse();
  }

  render() {
    const props = {
      ...this.props,
      className: `${this.props.prefixCls} ${this.props.className}`,
    };
    return createElement(
      this.props.component,
      props,
      this.renderNumberElement()
    );
  }
}
