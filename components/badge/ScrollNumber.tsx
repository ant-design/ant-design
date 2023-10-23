import classNames from 'classnames';
import * as React from 'react';
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import SingleNumber from './SingleNumber';

export interface ScrollNumberProps {
  prefixCls?: string;
  className?: string;
  motionClassName?: string;
  count?: string | number | null;
  children?: React.ReactElement<HTMLElement>;
  component?: React.ComponentType<any>;
  style?: React.CSSProperties;
  title?: string | number | null;
  show: boolean;
}

export interface ScrollNumberState {
  animateStarted?: boolean;
  count?: string | number | null;
}

const ScrollNumber = React.forwardRef<HTMLElement, ScrollNumberProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    count,
    className,
    motionClassName,
    style,
    title,
    show,
    component: Component = 'sup',
    children,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('scroll-number', customizePrefixCls);

  // ============================ Render ============================
  const newProps = {
    ...restProps,
    'data-show': show,
    style,
    className: classNames(prefixCls, className, motionClassName),
    title: title as string,
  };

  // Only integer need motion
  let numberNodes: React.ReactNode = count;
  if (count && Number(count) % 1 === 0) {
    const numberList = String(count).split('');

    numberNodes = (
      <bdi>
        {numberList.map((num, i) => (
          <SingleNumber
            prefixCls={prefixCls}
            count={Number(count)}
            value={num}
            // eslint-disable-next-line react/no-array-index-key
            key={numberList.length - i}
          />
        ))}
      </bdi>
    );
  }

  // allow specify the border
  // mock border-color by box-shadow for compatible with old usage:
  // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
  if (style && style.borderColor) {
    newProps.style = {
      ...style,
      boxShadow: `0 0 0 1px ${style.borderColor} inset`,
    };
  }
  if (children) {
    return cloneElement(children, (oriProps) => ({
      className: classNames(`${prefixCls}-custom-component`, oriProps?.className, motionClassName),
    }));
  }

  return (
    <Component {...newProps} ref={ref}>
      {numberNodes}
    </Component>
  );
});

export default ScrollNumber;
