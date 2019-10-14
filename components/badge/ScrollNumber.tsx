import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function getNumberArray(num: string | number | undefined | null) {
  return num
    ? num
        .toString()
        .split('')
        .reverse()
        .map(i => {
          const current = Number(i);
          return isNaN(current) ? i : current;
        })
    : [];
}

function renderNumberList(position: number) {
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

export interface ScrollNumberProps {
  prefixCls?: string;
  className?: string;
  count?: string | number | null;
  displayComponent?: React.ReactElement<HTMLElement>;
  component?: string;
  onAnimated?: Function;
  style?: React.CSSProperties;
  title?: string | number | null;
}

export interface ScrollNumberState {
  animateStarted?: boolean;
  count?: string | number | null;
}

class ScrollNumber extends React.Component<ScrollNumberProps, ScrollNumberState> {
  static defaultProps = {
    count: null,
    onAnimated() {},
  };

  static getDerivedStateFromProps(nextProps: ScrollNumberProps, nextState: ScrollNumberState) {
    if ('count' in nextProps) {
      if (nextState.count === nextProps.count) {
        return null;
      }
      return {
        animateStarted: true,
      };
    }
    return null;
  }

  lastCount?: string | number | null;

  constructor(props: ScrollNumberProps) {
    super(props);
    this.state = {
      animateStarted: true,
      count: props.count,
    };
  }

  componentDidUpdate(_: any, prevState: ScrollNumberState) {
    this.lastCount = prevState.count;
    const { animateStarted } = this.state;
    if (animateStarted) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        (__, props) => ({
          animateStarted: false,
          count: props.count,
        }),
        this.onAnimated,
      );
    }
  }

  getPositionByNum(num: number, i: number) {
    const { count } = this.state;
    const currentCount = Math.abs(Number(count));
    const lastCount = Math.abs(Number(this.lastCount));
    const currentDigit = Math.abs(getNumberArray(this.state.count)[i] as number);
    const lastDigit = Math.abs(getNumberArray(this.lastCount)[i] as number);

    if (this.state.animateStarted) {
      return 10 + num;
    }

    // 同方向则在同一侧切换数字
    if (currentCount > lastCount) {
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

  onAnimated = () => {
    const { onAnimated } = this.props;
    if (onAnimated) {
      onAnimated();
    }
  };

  renderCurrentNumber(prefixCls: string, num: number | string, i: number) {
    if (typeof num === 'number') {
      const position = this.getPositionByNum(num, i);
      const removeTransition =
        this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
      return React.createElement(
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
        renderNumberList(position),
      );
    }

    return (
      <span key="symbol" className={`${prefixCls}-symbol`}>
        {num}
      </span>
    );
  }

  renderNumberElement(prefixCls: string) {
    const { count } = this.state;
    if (count && Number(count) % 1 === 0) {
      return getNumberArray(count)
        .map((num, i) => this.renderCurrentNumber(prefixCls, num, i))
        .reverse();
    }
    return count;
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
      newProps.style = {
        ...style,
        boxShadow: `0 0 0 1px ${style.borderColor} inset`,
      };
    }
    if (displayComponent) {
      return React.cloneElement(displayComponent, {
        className: classNames(
          `${prefixCls}-custom-component`,
          displayComponent.props && displayComponent.props.className,
        ),
      });
    }
    return React.createElement(component as any, newProps, this.renderNumberElement(prefixCls));
  };

  render() {
    return <ConfigConsumer>{this.renderScrollNumber}</ConfigConsumer>;
  }
}

polyfill(ScrollNumber);

export default ScrollNumber;
