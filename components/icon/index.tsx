import * as React from 'react';
import classNames from 'classnames';
import { antDesignIcons } from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import create from './IconFont';
import { getComputedSvgStyle, svgBaseProps } from './utils';
import warning from '../_util/warning';

ReactIcon.add(...antDesignIcons);

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface IconProps {
  type?: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  component?: React.ComponentType<CustomIconComponentProps>;
  viewBox?: string;
  spin?: boolean;
  style?: React.CSSProperties;
  svgStyle?: React.CSSProperties;
  svgClassName?: string;
  rotate?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
  tag?: string;
  prefixCls?: string;
}

const Icon: React.SFC<IconProps> = (props) => {
  const {
    // affect outter <i>...</i>
    tag = 'i',
    className = '',
    onClick,
    style,

    // affect inner <svg>...</svg>
    type,
    component,
    viewBox = '0 0 1024 1024',
    spin,
    flip,
    svgClassName,
    rotate = 0,
    svgStyle = {},

    // children
    children,
  } = props;

  warning(
    Boolean(type || component || children),
    'Icon should have `type` prop or `component` prop or `children`.',
  );

  if (component || children) {
    warning(
      Boolean(viewBox),
      'Make sure that you provide correct `viewBox`' +
      ' prop (default `0 0 1024 1024`) to Icon.',
    );
  }

  const classString = classNames(
    { [`anticon`]: true, [`anticon-${type}`]: Boolean(type) },
    className,
  );

  const svgClassString = classNames({
    svgClassName,
    [`anticon-spin`]: !!spin || type === 'loading',
  });

  const computedSvgStyle = getComputedSvgStyle(
    { rotate, flip },
    svgStyle,
  );

  // component > children > type
  if (component) {
    const innerSvgProps = {
      ...svgBaseProps,
      viewBox,
      className: svgClassString,
      style: computedSvgStyle,
    };
    return React.createElement(
      tag,
      { className: classString, style, onClick },
      React.createElement(
        component,
        innerSvgProps,
        children,
      ),
    );
  }

  if (children) {
    const innerSvgProps = {
      ...svgBaseProps,
      viewBox,
      className: svgClassString,
      style: computedSvgStyle,
    };
    return React.createElement(
      tag,
      { className: classString, style, onClick },
      React.createElement(
        'svg',
        innerSvgProps,
        children,
      ),
    );
  }

  if (type) {
    return React.createElement(
      tag,
      { className: classString, style, onClick },
      <ReactIcon
        className={svgClassString}
        type={type}
        style={computedSvgStyle}
      />,
    );
  }

  return React.createElement(
    tag,
    { className: classString, style, onClick },
  );
};

export type IconType = React.SFC<IconProps> & {
  create: typeof create;
};

Icon.displayName = 'Icon';
(Icon as IconType).create = create;

export default Icon as IconType;
