import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { Omit } from '../_util/type';
import { IconProps } from './index';

export interface CustomIconProps extends Omit<IconProps, 'type'> {
  viewBox?: string;
  component?: React.ComponentType<CustomIconComponentProps>;
}

export interface CustomIconComponentProps {
  width: Readonly<string | number>;
  height: Readonly<string | number>;
  fill: Readonly<string>;
  viewBox: Readonly<string>;
}

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  ['aria-hidden']: 'true',
};

const CustomIcon: React.SFC<CustomIconProps> = (props) => {
  const {
    className = '',
    spin,
    // ⬇️ Todo, what's the best default value?
    // ⬇️       "0 0 24 24" for material-ui or "0 0 1024 1024" for ant-design
    viewBox = '0 0 1024 1024',
    children,
    component: Component,
  } = props;

  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin,
  }, className);

  let content = (
    <svg {...omit(props, ['spin'])} {...svgBaseProps} viewBox={viewBox}>
      {children}
    </svg>
  );

  if (Component) {
    content = <Component {...svgBaseProps} viewBox={viewBox}>{children}</Component>;
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
  scriptUrl?: string;
  extraCommonProps?: { [key: string]: any };
}

export function create(options: CustomIconOptions = {}): React.ComponentClass<IconProps> {
  const { namespace, prefix = '', scriptUrl, extraCommonProps = {} } = options;

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
            {...omit(this.props, ['type', 'spin'])}
            {...svgBaseProps}
          >
            <use xlinkHref={`#${prefix}${type}`}/>
          </svg>
        </i>
      );
    }

    componentDidMount() {
      /**
       * DOM API required.
       * Make sure in browser environment.
       * The Custom Icon will create a <script/>
       * that loads SVG symbols and insert the SVG Element into the document body.
       */
      if (typeof document !== 'undefined' && typeof window !== 'undefined'
        && typeof document.createElement === 'function'
        && typeof scriptUrl === 'string' && scriptUrl.length
        && typeof namespace === 'string' && namespace.length
        && !customCache.has(namespace)
      ) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', namespace);
        customCache.add(namespace);
        document.body.appendChild(script);
      }
    }
  }

  return Custom;
}

export default CustomIcon;
