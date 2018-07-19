import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { Omit } from '../_util/type';
import { IconProps } from './index';

export interface CustomIconProps extends Omit<IconProps, 'type'> {
  viewBox?: string;
  component?: React.ComponentType<CustomIconComponentProps>;
}

export interface CustomIconComponentProps extends Omit<CustomIconProps, 'component'> {
}

const CustomIcon: React.SFC<CustomIconProps> = (props) => {
  const {
    className = '',
    spin,
    viewBox = '0 0 24 24',
    children,
    component: Component,
  } = props;

  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin,
  }, className);

  let content = (
    <svg
      {...omit(props, ['type', 'spin'])}
      width={'1em'}
      height={'1em'}
      fill={'currentColor'}
      aria-hidden={'true'}
      viewBox={viewBox}
    >
      {children}
    </svg>
  );

  if (Component) {
    content = (
      <Component
        {...omit(props, ['type', 'spin', 'component'])}
        width={'1em'}
        height={'1em'}
        fill={'currentColor'}
        aria-hidden={'true'}
        viewBox={viewBox}
      >
        {children}
      </Component>
    );
  }

  return (
    <i className={classString}>
      {content}
    </i>
  );
};

const customCache = new Set<string>();

export interface CustomIconOptions {
  namespace?: string;
  prefix?: string;
  scriptLink?: string;
  [key: string]: any;
}

export function create(options: CustomIconOptions = {}): React.ComponentClass<IconProps> {
  const { namespace, prefix = '', scriptLink, ...extraCommonProps } = options;

  class Custom extends React.Component<IconProps> {
    render() {
      const { type, className = '', spin } = this.props;
      const classString = classNames({
        anticon: true,
        'anticon-spin': !!spin || type === 'loading',
      }, className);
      return (
        <i className={classString}>
          <svg
            {...extraCommonProps}
            {...omit(this.props, ['type', 'spin', 'viewBox'])}
            width={'1em'}
            height={'1em'}
            fill={'currentColor'}
            aria-hidden={'true'}
          >
            <use xlinkHref={`#${prefix}${type}`} />
          </svg>
        </i>
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
