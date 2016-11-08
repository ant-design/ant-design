import React from 'react';
import { createElement, Component } from 'react';
import {findDOMNode} from 'react-dom';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import assign from 'object-assign';
import omit from 'omit.js';

function getNumberArray(num) {
  return num ?
    num.toString()
      .split('')
      .reverse()
      .map(i => Number(i)) : [];
}

export interface ScrollNumberProps {
  prefixCls?: string;
  className?: string;
  count?: string | number;
  component?: string;
  onAnimated?: Function;
  height?: number;
  style: React.CSSProperties;
}

export default class ScrollNumber extends Component<ScrollNumberProps, any> {
  static defaultProps = {
    prefixCls: 'ant-scroll-number',
    count: null,
    onAnimated() {
    },
    height: 18,
  };

  lastCount: any;

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
            const onAnimated = this.props.onAnimated;
            if (onAnimated) {
              onAnimated();
            }
          });
        }, 5);
      });
    }
  }

  renderNumberList(position) {
    const childrenToReturn: React.ReactElement<any>[] = [];
    for (let i = 0; i < 30; i++) {
      const currentClassName = (position === i) ? 'current' : '';
      childrenToReturn.push(<p key={i.toString()} className={currentClassName}>{i % 10}</p>);
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
        WebkitTransform: `translateY(${-position * height}px)`,
        transform: `translateY(${-position * height}px)`,
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
    // fix https://fb.me/react-unknown-prop
    const props = assign({}, omit(this.props, [
      'count',
      'onAnimated',
      'component',
      'prefixCls',
    ]), {
      className: `${this.props.prefixCls} ${this.props.className}`,
    });
    return createElement(
      this.props.component || 'sup',
      props,
      this.renderNumberElement()
    );
  }
}
