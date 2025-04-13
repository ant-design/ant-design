import * as React from 'react';
import classNames from 'classnames';

export interface UnitNumberProps {
  prefixCls: string;
  value: string | number;
  offset?: number;
  current?: boolean;
}

const UnitNumber: React.FC<Readonly<UnitNumberProps>> = (props) => {
  const { prefixCls, value, current, offset = 0 } = props;
  let style: React.CSSProperties | undefined;
  if (offset) {
    style = { position: 'absolute', top: `${offset}00%`, left: 0 };
  }
  return (
    <span style={style} className={classNames(`${prefixCls}-only-unit`, { current })}>
      {value}
    </span>
  );
};

export interface SingleNumberProps {
  prefixCls: string;
  value: string;
  count: number;
}

function getOffset(start: number, end: number, unit: -1 | 1) {
  let index = start;
  let offset = 0;

  while ((index + 10) % 10 !== end) {
    index += unit;
    offset += unit;
  }

  return offset;
}

const SingleNumber: React.FC<Readonly<SingleNumberProps>> = (props) => {
  const { prefixCls, count: originCount, value: originValue } = props;
  const value = Number(originValue);
  const count = Math.abs(originCount);
  const [prevValue, setPrevValue] = React.useState(value);
  const [prevCount, setPrevCount] = React.useState(count);

  // ============================= Events =============================
  const onTransitionEnd: React.TransitionEventHandler<HTMLSpanElement> = () => {
    setPrevValue(value);
    setPrevCount(count);
  };

  // Fallback if transition events are not supported
  React.useEffect(() => {
    const timer = setTimeout(onTransitionEnd, 1000);
    return () => clearTimeout(timer);
  }, [value]);

  // ============================= Render =============================
  // Render unit list
  let unitNodes: React.ReactElement[];
  let offsetStyle: React.CSSProperties | undefined;

  if (prevValue === value || Number.isNaN(value) || Number.isNaN(prevValue)) {
    // Nothing to change
    unitNodes = [<UnitNumber {...props} key={value} current />];
    offsetStyle = {
      transition: 'none',
    };
  } else {
    unitNodes = [];

    // Fill basic number units
    const end = value + 10;
    const unitNumberList: number[] = [];
    for (let index = value; index <= end; index += 1) {
      unitNumberList.push(index);
    }

    const unit = prevCount < count ? 1 : -1;

    // Fill with number unit nodes
    const prevIndex = unitNumberList.findIndex((n) => n % 10 === prevValue);

    // Cut list
    const cutUnitNumberList =
      unit < 0 ? unitNumberList.slice(0, prevIndex + 1) : unitNumberList.slice(prevIndex);

    unitNodes = cutUnitNumberList.map((n, index) => {
      const singleUnit = n % 10;
      return (
        <UnitNumber
          {...props}
          key={n}
          value={singleUnit}
          offset={unit < 0 ? index - prevIndex : index}
          current={index === prevIndex}
        />
      );
    });

    // Calculate container offset value
    offsetStyle = {
      transform: `translateY(${-getOffset(prevValue, value, unit)}00%)`,
    };
  }

  return (
    <span className={`${prefixCls}-only`} style={offsetStyle} onTransitionEnd={onTransitionEnd}>
      {unitNodes}
    </span>
  );
};

export default SingleNumber;
