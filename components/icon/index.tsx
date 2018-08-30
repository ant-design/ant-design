import * as React from 'react';
import classNames from 'classnames';
import * as allIcons from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import createFromIconfontCN from './IconFont';
import { svgBaseProps } from './utils';
import warning from '../_util/warning';

ReactIcon.add(...Object.keys(allIcons).map((key) => (allIcons as any)[key]));

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
  ['aria-hidden']?: string;
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
  prefixCls?: string;
}

const Icon: React.SFC<IconProps> = (props) => {
  const {
    // affect outter <i>...</i>
    title,
    className,
    onClick,
    style,

    // affect inner <svg>...</svg>
    type,
    component: Component,
    viewBox,
    spin,
    svgClassName,
    svgStyle = {},

    // children
    children,
  } = props;

  warning(
    Boolean(type || Component || children),
    'Icon should have `type` prop or `component` prop or `children`.',
  );

  const classString = classNames({
    [`anticon`]: true,
    [`anticon-${type}`]: Boolean(type),
  }, className);

  const svgClassString = classNames({
    [`anticon-spin`]: !!spin || type === 'loading',
  }, svgClassName);

  // component > children > type
  if (Component) {
    const innerSvgProps: CustomIconComponentProps = {
      ...svgBaseProps,
      className: svgClassString,
      style: svgStyle,
      viewBox,
    };
    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }

    return (
      <i className={classString} title={title} style={style} onClick={onClick}>
        <Component {...innerSvgProps} >
          {children}
        </Component>
      </i>
    );
  }

  if (children) {
    warning(
      Boolean(viewBox),
      'Make sure that you provide correct `viewBox`' +
      ' prop (default `0 0 1024 1024`) to Icon.',
    );
    const innerSvgProps: CustomIconComponentProps = {
      ...svgBaseProps,
      className: svgClassString,
      style: svgStyle,
    };
    return (
      <i className={classString} title={title} style={style} onClick={onClick}>
        <svg {...innerSvgProps} viewBox={viewBox}>
          {children}
        </svg>
      </i>
    );
  }

  if (type) {
    return (
      <i className={classString} title={title} style={style} onClick={onClick}>
        <ReactIcon
          className={svgClassString}
          type={type}
          style={svgStyle}
        />
      </i>
    );
  }

  return (
    <i className={classString} title={title} style={style} onClick={onClick} />
  );
};

export type IconType = typeof Icon & {
  createFromIconfontCN: typeof createFromIconfontCN;
};

Icon.displayName = 'Icon';
(Icon as IconType).createFromIconfontCN = createFromIconfontCN;

export default Icon as IconType;
