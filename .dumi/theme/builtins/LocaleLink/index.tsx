import { Link } from 'dumi';
import * as React from 'react';
import useLocale from '../../../hooks/useLocale';

type LinkProps = Parameters<typeof Link>[0];

export interface LocaleLinkProps extends LinkProps {
  sourceType: 'a' | 'Link';
  children?: React.ReactNode;
}

export default function LocaleLink({ sourceType, to, ...props }: LocaleLinkProps) {
  const Component = sourceType === 'a' ? 'a' : Link;

  const [, localeType] = useLocale();

  const localeTo = React.useMemo(() => {
    if (!to || typeof to !== 'string') {
      return to;
    }

    // Auto locale switch
    const cells = to.match(/(\/[^#]*)(#.*)?/);
    if (cells) {
      let path = cells[1].replace(/\/$/, '');
      const hash = cells[2] || '';

      if (localeType === 'cn' && !path.endsWith('-cn')) {
        path = `${path}-cn`;
      } else if (localeType === 'en' && path.endsWith('-cn')) {
        path = path.replace(/-cn$/, '');
      }

      return `${path}${hash}`;
    }

    return to;
  }, [to]);

  const linkProps: LocaleLinkProps = {
    ...props,
  } as LocaleLinkProps;

  if (to) {
    linkProps.to = localeTo;
  }

  return <Component {...linkProps} />;
}
