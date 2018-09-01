import * as React from 'react';
import classNames from 'classnames';
import * as allIcons from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import createFromIconfontCN from './IconFont';
import { svgBaseProps, withThemeSuffix } from './utils';
import warning from '../_util/warning';
import { getTwoToneColors, setTwoToneColors } from './twoTonePrimaryColor';

// Initial setting
ReactIcon.add(...Object.keys(allIcons).map((key) => (allIcons as any)[key]));
ReactIcon.setTwoToneColors({
  primaryColor: '#1890ff',
});

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
  ['aria-hidden']?: string;
}

export type ThemeType = 'filled' | 'outlined' | 'twoTone';

export interface IconProps {
  type?: string;
  className?: string;
  theme?: ThemeType;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  component?: React.ComponentType<CustomIconComponentProps>;
  primaryColor?: string;
  secondaryColor?: string;
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

    // other
    theme,
    primaryColor,
    secondaryColor,
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
      Boolean(viewBox) || React.Children.count(children) === 1 && React.Children.only(children).type === 'use',
      'Make sure that you provide correct `viewBox`' +
      ' prop (default `0 0 1024 1024`) to the icon.',
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

  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      computedType = withThemeSuffix(type, theme);
    }
    if (secondaryColor) {
      warning(
        Boolean(!primaryColor),
        `two-tone icon should be provided with the property 'primaryColor' at least.`,
      );
    }
    return (
      <i className={classString} title={title} style={style} onClick={onClick}>
        <ReactIcon
          className={svgClassString}
          type={computedType}
          style={svgStyle}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
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
  getTwoToneColors: typeof getTwoToneColors;
  setTwoToneColors: typeof setTwoToneColors;
};

Icon.displayName = 'Icon';
(Icon as IconType).createFromIconfontCN = createFromIconfontCN;
(Icon as IconType).getTwoToneColors = getTwoToneColors;
(Icon as IconType).setTwoToneColors = setTwoToneColors;

export default Icon as IconType;
