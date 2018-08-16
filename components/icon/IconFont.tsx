import Icon, { IconProps } from './index';
import * as React from 'react';

const customCache = new Set<string>();

export interface CustomIconOptions {
  namespace?: string;
  prefix?: string;
  cdnUrl?: string;
  extraCommonProps?: { [key: string]: any };
}

export default function create(options: CustomIconOptions = {}): React.SFC<IconProps> {
  const { namespace, prefix = '', cdnUrl, extraCommonProps = {} } = options;

  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (typeof document !== 'undefined' && typeof window !== 'undefined'
    && typeof document.createElement === 'function'
    && typeof cdnUrl === 'string' && cdnUrl.length
    && typeof namespace === 'string' && namespace.length
    && !customCache.has(namespace)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', `https://${cdnUrl}.js`);
    script.setAttribute('data-namespace', namespace);
    customCache.add(namespace);
    document.body.appendChild(script);
  }

  const Iconfont: React.SFC<IconProps> = (props) => {
    const { type } = props;

    // component > children > type
    let content = null;
    if (props.type) {
      content = <use xlinkHref={`#${prefix}${type}`} />;
    }
    if (props.children) {
      content = props.children;
    }
    return (
      <Icon
        {...props}
        {...extraCommonProps}
      >
        {content}
      </Icon>
    );
  };

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}
