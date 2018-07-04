import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { symbols, prefix as antdIconPrefix } from 'antd-icons';
import { Omit } from "../_util/type";

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
  prefix?: string;
}

export interface SvgIconProps {
  className?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface CustomIconOptions {
  prefix: string;
  namespace: string;
  scriptLink?: string;
}

const svgIconNormalizeProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor'
};

class Icon extends React.PureComponent<IconProps> {
  componentDidMount() {
    if (document) {
      const idName = '__DO_NOT_MANUALLY_USE_ANTD_SVG_SPRITE_NODE__';
      const spriteNode = document.getElementById(idName);
      const mountNode = document.body;
      if (!spriteNode && mountNode) {
        mountNode.insertAdjacentHTML('afterbegin', `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="${idName}"
    style="position:absolute;width:0;height:0"
  >
    <defs>
      ${symbols}
    </defs>
  </svg>
`.trim());
      }
    }
  }

  render() {
    const { type, className = '', spin, prefix = antdIconPrefix } = this.props;
    const classString = classNames({
      anticon: true,
      'anticon-spin': !!spin || type === 'loading'
    }, className);

    return (
      <i {...omit(this.props, ['type', 'spin'])} className={classString}>
        <svg {...svgIconNormalizeProps}>
          <use xlinkHref={`#${prefix}${type}`}/>
        </svg>
      </i>
    );
  }

  static SvgIcon(props: SvgIconProps) {
    const { className = '', spin } = props;
    const classString = classNames({
      anticon: true,
      'anticon-spin': !!spin
    }, className);
    return (
      <i {...omit(props, ['spin'])} className={classString}>
        <svg {...svgIconNormalizeProps}>
          {props.children}
        </svg>
      </i>
    );
  }

  static CustomCache: { [key: string]: boolean } = {};

  static create({ prefix, namespace, scriptLink }: CustomIconOptions) {
    return class CustomIcon extends React.PureComponent<Omit<IconProps, 'prefix'>> {

      componentDidMount() {
        if (document && window && !Icon.CustomCache[namespace] && scriptLink) {
          const script = document.createElement('script');
          script.src = scriptLink;
          Icon.CustomCache[namespace] = true;
          document.body.appendChild(script);
        }
      }

      render() {
        const { type, className = '', spin } = this.props;
        const classString = classNames({
          anticon: true,
          'anticon-spin': !!spin || type === 'loading'
        }, className);

        return (
          <i {...omit(this.props, ['type', 'spin'])} className={classString}>
            <svg {...svgIconNormalizeProps}>
              <use xlinkHref={`#${prefix}${type}`}/>
            </svg>
          </i>
        );
      }
    }
  }
}

export default Icon;
