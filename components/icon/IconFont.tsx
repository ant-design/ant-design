import { IconProps } from './index';
import * as React from 'react';
import classNames from 'classnames';
import { svgBaseProps } from './CustomIcon';

const customCache = new Set<string>();

export interface CustomIconOptions {
  namespace?: string;
  prefix?: string;
  scriptUrl?: string;
  extraCommonProps?: { [key: string]: any };
}

export interface IconFontProps extends IconProps {
  viewBox?: string;
}

export default function create(options: CustomIconOptions = {}): React.ComponentClass<IconFontProps> {
  const { namespace, prefix = '', scriptUrl, extraCommonProps = {} } = options;

  class Custom extends React.Component<IconFontProps> {
    render() {
      const {
        type,
        className = '',
        spin,
        flip,
        svgClassName,
        tag = 'i',
        onClick,
        style,
        rotate = 0,
        svgStyle = {},
        viewBox = '0 0 1024 1024',
      } = this.props;

      const classString = classNames(
        {
          anticon: true,
          'anticon-spin': spin || type === 'loading',
        },
        className,
      );

      const computedSvgStyle: React.CSSProperties = {
        transform: `${rotate ? `rotate(${rotate}deg)` : ''} `
          + `${(flip === 'horizontal' || flip === 'both') ? `scaleX(-1)` : ''} `
          + `${(flip === 'vertical' || flip === 'both') ? `scaleY(-1)` : ''}`,
        ...svgStyle,
      };

      const svgClassString = classNames(
        svgClassName,
      );

      const innerSvgProps = {
        ...svgBaseProps,
        viewBox,
        className: svgClassString,
        style: computedSvgStyle,
      };

      return React.createElement(
        tag,
        {
          className: classString,
          style,
          onClick,
        },
        <svg
          {...extraCommonProps}
          {...innerSvgProps}
        >
          <use xlinkHref={`#${prefix}${type}`}/>
        </svg>,
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
