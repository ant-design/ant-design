import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { cloneElement } from '../_util/reactNode';

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

function renderNumberList(position: number, className: string) {
  const childrenToReturn: React.ReactElement<any>[] = [];
  for (let i = 0; i < 30; i++) {
    childrenToReturn.push(
      <p
        key={i.toString()}
        className={classNames(className, {
          current: position === i,
        })}
      >
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

const ScrollNumber: React.FC<ScrollNumberProps> = props => {
  const [animateStarted, setAnimateStarted] = React.useState(true);
  const [count, setCount] = React.useState(props.count);
  const [prevCount, setPrevCount] = React.useState(props.count);
  const [lastCount, setLastCount] = React.useState(props.count);

  if (prevCount !== props.count) {
    setAnimateStarted(true);
    setPrevCount(props.count);
  }

  React.useEffect(() => {
    setLastCount(count);
    let timeout: number;
    if (animateStarted) {
      // Let browser has time to reset the scroller before actually
      // performing the transition.
      timeout = setTimeout(() => {
        setAnimateStarted(false);
        setCount(props.count);
        if (props.onAnimated) {
          props.onAnimated();
        }
      });
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [animateStarted, count, props.count, props.onAnimated]);

  const getPositionByNum = (num: number, i: number) => {
    const currentCount = Math.abs(Number(count));
    const lstCount = Math.abs(Number(lastCount));
    const currentDigit = Math.abs(getNumberArray(count)[i] as number);
    const lastDigit = Math.abs(getNumberArray(lstCount)[i] as number);

    if (animateStarted) {
      return 10 + num;
    }

    // 同方向则在同一侧切换数字
    if (currentCount > lstCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      }
      return 20 + num;
    }
    if (currentDigit <= lastDigit) {
      return 10 + num;
    }
    return num;
  };

  const renderCurrentNumber = (prefixCls: string, num: number | string, i: number) => {
    if (typeof num === 'number') {
      const position = getPositionByNum(num, i);
      const removeTransition = animateStarted || getNumberArray(lastCount)[i] === undefined;
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
        renderNumberList(position, `${prefixCls}-only-unit`),
      );
    }

    return (
      <span key="symbol" className={`${prefixCls}-symbol`}>
        {num}
      </span>
    );
  };

  const renderNumberElement = (prefixCls: string) => {
    if (count && Number(count) % 1 === 0) {
      return getNumberArray(count)
        .map((num, i) => renderCurrentNumber(prefixCls, num, i))
        .reverse();
    }
    return count;
  };

  const renderScrollNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      style,
      title,
      component = 'sup',
      displayComponent,
    } = props;
    // fix https://fb.me/react-unknown-prop
    const restProps = omit(props, [
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
      return cloneElement(displayComponent, {
        className: classNames(
          `${prefixCls}-custom-component`,
          displayComponent.props && displayComponent.props.className,
        ),
      });
    }
    return React.createElement(component as any, newProps, renderNumberElement(prefixCls));
  };

  return <ConfigConsumer>{renderScrollNumber}</ConfigConsumer>;
};

ScrollNumber.defaultProps = {
  count: null,
  onAnimated() {},
};

export default ScrollNumber;
