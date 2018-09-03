import * as React from 'react';
import classNames from 'classnames';
import * as allIcons from '@ant-design/icons';
import ReactIcon from '@ant-design/icons-react';
import createFromIconfontCN from './IconFont';
import {
  svgBaseProps, withThemeSuffix,
  removeTypeTheme, getThemeFromTypeName,
} from './utils';
import warning from '../_util/warning';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';

// Initial setting
ReactIcon.add(...Object.keys(allIcons).map((key) => (allIcons as any)[key]));
setTwoToneColor('#1890ff');

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
  twoToneColor?: string;
  viewBox?: string;
  spin?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
}

const Icon: React.SFC<IconProps> = (props) => {
  const {
    // affect outter <i>...</i>
    className,

    // affect inner <svg>...</svg>
    type,
    component: Component,
    viewBox,
    spin,

    // children
    children,

    // other
    theme, // default to outlined
    twoToneColor,

    ...restProps
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
  });

  let innerNode;

  // component > children > type
  if (Component) {
    const innerSvgProps: CustomIconComponentProps = {
      ...svgBaseProps,
      className: svgClassString,
      viewBox,
    };
    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }

    innerNode = (
      <Component {...innerSvgProps} >
        {children}
      </Component>
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
    };
    innerNode = (
      <svg {...innerSvgProps} viewBox={viewBox}>
        {children}
      </svg>
    );
  }

  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      const alreadyHaveTheme = getThemeFromTypeName(type);
      warning(!alreadyHaveTheme,
        `This icon already has a theme '${alreadyHaveTheme}'.` +
        ` The prop 'theme' ${theme} will be ignored.`);
    }
    computedType = withThemeSuffix(
      removeTypeTheme(type),
      theme || 'outlined',
    );
    innerNode = (
      <ReactIcon
        className={svgClassString}
        type={computedType}
        primaryColor={twoToneColor}
      />
    );
  }

  return (
    <i {...restProps} className={classString}>
      {innerNode}
    </i>
  );
};

export type IconType = typeof Icon & {
  createFromIconfontCN: typeof createFromIconfontCN;
  getTwoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
};

Icon.displayName = 'Icon';
(Icon as IconType).createFromIconfontCN = createFromIconfontCN;
(Icon as IconType).getTwoToneColor = getTwoToneColor;
(Icon as IconType).setTwoToneColor = setTwoToneColor;

export default Icon as IconType;
