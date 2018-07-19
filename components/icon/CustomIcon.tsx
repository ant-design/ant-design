import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { Omit } from '../_util/type';
import { IconProps } from './index';

export interface CustomIconProps extends Omit<IconProps, 'type'> {
  src?: string;
}

const CustomIcon: React.SFC<CustomIconProps> = (props) => {
  const { className = '', spin, src, children } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin,
  }, className);

  if (typeof src === 'string' && src.length) {
    return (
      <object
        {...omit(props, ['spin'])}
        className={classString}
        width={'1em'}
        height={'1em'}
        fill={'currentColor'}
        type={'image/svg+xml'}
        aria-hidden={'true'}
        data={src}
      />
    );
  }

  return (
    <svg
      {...omit(props, ['spin'])}
      className={classString}
      width={'1em'}
      height={'1em'}
      fill={'currentColor'}
      aria-hidden={'true'}
    >
      {children}
    </svg>
  );
};

const customCache = new Set<string>();

export interface CustomIconOptions {
  namespace?: string;
  prefix?: string;
  scriptLink?: string;
}

export function create(options: CustomIconOptions = {}): React.ComponentClass<IconProps> {
  const { namespace, prefix = '', scriptLink } = options;

  class Custom extends React.Component<IconProps> {
    render() {
      const { type, className = '', spin } = this.props;
      const classString = classNames({
        anticon: true,
        'anticon-spin': !!spin || type === 'loading',
      }, className);
      return (
        <svg
          {...omit(this.props, ['type', 'spin'])}
          className={classString}
          width={'1em'}
          height={'1em'}
          fill={'currentColor'}
          aria-hidden={'true'}
        >
          <use xlinkHref={`#${prefix}${type}`} />
        </svg>
      );
    }

    componentDidMount() {
      /**
       * DOM API required.
       * The Custom Icon will create a <script/>
       * that loads SVG symbols and insert the SVG Element into the document body.
       */
      if (document && window
        && typeof scriptLink === 'string' && scriptLink.length
        && typeof namespace === 'string' && namespace.length
        && !customCache.has(namespace)
      ) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptLink);
        script.setAttribute('data-namespace', namespace);
        customCache.add(namespace);
        document.body.appendChild(script);
      }
    }
  }

  return Custom;
}

export default CustomIcon;
