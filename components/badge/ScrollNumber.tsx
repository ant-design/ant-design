import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
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

const ScrollNumber: React.FC<ScrollNumberProps> = ({
  prefixCls: customizePrefixCls,
  count: customizeCount,
  className,
  style,
  title,
  component = 'sup',
  displayComponent,
  onAnimated = () => {},
  ...restProps
}) => {
  const [animateStarted, setAnimateStarted] = React.useState(true);
  const [count, setCount] = React.useState(customizeCount);
  const [prevCount, setPrevCount] = React.useState(customizeCount);
  const [lastCount, setLastCount] = React.useState(customizeCount);
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('scroll-number', customizePrefixCls);

  if (prevCount !== customizeCount) {
    setAnimateStarted(true);
    setPrevCount(customizeCount);
  }

  React.useEffect(() => {
    setLastCount(count);
    let timeout: number;
    if (animateStarted) {
      // Let browser has time to reset the scroller before actually
      // performing the transition.
      timeout = setTimeout(() => {
        setAnimateStarted(false);
        setCount(customizeCount);
        onAnimated();
      });
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [animateStarted, customizeCount, onAnimated]);

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

  const renderCurrentNumber = (num: number | string, i: number) => {
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

  const renderNumberElement = () => {
    if (count && Number(count) % 1 === 0) {
      return getNumberArray(count)
        .map((num, i) => renderCurrentNumber(num, i))
        .reverse();
    }
    return count;
  };

  const newProps = {
    ...restProps,
    style,
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
  return React.createElement(component as any, newProps, renderNumberElement());
};

export default ScrollNumber;
