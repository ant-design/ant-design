import * as React from 'react';
import classNames from 'classnames';

export interface UnitNumberProps {
  prefixCls: string;
  value: string | number;
  offset?: number;
  current?: boolean;
}

function UnitNumber({ prefixCls, value, current, offset = 0 }: UnitNumberProps) {
  let style: React.CSSProperties | undefined;

  if (offset) {
    style = {
      position: 'absolute',
      top: `${offset}00%`,
      left: 0,
    };
  }

  return (
    <p
      style={style}
      className={classNames(`${prefixCls}-only-unit`, {
        current,
      })}
    >
      {value}
    </p>
  );
}

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

export default function SingleNumber(props: SingleNumberProps) {
  const { prefixCls, count: originCount, value: originValue } = props;
  const value = Number(originValue);
  const count = Math.abs(originCount);
  const [prevValue, setPrevValue] = React.useState(value);
  const [prevCount, setPrevCount] = React.useState(count);

  // ============================= Events =============================
  const onTransitionEnd = () => {
    setPrevValue(value);
    setPrevCount(count);
  };

  // Fallback if transition event not support
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onTransitionEnd();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
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

    // Fill with number unit nodes
    const prevIndex = unitNumberList.findIndex(n => n % 10 === prevValue);
    unitNodes = unitNumberList.map((n, index) => {
      const singleUnit = n % 10;
      return (
        <UnitNumber
          {...props}
          key={n}
          value={singleUnit}
          offset={index - prevIndex}
          current={index === prevIndex}
        />
      );
    });

    // Calculate container offset value
    const unit = prevCount < count ? 1 : -1;
    offsetStyle = {
      transform: `translateY(${-getOffset(prevValue, value, unit)}00%)`,
    };
  }

  return (
    <span className={`${prefixCls}-only`} style={offsetStyle} onTransitionEnd={onTransitionEnd}>
      {unitNodes}
    </span>
  );
}
