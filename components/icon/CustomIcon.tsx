import * as React from 'react';
import classNames from 'classnames';
import { Omit } from '../_util/type';
import { IconProps } from './index';

export interface CustomIconProps extends Omit<IconProps, 'type'> {
  type?: string | SpriteSvgIcon;
  viewBox?: string;
  component?: React.ComponentType<CustomIconComponentProps>;
}

export interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface SpriteSvgIcon {
  id: string;
  viewBox?: string;

  [key: string]: any;
}

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  ['aria-hidden']: 'true',
};

const CustomIcon: React.SFC<CustomIconProps> = (props) => {
  const {
    type: spriteSvgIcon,
    className = '',
    spin,
    // ⬇️ Todo, what's the best default value?
    // ⬇️       "0 0 24 24" for material-ui or "0 0 1024 1024" for ant-design
    viewBox = '0 0 1024 1024',
    children,
    svgClassName,
    rotate,
    flip,
    style,
    svgStyle = {},
    tag = 'i',
    onClick,
    component: Component,
  } = props;

  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin,
  }, className);

  const svgClassString = classNames(
    svgClassName,
  );

  const computedSvgStyle: React.CSSProperties = {
    transform: `${rotate ? `rotate(${rotate}deg)` : ''} `
      + `${(flip === 'horizontal' || flip === 'both') ? `scaleX(-1)` : ''} `
      + `${(flip === 'vertical' || flip === 'both') ? `scaleY(-1)` : ''}`,
    ...svgStyle,
  };

  const innerSvgProps = {
    ...svgBaseProps,
    viewBox,
    className: svgClassString,
    style: computedSvgStyle,
  };

  let content = (
    <svg {...innerSvgProps}>
      {children}
    </svg>
  );

  if (spriteSvgIcon) {
    if (isSVGSpriteObject(spriteSvgIcon)) {
      content = (
        <svg {...innerSvgProps} viewBox={spriteSvgIcon.viewBox || viewBox}>
          <use xlinkHref={`#${spriteSvgIcon.id}`}/>
        </svg>
      );
    } else { // typeof spriteSvgIcon === 'string'
      content = (
        <svg {...innerSvgProps} viewBox={viewBox}>
          <use xlinkHref={`#${spriteSvgIcon}`}/>
        </svg>
      );
    }
  }

  if (Component) {
    content = (
      <Component {...innerSvgProps}>
        {children}
      </Component>
    );
  }

  return React.createElement(
    tag,
    {
      className: classString,
      style,
      onClick,
    },
    content,
  );
};

function isSVGSpriteObject(obj: any): obj is SpriteSvgIcon {
  return typeof obj.id === 'string';
}

export default CustomIcon;
