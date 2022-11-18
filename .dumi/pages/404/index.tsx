import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'dumi';
import * as utils from '../../theme/utils';

export interface NotFoundProps {
  router: {
    push: (pathname: string) => void;
    replace: (pathname: string) => void;
  };
}

const DIRECT_MAP: Record<string, string> = {
  'docs/spec/download': 'docs/resources',
  'docs/spec/work-with-us': 'docs/resources',
};

const NotFoundPage: React.FC<NotFoundProps> = ({ router }) => {
  const { pathname } = useLocation();

  const isZhCN = utils.isZhCN(pathname);

  useEffect(() => {
    const directLinks = Object.keys(DIRECT_MAP);
    for (let i = 0; i < directLinks.length; i += 1) {
      const matchPath = directLinks[i];
      if (pathname.includes(matchPath)) {
        router.replace(utils.getLocalizedPathname(`/${DIRECT_MAP[matchPath]}`, isZhCN).pathname);
      }
    }
  }, []);

  return (
    <div id="page-404">
      <section>
        <Result
          status="404"
          title="404"
          subTitle={
            isZhCN ? '你访问的页面貌似不存在？' : 'Sorry, the page you visited does not exist.'
          }
          extra={
            <Link to={utils.getLocalizedPathname('/', isZhCN)}>
              <Button type="primary" icon={<HomeOutlined />}>
                {isZhCN ? '返回 Ant Design 首页' : 'Back to home page'}
              </Button>
            </Link>
          }
        />
      </section>
    </div>
  );
};

export default NotFoundPage;
