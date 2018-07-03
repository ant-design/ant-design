import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { symbols, prefix } from 'antd-icons';

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

export interface SvgIconProps {
  className?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

class Icon extends React.PureComponent<IconProps> {
  componentDidMount() {
    if (document) {
      const idName = '__DO_NOT_MANUALLY_USE_ANTD_SVG_SPRITE_NODE__';
      const spriteNode = document.getElementById(idName);
      const mountNode = document.body;
      if(!spriteNode && mountNode) {
        console.log('!!!!!mounted');
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
    const { type, className = '', spin } = this.props;
    const classString = classNames({
      anticon: true,
      'anticon-spin': !!spin || type === 'loading'
    }, className);

    return (
      <i {...omit(this.props, ['type', 'spin'])} className={classString}>
        <svg width={'1em'} height={'1em'} fill={'currentColor'}>
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
        <svg width={'1em'} height={'1em'} fill={'currentColor'}>
          {props.children}
        </svg>
      </i>
    );
  }
}

export default Icon;
