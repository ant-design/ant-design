import React from 'react';
import { Link } from 'bisheng/router';
import * as utils from './utils';

export interface NotFoundProps {
  location: {
    pathname: string;
    search: string;
    hash: string;
    state: any;
    action: string;
    key: any;
    basename: string;
    query: Record<string, string>;
  };
  router: {
    push: (pathname: string) => void;
    replace: (pathname: string) => void;
  };
}

const DIRECT_MAP: Record<string, string> = {
  'docs/spec/download': 'docs/resources',
  'docs/spec/work-with-us': 'docs/resources',
};

export default function NotFound(props: NotFoundProps) {
  const {
    location: { pathname },
    router,
  } = props;

  React.useEffect(() => {
    const directLinks = Object.keys(DIRECT_MAP);
    for (let i = 0; i < directLinks.length; i += 1) {
      const matchPath = directLinks[i];
      if (pathname.includes(matchPath)) {
        router.replace(
          utils.getLocalizedPathname(`/${DIRECT_MAP[matchPath]}`, utils.isZhCN(pathname)),
        );
      }
    }
  }, []);

  return (
    <div id="page-404">
      <section>
        <h1>404!</h1>
        <p>
          你要找的页面不存在
          <Link to={utils.getLocalizedPathname('/', utils.isZhCN(pathname))}>返回首页</Link>
        </p>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: '#react-content { height: 100%; background-color: #fff }',
        }}
      />
    </div>
  );
}
