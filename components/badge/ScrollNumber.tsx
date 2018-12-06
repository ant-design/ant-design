import * as React from 'react';
import { createElement, Component } from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function getNumberArray(num: string | number | undefined | null) {
  return num
    ? num
        .toString()
        .split('')
        .reverse()
        .map(i => Number(i))
    : [];
}

export interface ScrollNumberProps {
  prefixCls?: string;
  className?: string;
  count?: string | number | null;
  displayComponent?: React.ReactElement<any>;
  component?: string;
  onAnimated?: Function;
  style?: React.CSSProperties;
  title?: string | number | null;
}

export interface ScrollNumberState {
  animateStarted?: boolean;
  count?: string | number | null;
}

export default class ScrollNumber extends Component<ScrollNumberProps, ScrollNumberState> {
  static defaultProps = {
    count: null,
    onAnimated() {},
  };

  lastCount: any;

  constructor(props: ScrollNumberProps) {
    super(props);
    this.state = {
      animateStarted: true,
      count: props.count,
    };
  }

  getPositionByNum(num: number, i: number) {
    if (this.state.animateStarted) {
      return 10 + num;
    }
    const currentDigit = getNumberArray(this.state.count)[i];
    const lastDigit = getNumberArray(this.lastCount)[i];
    // 同方向则在同一侧切换数字
    if (this.state.count! > this.lastCount) {
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

  componentWillReceiveProps(nextProps: ScrollNumberProps) {
    if ('count' in nextProps) {
      if (this.state.count === nextProps.count) {
        return;
      }
      this.lastCount = this.state.count;
      // 复原数字初始位置
      this.setState(
        {
          animateStarted: true,
        },
        () => {
          // 等待数字位置复原完毕
          // 开始设置完整的数字
          setTimeout(() => {
            this.setState(
              {
                animateStarted: false,
                count: nextProps.count,
              },
              () => {
                const onAnimated = this.props.onAnimated;
                if (onAnimated) {
                  onAnimated();
                }
              },
            );
          }, 5);
        },
      );
    }
  }

  renderNumberList(position: number) {
    const childrenToReturn: React.ReactElement<any>[] = [];
    for (let i = 0; i < 30; i++) {
      const currentClassName = position === i ? 'current' : '';
      childrenToReturn.push(
        <p key={i.toString()} className={currentClassName}>
          {i % 10}
        </p>,
      );
    }
    return childrenToReturn;
  }

  renderCurrentNumber(prefixCls: string, num: number, i: number) {
    const position = this.getPositionByNum(num, i);
    const removeTransition =
      this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
    return createElement(
      'span',
      {
        className: `${prefixCls}-only`,
        style: {
          transition: removeTransition ? 'none' : undefined,
          msTransform: `translateY(${-position * 100}%)`,
          WebkitTransform: `translateY(${-position * 100}%)`,
          transform: `translateY(${-position * 100}%)`,
        },
        key: i,
      },
      this.renderNumberList(position),
    );
  }

  renderNumberElement(prefixCls: string) {
    const { count } = this.state;
    if (!count || isNaN(count as number)) {
      return count;
    }
    return getNumberArray(count)
      .map((num, i) => this.renderCurrentNumber(prefixCls, num, i))
      .reverse();
  }

  renderScrollNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      style,
      title,
      component = 'sup',
      displayComponent,
    } = this.props;
    // fix https://fb.me/react-unknown-prop
    const restProps = omit(this.props, [
      'count',
      'onAnimated',
      'component',
      'prefixCls',
      'displayComponent',
    ]);
    const prefixCls = getPrefixCls('scroll-number', customizePrefixCls);
    const newProps = {
      ...restProps,
      className: classNames(prefixCls, className),
      title: title as string,
    };

    // allow specify the border
    // mock border-color by box-shadow for compatible with old usage:
    // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
    if (style && style.borderColor) {
      newProps.style.boxShadow = `0 0 0 1px ${style.borderColor} inset`;
    }
    if (displayComponent) {
      return React.cloneElement(displayComponent, {
        className: `${prefixCls}-custom-component`,
      });
    }
    return createElement(component as any, newProps, this.renderNumberElement(prefixCls));
  };

  render() {
    return <ConfigConsumer>{this.renderScrollNumber}</ConfigConsumer>;
  }
}
